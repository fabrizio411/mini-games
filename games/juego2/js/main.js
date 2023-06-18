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
const gameEndScreen = document.getElementById("game-end");
const gameResult = document.getElementById("game-result");

const difficultChosen = document.getElementById("difficulty-list");
const playAgain = document.getElementById("play-again");

const healthBarComputer = document.getElementById("life-bar-computer");
const healthBarPlayer = document.getElementById("life-bar-player");

const shootSVG = document.getElementById("shoot-svg");
const reloadSVG = document.getElementById("reload-svg");






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


const p_total_life = player.life; // Para caluclos de barra de vida
const c_total_life = ia.life;

let difficulty = "RANDOM"
let turn = 0;
let winner = null;

let svg_shoot = shootSVG.innerHTML;
let svg_reload = reloadSVG.innerHTML;

const options = ["RELOAD", "SHOOT", "SHIELD"];
let ia_choice = "";

// Base Content
updateData("", "");


function updateData(pChoice, iaChoice){
    turn++;

    // Desabilitar boton disparar
    if (!canShoot(player)) shoot.disabled = true;
    else shoot.disabled = false
    if (shoot.disabled) {
        shootSVG.innerHTML = '<svg class="button-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"  /></svg>'
    } else shootSVG.innerHTML = svg_shoot

    // Desabilitar boton recargar
    if (!canReload(player)) reload.disabled = true;
    else reload.disabled = false
    if (reload.disabled) {
        reloadSVG.innerHTML = '<svg class="button-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"  /></svg>'
    } else reloadSVG.innerHTML = svg_reload
    
    computerChoice.innerHTML = choiceDisplay(iaChoice, ia);
    computerLife.innerHTML = ia.life;
    computerBullets.innerHTML = ia.bullets + "/" + ia.magSize;
    if (!canReload(ia)) computerBullets.innerHTML += '<span class="isFull"> (FULL)</span>'; 

    playerChoice.innerHTML = choiceDisplay(pChoice, player);
    playerLife.innerHTML = player.life;
    playerBullets.innerHTML = player.bullets + "/" + player.magSize; 
    if (!canReload(player)) playerBullets.innerHTML += '<span class="isFull"> (FULL)</span>';

    // End Game display
    if (player.life <= 0 && ia.life <= 0) {
        winner = "Tied";
        setTimeout(() => {
            gameSection.style.display = "none"
            gameEndScreen.style.display = "block"
            gameResult.innerHTML = 'Both Died'
        }, 1500);
        
    }
    else if (player.life <= 0) {
        winner = ia;
        setTimeout(() => {
            gameSection.style.display = "none"
            gameEndScreen.style.display = "block"
            gameResult.innerHTML = 'You Lost'
        }, 1500);

    } 
    else if (ia.life <= 0) {
        winner = player;
        setTimeout(() => {
            gameSection.style.display = "none"
            gameEndScreen.style.display = "block"
            gameResult.innerHTML = 'You Win'
        }, 1500);

    }

    healthBarManage(ia, c_total_life);
    healthBarManage(player, p_total_life);

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
        while (cont < 2 && ((opt === "SHOOT" && ia.bullets < parseInt((ia.life/player.damage)) >= 2) || ia.bullets <= ia.magSize)) {
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
        if (turn <= 1) return "RELOAD";
        if (!canShoot(ia)) {
            let opt = options[Math.floor(Math.random() * options.length)];
            while (opt === "SHOOT") { opt = options[Math.floor(Math.random() * options.length)]; }
            return opt;
        }
        if (!canReload(ia)) {
            let opt = options[Math.floor(Math.random() * options.length)];
            while (opt === "RELOAD") { opt = options[Math.floor(Math.random() * options.length)]; }
            return opt;
        }
        return options[Math.floor(Math.random() * options.length)];
    }
    
    // IMPOSSIBLE
    // Recarga siempre en el turno 0
    // Si elije estrategia 0, dependiendo del turno usa SHIELD o SHOOT
    // Nunca intenta disparar si no tiene balas
    // Nunca intenta recargar si tiene todas las balas 
    else if (difficulty === 5 || difficulty === "IMPOSSIBLE") {
        if (turn === 1) return "RELOAD";
        strat = Math.floor(Math.random() * 2);
        if (strat === 0){
            if (turn == 2) return "RELOAD";
            if (turn%2 == 0 && canShoot(player)) return "SHIELD";
            else if (canShoot(ia)) return "SHOOT";
        }
        if (!canShoot(ia)) {
            let opt = options[Math.floor(Math.random() * options.length)];
            while (opt === "SHOOT") { opt = options[Math.floor(Math.random() * options.length)]; }
            if (opt === "SHIELD" && !canShoot(player)) opt = "RELOAD";
            return opt;
        }
        if (!canReload(ia)) {
            let opt = options[Math.floor(Math.random() * options.length)];
            while (opt === "RELOAD") { opt = options[Math.floor(Math.random() * options.length)]; }
            if (opt === "SHIELD" && !canShoot(player)) opt = "SHOOT";
            return opt;
        }
        return options[Math.floor(Math.random() * options.length)];
    }

    // RANDOM
    else if (difficulty >= 6 || difficulty === "RANDOM") {
        return options[Math.floor(Math.random() * options.length)];
    }
}

function choiceDisplay(Choice, who) {
    // Display de imagen de la eleccion
    if (turn === 1) return "";
    else {
        if (Choice === "SHOOT" && !canShoot(who)) {
            return '<img src="./img/crosshair-alt.svg"> <svg class="action-cross" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"  /></svg>'
        } else if (Choice === "SHOOT") {
            return '<img src="./img/crosshair-alt.svg">';
        } else if (Choice === "SHIELD") {
            return '<img src="./img/shield-alt.svg">';
        } else if (Choice === "RELOAD" && who.magSize === who.bullets) {
            return '<img src="./img/bullet-alt.svg"> <svg class="action-cross" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"  /></svg>'
        } else if (Choice === "RELOAD") {
            return '<img src="./img/bullet-alt.svg">'
        }
    }
}

function healthBarManage(whosLife, totalLife) {
    // Calculo de la barra de vida y display
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


// TERMINAR ESTO
playAgain.addEventListener("click", () => { 
    //difficulty = difficultChosen.get
    turn = 0;
    winner = null;
    updateData("", "");
})


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
User: reload - IA: reload -> user.balas+=1; IA.balas+=1
User: reload - IA: shoot  -> user.balas+=1; user.vida-=daño; IA.balas-=1
User: reload - IA: shield -> user.balas+1;

User: shoot - IA: reload  -> user.balas-=1; IA.vida-=daño; IA.balas+=1
User: shoot - IA: shoot   -> user.balas-=1; user.vida-=daño; IA.balas-=1; IA.vida-=daño
User: shoot - IA: shield  -> user.balas-=1;

User: shield - IA: reload -> IA.balas+=1
User: shield - IA: shoot  -> IA.balas-=1
User: shield - IA: shield -> // Nothing
*******************************************/
