import { pool } from '@/persistence/mysql';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';
import { config } from '@/secrets/secrets';

export type User = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
} & RowDataPacket;
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, password } = body;

        const [rows] = await pool.execute<User[]>(
            'SELECT userId,firstName,lastName,email,password FROM  users WHERE email=? ',
            [email],
        );
        if (rows.length <= 0) {
            return NextResponse.json(
                { message: 'no user found with that email' },
                { status: 404 },
            );
        }
        const user = rows[0];
        const res = await bcrypt.compare(password, user.password);
        if (!res) {
            return NextResponse.json(
                { message: 'invalid email or password' },
                { status: 403 },
            );
        }
        //const token=jwt.sign(user,)
        const token = jwt.sign(user, config.JWT_SECRET, { algorithm: 'HS256' });
        console.log(token);

        return NextResponse.json(
            { message: 'login successfully ', token: token },
            { status: 200 },
        );
    } catch (err) {
        console.log(err);
        return new Response('bad Request', { status: 400 });
    }
}
