// global state
import { useProvidersSelector } from '../../../../../../features/providers/providersSlice';
// context
import { useLanguage } from '../../../../../../context/LanguageContext';
// components
import { FormHeader } from '../../../common/Forms';

interface ProvFormHeaderProps {
  handleClose: () => void;
}

export default function ProvFormHeader({ handleClose }: ProvFormHeaderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { provider } = useProvidersSelector((state) => state.providers);

  return (
    <FormHeader handleClose={handleClose}>
      {provider
        ? `${translate('update')} ${translate('_provider')} 🚚✏️`
        : `${translate('create')} ${translate('_provider')} 🚚✔️`}
    </FormHeader>
  );
}
