import NextAuth, { AuthOptions } from 'next-auth';
import { AuthOption } from '@/app/lib/auth';

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };
