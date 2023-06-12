const player = {
    lives: 6,
    wrong_guesses: "",
}

const words = ["prueba", "intento"];



// Variable para desarrollo
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];



// 1- Elejir palabra para el juego
let game_word = words[Math.floor(Math.random() * words.length)];

// 2- Bucle while para jugar hasta quedar sin vidas
while (player.lives > 0) {
    // 2.1 - Mostar la palabra oculta

    // 2.2- Elejir letra

    // 2.3- Checkear si la letra elejida esta en la palabra.
    // Si no esta agregar esa letra a wrong_guesses y restar vida

    // 2.4- Revelar las letras correctas en la palabra oculta

}

// 3- Motstrar mensaje de victoria o derrota