'use server';

import bcrypt from 'bcryptjs';
import {SignUpSchema} from "@/schemas/auth";
import {getUserByEmail} from "@/data/user";
import db from "@/db";
import {user} from "@/db/schema";
import {redirect} from "next/navigation";

export type SignupState = {
    errorMessage?: string;
};

export const signup = async (prevState: SignupState, formData: FormData) => {
    const validateFields = SignUpSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    });

    if (!validateFields.success) {
        return {
            errorMessage: 'wrong inputs'
        }
    }

    const { name, email, password } = validateFields.data;

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return {
                errorMessage: 'user already exists'
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(user).values({ name, email, password: hashedPassword});
    } catch(error) {
        console.log('error', error);
        throw new Error('signup error');
    }

    redirect("/login");
}