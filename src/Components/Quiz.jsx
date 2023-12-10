import { useState } from 'react';

import Sparkels from '../Images/Sparkles.svg';
import Futurama from '../Images/Logos/Futurama.svg';
import RickAndMorty from '../Images/Logos/FamilyGuy.svg';
import GameOfThrones from '../Images/Logos/GameOfThrones.svg'
import FamilyGuy from '../Images/Logos/FamilyGuy.svg'

export default function Quiz() {
    // State Management
    const [questions, setQuestions] = useState('')
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true);
    const [quizSelected, setQuizSelected] = useState(false);
    const [error, setError] = useState(null);

    // Fetching the API

    function handleAnswerButtonClick(chosenAnswer, correctAnswer) {
        if (chosenAnswer === correctAnswer) {
            setScore(score + 1);
        }

        const nextQuetions = currentQuestion + 1;

        if (nextQuetions < questions.length) {
            setCurrentQuestion(nextQuetions);
        }
        else {
            setShowScore(true)
        }
    }

    function selectQuiz(choice) {
        setQuizSelected(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.learn.skuflic.com/${choice}`);
                const result = await response.json();
                setQuestions(result?.sort(() => Math.random() - 0.5));

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }

    return (
        <>  {!quizSelected && <div className='loading'>
            <h1>Select Your Quiz</h1>
            <p>Ready to test your knowledge?</p>
            <div className='answer-section quiz-selection'>
                <button onClick={() => selectQuiz('simpsons')}><img src='https://upload.wikimedia.org/wikipedia/commons/9/98/The_Simpsons_yellow_logo.svg' alt='The Simpsons' className='logo' /></button>
                <button onClick={() => selectQuiz('futurama')}><img src='https://upload.wikimedia.org/wikipedia/commons/8/84/Futurama_1999_logo.svg' alt='Futurama' className='logo' /></button>
                <button onClick={() => selectQuiz('rickandmorty')}><img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg' alt='Rick and Morty' className='logo' /></button>
                <button onClick={() => selectQuiz('familyguy')}><img src='https://upload.wikimedia.org/wikipedia/commons/1/1e/Family_Guy_logo.svg' alt='Family Guy' className='logo' /></button>
                <button onClick={() => selectQuiz('gameofthrones')} ><img src='https://upload.wikimedia.org/wikipedia/commons/2/2e/Game_of_Thrones_2011_logo.svg' alt='Game of Thrones' className='logo' /></button>
            </div>
        </div>}
            {loading && quizSelected && <div className='loading'><h1>Loading...</h1><p>Please wait while we load your Futurama Quiz App</p></div>}
            {error && <div className='loading'><h1>That's an error!</h1><p>Error description: {error.message}</p></div>}
            {!loading && !error && <div className='app'>
                {showScore ? (
                    <div className='score-section'>
                        <img src={Sparkels} alt='Sparkles' />
                        You scored {score} out of {questions?.length}.
                        <p>We hope you've had fun!</p>
                    </div>
                )
                    :
                    (
                        <>
                            <div className='question-section'>
                                <div className='question-text'>
                                    <span key={crypto.randomUUID()}>{questions[currentQuestion]?.question}</span>
                                    <span className='question-count'>Question {currentQuestion + 1} / {questions?.length}</span>
                                </div>
                            </div>

                            <div className='answer-section'>
                                {
                                    questions[currentQuestion]?.possibleAnswers.sort(() => Math.random() - 0.5)?.map(answer => (
                                        <button onClick={() => handleAnswerButtonClick(answer, questions[currentQuestion].correctAnswer)} key={crypto.randomUUID()}>{answer}</button>
                                    ))
                                }
                            </div>
                        </>
                    )}
            </div>}
        </>
    );
}