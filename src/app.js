import express from "express";

export function createApp(service) {
  const app = express();

  app.use(express.json());

  app.use(express.static("public"));

  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    // Tell the browser that we are sending a stream
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    try {
      for await (const chunk of service.chatStream(message)) {
        res.write(chunk);
      }

      res.end();
    } catch (error) {
      console.error(error);
      res.end();
    }
  });

  return app;
}