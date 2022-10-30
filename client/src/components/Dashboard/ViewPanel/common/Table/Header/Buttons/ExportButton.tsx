// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';

interface ExportButtonProps {
  printOrExport: (isPrint: boolean) => any;
}

export default function ExportButton({ printOrExport }: ExportButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const title = translate('exportAsPDF');

  const handleClick = () => {
    const isPrint: boolean = false;
    printOrExport(isPrint);
  };

  return (
    <Tooltip title={title}>
      <IconButton
        aria-label="expor-as-pdf"
        size={isMobile ? 'small' : 'medium'}
        onClick={handleClick}
      >
        <GetAppIcon />
      </IconButton>
    </Tooltip>
  );
}
