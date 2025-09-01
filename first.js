let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//  Audio
let gameover = new Audio("music.mp3");

//  Video container
let videoContainer = document.querySelector(".video-box");
let turnO = true;
let moveCount = 0;

// Winning patterns
const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],
    [1,4,7],[2,5,8],[2,4,6],
    [3,4,5],[6,7,8]
];

// Reset game
const resetGame = () => {
    turnO = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.classList.remove("dance");
    msg.innerText = "";
    videoContainer.innerHTML = "";
    gameover.pause();
    gameover.currentTime = 0;

    boxes.forEach(box => {
        box.classList.remove("winner-box", "o-player", "x-player");
    });
};

// Player move
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o-player");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x-player");
            turnO = true;
        }
        box.disabled = true;
        moveCount++;
        checkWinner();
    });
});

// Disable & Enable Boxes
const disableBoxes = () => boxes.forEach(box => box.disabled = true);
const enableBoxes = () => boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
});

// Show Winner
const showWinner = (winner, pattern) => {
    msg.innerText = `🎉 Congratulations, Winner is ${winner}`;
    msg.classList.add("dance");
    msgContainer.classList.remove("hide");

    gameover.currentTime = 0;
    gameover.play().catch(err => console.log("Audio blocked", err));

    pattern.forEach(index => boxes[index].classList.add("winner-box"));

    pattern.forEach(index => {
    boxes[index].classList.add("winner-box");
    boxes[index].classList.remove("o-player", "x-player"); // remove conflicting classes
}); 

    videoContainer.innerHTML = `
        <p style="font-size:1.5rem; font-weight:bold; color:green;"></p>
        <video id="celebration-video" width="220" autoplay muted playsinline>
            <source src="dancingPerson.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;

    let video = document.getElementById("celebration-video");
    if (video) {
        video.muted = false;
        video.play().catch(err => console.log("Video blocked", err));
    }

    disableBoxes();
};

// Show Draw
const showDraw = () => {
    msg.innerText = "🤝 Game Draw!";
    msg.classList.add("dance");
    msgContainer.classList.remove("hide");

    gameover.currentTime = 0;
    gameover.play().catch(err => console.log("Audio blocked", err));

    videoContainer.innerHTML = `
        <p style="font-size:1.5rem; font-weight:bold; color:blue;"></p>
        <video id="celebration-video" width="220" autoplay muted playsinline>
            <source src="dancingPerson.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;

    let video = document.getElementById("celebration-video");
    if (video) {
        video.muted = false;
        video.play().catch(err => console.log("Video blocked", err));
    }
};

// Check Winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a,b,c] = pattern.map(i => boxes[i].innerText);
        if (a && a === b && b === c) {
            showWinner(a, pattern);
            return;
        }
    }
    if (moveCount === 9) showDraw();
};
// Buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);