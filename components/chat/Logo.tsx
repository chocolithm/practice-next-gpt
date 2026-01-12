'use client';

import Link from "next/link";
import Image from "next/image";
import {BASE_URL} from "@/constants/routes";

export function Logo() {
    return (
        <Link href={BASE_URL} className="flex items-center gap-2">
            <Image width={80} height={40} src="/logo.png" alt="logo" />
            <h1 className="text-2xl font-bold">Chat GPT</h1>
        </Link>
    );
}