'use server';

import { SignupFormSchema, FormState } from '@/lib/definations';
import { pool } from '@/persistence/mysql';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
export async function SignUp(state: FormState, formData: FormData) {
    console.log('request coming for signup');
    const validatedFields = SignupFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const user = validatedFields.data;

    const existinguser = await pool.query(
        'SELECT * FROM users WHERE email =?',
        [user.email],
    );
    const userId = uuidv4();
    let success = false;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
        const [result] = await pool.execute(
            'INSERT INTO users values(?,?,?,?,?,?)',
            [
                userId,
                user.firstName,
                user.lastName,
                user.email,
                hashedPassword,
                'custom',
            ],
        );
        if (result) {
            success = true;
        }
    } catch (err) {
        console.log(err);
        return {
            errors: { general: ['Something went wrong, please try again !'] },
        };
    }
    if (success) {
        return {
            success: true,
        };
    }
}
