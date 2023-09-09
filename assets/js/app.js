const boxes = document.querySelectorAll(".box");
const statusTxt = document.getElementById("status");
const btnRestart = document.querySelector("#restart");

let x = "<img src='./assets/img/x.png' width='60px'>";
let o = "<img src='./assets/img/o.png' width='40px'>";


const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;
init();


function init() {
    boxes.forEach(box => box.addEventListener('click', boxClick
        //  (e) => { console.log(e.target.dataset.index); }
    ));

    btnRestart.addEventListener('click', restartGame);
    statusTxt.textContent = ` ${player} your turn`;
    running = true;


}

function boxClick() {
    const index = this.dataset.index;
    if (options[index] != "" || !running) {
        return;
    }
    updateBox(this, index);
    checkWinnwer();
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = currentPlayer;
}
function checkWinnwer() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i]; //[0,1,2]
        const box1 = options[condition[0]];//x
        const box2 = options[condition[1]]; // ""
        const box3 = options[condition[2]]; // ""
        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }
        if (box1 == box2 && box2 == box3) {
            isWon = true;
            boxes[condition[0]].classList.add('win');
            boxes[condition[1]].classList.add('win');
            boxes[condition[2]].classList.add('win');
        }
    }
    if (isWon) {
        statusTxt.textContent = `${player} Won..!`;
        running = false;
    }
    else if (!options.includes("")) {
        statusTxt.textContent = ` Game Draw..! `;
        running = false;
    }
    else {
        changePlayer();
    }
}

function restartGame() {

    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = x;
    player = "X";
    running = true;
    statusTxt.textContent = ` ${player} your turn`;
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    })
}

function changePlayer() {
    player = (player == 'X') ? "O" : "X";
    currentPlayer = (currentPlayer == x) ? o : x;
    statusTxt.textContent = ` ${player} your turn`;
}