import React from 'react';
import { Box, Grid, Divider, Container, Typography } from '@material-ui/core';
// global context
import { useProfileSelector } from '../../../../../../features/profile/profileSlice';
// hooks
import { useAuthUser } from '../../../../../../hooks/useAuthUser';
import { useIsMobile } from '../../../../../../hooks/useIsMobile';

interface MainContentProps {
  classes: any;
}

export default function MainContent({ classes }: MainContentProps) {
  const { profile } = useProfileSelector((state) => state.profile);

  const { isMobile } = useIsMobile();

  const { indexAuthUserFullName, indexAuthUserRole, indexCompanyName } =
    useAuthUser();

  const date = new Date().toLocaleDateString('en-GB');

  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Box pb={0} display="inline">
          {/* <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            className={classes.typography}
          >
            ✨
          </Typography> */}
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            //className={classes.typography}
          >
            {indexCompanyName()}
          </Typography>
        </Box>
      </Grid>
      <Divider variant="middle" />

      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box pb={0} pt={7} display="flex" justifyContent="flex-start">
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              className={classes.typography}
            >
              👨‍💼
            </Typography>
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              className={classes.typography}
            >
              {indexAuthUserFullName()}
            </Typography>
          </Box>
          <Divider variant="inset" />
        </Grid>

        <Grid item xs={12} sm={6}>
          {profile.website ? (
            <>
              <Box pb={0} pt={7} display="flex" justifyContent="flex-start">
                <Typography
                  variant={isMobile ? 'subtitle1' : 'h6'}
                  className={classes.typography}
                >
                  {/* 🌐 */} 🌎
                </Typography>
                <Typography
                  variant={isMobile ? 'subtitle1' : 'h6'}
                  className={classes.typography}
                >
                  {profile.website}
                </Typography>
              </Box>
              <Divider variant="inset" />
            </>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box pb={0} pt={7} display="flex" justifyContent="flex-start">
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              className={classes.typography}
            >
              💻
            </Typography>
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              className={classes.typography}
            >
              {indexAuthUserRole()}
            </Typography>
          </Box>
          <Divider variant="inset" />
        </Grid>

        <Grid item xs={12} sm={6}>
          {profile.email ? (
            <>
              <Box pb={0} pt={7} display="flex" justifyContent="flex-start">
                <Typography
                  variant={isMobile ? 'subtitle1' : 'h6'}
                  className={classes.typography}
                >
                  {/* 📧  */}📩
                </Typography>
                <Typography
                  variant={isMobile ? 'subtitle1' : 'h6'}
                  className={classes.typography}
                >
                  {profile.email}
                </Typography>
              </Box>
              <Divider variant="inset" />
            </>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box pb={0} pt={7} display="flex" justifyContent="flex-start">
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              className={classes.typography}
            >
              📅
            </Typography>
            <Typography
              variant={isMobile ? 'subtitle1' : 'h6'}
              className={classes.typography}
            >
              {date}
            </Typography>
          </Box>
          <Divider variant="inset" />
        </Grid>

        <Grid item xs={12} sm={6}>
          {profile.phone ? (
            <>
              <Box pb={0} pt={7} display="flex" justifyContent="flex-start">
                <Typography
                  variant={isMobile ? 'subtitle1' : 'h6'}
                  className={classes.typography}
                >
                  {/* ☎️ */} 📞
                </Typography>
                <Typography
                  variant={isMobile ? 'subtitle1' : 'h6'}
                  className={classes.typography}
                >
                  {profile.phone}
                </Typography>
              </Box>
              <Divider variant="inset" />
            </>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
}
