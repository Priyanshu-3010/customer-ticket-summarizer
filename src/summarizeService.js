import { GoogleGenAI } from "@google/genai";

export function createSummarizeService({
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  }),
} = {}) {
  return {
    async summarize(ticket) {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Summarize this support ticket in exactly 2 lines:

${ticket}`,
      });

      return response.text;
    },
  };
}

// export function createSummarizeService() {
//   return {
//     async summarize(ticket) {
//       return `Summary of: ${ticket}`;
//     },
//   };
// }