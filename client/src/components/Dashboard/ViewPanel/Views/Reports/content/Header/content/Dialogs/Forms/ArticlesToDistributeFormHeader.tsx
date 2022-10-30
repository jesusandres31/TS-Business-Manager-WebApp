// context
import { useLanguage } from '../../../../../../../../../../context/LanguageContext';
// components
import { FormHeader } from '../../../../../../../common/Forms';

interface ArticlesToDistributeFormHeaderProps {
  handleClose: () => void;
}

export default function ArticlesToDistributeFormHeader({
  handleClose,
}: ArticlesToDistributeFormHeaderProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <FormHeader handleClose={handleClose}>
      {`${translate('SelectATimeRange')} 📅🕒`}
    </FormHeader>
  );
}
