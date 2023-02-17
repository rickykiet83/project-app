import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_FILE = /\.(.*)$/;

const jwt_secret = process.env.JWT_SECRET || 'bvYJwYGfPagV4sMn';
const cookie_name = process.env.COOKIE_NAME || 'project_app_sMn';

const verifyJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(jwt_secret)
  ) ;

  return payload;
}

export default async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/register') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(cookie_name);

  if (!jwt) {
    req.nextUrl.pathname = '/signin';
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = '/signin';
    return NextResponse.redirect(req.nextUrl);
  }
}
