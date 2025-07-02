import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '@/secrets/secrets';
import bcrypt from 'bcrypt';
import { pool } from '@/persistence/mysql';
import { v4 as uuid } from 'uuid';
import { User } from '../api/login/route';
export const AuthOption: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const { email, password } = credentials;
                const [rows]: any[] = await pool.execute(
                    'SELECT userId,firstName,lastName,email,password FROM users WHERE email=?',
                    [email],
                );
                if (!rows || rows.length === 0) {
                    console.log('no user found');
                    return null;
                }
                const user = rows[0];
                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) {
                    console.log('invalid password');
                    return null;
                }

                return {
                    id: user.userId,
                    name: user.firstName + user.lastName,
                    email: user.email,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                const email = user.email;
                const name = user.name?.split(' ')!;

                const id = user.id;
                const [existingUsers] = await pool.execute<User[]>(
                    'select firstName,lastName,email from users where email=?',
                    [email],
                );
                if (existingUsers.length === 0) {
                    const userId = uuid();
                    await pool.execute(
                        'INSERT INTO users values(?,?,?,?,?,?) ',
                        [
                            userId,
                            name[0],
                            name[1],
                            email,
                            null,
                            account?.provider,
                        ],
                    );
                    return true;
                } else {
                    console.log('user already exists');
                }
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                if (session.user) {
                    (session.user as any).id = token.id as string;
                }
            }
            return session;
        },
        redirect({ url, baseUrl }) {
            return '/feed';
        },
    },
    secret: config.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
};
