const rockBTN = document.getElementById("rock");
const paperBTN = document.getElementById("paper");
const scissorsBTN = document.getElementById("scissors");
const resultado = document.getElementById("resultado");


const options = ["rock", "paper", "scissors"]
let computer_choice = options[Math.floor(Math.random() * options.length)];
let player_choice = "";


rockBTN.addEventListener("click", () => {
    player_choice = "rock";
    if (computer_choice === "rock") {
        resultado.innerHTML = "Draw";
    } else if (computer_choice === "paper") {
        resultado.innerHTML = "Loose";
    }else if (computer_choice === "scissors") {
        resultado.innerHTML = "You Win!";
    }
})

paperBTN.addEventListener("click", () => {
    player_choice = "paper";
    if (computer_choice === "rock") {
        resultado.innerHTML = "Win";
    } else if (computer_choice === "paper") {
        resultado.innerHTML = "Draw";
    }else if (computer_choice === "scissors") {
        resultado.innerHTML = "you Lost.";
    }
})

scissorsBTN.addEventListener("click", () => {
    player_choice = "scissors";
    if (computer_choice === "rock") {
        resultado.innerHTML = "Loose";
    } else if (computer_choice === "paper") {
        resultado.innerHTML = "Win";
    }else if (computer_choice === "scissors") {
        resultado.innerHTML = "You Tied.";
    }
})


