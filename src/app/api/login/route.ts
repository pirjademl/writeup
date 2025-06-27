import { pool } from '@/persistence/mysql';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

interface requestBody {
    email: string;
    password: string;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, password } = body;

        const [result] = await pool.execute(
            'SELECT firstName,lastName,email,password FROM  users WHERE email=? ',
            [email],
        );
        if (result.length <= 0) {
            return NextResponse.json(
                { message: 'no user found with that email' },
                { status: 404 },
            );
        }
        console.log('stored password', result[0].password);
        const res = await bcrypt.compare(password, result[0].password);
        if (!res) {
            return NextResponse.json(
                { message: 'invalid email or password' },
                { status: 403 },
            );
        }
        return NextResponse.json(
            { message: 'login successfully ' },
            { status: 200 },
        );
    } catch (err) {
        console.log(err);
        return new Response('bad Request', { status: 400 });
    }
}
