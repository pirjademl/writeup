import { AuthOption } from '@/app/lib/auth';
import { pool } from '@/persistence/mysql';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

type tParams = Promise<{
    blogId: string;
}>;
//eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest, context: { params: tParams }) {
    const { blogId } = await context.params;

    if (!blogId) {
        return NextResponse.json(
            { message: ' Resource Not Found' },
            { status: 404 },
        );
    }

    const [rows] = await pool.query(
        'SELECT title, content FROM blogs WHERE blogId = ?',
        [blogId],
    );

    const result = Array.isArray(rows) ? rows[0] : null;

    return NextResponse.json(result, { status: 200 });
}

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function PUT(req: NextRequest, context: { params: tParams }) {
    const { blogId } = await context.params;

    if (!blogId) {
        return NextResponse.json(
            { message: ' Resource Not Found' },
            { status: 404 },
        );
    }

    const session = await getServerSession(AuthOption);
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const authorId = session.user.id;

    try {
        const now = new Date();
        const publishedAtString = now
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');
        await pool.execute(
            `UPDATE blogs SET status = ?, published_At = ? WHERE blogId = ? AND userId = ?`,
            ['published', publishedAtString, blogId, authorId],
        );
        return NextResponse.json(
            { message: 'Blog updated successfully' },
            { status: 200 },
        );
    } catch (err) {
        console.error('Update error:', err);
        return NextResponse.json(
            { message: 'Failed to updatblog' },
            { status: 500 },
        );
    }
}
