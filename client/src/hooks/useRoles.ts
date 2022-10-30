// global state
import { useRolesSelector } from '../features/extras/rolesSlice';
import { useUsersSelector } from '../features/users/usersSlice';
import { useAuthSelector } from '../features/auth/authSlice';

export const useRoles = () => {
  const { roles } = useRolesSelector((state) => state.roles);

  const { users } = useUsersSelector((state) => state.users);

  const { authUser } = useAuthSelector((state) => state.auth);

  /**
   * @returns index roles name
   */
  const indexRoleName = (id: number) => {
    if (roles) {
      const obj = roles.find((role) => role.id === id)!;
      if (obj) return obj.name;
    }
    return '';
  };

  /**
   * check if auth user is role 'name' and returns boolean
   */
  const checkRole = (roles: Array<string>) => {
    // it will take til refresh token to apply
    if (authUser && users) {
      if (roles.indexOf(authUser.role!) >= 0) return true;
    }
    return false;

    /* if (authUser && users) {
      const myUser = users.find((user) => user.id === authUser.id);
      if (myUser) {
        let myUserRoleName = indexRoleName(myUser.role_id)!;
        if (roles.indexOf(myUserRoleName) >= 0) return true;
      }
    }
    return false; */
  };

  /**
   * roles that could be used in User's creation
   */
  const usableRoles = () => {
    if (roles) {
      const usableRoles = roles.filter((role) => role.name !== 'dev');
      if (usableRoles) return usableRoles;
    }
    return [];
  };

  return {
    indexRoleName,
    checkRole,
    usableRoles,
  };
};
