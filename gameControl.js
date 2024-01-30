// here we took access of all buttons
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//below all are the wining patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let turnX = true;
let counter = 0;

//All box clicks tracked
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    counter++;
    console.log("box clicked!");

    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "O";
      turnX = true;
    }

    box.disabled = true;

    // to check the winner
    checkWinner();
    // checkDraw();

    if (boxes.length == counter) {
      console.log(counter);
      checkDraw();
    }
  });
});

// game draw condition
let checkDraw = () => {
  msgContainer.classList.remove("hide");
  msgContainer.style.backgroundColor = "red";
  msg.innerText = "Game draw! No one is winner";
};

// once winner checked then all the blank boxes should be disabled
let disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const resetGame = () => {
  turnX = true;
  counter = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// once winner checked then new game will be started
let enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// winner will be displayed on the screen
let showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  msgContainer.style.backgroundColor = "blue";
  // called disableBoxes function to disabled all blank boxes after the winner displayed
  disableBoxes();
};

// to check the winner, we need to check our winning patterns
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner", pos1Val);
        // call to show winner
        showWinner(pos1Val);
        counter = 0;
      }
    }
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
