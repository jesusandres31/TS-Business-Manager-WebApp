// global state
import { useAuthSelector } from '../features/auth/authSlice';
import { useUsersSelector } from '../features/users/usersSlice';
import { useProfileSelector } from '../features/profile/profileSlice';
// context
import { useLanguage } from '../context/LanguageContext';
// hooks
import { useRoles } from './useRoles';

export const useAuthUser = () => {
  const { authUser } = useAuthSelector((state) => state.auth);

  const { users } = useUsersSelector((state) => state.users);

  const { profile } = useProfileSelector((state) => state.profile);

  const { indexRoleName } = useRoles();

  const {
    dispatch: { translate },
  } = useLanguage();

  /**
   * @returns index authUser name
   */
  const indexAuthUserFullName = () => {
    let fullname = '';
    if (users && authUser) {
      if (users.length > 0) {
        const obj = users.find((user) => user.id === authUser.id)!;
        fullname = `${obj.name} ${obj.surname}`;
      }
      if (fullname) return fullname;
    }
    return '';
  };

  /**
   * @returns index authUser role
   */
  const indexAuthUserRole = () => {
    let role = '';
    if (users && authUser) {
      if (users.length > 0) {
        const obj = users.find((user) => user.id === authUser.id)!;
        role = `${translate(indexRoleName(obj.role_id))}`;
      }
      if (role) return role;
    }
    return '';
  };

  /**
   * @returns index company name
   */
  const indexCompanyName = () => {
    let companyName;
    if (profile) {
      if (profile) {
        companyName = profile.company_name;
      }
      if (companyName) return companyName;
    }
    return '';
  };

  return {
    indexAuthUserFullName,
    indexAuthUserRole,
    indexCompanyName,
  };
};
