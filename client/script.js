const joinRoomButton = document.querySelector("#room-button");

const messageInput = document.querySelector("#message-input");
const roomInput = document.querySelector("#room-input");
const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;
  displayMessage(message);

  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
});

const displayMessage = (message) => {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector("#message-container").append(div);
};
