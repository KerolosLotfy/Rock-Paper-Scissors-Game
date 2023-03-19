const rulesBtn = document.querySelector(".btn");
const closeBtn = document.querySelector(".close");
const againBtn = document.querySelector(".again");
const circles = document.querySelectorAll(".circle");
let you = document.querySelector(" .you");
let pc = document.querySelector(".pc");
let score = document.querySelector(".score .num");
score.innerHTML = 0;
let playerName = document.querySelector(".name > span");
let arrOfGame = [];

let hands = [
  {
    name: "paper",
    win: ["spock", "rock"],
  },
  {
    name: "rock",
    win: ["scissors", "lizard"],
  },
  {
    name: "spock",
    win: ["scissors", "rock"],
  },
  {
    name: "lizard",
    win: ["paper", "spock"],
  },
  {
    name: "scissors",
    win: ["paper", "lizard"],
  },
];

// insert PlayerName
// let Name = prompt("Please Insert Your Name");
// playerName.innerHTML = Name.trim();

// get Data From Local Storage
window.onload = () => {
  if (localStorage["playersData"] != undefined) {
    getDataFromLocalStorage(localStorage["playersData"]);
  }
};

// show rules  image
rulesBtn.addEventListener("click", () => {
  document.querySelector(".rules").classList.add("show");
});

// close rules image
closeBtn.addEventListener("click", () => {
  document.querySelector(".rules").classList.remove("show");
});

// select the hand
circles.forEach((c) => {
  c.addEventListener("click", () => {
    document.querySelector(".img").classList.remove("active");
    document.querySelector(".game").classList.add("active");
    let node = c;
    let clone = node.cloneNode(true);
    you.ariaLabel = c.id;
    you.appendChild(clone);
    change();
    setTimeout(random, 1000);
    setTimeout(result, 1500);
  });
});

//  change between hands
function change() {
  let count = 0;
  let sound = new Audio("./sounds/H2REUSJ-orchestral-suspense.mp3");
  sound.play();
  let i = 0;
  let c = setInterval(() => {
    if (count >= 10) {
      clearInterval(c);
    } else {
      if (i <= circles.length - 1) {
        let node = circles[i];
        let clone = node.cloneNode(true);
        pc.appendChild(clone);
        i++;
      } else {
        i = 0;
      }
    }
    count++;
  }, 100);
}

//  choose Random hand and put it on Page
function random() {
  let randomValue = Math.floor(Math.random() * circles.length);
  let node = circles[randomValue];
  let clone = node.cloneNode(true);
  pc.ariaLabel = clone.id;
  pc.appendChild(clone);
}

// result The Game
function result() {
  for (let obj of hands) {
    if (you.ariaLabel === obj.name) {
      // Draw
      if (pc.ariaLabel === you.ariaLabel) {
        let h2 = document.createElement("h2");
        h2.innerText = "Draw";
        document.querySelector(".result").prepend(h2);
        break;
      } else {
        //   Win
        for (let win of obj.win) {
          if (pc.ariaLabel === win) {
            createElementResult(
              "You Win",
              1,
              "./sounds/success-1-6297.mp3",
              you
            );
            break;
          } else {
            //   Lose
            if (obj.win.length == 2) {
              if (score.innerHTML > 0) {
                createElementResult(
                  "You Lose",
                  -1,
                  "./sounds/mixkit-player-losing-or-failing-2042.wav",
                  pc
                );
              } else {
                createElementResult(
                  "You Lose",
                  "",
                  "./sounds/mixkit-player-losing-or-failing-2042.wav",
                  pc
                );
              }
            }
            break;
          }
        }
      }
    }
  }

  // set Data to Local Storage
  setDatatoLocalStorage(Name, score.innerHTML);
}

// create  h2 Element to show result on the page
function createElementResult(text, One, audioFile, playerWin = document.body) {
  let h2 = document.createElement("h2");
  h2.innerText = text;
  document.querySelector(".result").prepend(h2);
  playerWin.classList.add("win");
  score.innerHTML = parseInt(score.innerHTML) + One;
  let sound = new Audio(audioFile);
  sound.play();
}

// set Data to Local Storage
function setDatatoLocalStorage(N, scoreValue) {
  let data = {
    playerName: N,
    score: scoreValue,
  };
  arrOfGame.push(data);
  localStorage.setItem("playersData", JSON.stringify(arrOfGame));
}

// get Data From Local Storage
function getDataFromLocalStorage(playersData) {
  arrOfGame = JSON.parse(playersData);
  for (const data of arrOfGame) {
    if (data.playerName.trim() === Name) {
      score.innerHTML = data.score;
    }
  }
}

againBtn.addEventListener("click", () => {
  document.querySelector(".result").children[0].remove();

  document.querySelector(".game").classList.remove("active");
  document.querySelector(".img").classList.add("active");

  you.innerHTML = "";
  pc.innerHTML = "";

  document.querySelectorAll(".icons > div").forEach((div) => {
    div.classList.remove("win");
  });
});
