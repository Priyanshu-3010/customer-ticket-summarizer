import "dotenv/config";

import { createApp } from "./src/app.js";
import { createChatService } from "./src/chatService.js";

const service = createChatService();

const app = createApp(service);

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
