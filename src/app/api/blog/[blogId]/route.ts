import { getuserSession } from '@/app/lib/useSession';
import { pool } from '@/persistence/mysql';
import { ParamsSerializerOptions } from 'axios';
import { Params } from 'next/dist/server/request/params';
import { NextRequest, NextResponse } from 'next/server';

type tParams = Promise<{
    blogId: string;
}>;
export async function GET(req: NextRequest, context: { params: tParams }) {
    const { blogId } = await context.params;

    const [rows] = await pool.query(
        'SELECT title, content FROM blogs WHERE blogId = ?',
        [blogId],
    );

    const result = Array.isArray(rows) ? rows[0] : null;

    return NextResponse.json(result, { status: 200 });
}
