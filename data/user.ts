import {User} from "@/types/db";
import db from "@/db";
import {eq} from "drizzle-orm";
import {user} from "@/db/schema";

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const existingUser = await db.query.user.findFirst({
            where: eq(user.email, email)
        });

        if (!existingUser) {
            return null;
        }

        return existingUser;
    } catch(error) {
        console.error('error', error);
        throw new Error('getUserByEmail error');
    }
}