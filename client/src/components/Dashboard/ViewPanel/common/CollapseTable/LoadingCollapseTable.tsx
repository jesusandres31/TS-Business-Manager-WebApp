import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
// components
import { CollapseContent } from '../Table/Body/content/TableContent/Collapse';

const useStyles = makeStyles({
  root: {
    height: 26.3,
  },
});

interface LoadingCollapseTableProps {
  isItemCollapsed: boolean;
}

export default function LoadingCollapseTable({
  isItemCollapsed,
}: LoadingCollapseTableProps) {
  const classes = useStyles();

  return (
    <CollapseContent isItemCollapsed={isItemCollapsed}>
      <Skeleton className={classes.root} />
      <Skeleton className={classes.root} />
      <Skeleton className={classes.root} />
    </CollapseContent>
  );
}
