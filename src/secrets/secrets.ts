import { env } from 'process';

interface EnvConfig {
    MYSQL_PROTOCOL: string;
    DATABASE_NAME: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
    JWT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
}
export function GetConfig(): EnvConfig {
    try {
        const {
            MYSQL_PROTOCOL,
            DATABASE_NAME,
            MYSQL_USERNAME,
            MYSQL_PASSWORD,
            JWT_SECRET,
            GOOGLE_CLIENT_SECRET,
            GOOGLE_CLIENT_ID,
        } = env;
        if (
            !MYSQL_PROTOCOL ||
            !DATABASE_NAME ||
            !MYSQL_USERNAME ||
            !MYSQL_PASSWORD ||
            !JWT_SECRET ||
            !GOOGLE_CLIENT_ID ||
            !GOOGLE_CLIENT_SECRET
        ) {
            throw new Error(
                'MYSQL_PROTOCOL DATABASE_NAME,MYSQL_USERNAME,MYSQL_PASSWORD,JWT_SECRET is missing',
            );
        }

        return {
            MYSQL_PROTOCOL,
            DATABASE_NAME,
            MYSQL_USERNAME,
            MYSQL_PASSWORD,
            JWT_SECRET,
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
        };
    } catch (err) {
        console.error('error loading environment variables');
        process.exit(0);
    }
}

export const config: EnvConfig = GetConfig();
