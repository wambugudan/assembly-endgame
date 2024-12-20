import { useState } from "react"
import { languages } from "./Languages"
import clsx from "clsx"

export default function Hangman() {

    // Initializing the current word variable in state
    const [currentWord, setCurrentWord] = useState("react")

    // state variable to hold the guessed letter
    const [guessedLetters, setGuessedLetters] = useState([])


    // Coverting the currentWord string to an array of upper case letters
    const currentWordLetters = currentWord.split("")
        .map((letter, index) => (
            guessedLetters.includes(letter) ?
                <span key={index}>{letter.toUpperCase()}</span> :
                " "
        ))


    // iterating on the languages chips to display them
    const languageChips = languages.map((language, index) => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }

        return (
            <div key={index} style={styles}>{
                language.name}
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

            console.log(className)

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

    console.log(guessedLetters)



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

            {/* Status section */}
            <section className="game-status">
                <h2> You won!!</h2>
                <p> Well done &#128513;</p>
            </section>

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

            {/* New game button */}
            <button className="new-game">
                New Game
            </button>
        </div>
    )
}