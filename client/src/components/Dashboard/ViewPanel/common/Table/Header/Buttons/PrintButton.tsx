// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';

interface PrintButtonProps {
  printOrExport: (isPrint: boolean) => any;
}

export default function PrintButton({ printOrExport }: PrintButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const title = translate('print');

  const handleClick = () => {
    const isPrint: boolean = true;
    printOrExport(isPrint);
  };

  return (
    <Tooltip title={title}>
      <IconButton
        aria-label="print"
        size={isMobile ? 'small' : 'medium'}
        onClick={handleClick}
      >
        <PrintIcon />
      </IconButton>
    </Tooltip>
  );
}
