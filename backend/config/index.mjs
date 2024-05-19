import dotenv from 'dotenv';
dotenv.config()
export const {
    ACCESS_SECRET,
    REFRESH_SECRET,
    PORT,
    DB_URL
}=process.env;