const rulesBtn = document.querySelector('.btn');
const closeBtn = document.querySelector('.close');
const againBtn = document.querySelector('.again');
const cricles = document.querySelectorAll('.cricle');
const you = document.querySelector(' .you');
const pc = document.querySelector('.pc');
let score = document.querySelector('.score .num');
score.innerHTML = 0;
let playerName = document.querySelector('.name > span');
let arrOfGame = [];

// insert PlayerName
let Name = prompt('Please Insert Your Name');
playerName.innerHTML = Name.trim();


// get Data From Local Storage
window.onload =  () => {
    if (localStorage['playersData'] != undefined) {
        getDataFromLocalStorage(localStorage['playersData']);
    }
}

// show rules  image
rulesBtn.addEventListener('click', () => {
    document.querySelector('.rules').classList.add('show');
});


// close rules image
closeBtn.addEventListener('click', () => {
    document.querySelector('.rules').classList.remove('show');

});

// select the hand
cricles.forEach((c) => {
    c.addEventListener('click', () => {
        document.querySelector('.img').classList.remove('active');
        document.querySelector('.game').classList.add('active');
        let node = c;
        let clone = node.cloneNode(true);
        you.appendChild(clone);
        change();
        setTimeout(random, 1000);
        setTimeout(result, 1500);
    });
});

//  choose Random hand and put it on Page
function random() {
    let randomValue = Math.floor(Math.random() * cricles.length);
    let node = cricles[randomValue];
    let clone = node.cloneNode(true);
    clone.id = "random"
    pc.appendChild(clone);
};

//  change between hands
function change() {
    let count = 0;
    let sound = new Audio('./sounds/H2REUSJ-orchestral-suspense.mp3');
    sound.play();
    let i = 0;
    let kk = setInterval(() => {
        if (count >= 10) {
            clearInterval(kk);

        } else {
            if (i <= cricles.length - 1) {
                let node = cricles[i];
                let clone = node.cloneNode(true);
                pc.appendChild(clone);
                i++;
            } else {
                i = 0;
            }
        }
        count++;
    }, 100)
}

// result The Game
function result() {
    if (you.children[0].classList[1].toLowerCase() === 'paper' && (pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'rock' || pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'spock')) {
        createElementResult('You Win', 1, './sounds/success-1-6297.mp3',you);

    } else if (you.children[0].classList[1].toLowerCase() === 'rock' && (pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'scissors' || pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'lizard')) {
        createElementResult('You Win', 1, './sounds/success-1-6297.mp3',you);

    } else if (you.children[0].classList[1].toLowerCase() === 'scissors' && (pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'paper' || pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'lizard')) {
        createElementResult('You Win', 1, './sounds/success-1-6297.mp3',you);

    } else if (you.children[0].classList[1].toLowerCase() === 'lizard' && (pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'paper' || pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'spock')) {
        createElementResult('You Win', 1, './sounds/success-1-6297.mp3',you);

    } else if (you.children[0].classList[1].toLowerCase() === 'spock' && (pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'scissors' || pc.children[pc.children.length - 1].classList[1].toLowerCase() === 'rock')) {
        createElementResult('You Win', 1, './sounds/success-1-6297.mp3',you);

    } else if (you.children[0].classList[1].toLowerCase() === pc.children[pc.children.length - 1].classList[1].toLowerCase()) {
        let h2 = document.createElement('h2');
        h2.innerText = 'Draw';
        document.querySelector('.result').prepend(h2);

    } else {
        if (score.innerHTML > 0) {
            // score.innerHTML--;
            createElementResult('You Lose', -1, './sounds/mixkit-player-losing-or-failing-2042.wav',pc);
        } else {
            createElementResult('You Lose', '', './sounds/mixkit-player-losing-or-failing-2042.wav',pc);

        }
    }

    // set Data to Local Storage
    setDatatoLocalStorage(Name, score.innerHTML);
}

// create  h2 Element to show result on the page
function createElementResult(text, One, audioFile, playerWin = document.body) {
    let h2 = document.createElement('h2');
    h2.innerText = text;
    document.querySelector('.result').prepend(h2);
    playerWin.classList.add('win');
    score.innerHTML = parseInt(score.innerHTML) + One;
    let sound = new Audio(audioFile);
    sound.play();
}

// set Data to Local Storage
function setDatatoLocalStorage(N, scoreValue) {
    let data = {
        playerName: N,
        score: scoreValue
    }
    arrOfGame.push(data);
    localStorage.setItem('playersData', JSON.stringify(arrOfGame));
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

againBtn.addEventListener('click', () => {
    if (document.querySelector('.result').children[0].tagName.toLowerCase() === 'h2') {
        document.querySelector('.result').children[0].remove()
    }
    document.querySelector('.game').classList.remove('active');
    document.querySelector('.img').classList.add('active');
    for (let i = 0; i < you.children.length; i++) {
        you.children[0].remove();
    }
    for (let i = 0; i <= pc.children.length; i++) {
        i = 0;
        pc.children[0].remove();
    }
    
    document.querySelectorAll('.icons > div').forEach((div) => {
        div.classList.remove('win');
    })
});

