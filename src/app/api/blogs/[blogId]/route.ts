import { getServerSession } from 'next-auth';
import { AuthOption } from '@/app/lib/auth';
import { NextResponse, NextRequest } from 'next/server';
import { pool } from '@/persistence/mysql';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { blogId: string } },
) {
    const { title, content } = await req.json();
    const blogId = params.blogId;

    if (!title && !content) {
        return NextResponse.json(
            { message: 'Nothing to update' },
            { status: 400 },
        );
    }

    const session = await getServerSession(AuthOption);
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const authorId = session.user.id;

    try {
        const [result] = await pool.execute(
            `UPDATE blogs SET title = ?, content = ? WHERE blogId = ? AND userId = ?`,
            [title, content, blogId, authorId],
        );

        return NextResponse.json(
            { message: 'Blog updated successfully' },
            { status: 200 },
        );
    } catch (err) {
        console.error('Update error:', err);
        return NextResponse.json(
            { message: 'Failed to update blog' },
            { status: 500 },
        );
    }
}
