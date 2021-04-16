const socket = io();
let msgArea = document.querySelector(".chat-area");
let textarea = document.querySelector("#textarea");

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMsg(e.target.value);
  }
});

function sendMsg(message) {
  let msg = {
    user: name,
    message,
  };

  appendMsg(msg, "incoming");
  textarea.value = " ";
  autoScroll();

  socket.emit("message", msg);
}

function appendMsg(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "chat-msg");
  let markup = `
    <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;
  msgArea.appendChild(mainDiv);
}

//Receive Message

socket.on("message", (msg) => {
  appendMsg(msg, "outgoing");
  autoScroll();
});

function autoScroll() {
  msgArea.scrollTop = msgArea.scrollHeight;
}
