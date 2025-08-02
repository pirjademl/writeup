import { pool } from '@/persistence/mysql';
import { User } from '../api/login/route';

export async function getUserByEmail(username: string) {
    try {
        const [result] = await pool.execute<User[]>(
            'SELECT firstName,lastName,email from users where email=?',
            [username],
        );
        if (result.length === 0) {
            return null;
        }
        const user = result[0];
        return user;
    } catch (err) {
        console.log(err);
    }
}
