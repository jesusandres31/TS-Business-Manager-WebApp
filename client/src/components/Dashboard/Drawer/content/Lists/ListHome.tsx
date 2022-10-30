import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
// hooks
import { useAuthUser } from '../../../../../hooks/useAuthUser';
// context
import { View, useView } from '../../../context/ViewContext';
// children
import StyledListItem from '../StyledListItem';

interface ListHomeProps {
  handleClick(view: View): void;
  classes: any;
}

export default function ListHome({ handleClick, classes }: ListHomeProps) {
  const { view } = useView();

  const isView = (selectedView: any) => view === selectedView;

  const { indexAuthUserFullName, indexAuthUserRole } = useAuthUser();

  return (
    <div className={classes.toolbar}>
      <StyledListItem
        isSelected={isView(View.Home)}
        onClick={() => handleClick(View.Home)}
      >
        <ListItemAvatar className={classes.listItem}>
          {/* <AppsRoundedIcon className={classes.icon} /> */}
          <Avatar className={classes.avatar}>
            <HomeRoundedIcon fontSize="small" />
          </Avatar>
        </ListItemAvatar>
        <ListItemIcon>
          <ListItemText
            className={classes.listItem}
            disableTypography
            primary={
              <>
                {/* <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                  {indexCompanyName()}
                </Typography>

                <Typography
                  variant="caption"
                  gutterBottom
                  style={{ fontWeight: 600 }}
                >
                  {indexAuthUserFullName()}
                </Typography> */}
                <Typography
                  variant="caption"
                  gutterBottom
                  style={{ fontWeight: 600 }}
                >
                  {indexAuthUserFullName()}
                </Typography>

                <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
                  {indexAuthUserRole()}
                </Typography>
              </>
            }
          />
        </ListItemIcon>
      </StyledListItem>
    </div>
  );
}
