const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    computerHand: ""
}

//Pobranie 
const hands = document.querySelectorAll('.select img');
const btn = document.querySelector('.start');
const yourChoice = document.querySelector('[data-summary="your-choice"]');
const aiChoice = document.querySelector('[data-summary="computer-choice"]');
const whoWin = document.querySelector('[data-summary="who-win"]');
const numbers = document.querySelector('p.numbers span');
const wins = document.querySelector('p.wins span');
const losses = document.querySelector('p.losses span');
const draws = document.querySelector('p.draws span');




// Funkcja wybierająca dłoń gracza
function handSelect() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => {
        hand.style.boxShadow = "";
    })
    this.style.boxShadow = "0 0 20px 4px royalblue"
    // console.log(game.playerHand);
}

hands.forEach((hand) => {
    hand.addEventListener("click", handSelect)
})

function computerChoice() {
    const computerHand = hands[Math.floor(Math.random() * 3)].dataset.option;
    return computerHand;
}

function checkResult(player, computer) {
    console.log(`Wybór gracza to: ${player}, wybór komputera: ${computer}`)
    if (player === computer) {
        return 'draw';
    } else if ((player === "papier" && computer === "kamień") || (player === "kamień" && computer === "nożyczki") || (player === "nożyczki" && computer === "papier")) {
        return 'win';
    } else {
        return 'lose'
    }
}

function publishResult(player, computer, result) {
    yourChoice.textContent = player;
    aiChoice.textContent = computer;
    gameSummary.numbers++;
    numbers.textContent = gameSummary.numbers;

    if (result === "win") {
        gameSummary.wins++;
        wins.textContent = gameSummary.wins;
        whoWin.textContent = "Wygrałeś";
        whoWin.style.color = "green";
    } else if (result === "lose") {
        gameSummary.losses++;
        losses.textContent = gameSummary.losses;
        whoWin.textContent = "Przegrałeś";
        whoWin.style.color = "red";
    } else {
        gameSummary.draws++;
        draws.textContent = gameSummary.draws;
        whoWin.textContent = "Remis";
        whoWin.style.color = "gray";
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';
    game.playerHand = "";
    game.computerHand = "";
}

//Funkcja sterująca 

function startGame() {
    if (!game.playerHand) {
        return alert('Wybierz dłoń')
    }

    game.computerHand = computerChoice();
    const gameResult = checkResult(game.playerHand, game.computerHand);

    publishResult(game.playerHand, game.computerHand, gameResult);

    endGame();
}


// Nasłuchiwanie na przycisk i wywołanie funkcji sterującej

btn.addEventListener("click", startGame);