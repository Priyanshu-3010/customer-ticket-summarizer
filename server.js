import "dotenv/config";

import { createApp } from "./src/app.js";
import { createChatService } from "./src/chatService.js";

const service = createChatService();

const app = createApp(service);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
