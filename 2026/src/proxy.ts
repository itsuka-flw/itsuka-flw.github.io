import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const validUser = process.env.BASIC_AUTH_USER;
  const validPassword = process.env.BASIC_AUTH_PASSWORD;

  // 環境変数が未設定なら認証スキップ
  if (!validUser || !validPassword) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth?.startsWith('Basic ')) {
    const authValue = basicAuth.slice(6);
    const decoded = atob(authValue);
    const colonIndex = decoded.indexOf(':');

    if (colonIndex !== -1) {
      const user = decoded.slice(0, colonIndex);
      const pwd = decoded.slice(colonIndex + 1);

      if (user === validUser && pwd === validPassword) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse('Auth Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: '/:path*',
};
