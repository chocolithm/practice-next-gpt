'use server';

import {LoginSchema, SignUpSchema} from "@/schemas/auth";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";
import {createSession} from "@/actions/sessions";
import {redirect} from "next/navigation";

export type LoginState = {
    errorMessage?: string;
};

export const login = async (revState: LoginState, formData: FormData) => {
    const validateFields = LoginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });

    if (!validateFields.success) {
        return {
            errorMessage: 'wrong inputs'
        }
    }

    const { email, password } = validateFields.data;

    try {
        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            return {
                errorMessage: 'not existing user.'
            }
        }

        const { id, name, password: userPassword } = existingUser;
        const passwordMatch = await bcrypt.compare(password, userPassword);

        if (!passwordMatch) {
            return {
                errorMessage: 'wrong password'
            }
        }

        await createSession({ id, name });
    } catch(error) {
        console.log('error', error);
        throw new Error('login error');
    }

    redirect("/");
}