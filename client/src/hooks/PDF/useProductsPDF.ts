import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// global state
import { useProductsSelector } from '../../features/products/productsSlice';
// utils
import { getDate } from '../../utils/getDate';
// context
import { useLanguage } from '../../context/LanguageContext';
// hooks
import { useExtraTypes } from '../useExtraTypes';

export const usePrintOrExportPDF = () => {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { products } = useProductsSelector((state) => state.products);

  const { indexProductTypeName } = useExtraTypes();

  function PDF(isPrint: boolean) {
    /************** Setting up options and content **************/
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    const marginX = 40;
    const marginY = 40;
    doc.setFontSize(14);

    /***** Data *****/
    const title = translate('products');

    const headers = [
      [translate('name'), translate('UM'), translate('salePrice')],
    ];

    const rows = products.filter((row) => row.enabled);
    const data = rows.map((row) => [
      row.name,
      translate(indexProductTypeName(row.product_type_id)),
      `$ ${row.sale_price}`,
    ]);

    /************** Start **************/
    let content = {
      theme: 'plain' as const,
      startY: 50,
      head: headers,
      body: data,
      halign: 'center',
    };

    doc.text(title, marginX, marginY);
    autoTable(doc, content);
    doc.autoPrint();

    /************** End **************/
    if (isPrint) {
      return doc.output('dataurlnewwindow'); // Print it out
    }

    let date = getDate();
    return doc.save(`${translate('products')}${date}.pdf`); // Export as PDF
  }

  return PDF;
};
