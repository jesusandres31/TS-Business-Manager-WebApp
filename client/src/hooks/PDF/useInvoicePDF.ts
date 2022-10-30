import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// global state
import { useProfileSelector } from '../../features/profile/profileSlice';
// interface
import { ReportMaster } from '../../api/invoice.services';
// hooks
import { useExtraTypes } from '../../hooks/useExtraTypes';
import { useClient } from '../../hooks/useClient';
import { useProduct } from '../../hooks/useProduct';
// context
import { useLanguage } from '../../context/LanguageContext';

export const usePrintOrExportPDF = () => {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { profile } = useProfileSelector((state) => state.profile);

  const { indexSaleTypeName, indexPaymentTypeName, indexProductTypeName } =
    useExtraTypes();

  const { indexProductName, indexProductTypeId } = useProduct();

  const { indexClientCompanyName } = useClient();

  function PDF(isPrint: boolean, invoice: ReportMaster) {
    /************** Setting up options and content **************/
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(14);

    /**
     * Profile
     */
    const profileHeaders = [['', '', '', '']];

    const profileData = [
      [
        profile.company_name,
        profile.phone ? profile.phone : '',
        profile.email ? profile.email : '',
        profile.website ? profile.website : '',
      ],
    ];

    let profileContent = {
      theme: 'plain' as const,
      startY: 8,
      head: profileHeaders,
      body: profileData,
      halign: 'center',
    };

    autoTable(doc, profileContent);
    doc.autoPrint();

    /**
     * Header
     */
    const headerHeaders = [
      [
        translate('_id'),
        translate('date'),
        translate('client'),
        /* translate('sale_type_id'),
        translate('payment_type_id'), */
        translate('fee_percentage'),
        translate('total'),
      ],
    ];

    const headerData = [
      [
        invoice.client_id,
        new Date(invoice.created).toLocaleDateString('en-GB'),
        indexClientCompanyName(invoice.client_id),
        /* translate(indexSaleTypeName(invoice.sale_type_id)),
        translate(indexPaymentTypeName(invoice.payment_type_id)), */
        parseFloat(invoice.fee_percentage.toString()) === 0
          ? '-'
          : `% ${invoice.fee_percentage}`,
        parseFloat(invoice.total.toString()) === 0 ? '-' : `$ ${invoice.total}`,
      ],
    ];

    let headerContent = {
      theme: 'plain' as const,
      startY: 70,
      head: headerHeaders,
      body: headerData,
      halign: 'left',
    };

    autoTable(doc, headerContent);
    doc.autoPrint();

    /**
     * Detail
     */
    const detailHeaders = [
      [
        translate('product'),
        translate('units'),
        translate('amount'),
        translate('unit_price'),
        translate('UM'),
        translate('fee_percentage'),
        translate('subtotal'),
      ],
    ];

    const detailData = invoice.report_details.map((row) => [
      // product_id
      indexProductName(row.product_id),
      // units
      parseFloat(row.units.toString()) === 0
        ? '-'
        : parseFloat(row.units.toString()).toString(),
      // amount
      parseFloat(row.amount.toString()) === 0
        ? '-'
        : `${row.amount} ${translate(
            indexProductTypeName(indexProductTypeId(row.product_id) as number)
          )}`,
      // unit_price
      parseFloat(row.unit_price.toString()) === 0 ? '-' : `$ ${row.unit_price}`,
      translate(
        indexProductTypeName(indexProductTypeId(row.product_id) as number)
      ),
      // fee_percentage
      parseFloat(row.fee_percentage.toString()) === 0
        ? '-'
        : `% ${row.fee_percentage}`,
      // subtotal
      parseFloat(row.subtotal.toString()) === 0 ? '-' : `$ ${row.subtotal}`,
    ]);

    let detailContent = {
      theme: 'plain' as const,
      startY: 130,
      head: detailHeaders,
      body: detailData,
      halign: 'center',
    };

    autoTable(doc, detailContent);
    doc.autoPrint();

    /**
     * lines
     */
    doc.line(30, 30, 560, 30);
    doc.line(30, 50, 560, 50);
    doc.line(30, 90, 560, 90);
    doc.line(30, 150, 560, 150);

    /************** End **************/
    if (isPrint) {
      return doc.output('dataurlnewwindow'); // Print it out
    }

    return doc.save(`${translate('_receipt')}[${invoice.id}].pdf`); // Export as PDF
  }

  return PDF;
};
