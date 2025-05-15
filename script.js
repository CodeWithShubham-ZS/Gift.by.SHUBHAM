// Gift Logic
function openGift() {
  document.getElementById('giftWrapper').style.display = 'none';
  document.getElementById('loginBox').style.display = 'block';
}

// Login
document.getElementById('loginButton').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  
  if (username === 'chhota don' && password === '21february') {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('notesArea').style.display = 'block';
    document.getElementById('bgMusic').play();
  } else {
    document.getElementById('loginError').innerText = "Wrong username or password 💔";
  }
});

// Draggable Notes with Sparkle
const notes = document.querySelectorAll('.note');
notes.forEach(note => {
  note.addEventListener('mousedown', startDrag);
});

function startDrag(e) {
  const note = e.target;
  const offsetX = e.clientX - note.getBoundingClientRect().left;
  const offsetY = e.clientY - note.getBoundingClientRect().top;

  function move(e) {
    note.style.left = `${e.clientX - offsetX}px`;
    note.style.top = `${e.clientY - offsetY}px`;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 300);
  }

  function stop() {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', stop);
  }

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', stop);
}

// Accept / Reject Logic
let rejectCount = 0;
const rejectMessages = [
  "💔 Are you sure? This heart beats only for you...",
  "😭 Please don’t do this to me...",
  "🥺 My world is empty without you...",
  "💘 I wrote these notes with my soul...",
  "💫 You're my only dream...",
  "😜 Okay okay... You can't resist my cuteness forever!"
];

function reject() {
  const message = rejectMessages[rejectCount];
  document.getElementById('finalMessage').innerText = message;
  document.getElementById('finalMessage').style.display = 'block';
  rejectCount++;
  if (rejectCount > 5) {
    document.querySelector("#finalQuestion button:first-child").style.display = 'none';
  }
}

function accept() {
  document.getElementById('finalMessage').innerText =
    "💖 Yaaay! You made my universe brighter! 🌈 I love youuuu! 😘";
  document.getElementById('finalMessage').style.display = 'block';
  document.getElementById('finalQuestion').style.display = 'none';
}
