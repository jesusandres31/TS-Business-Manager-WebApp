// global state
import { useUserFormSelector } from '../../../../../../../features/users/userFormSlice';
// mui
import { Typography, Box } from '@material-ui/core';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// hooks
import { useRoles } from '../../../../../../../hooks/useRoles';

export default function RoleTag() {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { userForm } = useUserFormSelector((state) => state.userForm);

  const { usableRoles } = useRoles();

  const roles = usableRoles();

  return (
    <Box
      px={5}
      pt={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {roles.map((oneRole) => (
        <Typography variant="subtitle2">
          {oneRole.id === userForm.role_id ? (
            translate(`${oneRole.name}Description`)
          ) : (
            <></>
          )}
        </Typography>
      ))}
    </Box>
  );
}
