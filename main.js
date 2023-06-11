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


while (player.points < 3 && computer.points < 3) {
    console.log("Score")
    console.log(`Player: ${player.points}`)
    console.log(`Computer: ${computer.points}`)

    player.round_choice = "rock";
    computer.round_choice = "paper";

    let p_choice = player.round_choice;
    let c_choice = computer.round_choice;


    if (p_choice === "rock") {
        if (c_choice === "rock") {
            console.log("It's a draw");
        } else if (c_choice === "paper") {
            console.log("You lost...  :(");
            computer.points += 1;
        } else if (c_choice === "scissors") {
            console.log("You WIN!!!  :D");
            player.points += 1;

        }

    } else if (p_choice === "paper") {
        if (c_choice === "rock") {
            console.log("You WIN!!!  :D");
            player.points += 1;
        } else if (c_choice === "paper") {
            console.log("It's a draw");
        } else if (c_choice === "scissors") {
            console.log("You lost...  :(");
            computer.points += 1;
        }

    } else if (p_choice === "scissors") {
        if (c_choice === "rock") {
            console.log("You lost...  :(");
            computer.points += 1;
        } else if (c_choice === "paper") {
            console.log("You WIN!!!  :D");
            player.points += 1;
        } else if (c_choice === "scissors") {
            console.log("It's a draw");
        }
    } else {
        console.log("Error")
    }

    if (computer.points === 3) {
        console.log("Final Score")
        console.log(`Player: ${player.points}`)
        console.log(`Computer: ${computer.points}`)
        console.log("")
        console.log("You lost the game")
    } else if (player.points === 3) {
        console.log("Final Score")
        console.log(`Player: ${player.points}`)
        console.log(`Computer: ${computer.points}`)
        console.log("")
        console.log("You WON!!!")
    }
}



