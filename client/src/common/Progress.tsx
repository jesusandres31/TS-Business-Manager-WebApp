import { makeStyles, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

const Progress = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="secondary" />
    </div>
  );
};

export default Progress;
