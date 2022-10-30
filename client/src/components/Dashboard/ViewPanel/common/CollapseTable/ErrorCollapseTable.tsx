import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// context
import { useLanguage } from '../../../../../context/LanguageContext';
// components
import { CollapseContent } from '../Table/Body/content/TableContent/Collapse';

interface ErrorCollapseTableProps {
  isItemCollapsed: boolean;
}

export default function ErrorCollapseTable({
  isItemCollapsed,
}: ErrorCollapseTableProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <CollapseContent isItemCollapsed={isItemCollapsed}>
      <Typography variant="subtitle2" style={{ paddingLeft: '30px' }}>
        <Box fontWeight="fontWeightBold">{translate('somethingWentWrong')}</Box>
      </Typography>
    </CollapseContent>
  );
}
