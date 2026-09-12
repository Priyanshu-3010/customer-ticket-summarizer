const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = messageInput.value.trim();

  if (!message) return;

  // Show user's message
  addMessage(message, "user");

  messageInput.value = "";

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

    const data = await response.json();

    // Show Potato's reply
    addMessage(data.reply, "bot");
  } catch (error) {
    addMessage("Sorry, something went wrong.", "bot");
    console.error(error);
  }
});

function addMessage(message, sender) {
  const div = document.createElement("div");

  div.classList.add("message", sender);
  div.textContent = message;

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;
}