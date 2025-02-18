let gameSeq = [];
let userSeq = [];
let h2 = document.querySelector("h2");
let btns = ["green", "blue", "pink", "purple"];
let started = false;
let level = 0;
let score = [];
let max;
document.addEventListener("keypress", function () {
  if (started === false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  // random btn choose
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log("gamesequence:", gameSeq);

  // console.log(randIdx, randColor, randbtn);

  btnFlash(randbtn);
}

function checkAns(idx) {
  // console.log("cur level:", level);
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `game over! your score <b>${level}</b></br>press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 300);
    scoreTracker();
    reset();
  }
}

function btnpress() {
  let btn = this;
  btnFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  // console.log("usersequence:", userSeq);
  checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (const btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

function scoreTracker() {
  score.push(level);
  max = 0;
  for (let i = 0; i < score.length; i++) {
    if (score[i] > max) {
      max = score[i];
    }
  }
  let p = document.querySelector("p");
  p.innerHTML = `<b>highest score: ${max}</b>`;
  p.style.color = "red";
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}
