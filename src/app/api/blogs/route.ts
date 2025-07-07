import { AuthOption } from '@/app/lib/auth';
import { pool } from '@/persistence/mysql';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    const { title, content, status } = await req.json();
    console.log(title, content, status);

    const session = await getServerSession(AuthOption);
    const authorId = session.user.id;
    console.log(authorId);
    try {
        const blogId = uuidv4();
        const [result] = await pool.execute(
            'INSERT INTO blogs(blogId,userId,title,content) values(?,?,?,?)',
            [blogId, authorId, title, content],
        );
        const data = {
            blogId: 'hfjafhaksjdfhaksjdhfkajsdh',
        };
        if (result) {
            return NextResponse.json(data);
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "can't create blog post" });
    }
}
