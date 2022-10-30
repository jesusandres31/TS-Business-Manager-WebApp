// global state
import { useUsersSelector } from '../../../../../features/users/usersSlice';
// hooks
import { useRoles } from '../../../../../hooks/useRoles';

export const useIsLastManager = () => {
  const { indexRoleName } = useRoles();

  const { users } = useUsersSelector((state) => state.users);

  const mangerUsers = users.filter(
    (row) => indexRoleName(row.role_id) === 'manager'
  );

  function checkIfLastManager() {
    if (mangerUsers.length <= 1) {
      return true;
    }
    return false;
  }

  let isLastManager: boolean = checkIfLastManager();

  return { isLastManager };
};
