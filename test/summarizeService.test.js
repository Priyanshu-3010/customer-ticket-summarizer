import assert from "node:assert/strict";
import test from "node:test";

import { createSummarizeService } from "../src/summarizeService.js";

test("summarize sends the expected prompt and model to Gemini", async () => {
  let request;

  const ai = {
    models: {
      generateContent: async (input) => {
        request = input;

        return {
          text: "Line one.\nLine two.",
        };
      },
    },
  };

  const service = createSummarizeService({ ai });

  const result = await service.summarize("Printer is offline.");

  assert.equal(result, "Line one.\nLine two.");

  assert.deepEqual(request, {
    model: "gemini-3.6-flash",
    contents: `Summarize this support ticket in exactly 2 lines:

Printer is offline.`,
  });
});