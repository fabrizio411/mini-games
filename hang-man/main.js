const player = {
    lives: 6,
    wrong_guesses: "",
}

const words = ["prueba", "intento"];


// Funcion devuelve una string oculta o un array ocurlo segun el formato especificado
function hideWord(word, format_inString) {
    let hidden_array = [];
    for (let i = 0; i <= word.length; i++) {
        hidden_array[i] = "_";
    }

    if (format_inString === "string") {
        word_hidden = hidden_array.join(" ");
        return word_hidden;
    } else if (format_inString === "array") {
        return hidden_array;
    }
}


// Checkea la lettra elejida y actualiza la palabra oculta
function letterCheck(letter) {
    if (game_word.includes(letter)) {
        let word_array = game_word.split("");
        let hidden_array = hideWord(game_word, "array");
        
        for (let i = 0; i < word_array.length; i++) {
            if (letter === word_array[i]) {
                hidden_array[i] = letter;
            }
        }

        return hidden_array;
    } else {
        player.wrong_guesses.push(letter);
        player.lives -= 1;
        
        return false;
    }
}




// Variable para desarrollo
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];




// 1- Elejir palabra para el juego
let game_word = words[Math.floor(Math.random() * words.length)];

// 2- Bucle while para jugar hasta quedar sin vidas
while (player.lives > 0) {

    // 2.1 - Mostar la palabra oculta
    let game_word_hidden = hideWord(game_word, "string");
    console.log(game_word_hidden);

    // 2.2- Elejir letra (DESARROLLO)
    // let guess = letters[Math.floor(Math.random() * letters.length)]
    let guess = z;

    // 2.3- Checkear si la letra elejida esta en la palabra.
    // Si no esta agregar esa letra a wrong_guesses y restar vida
    // 2.4- Revelar las letras correctas en la palabra oculta
    if (letterCheck(guess)) {
        game_word_hidden = letterCheck(guess);
    } else {
        letterCheck(guess);
    }
}

// 3- Motstrar mensaje de victoria o derrota