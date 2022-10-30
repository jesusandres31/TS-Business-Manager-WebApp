import { useEffect, useState } from 'react';
// global state
import { useProfileSelector } from '../../../../../../../features/profile/profileSlice';
import { useUsersSelector } from '../../../../../../../features/users/usersSlice';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';
import { useIsRecycleBin } from '../../../../common/hooks/useIsRecycleBin';
import { useIsLastManager } from '../../../../common/hooks/useIsLastManager';
// components
import { TableHeader } from '../../../../common/Table/Header';
import { SearchField } from '../../../../common/Table/Header/Buttons';
// child components
import PrintUserButton from './content/PrintUserButton';
import ExportUserButton from './content/ExportUserButton';
import AddUserButton from './content/AddUserButton';
import EditUserButton from './content/EditUserButton';
import DeleteUserButton from './content/DeleteUserButton';
import RecoverUserButton from './content/RecoverUserButton';
import MenuUserButton from './content/MenuUserButton';

export default function UserTableHeader() {
  const { isRecycleBin } = useIsRecycleBin();

  const { isMobile } = useIsMobile();

  const { isLastManager } = useIsLastManager();

  const { profile } = useProfileSelector((state) => state.profile);

  const { users, user } = useUsersSelector((state) => state.users);

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (user) {
      setTitle(`${user.name} ${user.surname}`);
    }
  }, [user]);

  const [limitOfUsers, setLimitOfUsers] = useState(false);

  useEffect(() => {
    const enabledUsers = users.filter((user) => user.enabled);
    setLimitOfUsers(profile.max_members <= enabledUsers.length);
  }, [users]);

  return (
    <TableHeader title={title} isItemSelected={user ? true : false}>
      <>
        <SearchField />
      </>
      <>
        {isRecycleBin ? (
          <>
            <RecoverUserButton />
          </>
        ) : (
          <>
            <EditUserButton />
            <DeleteUserButton isLastManager={isLastManager} />
            <MenuUserButton />
          </>
        )}
      </>
      <>
        {isRecycleBin ? null : (
          <>
            <ExportUserButton />
            {isMobile ? null : <PrintUserButton />}
            <AddUserButton limitOfUsers={limitOfUsers} />
          </>
        )}
      </>
    </TableHeader>
  );
}
