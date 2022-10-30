// global state
import { useClientsSelector } from '../../../../../../features/clients/clientsSlice';
// context
import { useLanguage } from '../../../../../../context/LanguageContext';
// components
import { FormHeader } from '../../../common/Forms';

interface CliFormHeaderProps {
  handleClose: () => void;
}

export default function CliFormHeader({ handleClose }: CliFormHeaderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { client } = useClientsSelector((state) => state.clients);

  return (
    <FormHeader handleClose={handleClose}>
      {client
        ? `${translate('update')} ${translate('_client')} 🙍✏️`
        : `${translate('create')} ${translate('_client')} 🙍✔️`}
    </FormHeader>
  );
}
