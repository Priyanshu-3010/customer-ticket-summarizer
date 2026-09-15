import { GoogleGenAI } from "@google/genai";

export function createChatService({
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  }),
} = {}) {
  const chat = ai.chats.create({
    model: "gemini-3.5-flash-lite",

    config: {
      systemInstruction: `
You are a food delivery chatbot.

You can only answer questions related to:

- Food and restaurants
- Menu items
- Food recommendations
- Orders
- Order status
- Delivery
- Payments related to food orders
- Refunds and cancellations

If the user asks something unrelated to food delivery, politely refuse.

For example, if the user asks "What is Docker?", respond:

"Sorry, I can only help with food delivery related questions."
      `,
    },
  });

  return {
    async *chatStream(message) {
      const stream = await chat.sendMessageStream({
        message,
      });

      for await (const chunk of stream) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    },
  };
}