const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
]

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((pos, ind) => {
        if(gameGrid[pos[0]] !== "" && gameGrid[pos[1]] !== "" && gameGrid[pos[2]] !== ""  && (gameGrid[pos[0]] === gameGrid[pos[1]]) && (gameGrid[pos[2]] === gameGrid[pos[1]])){
            if(gameGrid[0] == "X"){
                answer = "X";
            }else{
                answer = "Y";
            }

            boxes.forEach((box, index) => {
                box.style.pointerEvents = "none";
            });

            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
            boxes[pos[0]].classList.add("win");
        }
    })

    if(answer !== ""){
        gameInfo.innerText = `Winner - ${answer}`;
        newGameBtn.classList.add("active");
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied";
        boxes.forEach((box, index) => {
            box.classList.add("tied");
        });
        newGameBtn.classList.add("active");
    }
}

function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = currentPlayer;
        swapTurn();
        checkGameOver();
    } 
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.classList.remove("win");
        box.classList.remove("tied");
        box.style.pointerEvents = "all";
    });
    
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", initGame);
