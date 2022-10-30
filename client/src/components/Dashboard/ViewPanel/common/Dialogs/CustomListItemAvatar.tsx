import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.primary.main,
      height: '32px',
      width: '32px',
    },
  })
);

interface StyledListItemAvatarProps {
  children: JSX.Element;
}

export default function StyledListItemAvatar({
  children,
}: StyledListItemAvatarProps) {
  const classes = useStyles();
  return (
    <>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>{children}</Avatar>
      </ListItemAvatar>
    </>
  );
}
