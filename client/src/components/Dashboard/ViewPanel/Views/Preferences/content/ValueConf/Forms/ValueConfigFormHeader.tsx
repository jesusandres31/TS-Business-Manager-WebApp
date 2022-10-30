// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// components
import { FormHeader } from '../../../../../common/Forms';

interface ValueConfigHeaderProps {
  handleClose: () => void;
}

export default function ValueConfigHeader({
  handleClose,
}: ValueConfigHeaderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <FormHeader handleClose={handleClose}>
      {`${translate('valueSettings')} ⚙️`}
    </FormHeader>
  );
}
