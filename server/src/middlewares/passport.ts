import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config';
import { logger } from '../libs';

/**
 * Customize strategy options.
 */
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

/**
 * Define passport middleware strategy.
 */
export default new Strategy(opts, async (payload, done) => {
  try {
    // check payload
    if (payload) {
      // return 'payload' for future role and profile authentication.
      return done(null, true, payload);
    }
    return done(null, false);
  } catch (e) {
    logger.error(`${e.stack}, ${e.message}`);
    return payload.status(400).json('Authentication error');
  }
});
