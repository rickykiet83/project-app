import { NextApiRequest, NextApiResponse } from 'next'
import { createJWT, hashPassword } from '@/lib/auth'

import { db } from '@/lib/db'
import { serialize } from 'cookie'

const cookie_name = process.env.COOKIE_NAME || 'project_app_sMn';


export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await db.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });

    const jwt = await createJWT(user);
    res.setHeader(
      'Set-Cookie',
      serialize(cookie_name, jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    )
    res.status(201);
    res.end();
  } else {
    res.status(402);
    res.end();
  }
}
