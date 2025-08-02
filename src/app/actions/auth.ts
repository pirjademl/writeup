'use server';

import { SignupFormSchema, FormState } from '@/lib/definations';
import { pool } from '@/persistence/mysql';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
export async function SignUp(
    state: FormState,
    formData: FormData,
): Promise<FormState> {
    console.log('request coming for signup');
    const validatedFields = SignupFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        userName: formData.get('userName'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const user = validatedFields.data;

    const userId = uuidv4();
    let success = false;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
        const username = user.lastName
            .substring(0, user.lastName.length - 1)
            .concat(user.firstName.substring(0, user.firstName.length / 2));
        const [result] = await pool.execute(
            'INSERT INTO users values(?,?,?,?,?,?,?)',
            [
                userId,
                user.firstName,
                user.lastName,
                user.email,
                username,
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
