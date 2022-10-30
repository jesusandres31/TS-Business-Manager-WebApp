import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

export const StyledGrid = withStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
)(Grid);

export default StyledGrid;
