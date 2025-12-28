"use client";

import { FormCard } from "./FormCard";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Submit} from "@/components/auth/Submit";
import {ChangeEvent} from "react";
import {useFormValidate} from "@/hooks/useFormValidate";
import {SignUpSchema} from "@/schemas/auth";
import {TSignUpFormError} from "@/types/form";
import {FormMessage} from "@/components/auth/FormMessage";
import {useFormState} from "react-dom";
import {signup} from "@/actions/signup";

export function SignUpForm() {

    const [error, action] = useFormState(signup, undefined);
    const { errors, validateField } = useFormValidate<TSignUpFormError>(SignUpSchema);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        validateField(name, value)
    }

    return (
        <FormCard
            title="회원가입"
            footer={{ label: "이미 계정이 있으신가요?", href: "/login"}}
        >
            <form action={action} className="space-y-6">
                {/* 이름 */}
                <div className="space-y-1">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name"
                           name="name"
                           placeholder="이름을 입력해주세요."
                           onChange={handleChange}
                           error={!!errors?.name} />
                    {errors?.name && <FormMessage message={errors?.name[0]}></FormMessage>}
                </div>
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
                <Submit className="w-full">가입하기</Submit>
            </form>
        </FormCard>
    );
}