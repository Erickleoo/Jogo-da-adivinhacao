let inputName = document.querySelector(".input-name");
let buttonStart = document.querySelector(".button-start");
let htmlNamePerson = document.querySelector(".name-person");
let buttonPlay = document.querySelector(".game-start");
let inputNumber = document.querySelector(".number");
let htmlResultGame = document.querySelector(".resultado-numeros");
let htmlAttemptsResult = document.querySelector(".resultado-tentativas");
let buttonPlayAgain = document.querySelector(".play-again");
let qntAttempts = 3;

// Função pra mostrar o nome do usuário !
const displayName = () => {
  htmlNamePerson.innerHTML = `<b>${inputName.value}</b>`;
  inputName.disabled = true;
  selectValues();
};

// função que seleciona os valores escolhido pelo o usuário!
let result;
function selectValues() {
  let select = document.querySelector(".intervalo");
  let value = select.options[select.selectedIndex].value;

  switch (value) {
    case "option1":
      result = calcular(1, 10)
      break;
    case "option2":
      result = calcular(1, 100)
      break;
    case "option3":
      result = calcular(1, 200)
      break;

    default:
      break;
  }
  select.disabled = true;
};

// Função para calcular a opção escolhida pelo usuário
function calcular(min, max) {
  let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return secretNumber
}

// Função que informa se o numero é maior menor ou se o usuário errou!
function gameOver(situation) {
  switch (situation) {
    case "Acertou":
      htmlResultGame.innerHTML = "Parabéns, você conseguiu adivinhar!";
      htmlResultGame.classList.add("acertou");
      break;
    case 'Numero maior':
      htmlResultGame.innerHTML = "<b>O número digitado é maior!</b>";
      break;
    case 'Numero menor':
      htmlResultGame.innerHTML = "<b>O número digitado é menor!</b>";
      break;
    case 'Game Over':
      htmlResultGame.innerHTML = "<b>Game Over!</b>";
      htmlResultGame.classList.add("errou");
      break;

    default:
      break;
  }
};

// Função que faz o jogo funcionar mostrando os resultados!
function play() {
  htmlAttemptsResult.innerHTML = qntAttempts;

  if (inputNumber.value == result) {
    situation = "Acertou";
    gameOver(situation);
    buttonPlayAgain.style.display = "block";
    buttonPlay.style.display = "none";
  }
  else if (inputNumber.value > result) {
    situation = "Numero maior";
    qntAttempts--;
    gameOver(situation);
  }
  else if (inputNumber.value < result) {
    situation = "Numero menor";
    qntAttempts--;
    gameOver(situation);
  }
  inputNumber.value = "";
  htmlAttemptsResult.innerHTML = `Você ainda tem ${qntAttempts} tentativas!`;
  if (qntAttempts == 0) {
    situation = "Game Over";
    htmlAttemptsResult.innerHTML = `Você errou, o número era <b>${result}!</b>`;
    gameOver(situation);
    buttonPlayAgain.style.display = "block";
    buttonPlay.style.display = "none";
  }
};

// Função pra recarregar a página!
function refresh() {
  window.parent.location = window.parent.location.href;
};

// Função pra desabailitar os botões começar caso o usuário não digite nada!
function disabledButton() {
  if (inputName.value.length == 0) {
    buttonStart.disabled = true;
    buttonStart.style.backgroundColor = "#7c7f82";
  }
  else {
    buttonStart.disabled = false;
    buttonStart.style.backgroundColor = "#1180E6";
  }
  if (inputNumber.value.length == 0) {
    buttonPlay.disabled = true;
    buttonPlay.style.backgroundColor = "#7c7f82";
  }
  else {
    buttonPlay.disabled = false;
    buttonPlay.style.backgroundColor = "#f2890d";
  }
};

inputNumber.addEventListener("input", disabledButton);
inputName.addEventListener("input", disabledButton);
buttonStart.addEventListener("click", displayName);
buttonPlay.addEventListener("click", play);
buttonPlayAgain.addEventListener("click", refresh);
