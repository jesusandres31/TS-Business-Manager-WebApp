import clsx from 'clsx';
import {
  createStyles,
  lighten,
  darken,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(0),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.8),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: darken(theme.palette.secondary.dark, 0.2),
          },
    title: {
      flex: '1 1 100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);

interface TableHeaderProps {
  title?: string;
  isItemSelected: boolean;
  children: JSX.Element[];
}

export default function TableHeader({
  title,
  isItemSelected,
  children,
}: TableHeaderProps) {
  const classes = useToolbarStyles();

  return (
    <TableContainer>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: isItemSelected,
        })}
      >
        {isItemSelected ? (
          <>
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {title}
            </Typography>
          </>
        ) : (
          children[0]
        )}

        {isItemSelected ? <>{children[1]}</> : <>{children[2]}</>}
      </Toolbar>
    </TableContainer>
  );
}
