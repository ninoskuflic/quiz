import { useState } from 'react';

// Images
import Sparkels from '../Images/Sparkles.svg';
import TheSimpsons from '../Images/Logos/the-simpsons.svg';
import Futurama from '../Images/Logos/futurama.svg';
import RickAndMorty from '../Images/Logos/rick-and-morty.svg';
import FamilyGuy from '../Images/Logos/family-guy.svg';
import GameOfThrones from '../Images/Logos/game-of-thrones.svg';
import HarryPotter from '../Images/Logos/harry-potter.svg';

export default function Quiz() {
    // State Management
    // Quiz State
    const [questions, setQuestions] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [selectedQuiz, setSelectedQuiz] = useState(false);

    // API State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Handle answer button click+
    function answerClick(chosenAnswer, correctAnswer) {
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

    // Select Quiz
    function selectQuiz(choice) {
        setSelectedQuiz(true);
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
        <>  {!selectedQuiz && <div className='info'>
            <h1>Select Your Quiz</h1>
            <p>Ready to test your knowledge?</p>
            <div className='general-section quiz-selection'>
                <button onClick={() => selectQuiz('the-simpsons')}>
                    <img src={TheSimpsons} alt='The Simpsons' className='logo' />
                </button>

                <button onClick={() => selectQuiz('futurama')}>
                    <img src={Futurama} alt='Futurama' className='logo' />
                </button>

                <button onClick={() => selectQuiz('rick-and-morty')}>
                    <img src={RickAndMorty} alt='Rick and Morty' className='logo' />
                </button>

                <button onClick={() => selectQuiz('family-guy')}>
                    <img src={FamilyGuy} alt='Family Guy' className='logo' />
                </button>

                <button onClick={() => selectQuiz('game-of-thrones')}>
                    <img src={GameOfThrones} alt='Game of Thrones' className='logo' />
                </button>

                <button onClick={() => selectQuiz('harry-potter')} >
                    <img src={HarryPotter} alt='Harry Potter' className='logo' />
                </button>
            </div>
        </div>}
            {loading && selectedQuiz && <div className='info'><h1>Loading...</h1><p>Please wait while we load your Futurama Quiz App</p></div>}
            {error && <div className='info'><h1>That's an error!</h1><p>Error description: {error.message}</p></div>}
            {!loading && !error && <div className='app'>
                {showScore ? (
                    <div className='score-section'>
                        <img src={Sparkels} alt='Sparkles' />
                        You've scored {score} out of {questions?.length}
                        <p>We hope you've had fun!</p>
                        <button onClick={() => window.location = ''} className='general-section'>Play Again</button>
                    </div>
                ) :
                    (
                        <>
                            <div className='question-section'>
                                <div className='question-text'>
                                    <span key={crypto.randomUUID()}>{questions[currentQuestion]?.question}</span>
                                    <span className='question-count'>Question {currentQuestion + 1} / {questions?.length}</span>
                                </div>
                            </div>

                            <div className='general-section'>
                                {questions[currentQuestion]?.possibleAnswers.sort(() => Math.random() - 0.5)?.map(answer => (
                                    <button onClick={() => answerClick(answer, questions[currentQuestion].correctAnswer)} key={crypto.randomUUID()}>{answer}</button>
                                ))}
                            </div>
                        </>
                    )}
            </div>}
        </>
    );
}