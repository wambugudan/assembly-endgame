import { useState } from "react"
import { languages } from "./Languages"
import clsx from "clsx"

export default function Hangman() {

    // Initializing the current word variable in state
    const [currentWord, setCurrentWord] = useState("react")

    // state variable to hold the guessed letter
    const [guessedLetters, setGuessedLetters] = useState([])


    // Derrived values

    let wrongGuessCount = guessedLetters.filter(letter => (
        !currentWord.includes(letter)
    )).length

    // Checking if game is won
    const isGameWon =
        currentWord.split("").every(letter =>
            guessedLetters.includes(letter))


    // Checking if game is lost
    const isGameLost = wrongGuessCount >= Object.keys(languages).length - 1


    // Derriving if game is over
    const isGameOver = isGameWon || isGameLost


    // Spliting the current word to an array to displa
    const currentWordLetters = currentWord.split("")
        .map((letter, index) => (
            guessedLetters.includes(letter) ?
                <span key={index} className="word">{letter.toUpperCase()}</span> :
                <span key={index} ></span>
        ))


    // iterating on the languages chips to display them
    const languageChips = languages.map((language, index) => {
        // Variable to check if language is lost
        const languageIsLost = index < wrongGuessCount

        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }

        // Assigning a dynamic class using the clsx method
        const className = clsx("chip", languageIsLost && "lost")

        return (
            <div
                key={index}
                style={styles}
                className={className}
            >
                {language.name}
            </div>
        )

    })



    // Alphabet letters for the keyboard
    const alphabets = "abcdefghijklmnopqrstuvwxyz"

    const keyboardLetters = alphabets.split("")
        .map((alphabetLetter) => {
            // create conditions to be checked to determine button styling
            const isGuessed = guessedLetters.includes(alphabetLetter)
            const isCorrect = isGuessed && currentWord.includes(alphabetLetter)
            const isWrong = isGuessed && !currentWord.includes(alphabetLetter)
            // creating conditional classNames
            const className = clsx(
                {
                    clickedCorrect: isCorrect,
                    clickedWrong: isWrong
                }
            )

            return (
                <button
                    key={alphabetLetter}
                    className={className}
                    onClick={() => handleButtonClicked(alphabetLetter)}
                >
                    {alphabetLetter.toUpperCase()}
                </button>
            )
        })



    // Saved guessed letter to state
    function handleButtonClicked(alphabetLetter) {
        setGuessedLetters(prevLetters => (
            prevLetters.includes(alphabetLetter) ?
                prevLetters :
                [...prevLetters, alphabetLetter]
        )
        )
    }



    return (
        <div className="game-container">
            {/* Header section of the game */}
            <header className="game-header">
                <h2 className="game-title">Assembly Endgame</h2>
                <p className="game-header-description">
                    Guess the word within 8 attempts to keep the
                    programming world safe from Assembly
                </p>
            </header>

            {/* Status section You Won Message*/}
            <section className="game-status">

            </section>

            {/* Status section You Won Message*/}
            {isGameWon && <section className="game-status-won">
                <h2> You won!!</h2>
                <p> Well done &#128513;</p>
            </section>}

            {/* Status section You lost Message*/}
            {isGameLost && <section className="game-status-lost">
                <h2> You lost!!</h2>
                <p> Better start learning some assembly code &#128513;</p>
            </section>}

            {/* Languages chips section */}
            <section className="languages-chips">
                {languageChips}
            </section>

            {/* Current Word Dispaly section */}
            <section className="current-word">
                {currentWordLetters}
            </section>

            {/* Display Alphabet Keyboard */}
            <section className="keyboard">
                {keyboardLetters}
            </section>

            {/* New game button */}{
            /* Conditional render if game is won */}
            {isGameOver && <button className="new-game">New Game</button>}
        </div>
    )
}