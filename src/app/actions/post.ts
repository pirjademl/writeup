'use server';

//import { SignupFormSchema, FormState } from '@/lib/definations';
import { pool } from '@/persistence/mysql';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
export async function CreatePost() {
    const postId = uuidv4();
    redirect(`/create-blog/${postId}`);
}
