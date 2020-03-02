
//parent div
//essa div é a principal, onde todas as outras vão ficar dentro
const container = document.querySelector('#container'); //adiciona o div com a id "container" a uma variavel
container.style.display = "block";
container.style.margin = "50px 30px 20px 30px"; //"cima direita baixo esquerda"
container.style.textAlign = "center";
container.style.fontFamily = "Arial";

//Variables
let gameRunning = false; //booleana, define se o botao start foi pressionado(true) ou se o jogo acabou(false)
let playerSelection; //seleção do player
let computerSelection; //seleção do pc
const buttons = document.querySelectorAll("button"); //array, com todos os botões genéricos
const widthSize = "480px";

//Score variables
let playerScore = 0;
let computerScore = 0;
const maxScore = 5;

//"Start button style"
const startButton = document.querySelector("#start");
startButton.style.backgroundColor = '#DCDCDC';
startButton.style.border = "1px solid";
startButton.style.height = "32px";
startButton.style.width = "84px";
startButton.style.fontSize = "20px";

//result texts
const turnResult = document.createElement('div'); //cria elemento div, para resultados
turnResult.classList.add("turnResult"); //adiciona uma classe ao div
turnResult.textContent = "Press start to begin"; //conteudo inicial do texto
turnResult.style.height = "32px";
turnResult.style.backgroundColor = "#8b86c2";
turnResult.style.padding = "24px 20px 0px 20px";
turnResult.style.width = widthSize;
turnResult.style.margin = "auto";

//chooses text
const showChoices = document.createElement("div");
showChoices.classList.add("showChoices");
showChoices.style.padding = "24px 20px";
showChoices.style.backgroundColor = "#8b86c2";
showChoices.style.width = widthSize;
showChoices.style.margin = "auto";
showChoices.style.border = "1px solid";

//score text
const showScore = document.createElement("div");
showScore.classList.add("showScore");
updateTextScore();
showScore.style.cssText = "background-color: pink";
showScore.style.height = "50px";
showScore.style.padding = "26px 20px 0px 20px";
showScore.style.width = widthSize;
showScore.style.margin = "auto";

//player buttons box style ("playBtBox")
const playBtBox = document.querySelector("#playBtBox");
playBtBox.style.backgroundColor = '#d10000';
playBtBox.style.height = "50px";
playBtBox.style.padding = "24px 20px 0px 20px";
playBtBox.style.verticalAlign = "middle";
playBtBox.style.display = "inline-block";
playBtBox.style.width = widthSize;

container.appendChild(turnResult); //adiciona o turnResult como child do container
container.appendChild(showChoices);
container.appendChild(showScore); //idem turnResult


//individual buttons style
const playerButtons = document.querySelectorAll("#rock ,#paper ,#scissors");
for (var i = 0; i < playerButtons.length; i++) {
    playerButtons[i].style.backgroundColor = '#DCDCDC';
    playerButtons[i].style.border = "1px solid";
    playerButtons[i].style.height = "24px";
    playerButtons[i].style.width = "84px";
}

//game mechanics
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {

        if (button.id == "start") { //se id do botão for "start", vai liberar pro jogo começar
            if (gameRunning == false) { //se gameRunning for falsa...
                gameRunning = true; //...fica verdadeira (evita problemas em pressionar start durante jogo)

                //reset the scores
                playerScore = 0;
                computerScore = 0;

                playBtBox.style.backgroundColor = '#DCDCDC'; //muda cor caixa de botões (inicio de jogo)

                turnResult.textContent = "Game started, choose between rock paper or scissors";
                updateTextScore();
            }

        }

        else { // se outro botão tiver sido pressionado, roda a logica do jogo
            if (gameRunning == true) { //só roda quando gameRunning é true (start foi pressionado)

                let result;// variavel, resultado

                computerPlay(); //inicia com jogada do pc
                playerSelection = button.id; //iguala a variavel playerSelection a id do botão pressionado
                result = playRound(result); //roda playRound() e grava resultado em result

                turnResult.textContent = result; //atualiza texto resultado do turno

                comparePoints(); //função compara os pontos
                updateTextScore(); //atualiza texto do score

            }
            else { return; } //...se gameRunning não for verdadeiro, pressionar botões nao da em nada(apertar start para mudar condição)
        }

    });
});

function comparePoints() {

    if (playerScore <= maxScore - 1 && computerScore <= maxScore - 1) { //faz nada. apenas segue rodando se o score maximo não é alcançado

    }
    else {
        gameRunning = false; //encerra o jogo e precisa apertar start para reiniciar
        playBtBox.style.backgroundColor = '#d10000';

        if (playerScore > computerScore) {
            turnResult.textContent = "Player Won!! Press start to restart.";
        }
        else {
            turnResult.textContent = "Computer Won!! Press start to restart.";
        }
    }
}

function updateTextScore() {
    showScore.textContent = "Player Score - " + playerScore + " X " 
    + computerScore + " - Computer Score";

    showChoices.textContent =
        "Player choose: " + playerSelection + " - "
        + "Computer choose: " + computerSelection;
}

function computerPlay() {

    let randomNum = Math.floor(Math.random() * 3);
    //NOTAS
    //math.floor retorna menor numero inteiro dentro do intervalo (função random * 3)
    //math.random sorteia entre 0(inclusivo) e 1(exclusivo)
    //multiplica por 3, por que quero entre 0 e 3

    if (randomNum == 0) {
        computerSelection = "rock";

    }
    else if (randomNum == 1) {
        computerSelection = "paper";

    }
    else {
        computerSelection = "scissors";

    }
    console.log("Computer played: " + computerSelection); //exibe a jogada do computador
}

function playRound(result) { //testa as escolhas

    if (playerSelection == computerSelection) {

        return ("It is a tie!! Choose again."); //retorna result como texto

    }

    else if (playerSelection == "rock" && computerSelection == "scissors" || playerSelection == "paper" && computerSelection == "rock" || playerSelection == "scissors" && computerSelection == "paper") {
        playerScore++;
        return ("Player won the turn. Choose again.");

    }

    else if (playerSelection == "scissors" && computerSelection == "rock" || playerSelection == "rock" && computerSelection == "paper" || playerSelection == "paper" && computerSelection == "scissors") {
        computerScore++;
        return ("Computer won the turn. Choose again.");

    }

}
