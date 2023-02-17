import { SignJWT, jwtVerify } from 'jose';

import { UserModel } from '@/models/user.model';
import bcrypt from 'bcrypt';
import { db } from './db'

const jwt_secret = process.env.JWT_SECRET || 'bvYJwYGfPagV4sMn';
const cookie_name = process.env.COOKIE_NAME || 'project_app_sMn';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
  bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user: UserModel | any) => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(jwt_secret));
};

export const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(jwt_secret);
  );

  return payload.payload as any;
};

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(cookie_name);

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};