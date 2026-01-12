'use client';

import {ChangeEvent, useActionState, useEffect} from "react";
import {useFormValidate} from "@/hooks/useFormValidate";
import {TLoginFormError} from "@/types/form";
import {LoginSchema} from "@/schemas/auth";
import toast from "react-hot-toast";
import {FormCard} from "@/components/auth/FormCard";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {FormMessage} from "@/components/auth/FormMessage";
import {Submit} from "@/components/auth/Submit";
import {login, LoginState} from "@/actions/login";

export function LoginForm() {
    const initialState: LoginState = {};
    const [error, action, isPending] = useActionState(login, initialState);
    const { errors, validateField } = useFormValidate<TLoginFormError>(LoginSchema);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        validateField(name, value)
    }

    useEffect(() => {
        if(error?.errorMessage) {
            toast.error(error.errorMessage);
        }
    })

    return (
        <FormCard
            title="로그인"
            footer={{ label: "아직 계정이 없으신가요?", href: "/singup"}}
        >
            <form action={action} className="space-y-6">
                {/* 이메일 */}
                <div className="space-y-1">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email"
                           name="email"
                           placeholder="example@example.com"
                           onChange={handleChange}
                           error={!!errors?.email} />
                    {errors?.email && <FormMessage message={errors?.email[0]}></FormMessage>}
                </div>
                {/* 비밀번호 */}
                <div className="space-y-1">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input id="password"
                           name="password"
                           type="password"
                           placeholder="********"
                           onChange={handleChange}
                           error={!!errors?.password} />
                    {errors?.password && <FormMessage message={errors?.password[0]}></FormMessage>}
                </div>
                <Submit className="w-full">로그인</Submit>
            </form>
        </FormCard>
    );
}