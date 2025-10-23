// Your Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  databaseURL: "https://YOUR_APP-default-rtdb.firebaseio.com",
  projectId: "YOUR_APP",
  storageBucket: "YOUR_APP.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

const messagesRef = db.ref("messages");
const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("username");

// Send message
sendBtn.onclick = () => {
  const text = messageInput.value.trim();
  const user = usernameInput.value.trim() || "Anonymous";
  if (text) {
    messagesRef.push({
      username: user,
      text: text,
      timestamp: Date.now()
    });
    messageInput.value = "";
  }
};

messagesRef.on("child_added", (snapshot) => {
  const msg = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  msgDiv.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});