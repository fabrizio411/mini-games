const reload = document.getElementById("reload");
const shield = document.getElementById("shield");
const shoot = document.getElementById("shoot");

const playerChoice = document.getElementById("player-choice");
const playerLife = document.getElementById("player-life");
const playerBullets = document.getElementById("player-bullets");

const computerChoice = document.getElementById("enemy-choice");
const computerLife = document.getElementById("enemy-life");
const computerBullets = document.getElementById("enemy-bullets");

const gameSection = document.getElementById("game-section");


// User:
const player = {
    life: 200,
    bullets: 0,

}
// IA:
const ia = {
    life: 200,
    bullets: 0,

}

let damage = 50;


const options = ["RELOAD", "SHOOT", "SHIELD"];
let ia_choice = "";
let turn = -1;


function choiceDisplay(Choice) {
    if (turn === 0) return ""
    else {
        if (Choice === "SHOOT") {
            return '<img src="./img/crosshair-alt.svg"></img>'
        } else if (Choice === "SHIELD") {
            return '<img src="./img/shield-alt.svg"></img>'
        } else if (Choice === "RELOAD") {
            return '<img src="./img/bullet-alt.svg"></img>'
        }
    }
}


function iaChoiceByLevel(difficulty) {
    if (difficulty == 0 || difficulty == "EASY") {
        if (!canShoot(ia)) return "RELOAD";
        return options[Math.floor(Math.random() * options.length)];
    }
    else if (difficulty == 1 || difficulty == "MEDIUM") {
        return options[Math.floor(Math.random() * options.length)];
    }
    else if (difficulty == 2 || difficulty == "HARD") {
        if (turn == 0) return "RELOAD";
        if (!canShoot(ia)) {
            let opt = options[Math.floor(Math.random() * options.length)];
            while (opt == "SHOOT") { opt = options[Math.floor(Math.random() * options.length)]; }
            return opt;
        }
        return options[Math.floor(Math.random() * options.length)];
    }
}

function updateData(pChoice, iaChoice){
    turn++;

    if (!canShoot(player)) shoot.disabled = true;
    else shoot.disabled = false
    
    computerChoice.innerHTML = choiceDisplay(iaChoice);
    computerLife.innerHTML = ia.life;
    computerBullets.innerHTML = ia.bullets; 

    playerChoice.innerHTML = choiceDisplay(pChoice);
    playerLife.innerHTML = player.life;
    playerBullets.innerHTML = player.bullets;

    if (player.life <= 0 && ia.life <= 0) {
        
    }
    else if (player.life <= 0) {
        gameSection.innerHTML = "";
        gameSection.innerHTML = '<h2 class="game-over lost">You Lost</h2>'
    } 
    else if (ia.life <= 0) {
        gameSection.innerHTML = "";
        gameSection.innerHTML = '<h2 class="game-over win">You Win</h2>'
    }

    ia_choice = iaChoiceByLevel("HARD")
}

function canShoot (whoShoots) {
    if (!whoShoots.bullets > 0) return false;
    else return true;
}



// Base Content
updateData("", "");


// Get User button input
reload.addEventListener("click", () => {
    player.bullets += 1;
    
    if (ia_choice === "RELOAD") { // reload - reload -> user:b+1, IA:b+1
        ia.bullets += 1;
    } else if (ia_choice === "SHOOT") { // reload - shoot  -> user:b+1&v-1, Ia:b-1
        if (canShoot(ia)) {
            ia.bullets -= 1;
            player.life -= damage;
        } 
    } else if (ia_choice === "SHIELD") { // reload - shield -> user:b+1, IA:~
        // nothing
    }

    updateData("RELOAD", ia_choice);
    
})

shoot.addEventListener("click", () => { 
    if (canShoot(player)) {
        player.bullets -= 1;
        if (ia_choice !== "SHIELD") ia.life -= damage;
    }
    
    if (ia_choice === "RELOAD") { // shoot - reload  -> user:v-1, IA:v-1&b+1
        ia.bullets += 1;
    } else if (ia_choice === "SHOOT") { // shoot - shoot   -> user:b-1&v-1, IA:b-1&v-1
        if (canShoot(ia)) {
            ia.bullets -= 1;
            player.life -= damage;
        }
    } else if (ia_choice === "SHIELD") { // shoot - shield  -> user:b-1, IA:~
        // nothing
    }
    
    updateData("SHOOT", ia_choice);

})

shield.addEventListener("click", () => {
    if (ia_choice === "RELOAD") { // shield - reload -> user:~, IA:b+1
        ia.bullets += 1;
    } else if (ia_choice === "SHOOT") { // shield - shoot  -> user:~, IA:v-1
        if (canShoot(ia)) ia.bullets -= 1;
    } else if (ia_choice === "SHIELD") { // shield - shield -> user:~, IA:~
        // nothing
    }
    
    updateData("SHIELD", ia_choice);
})



/*******************************************
v -> vida / b -> bullet

reload - reload -> user:b+1, IA:b+1
reload - shoot  -> user:b+1&v-1, Ia:b-1
reload - shield -> user:b+1, IA:~

shoot - reload  -> user:v-1, IA:v-1&b+1
shoot - shoot   -> user:b-1&v-1, IA:b-1&v-1
shoot - shield  -> user:b-1, IA:~

shield - reload -> user:~, IA:b+1
shield - shoot  -> user:~, IA:v-1
shield - shield -> user:~, IA:~
*******************************************/
