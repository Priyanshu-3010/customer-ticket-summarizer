import express from "express";

export function createApp(service) {
  const app = express();

  app.use(express.json());

  // Serve frontend
  app.use(express.static("public"));

  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const reply = await service.chat(message);

    res.json({
      reply,
    });
  });

  return app;
}