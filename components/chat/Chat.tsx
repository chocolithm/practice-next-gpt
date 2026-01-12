"use client";

import { useEffect, useRef, useState } from "react";
import { AutoResizingTextarea } from "./AutoResizingTextarea";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { DUMMY_LONG_TEXT } from "@/constants/dummy";
import {useChat} from "@ai-sdk/react";
import {useModelStore} from "@/store/model";
import {useParams} from "next/navigation";

export function Chat() {
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();
    const model = useModelStore((state) => state.model);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-[80%] h-full mx-auto">
            {/* 채팅영역 */}
            <div className="flex-1">
                {messages.length === 0 ? (
                    <Empty />
                ) : (
                    <>
                        {messages.map((message) => (
                            <Message
                                key={message.id}
                                name={"user"}
                                content={message.parts
                                    .filter((part) => part.type === 'text')
                                    .map((part) => part.text)
                                    .join('')}
                                role={message.role}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* input영역 */}
            <div className="pb-5 sticky bottom-0 bg-white">
                <form className="flex items-center justify-center gap-4"
                      onSubmit={e => {
                          e.preventDefault();
                          sendMessage({ text: input });
                          setInput('');
                      }}>
                    <AutoResizingTextarea
                        value={input}
                        onChange={e => setInput(e.currentTarget.value)}
                    />
                    <Button type="submit" size="icon">
                        <ArrowUp />
                    </Button>
                </form>
            </div>
            <div ref={scrollRef} />
        </div>
    );
}