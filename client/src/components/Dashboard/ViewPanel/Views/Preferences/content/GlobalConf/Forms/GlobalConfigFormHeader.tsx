// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// components
import { FormHeader } from '../../../../../common/Forms';

interface GlobalConfigFormHeaderProps {
  handleClose: () => void;
}

export default function GlobalConfigFormHeader({
  handleClose,
}: GlobalConfigFormHeaderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <FormHeader handleClose={handleClose}>
      {`${translate('globalSettings')} 🛠️`}
    </FormHeader>
  );
}
