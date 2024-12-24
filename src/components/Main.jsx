import { useState } from "react"
import { languages } from "./Languages"
import clsx from "clsx"
import { getFarewellText, getRandomCurrentWord } from "./utils"
import { words } from "./words"

export default function Hangman() {

    // Get Random Word for the game
    const randomWord = () => getRandomCurrentWord()


    // Initializing the current word variable in state
    const [currentWord, setCurrentWord] = useState(randomWord)

    // state variable to hold the guessed letter
    const [guessedLetters, setGuessedLetters] = useState([])



    // Derrived values

    let wrongGuessCount = guessedLetters.filter(letter => (
        !currentWord.includes(letter)
    )).length

    // Variable to track num of guessed left
    const numOFGuessesLeft = languages.length - 1

    // Checking if game is won
    const isGameWon =
        currentWord.split("").every(letter =>
            guessedLetters.includes(letter))


    // Checking if game is lost
    const isGameLost = wrongGuessCount >= numOFGuessesLeft


    // Derriving if game is over
    const isGameOver = isGameWon || isGameLost

    // Derived vars for farewell message
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]

    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)


    // Spliting the current word to an array to display
    const currentWordLetters = currentWord.split("")
        .map((letter, index) => {
            const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
            const missedLetters = clsx("word", { missed: isGameLost && !guessedLetters.includes(letter) && !shouldRevealLetter })
            return (
                shouldRevealLetter ?
                    <span key={index} className={missedLetters}>{letter.toUpperCase()}</span> :
                    <span key={index} className={missedLetters} ></span>
            )
        }
        )


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
                    disabled={isGameOver}
                    aria-disabled={guessedLetters.includes(alphabetLetter)}
                    aria-label={`Letter ${alphabetLetter}`}
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

    // Dynamic class assignment for game status
    const gameStatusStyles = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    // Function to check the game status
    const renderGameStatus = function () {
        if (!isGameOver && isLastGuessIncorrect) {
            return getFarewellText(languages[wrongGuessCount - 1].name)
        }

        if (isGameWon) {
            return (
                <>
                    <h2> You won!!</h2>
                    <p> Well done &#128513;</p>
                </>
            )
        } else if (isGameLost) {
            return (
                <>
                    <h2> You lost!!</h2>
                    <p> Better start learning some assembly code &#128513;</p>
                </>
            )
        } else {
            return null
        }
    }

    // start new game function
    function startNewGame() {
        setCurrentWord(getRandomCurrentWord)
        setGuessedLetters([])
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

            {/* Game Status Message*/}
            <section aria-live="polite" role="status" className={gameStatusStyles}>
                {renderGameStatus()}
            </section>

            {/* Languages chips section */}
            <section className="languages-chips">
                {languageChips}
            </section>

            {/* Current Word Dispaly section */}
            <section className="current-word">
                {currentWordLetters}
            </section>

            {/* Screen reader section for reading out the current word */}
            <section className="sr-only" aria-live="polite" role="status">
                <p>
                    {currentWord.includes(lastGuessedLetter) ?
                        `Correct! The letter ${lastGuessedLetter} is in the word` :
                        `Wrong! The letter ${lastGuessedLetter} is not in the word`
                    }

                    You have {numOFGuessesLeft} guesses left
                </p>

                <p>current word: {currentWord.split("").map(letter =>
                    guessedLetters.includes(letter) ? letter + "." : "blank.")
                    .join(" ")}
                </p>
            </section>

            {/* Display Alphabet Keyboard */}
            <section className="keyboard">
                {keyboardLetters}
            </section>

            {/* New game button */}{
            /* Conditional render if game is won */}
            {isGameOver &&
                <button className="new-game" onClick={startNewGame}>New Game</button>}
        </div>
    )
}