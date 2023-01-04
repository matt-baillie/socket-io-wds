import { io } from "socket.io-client";

const joinRoomButton = document.querySelector("#room-button");

const messageInput = document.querySelector("#message-input");
const roomInput = document.querySelector("#room-input");
const form = document.querySelector("#form");

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  displayMessage(`You connected with id: ${socket.id}`);
  socket.emit("custom-event", 10, "Hi");
});
socket.on("receive-message", (message) => {
  displayMessage(message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;
  displayMessage(message);
  socket.emit("send-message", message, room);
  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  socket.emit("join-room", room, (message) => {
    displayMessage(message);
  });
});

const displayMessage = (message) => {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector("#message-container").append(div);
};
