import { AuthOption } from '@/app/lib/auth';
import { pool } from '@/persistence/mysql';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    const { title, content, status } = await req.json();
    console.log(title, content, status);

    const session = (await getServerSession(AuthOption)) as {
        user: {
            id: string;
            name?: string;
            email?: string;
        };
    };
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json(
            { message: "can't create blog post" },
            { status: 401 },
        );
    }

    const authorId = session.user.id;
    try {
        const blogId = uuidv4();
        const [result] = await pool.execute(
            'INSERT INTO blogs(blogId,userId,title,content) values(?,?,?,?)',
            [blogId, authorId, title, content],
        );
        console.log('blog id', blogId);
        return NextResponse.json({ blogId: blogId });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "can't create blog post" });
    }
}

// Update blog post by ID
//export async function PATCH(
//   req: NextRequest,
//  { params }: { params: { blogId: string } },
//) {
//   const { title, content } = await req.json();
//  const blogId = params.blogId;
//
//   // Optional: validate title/content
//  if (!title && !content) {
//     return NextResponse.json(
//        { message: 'Nothing to update' },
//       { status: 400 },
//  );
//    }

//   const session = await getServerSession(AuthOption);
//  if (!session || !session.user) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//. }

//const authorId = session.user.id;

//try {
//   const [result] = await pool.execute(
//      `UPDATE blogs SET title = ?, content = ? WHERE blogId = ? AND userId = ?`,
//     [title, content, blogId, authorId],
//       );

//return NextResponse.json(
//   { message: 'Blog updated successfully' },
//  { status: 200 },
//);
//} catch (err) {
//   console.error('Update error:', err);
//  return NextResponse.json(
//     { message: 'Failed to updatblog' },
//    { status: 500 },
// );
//    }
//}
export async function GET(req: NextRequest) {
    try {
        const [result] = await pool.query(
            `SELECT * FROM blogs WHERE title IS NOT NULL and title <> '' AND content IS NOT NULL AND content <> '' `,
        );

        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            { message: 'Internal Server Error  ' },
            { status: 500 },
        );
    }
}
