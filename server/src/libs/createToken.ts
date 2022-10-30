import jwt from 'jsonwebtoken';
import config from '../config';

/**
 * Creating tokens.
 */
export default async function createToken(
  userId: number,
  profile: string,
  role: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken: string = jwt.sign(
    {
      sub: userId,
      profile: profile,
      role: role,
    },
    config.jwtSecret,
    {
      // expiresIn: 28800,
      expiresIn: 28800 * 21,
    }
  );

  const refreshToken: string = jwt.sign(
    {
      sub: userId,
      profile: profile,
      role: role,
    },
    config.jwtSecret,
    {
      expiresIn: '7d',
    }
  );

  return { accessToken, refreshToken };
}
