let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");
let turnO = true;  // true = O, false = X

const win = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        turnO = !turnO;
        box.disabled = true;
        checkWinner();
    });
});

// Disable all boxes
const disableAllBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Show winner or draw message
const showMessage = (text) => {
    msg.innerText = text;
    msgcontainer.classList.remove("hide");
    disableAllBoxes();
};

// Check winner or draw
const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of win) {
        let [a, b, c] = pattern;
        if (
            boxes[a].innerText !== "" &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[b].innerText === boxes[c].innerText
        ) {
            showMessage(`Congratulations! Winner is ${boxes[a].innerText}`);
            winnerFound = true;
            break;
        }
    }

    if (!winnerFound) {
        let isDraw = Array.from(boxes).every(box => box.innerText !== "");
        if (isDraw) {
            showMessage("It's a Draw!");
        }
    }
};

// Reset / New Game
const resetGame = () => {
    turnO = true;
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    msgcontainer.classList.add("hide");
};

reset.addEventListener("click", resetGame);
newbtn.addEventListener("click", resetGame);
