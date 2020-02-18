
const container = document.querySelector('#container'); //adiciona o div com a id "container" a uma variavel
//essa div é a que mostrará todos os resultados

let gameRunning = false; //booleana, define se o botao start foi pressionado(true) ou se o jogo acabou(false)
let playerSelection; //seleção do player
let computerSelection; //seleção do pc
const buttons = document.querySelectorAll("button"); //array, com todos os botões genéricos

//variaveis score
let playerScore;
let computerScore;
const maxScore = 5;

const turnResult = document.createElement('div'); //cria elemento div, para resultados
turnResult.classList.add("turnResult"); //adiciona uma classe ao div
turnResult.textContent = "Press start to begin"; //conteudo inicial do texto

container.appendChild(turnResult); //adiciona o turnResult como child do container

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {

        if (button.id == "start") { //se id do botão for "start", vai liberar pro jogo começar
            if (gameRunning == false) { //se gameRunning for falsa...
                gameRunning = true; //...fica verdadeira (evita problemas em pressionar start durante jogo)
                turnResult.textContent = "Game started, choose between rock paper or scissors";

                //reset de scores
                playerScore = 0;
                computerScore = 0;

            }

        }

        else { // se outro botão tiver sido pressionado, roda a logica do jogo
            if (gameRunning == true) { //só roda quando gameRunning é true (start foi pressionado)

                let result;// variavel, resultado

                computerPlay(); //inicia com jogada do pc
                playerSelection = button.id; //iguala a variavel playerSelection a id do botão pressionado
                result = playRound(result); //roda playround() e guarda resultado em result

                console.log("Player choose: " + playerSelection); //exibe escolha do player

                console.log(result);
                turnResult.textContent = result;
                console.log("PlayerScore: " + playerScore + "Computer Score: " + computerScore);

                //compara os scores para chegar a um resultado final
                if (playerScore <= maxScore - 1 && computerScore <= maxScore - 1) { //faz nada. apenas segue rodando se o score maximo não é alcançado

                }
                else {
                    console.log("Final Score: Computer: " + computerScore + " Player: " + playerScore + "");

                    gameRunning = false; //encerra o jogo e precisa apertar start para reiniciar

                    if (playerScore > computerScore) {
                        console.log("Player won!!");
                        turnResult.textContent = "Player Won!! Press start to restart.";
                    }
                    else {
                        turnResult.textContent = "Computer Won!! Press start to restart."
                        console.log("Computer won!!");
                    }

                }
                //fim comparação scores

            }
            else { return; } //...se gameRunning não for verdadeiro, pressionar botões nao da em nada(apertar start para mudar condição)
        }

    });
});

function computerPlay() {

    let randomNum = Math.floor(Math.random() * 3);
    //NOTAS
    //math.floor retorna menor numero inteiro dentro do intervalo (função random * 3)
    //math.random sorteia entre 0(inclusivo) e 1(exclusivo)
    //multiplica por 3, por que quero entre 0 e 3

    if (randomNum == 0) {
        computerSelection = "rock"

    }
    else if (randomNum == 1) {
        computerSelection = "paper"

    }
    else {
        computerSelection = "scissors"

    }
    console.log("Computer played: " + computerSelection); //exibe a jogada do computador
}

function playRound(result) {

    if (playerSelection == computerSelection) {

        return ("It´s a tie!! Choose again."); //retorna result como texto

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
