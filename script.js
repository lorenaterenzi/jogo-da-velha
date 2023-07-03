var cells = document.querySelectorAll(".cell");

const playerX = 'X';
const playerO = 'O';

var whosTurn = true;

const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// seleciona a div que contem a winning message
var winDiv = document.querySelector('div.win-message');
var winText = document.querySelector('p.win-message-text');

document.addEventListener('click', (event) => {
    if (event.target.matches('.cell')) {
        Play(event.target.id);

    }
});

function Play(id) {

    if (cells[id].classList.contains(playerO) || cells[id].classList.contains(playerX)) {
        window.alert('Cell already marked')
    } else {
        var cell = document.getElementById(id);
        var turn = whosTurn ? playerX : playerO;
        cell.innerHTML = turn;
        cell.classList.add(turn);
        checkWinner(turn);
    }
}


function checkWinner(turn) {
    const vencedor = combinations.some((comb) => { return comb.every((index) => { return cells[index].classList.contains(turn) }) });

    if (vencedor) {
        endGame(turn);
    } else if (checkDraw()) {
        endGame();
    } else {
        whosTurn = !whosTurn;
    }
}

function checkDraw() {
    let x = 0;
    let o = 0;

    for (index in cells) {
        if (!isNaN(index)) {
            if (cells[index].classList.contains(playerX)) {
                x++
            }
            if (cells[index].classList.contains(playerO)) {
                o++
            }
        }
    }

    return x + o === 9 ? true : false;
}

function endGame(vencedor = null) {
    if (vencedor) {
        winDiv.style.display = 'flex'
        winText.innerHTML = `"${vencedor}" venceu!!!`
    } else {
        winDiv.style.display = 'flex'
        winText.innerHTML = `Empate!!!`
    }
}

function resetGame() {
    location.reload();
}