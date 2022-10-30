import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// global state
import { useProvidersSelector } from '../../features/providers/providersSlice';
// utils
import { getDate } from '../../utils/getDate';
// context
import { useLanguage } from '../../context/LanguageContext';

export const usePrintOrExportPDF = () => {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { providers } = useProvidersSelector((state) => state.providers);

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
    const title = translate('providers');

    const headers = [
      [
        translate('company_name'),
        translate('phone'),
        translate('managerName'),
        translate('email'),
        translate('tax_id'),
        translate('address'),
        translate('locality'),
      ],
    ];

    const rows = providers.filter((row) => row.enabled);
    const data = rows.map((row) => [
      row.company_name,
      row.phone === '' ? '-' : row.phone,
      row.name === '' && row.surname === ''
        ? '-'
        : `${row.name} ${row.surname}`,
      row.email === '' ? '-' : row.email,
      row.tax_id === '' ? '-' : row.tax_id,
      row.address === '' ? '-' : row.address,
      row.locality === '' ? '-' : row.locality,
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
    return doc.save(`${translate('providers')}${date}.pdf`); // Export as PDF
  }

  return PDF;
};
