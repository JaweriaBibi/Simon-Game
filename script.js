let gameSequence = [];
let userSequence = [];

let gameStatus = false;
let level = 0;
let score = 0; // Initialize score

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!gameStatus) {
        console.log("Game started!");
        gameStatus = true;
        levelUp();
    }
});

function buttonFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

let btns = ["box1", "box2", "box3", "box4"];

function levelUp() {
    level++;
    score += 10; // Add points for each correct move
    h2.innerText = `Level ${level} | Score: ${score}`;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = btns[randomNumber];
    let randomBtn = document.querySelector("." + randomColor);
    gameSequence.push(randomColor);
    console.log(gameSequence);
    buttonFlash(randomBtn);
    userSequence = []; // Reset user sequence for the new level
}

function checkAnswer(currentLevel) {
    if (userSequence[currentLevel] === gameSequence[currentLevel]) {
        console.log("Correct so far...");
        
        h2.innerText = `Level ${level} | Score: ${score}`;

        if (userSequence.length === gameSequence.length) {
            console.log("Level complete!");
            setTimeout(levelUp, 1000);
        }
    } else {
        console.log("Wrong answer!");
        showScore();
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);
    console.log(userSequence);

    checkAnswer(userSequence.length - 1);
}

function resetGame() {
    console.log("Game Over. Restarting...");
    gameSequence = [];
    userSequence = [];
    gameStatus = false;
    level = 0;
    score = 0; // Reset score
}

function showScore() {
    h2.innerText = `Game Over! Final Score: ${score} | Level Reached: ${level}`;
}

let btn = document.querySelectorAll(".btn");

for (let button of btn) {
    button.addEventListener("click", btnPress);
}
