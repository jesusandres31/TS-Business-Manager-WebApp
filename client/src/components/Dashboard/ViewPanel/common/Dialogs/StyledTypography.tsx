import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const StyledTypography = withStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(1),
      padding: theme.spacing(2),
    },
  })
)(Typography);

export default StyledTypography;
