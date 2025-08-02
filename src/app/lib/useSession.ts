import { getServerSession } from 'next-auth';
import { AuthOption } from './auth';

export const getuserSession = async () => {
    const session = await getServerSession(AuthOption);
    if (!session) {
        return null;
    }
    return session;
};
