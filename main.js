// Source - https://stackoverflow.com/q/60995034
// Posted by Miguel bastidas, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-05, License - CC BY-SA 4.0

const WORDS = ["MAGIC", "CARROT", "INSUFFERABLE"]
const ERRORS_MAX = 5

const SVG = document.querySelector('svg')
const BUTTON_NEW_GAME = document.querySelector('.sidebar button:first-of-type')
const ERRORS_COUNTER = document.getElementById('errors')
const LETTERS_USED = document.getElementById('letters-used')
const BOARD = document.getElementById('word-display')
BOARD.innerHTML = ""
const RECORD = document.getElementById('record')
const GAME_OVER = document.getElementById('game-over-modal')

// adding divs to letter-used
LETTERS_USED.appendChild(document.createElement("div"))
LETTERS_USED.appendChild(document.createElement("div"))
const RIGHT_LETTERS = LETTERS_USED.querySelector("div:first-child")
const WRONG_LETTERS = LETTERS_USED.querySelector("div:last-child")
console.log(RIGHT_LETTERS)

RIGHT_LETTERS.classList.add("text-green-600")
WRONG_LETTERS.classList.add("text-red-600")

let word = ""
let nb_errors = 0
let nb_letters = 0
let nb_letters_found = 0
let letters_played = ""
localStorage.setItem("record", 0)

BUTTON_NEW_GAME.addEventListener('click', startNewGame)
GAME_OVER.querySelector('button').addEventListener('click', startNewGame)


// -------------------------------------------------------------------------------------------
// FUNCTIONS
// -------------------------------------------------------------------------------------------

function startNewGame() {
    window.addEventListener("keydown", getPlayerInput)
    
    // Hiding modal
    GAME_OVER.close()

    // Resetting hangman to hidden
    for (i=1; i<=5; i++) {
        hideHangmanPiece(i)
    }

    // Resetting error counter
    ERRORS_COUNTER.textContent = "0/5"
    nb_errors = 0
    nb_letters_found = 0

    // Resetting played letters
    RIGHT_LETTERS.textContent = ""
    WRONG_LETTERS.textContent = ""

    // Choosing new word
    let random_index = Math.floor(Math.random()*WORDS.length)
    word = WORDS[random_index]
    nb_letters = word.length

    // Updating board
    BOARD.innerHTML = ""
    for (i=1; i<=nb_letters; i++) {
        let new_span = document.createElement("span")
        new_span.classList.add("letter-placeholder")
        BOARD.appendChild(new_span)
    }
}

function getPlayerInput(event) {
    let letter = event.key.toUpperCase()

    // check if letter already played
    if (!(letters_played.includes(letter)) && isLetter(letter)) {
        // Check if letter in word
        let is_letter_found = false
        for (i=1; i<=nb_letters; i++) {
            let letter_place = BOARD.querySelector(`span:nth-child(${i})`)
            if (letter == word[i-1] && letter_place.textContent == "") {
                // Add letter to right letters
                if (!is_letter_found) {
                    new_text_content = RIGHT_LETTERS.textContent + letter + ", "
                    RIGHT_LETTERS.textContent = new_text_content
                    is_letter_found = true
                }
                letter_place.textContent = letter
                nb_letters_found += 1
            }
        }

        letters_played = letters_played + letter

        if (!is_letter_found) {
            // Add letter to wrong letters
            new_text_content = WRONG_LETTERS.textContent + letter + ", "
            WRONG_LETTERS.textContent = new_text_content

            nb_errors += 1
            ERRORS_COUNTER.textContent = `${nb_errors}/${ERRORS_MAX}`
            showHangmanPiece(nb_errors)
            // Check if LOST
            if (nb_errors >= ERRORS_MAX) {
                showWord()
                localStorage.setItem("record", 0)
                showRecord()
                showGameOverMessage("DEFAITE :(")
                window.removeEventListener("keydown", getPlayerInput)
            }
        } else {
            // check if WON
            if (nb_letters_found >= nb_letters) {
                incrementRecord(1)
                showGameOverMessage("VICTOIRE !!!")
                window.removeEventListener("keydown", getPlayerInput)
            }

        }
    }
    
}


function showWord() {
    for (i=1; i<=nb_letters; i++) {
        BOARD.querySelector(`span:nth-child(${i})`).textContent = word[i-1]
    }
}

function showHangmanPiece(id_piece) {
    let body_part = SVG.querySelector(`g:nth-child(${id_piece+1})`)
    body_part.classList.remove("hidden")
    body_part.classList.add("opacity-30")
}

function hideHangmanPiece(id_piece) {
    console.log(id_piece)
    let body_part = SVG.querySelector(`g:nth-child(${id_piece+1})`)
    console.log(body_part)
    body_part.classList.remove("opacity-30")
    body_part.classList.add("hidden")
}

function incrementRecord(increment) {
    let old_value = parseInt(localStorage.getItem("record"))
    let new_value = old_value + increment
    localStorage.setItem("record", new_value)
    showRecord()
}

function showRecord() {
    RECORD.textContent = localStorage.getItem("record")
}

function showGameOverMessage(message) {
    document.getElementById("game-result").textContent = message
    GAME_OVER.showModal()
}

function isLetter(str) {
    return str.match(/[a-z]/i)
}