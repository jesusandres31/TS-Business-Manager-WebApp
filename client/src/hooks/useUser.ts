// global state
import { useUsersSelector } from '../features/users/usersSlice';

export const useUser = () => {
  const { users } = useUsersSelector((state) => state.users);

  /**
   * index user name and surname
   */
  const indexUserNameAndSurname = (id: number) => {
    let userName = '';
    if (users) {
      const obj = users.find((user) => user.id === id)!;
      userName = `${obj.name} ${obj.surname}`;
    }
    return userName;
  };

  return {
    indexUserNameAndSurname,
  };
};
