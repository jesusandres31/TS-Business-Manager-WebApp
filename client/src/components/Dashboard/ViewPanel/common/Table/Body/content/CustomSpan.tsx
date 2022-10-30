import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

interface CustomSpanProps {
  children: React.ReactNode;
}

export default function CustomSpan({ children }: CustomSpanProps) {
  const classes = useStyles();

  return <span className={classes.visuallyHidden}>{children}</span>;
}
