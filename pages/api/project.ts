import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/lib/db';
import { validateJWT } from '@/lib/auth';

const cookie_name = process.env.COOKIE_NAME || 'project_app_sMn';


export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  const user = await validateJWT(req.cookies[cookie_name])

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  })

  res.json({ data: { message: 'ok' } })
}
