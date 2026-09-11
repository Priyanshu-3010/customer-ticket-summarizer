import "dotenv/config";

import { createApp } from "./src/app.js";
import { createSummarizeService } from "./src/summarizeService.js";

const service = createSummarizeService();

const app = createApp(service);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


// import { createApp } from "./src/app.js";
// import { createSummarizeService } from "./src/summarizeService.js";

// const service = createSummarizeService();

// const app = createApp(service);

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

