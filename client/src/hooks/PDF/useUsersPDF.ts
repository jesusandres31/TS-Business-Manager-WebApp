import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// global state
import { useUsersSelector } from '../../features/users/usersSlice';
// utils
import { getDate } from '../../utils/getDate';
// context
import { useLanguage } from '../../context/LanguageContext';
// hooks
import { useRoles } from '../useRoles';

export const usePrintOrExportPDF = () => {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { users } = useUsersSelector((state) => state.users);

  const { indexRoleName } = useRoles();

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
    const title = translate('users');

    const headers = [
      [
        translate('nameAndSurname'),
        translate('phone'),
        translate('email'),
        translate('role'),
      ],
    ];

    const rows = users.filter((row) => row.enabled);
    const data = rows.map((row) => [
      `${row.name} ${row.surname}`,
      row.phone === '' ? '-' : row.phone,
      row.email === '' ? '-' : row.email,
      translate(indexRoleName(row.role_id)),
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
    return doc.save(`${translate('users')}${date}.pdf`); // Export as PDF
  }

  return PDF;
};
