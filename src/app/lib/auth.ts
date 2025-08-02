import { AuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '@/secrets/secrets';
import bcrypt from 'bcrypt';
import { pool } from '@/persistence/mysql';
import { v4 as uuid } from 'uuid';
import { User } from '../api/login/route';
import { IUser } from '@/@types/blog';
import { RowDataPacket } from 'mysql2';
import { JWT } from 'next-auth/jwt';
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
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log('not email and not password');
                    return null;
                }
                const { email, password } = credentials;
                const [rows] = await pool.execute<IUser[] & RowDataPacket[]>(
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
                if (!user.name) {
                    return false;
                }
                const name = user.name?.split(' ');

                //const id = user.id;
                const [existingUsers] = await pool.execute<User[]>(
                    'select userId, firstName,lastName,email from users where email=?',
                    [email],
                );
                if (existingUsers.length === 0) {
                    const userId = uuid();
                    await pool.execute(
                        'INSERT INTO users values(?,?,?,?,?,?,?) ',
                        [
                            userId,
                            name[0],
                            name[1],
                            email,
                            null,
                            null,
                            account?.provider,
                        ],
                    );
                    user.id = userId;
                    return true;
                } else {
                    console.log(existingUsers);

                    user.id = existingUsers[0].userId;
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
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                if (session.user) {
                    session.user.id = token.id as string;
                }
            }
            return session;
        },
        redirect() {
            return '/feed';
        },
    },
    secret: config.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
};
