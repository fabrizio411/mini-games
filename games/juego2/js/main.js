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

const healthBarComputer = document.getElementById("life-bar-computer");
const healthBarPlayer = document.getElementById("life-bar-player");






// User:
const player = {
    life: 200,
    bullets: 0,
    damage: 50,
    magSize: 6,
}
// IA:
const ia = {
    life: 200,
    bullets: 0,
    damage: 50,
    magSize: 6,
}

const p_total_life = player.life;
const c_total_life = ia.life;

let difficulty = "HARD"
let turn = -1;

const options = ["RELOAD", "SHOOT", "SHIELD"];
let ia_choice = "";


function updateData(pChoice, iaChoice){
    turn++;

    if (!canShoot(player)) shoot.disabled = true;
    else shoot.disabled = false

    if (!canReload(player)) reload.disabled = true;
    else reload.disabled = false
    
    computerChoice.innerHTML = choiceDisplay(iaChoice);
    computerLife.innerHTML = ia.life;
    computerBullets.innerHTML = ia.bullets + "/" + ia.magSize;
    if (!canReload(ia)) computerBullets.innerHTML += '<span class="isFull"> (FULL)</span>'; 

    playerChoice.innerHTML = choiceDisplay(pChoice);
    playerLife.innerHTML = player.life;
    playerBullets.innerHTML = player.bullets + "/" + player.magSize; 
    if (!canReload(player)) playerBullets.innerHTML += '<span class="isFull"> (FULL)</span>';

    if (player.life <= 0 && ia.life <= 0) {
        //
    }
    else if (player.life <= 0) {
        gameSection.innerHTML = "";
        gameSection.innerHTML = '<h2 class="game-over lost">You Lost</h2>'
    } 
    else if (ia.life <= 0) {
        gameSection.innerHTML = "";
        gameSection.innerHTML = '<h2 class="game-over win">You Win</h2>'
    }


    healthBarManage(ia, c_total_life)
    healthBarManage(player, p_total_life)

    ia_choice = iaChoiceByLevel(difficulty);
}


function iaChoiceByLevel(difficulty) {
    // TESTING 
    // Dificultad para testing
    if (difficulty === 0 || difficulty === "TEST") { 
        return "RELOAD";
    }

    // VERY EASY
    // Si no tiene balas recarga siempre
    // Es mas probable que use RELOAD o SHIELD que SHOOT si el player no puede matar a la IA en 2 tiros
    else if (difficulty === 1 || difficulty === "VERY-EASY") { 
        if (!canShoot(ia)) return "RELOAD";
        let opt = options[Math.floor(Math.random() * options.length)];
        let cont = 0;
        while ((cont < 2 && opt === "SHOOT" && ia.bullets < round((ia.life/player.damage)) >= 2) || ia.bullets == ia.magSize) {
            opt = options[Math.floor(Math.random() * options.length)];
            cont++;
        }
        return opt;
    }

    // EASY
    // Si no tiene balas recarga siempre
    else if (difficulty === 2 || difficulty === "EASY") {
        if (!canShoot(ia)) return "RELOAD";
        return options[Math.floor(Math.random() * options.length)];
    }

    // MEDIUM
    // Varia entre dificultades con mayor probabilidad de ser random
    else if (difficulty === 3 || difficulty === "MEDIUM") {
        return iaChoiceByLevel(Math.floor(Math.random() * 10)) //x10 es por la dificultad RANDOM que va de 6 en adelante... 
    }
    
    // HARD
    // Recarga siempre en el turno 0
    // Nunca intenta disparar si no tiene balas
    // Nunca intenta recargar si tiene todas las balas
    else if (difficulty === 4 || difficulty === "HARD") {
        if (turn == 0) return "RELOAD";
        if (!canShoot(ia)) {
            let opt = options[Math.floor(Math.random() * options.length)];
            while (opt == "SHOOT") { opt = options[Math.floor(Math.random() * options.length)]; }
            return opt;
        }
        if (!canReload(ia)) {
            let opt = options[Math.floor(Math.random() * options.length)];
            while (opt == "RELOAD") { opt = options[Math.floor(Math.random() * options.length)]; }
            return opt;
        }
        return options[Math.floor(Math.random() * options.length)];
    }
    // IMPOSSIBLE
    else if (difficulty == 5 || difficulty == "IMPOSSIBLE") {
        if (turn == 0) return "RELOAD";
        if (!canShoot(ia)) {
            let opt = options[Math.floor(Math.random() * options.length)];
            while (opt == "SHOOT") { opt = options[Math.floor(Math.random() * options.length)]; }
            return opt;
        }
        if (!canReload(ia)) {
            let opt = options[Math.floor(Math.random() * options.length)];
            while (opt == "RELOAD") { opt = options[Math.floor(Math.random() * options.length)]; }
            return opt;
        }
        return options[Math.floor(Math.random() * options.length)];
    }
    // RANDOM
    else if (difficulty >= 6 || difficulty == "RANDOM") {
        return options[Math.floor(Math.random() * options.length)];
    }
}

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

function healthBarManage(whosLife, totalLife) {
    let width = whosLife.life * 100 / totalLife
    if (whosLife === ia) healthBarComputer.style.width = `${width}%`
    if (whosLife === player) healthBarPlayer.style.width = `${width}%`
}

function canShoot (whoShoots) {
    if (!whoShoots.bullets > 0) return false;
    else return true;
}

function canReload (whoReloads) {
    if (whoReloads.bullets >= whoReloads.magSize) return false;
    else return true;
}



// Base Content
updateData("", "");


// Get User button input
reload.addEventListener("click", () => {
    if (canReload(player)) player.bullets += 1;
    
    if (ia_choice === "RELOAD") { // reload - reload -> user:b+1, IA:b+1
        if (canReload(ia)) ia.bullets += 1;
    } else if (ia_choice === "SHOOT") { // reload - shoot  -> user:b+1&v-1, Ia:b-1
        if (canShoot(ia)) {
            ia.bullets -= 1;
            player.life -= ia.damage;
        } 
    } else if (ia_choice === "SHIELD") { // reload - shield -> user:b+1, IA:~
        // nothing
    }

    updateData("RELOAD", ia_choice);
    
})

shoot.addEventListener("click", () => { 
    if (canShoot(player)) {
        player.bullets -= 1;
        if (ia_choice !== "SHIELD") ia.life -= player.damage;
    }
    
    if (ia_choice === "RELOAD") { // shoot - reload  -> user:v-1, IA:v-1&b+1
        if (canReload(ia)) ia.bullets = 1;
    } else if (ia_choice === "SHOOT") { // shoot - shoot   -> user:b-1&v-1, IA:b-1&v-1
        if (canShoot(ia)) {
            ia.bullets -= 1;
            player.life -= ia.damage;
        }
    } else if (ia_choice === "SHIELD") { // shoot - shield  -> user:b-1, IA:~
        // nothing
    }
    
    updateData("SHOOT", ia_choice);

})

shield.addEventListener("click", () => {
    if (ia_choice === "RELOAD") { // shield - reload -> user:~, IA:b+1
        if (canReload(ia)) ia.bullets += 1;
    } else if (ia_choice === "SHOOT") { // shield - shoot  -> user:~, IA:v-1
        if (canShoot(ia)) ia.bullets -= 1;
    } else if (ia_choice === "SHIELD") { // shield - shield -> user:~, IA:~
        // nothing
    }
    
    updateData("SHIELD", ia_choice);
})



/*******************************************
v -> vida / b -> bullet / ~ -> no pasa nada

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
