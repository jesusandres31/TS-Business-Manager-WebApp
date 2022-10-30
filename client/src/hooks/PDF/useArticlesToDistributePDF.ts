import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// hooks
import { useProduct } from '../../hooks/useProduct';
//interface
import { IArticlesToDistribute } from '../../api/invoice.services';
// utils
import { getDate } from '../../utils/getDate';
// context
import { useLanguage } from '../../context/LanguageContext';

export const useArticlesToDistributePDF = () => {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { indexProductName } = useProduct();

  function printArticlesToDistribute(
    articles: IArticlesToDistribute[],
    isPrint: Boolean
  ) {
    /************** Setting up options and content **************/
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    const marginLeft = 40;
    doc.setFontSize(15);

    /***** Data *****/
    const title = translate('articlesToDistribute');

    const headers = [
      [translate('product'), translate('amount'), translate('units')],
    ];

    const data = articles.map((row) => [
      indexProductName(row.product_id),
      parseFloat(row.amount.toString()) === 0 ? '-' : row.amount,
      parseFloat(row.units.toString()) === 0 ? '-' : row.units,
    ]);

    /************** Start **************/
    let content = {
      theme: 'plain' as const,
      startY: 50,
      head: headers,
      body: data,
      halign: 'center',
    };

    doc.text(title, marginLeft, 40);
    autoTable(doc, content);
    doc.autoPrint();

    /************** End **************/
    if (isPrint) {
      return doc.output('dataurlnewwindow'); // Print it out
    }

    let date = getDate();
    return doc.save(`${translate('articlesToDistribute')} ${date}.pdf`); // Export as PDF
  }

  return printArticlesToDistribute;
};
