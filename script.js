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

// Draggable Notes with Sparkle (Desktop + Mobile)
const notes = document.querySelectorAll('.note');
notes.forEach(note => {
  note.addEventListener('mousedown', startDragMouse);
  note.addEventListener('touchstart', startDragTouch, { passive: false });
});

function startDragMouse(e) {
  e.preventDefault();
  startDrag(e, e.clientX, e.clientY, false);
}

function startDragTouch(e) {
  e.preventDefault();
  const touch = e.touches[0];
  startDrag(e, touch.clientX, touch.clientY, true);
}

function startDrag(event, startX, startY, isTouch) {
  const note = event.target;
  const offsetX = startX - note.getBoundingClientRect().left;
  const offsetY = startY - note.getBoundingClientRect().top;

  function move(e) {
    let clientX, clientY;
    if (isTouch) {
      const touch = e.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    note.style.left = `${clientX - offsetX}px`;
    note.style.top = `${clientY - offsetY}px`;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${clientX}px`;
    sparkle.style.top = `${clientY}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 300);
  }

  function stop() {
    if (isTouch) {
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', stop);
    } else {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    }
  }

  if (isTouch) {
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', stop);
  } else {
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
  }
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
