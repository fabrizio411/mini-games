const player = {
    points: 0,
    options: ["rock", "paper", "scissors"],
    round_choice: ""
}

const computer = {
    points: 0,
    options: ["rock", "paper", "scissors"],
    round_choice: ""
}


function checkResult(player_choice, computer_choice) {
    if (player_choice === "rock") {
        if (computer_choice === "rock") {
            console.log("It's a draw");
        } else if (computer_choice === "paper") {
            console.log("You lost...  :(");
            computer.points += 1;
        } else if (computer_choice === "scissors") {
            console.log("You WIN!!!  :D");
            player.points += 1;
        }

    } else if (player_choice === "paper") {
        if (computer_choice === "rock") {
            console.log("You WIN!!!  :D");
            player.points += 1;
        } else if (computer_choice === "paper") {
            console.log("It's a draw");
        } else if (computer_choice === "scissors") {
            console.log("You lost...  :(");
            computer.points += 1;
        }

    } else if (player_choice === "scissors") {
        if (computer_choice === "rock") {
            console.log("You lost...  :(");
            computer.points += 1;
        } else if (computer_choice === "paper") {
            console.log("You WIN!!!  :D");
            player.points += 1;
        } else if (computer_choice === "scissors") {
            console.log("It's a draw");
        }
    } else {
        console.log("Error")
    }
}

function displayScore() {
    console.log("")
    console.log("Score")
    console.log(`Player: ${player.points}`)
    console.log(`Computer: ${computer.points}`)
    console.log("")
}

function displayChoices() {
    console.log(`Your choice: ${player.round_choice}`)
    console.log(`Computer choice: ${computer.round_choice}`)
}

function gameEnd() {
    if (computer.points === 3) {
        displayScore()
        console.log("You lost the game")
    } else if (player.points === 3) {
        displayScore()
        console.log("You WON!!!")
    }
}


while (player.points < 3 && computer.points < 3) {
    displayScore()

    player.round_choice = "rock";
    computer.round_choice = "paper";

    let p_choice = player.round_choice;
    let c_choice = computer.round_choice;

    displayChoices()

    checkResult(p_choice, c_choice)

    gameEnd()
}



