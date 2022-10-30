// global state
import { useUsersSelector } from '../../../../../../features/users/usersSlice';
// context
import { useLanguage } from '../../../../../../context/LanguageContext';
// components
import { FormHeader } from '../../../common/Forms';

interface UserFormHeaderProps {
  handleClose: () => void;
}

export default function UserFormHeader({ handleClose }: UserFormHeaderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { user } = useUsersSelector((state) => state.users);

  return (
    <FormHeader handleClose={handleClose}>
      {user
        ? `${translate('update')} ${translate('_user')} 👤✏️`
        : `${translate('create')} ${translate('_user')} 👤✔️`}
    </FormHeader>
  );
}
