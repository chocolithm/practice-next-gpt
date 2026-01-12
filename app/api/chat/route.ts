import { streamText, UIMessage, convertToModelMessages } from 'ai';

export async function POST(req: Request) {
    const { messages, data: { model } } = await req.json();

    const result = streamText({
        model: model || "openai/gpt-5.2-chat",
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}