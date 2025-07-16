import { pool } from '@/persistence/mysql';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const [result] = await pool.query('select * from users');
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response('bad request', { status: 500 });
    }
}
