// Source - https://stackoverflow.com/q/60995034
// Posted by Miguel bastidas, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-05, License - CC BY-SA 4.0


const WORDS_FILE = "words.txt"
const WORDS = ["magic", "carrot", "insufferable"]

const SVG = document.querySelector('svg')
const BUTTON_NEW_GAME = document.querySelector('.sidebar button:first-of-type')
const ERRORS_COUNTER = document.getElementById('errors')
const LETTERS_USED = document.getElementById('letters-used')
const BOARD = document.getElementById('word-display')

BUTTON_NEW_GAME.addEventListener('click', function () {
    // Resetting hangman to hidden
    body_parts = SVG.querySelectorAll('g:not(:first-child)')
    for (element of body_parts) {
        element.classList.remove("opacity-30")
        element.classList.add("hidden")
    }

    // Resetting error counter
    ERRORS_COUNTER.textContent = "0/5"

    // Resetting played letters
    LETTERS_USED.textContent = ""

    // Choosing new word
    let random_index = Math.floor(Math.random().WORDS.length)
    const WORD = WORDS[random_index]
    const NB_LETTERS = WORD.length

    // Updating board
    BOARD.innerHTML = ""
    for (i=1; i<=NB_LETTERS; i++) {
        let new_span = document.createElement("span")
        new_span.classList.add("letter-placeholder")
        BOARD.appendChild(new_span)
    }
})