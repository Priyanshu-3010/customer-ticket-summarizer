const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = messageInput.value.trim();

  if (!message) return;

  // Show user message
  addMessage(message, "user");

  messageInput.value = "";

  // Create empty bot message
  const botMessage = addMessage("", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      botMessage.textContent += chunk;

      chatBox.scrollTop = chatBox.scrollHeight;
    }

  } catch (error) {
    botMessage.textContent = "Sorry, something went wrong.";
    console.error(error);
  }
});

function addMessage(message, sender) {
  const div = document.createElement("div");

  div.classList.add("message", sender);
  div.textContent = message;

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;

  return div;
}

// const chatForm = document.getElementById("chat-form");
// const messageInput = document.getElementById("message-input");
// const chatBox = document.getElementById("chat-box");

// chatForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const message = messageInput.value.trim();

//   if (!message) return;

//   // Show user's message
//   addMessage(message, "user");

//   messageInput.value = "";

//   try {
//     const response = await fetch("/api/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         message: message,
//       }),
//     });

//     const data = await response.json();

//     // Show Potato's reply
//     addMessage(data.reply, "bot");
//   } catch (error) {
//     addMessage("Sorry, something went wrong.", "bot");
//     console.error(error);
//   }
// });

// function addMessage(message, sender) {
//   const div = document.createElement("div");

//   div.classList.add("message", sender);
//   div.textContent = message;

//   chatBox.appendChild(div);

//   chatBox.scrollTop = chatBox.scrollHeight;
// }