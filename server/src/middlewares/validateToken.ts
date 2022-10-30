import passport from 'passport';

/**
 * Passport authentication:
 * Check if sent token is valid.
 */
export const validateToken = passport.authenticate('jwt', {
  session: false,
});
