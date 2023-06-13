const rockBTN = document.getElementById("rock");
const paperBTN = document.getElementById("paper");
const scissorsBTN = document.getElementById("scissors");
const resultado = document.getElementById("resultado");
const compChoice = document.getElementById("computer-choice")


const options = ["rock", "paper", "scissors"];
let computer_choice = "";
let player_choice = "";


rockBTN.addEventListener("click", () => {
    computer_choice = options[Math.floor(Math.random() * options.length)];
    compChoice.innerHTML = `${computer_choice}`;
    player_choice = "rock";
    if (computer_choice === "rock") {
        resultado.innerHTML = "You Tied";
    } else if (computer_choice === "paper") {
        resultado.innerHTML = "You Lost";
    }else if (computer_choice === "scissors") {
        resultado.innerHTML = "You Win!";
    }
})

paperBTN.addEventListener("click", () => {
    computer_choice = options[Math.floor(Math.random() * options.length)];
    compChoice.innerHTML = `${computer_choice}`;
    player_choice = "paper";
    if (computer_choice === "rock") {
        resultado.innerHTML = "You Win!";
    } else if (computer_choice === "paper") {
        resultado.innerHTML = "You Tied";
    }else if (computer_choice === "scissors") {
        resultado.innerHTML = "You Lost";
    }
})

scissorsBTN.addEventListener("click", () => {
    computer_choice = options[Math.floor(Math.random() * options.length)];
    compChoice.innerHTML = `${computer_choice}`;
    player_choice = "scissors";
    if (computer_choice === "rock") {
        resultado.innerHTML = "You Lost";
    } else if (computer_choice === "paper") {
        resultado.innerHTML = "You Win!";
    }else if (computer_choice === "scissors") {
        resultado.innerHTML = "You Tied";
    }
})


