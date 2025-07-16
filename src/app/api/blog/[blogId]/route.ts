import { getuserSession } from '@/app/lib/useSession';
import { pool } from '@/persistence/mysql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { blogId } = await params;

    const [result] = await pool.query(
        'select  title, content from blogs where blogId=?',
        [blogId],
    );
    console.log('result', result);

    return NextResponse.json(result[0], { status: 200 });
}
