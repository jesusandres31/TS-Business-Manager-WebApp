import bcrypt from 'bcrypt';

/**
 * Encrypts password.
 */
export default async function encryptPassword(
  password: string
): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
