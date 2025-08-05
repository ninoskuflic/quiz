import { useState, useEffect } from 'react';

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
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Feedback State
  const [feedback, setFeedback] = useState(null);
  const [feedbackVisibility, setFeedbackVisibility] = useState(false);

  // API State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle answer button click+
  function answerClick(chosenAnswer, correctAnswer) {
    if (chosenAnswer === correctAnswer) {
      setScore(score + 1);
      setFeedback(true);
      setFeedbackVisibility(true);
    } else {
      setFeedback(false);
      setFeedbackVisibility(true);
    }

    setTimeout(() => {
      setFeedbackVisibility(false);
    }, 650);

    const nextQuetions = currentQuestion + 1;

    if (nextQuetions < questions.length) {
      setCurrentQuestion(nextQuetions);
    } else {
      setTimeout(() => {
        setShowScore(true);
      }, 650);
    }
  }

  // Select Quiz
  function selectQuiz(choice) {
    setSelectedQuiz(choice);
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.skuflic.com/${choice}`);
        const result = await response.json();
        setQuestions(result?.sort(() => Math.random() - 0.5));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }

  let resultMessage;
  switch (selectedQuiz) {
    case 'the-simpsons':
      switch (true) {
        case score <= 5:
          resultMessage =
            "D'oh! Looks like you might need to spend some more time in Springfield. Don't worry; even Homer had to start somewhere!";
          break;
        case score <= 10:
          resultMessage =
            "Not bad, but you're not quite a Springfield resident yet. Keep watching, and soon you'll be quoting Homer and singing with Lisa!";
          break;
        case score <= 13:
          resultMessage =
            "Excellent! You're on your way to becoming a Springfield superstar. Just a little more knowledge, and you'll fit right in at Moe's Tavern.";
          break;
        case score <= 15:
          resultMessage =
            "Cowabunga! You're a true citizen of Springfield! You know your Flanders from your Burns. Keep living the Simpsons dream!";
          break;
        default:
          resultMessage = 'Invalid score';
          break;
      }
      break;

    case 'family-guy':
      switch (true) {
        case score <= 5:
          resultMessage =
            'Oh no! Looks like you need to spend more time in Quahog. Stewie would suggest time travel to give it another shot.';
          break;
        case score <= 10:
          resultMessage =
            "Not bad, but you're not quite a Griffin yet. Keep watching, and soon you'll be enjoying life in Quahog with Peter and the gang!";
          break;
        case score <= 13:
          resultMessage =
            "Well done! You're on your way to becoming a Quahog expert. Just a bit more Peter wisdom, and you'll fit right in at The Drunken Clam.";
          break;
        case score <= 15:
          resultMessage =
            "Freakin' sweet! You're a true Family Guy aficionado. You and Brian would have a great time discussing philosophy and literature.";
          break;
        default:
          resultMessage = 'Invalid score';
          break;
      }
      break;

    case 'futurama':
      switch (true) {
        case score <= 5:
          resultMessage =
            "Good news, everyone! It seems you need a bit more time in the 31st century. Keep watching, and you'll be a Planet Express crew member in no time!";
          break;
        case score <= 10:
          resultMessage =
            "Not bad, but you're not quite a future expert yet. Keep exploring the cosmos with Fry, Bender, and Leela!";
          break;
        case score <= 13:
          resultMessage =
            "Great job! You're on your way to becoming a true Planet Express employee. Just a little more knowledge, and you'll be navigating the space-time continuum.";
          break;
        case score <= 15:
          resultMessage =
            "Congratulations, space cadet! You're a true Futurama fan. Bender would be proud to call you his friend!";
          break;
        default:
          resultMessage = 'Invalid score';
          break;
      }
      break;

    case 'rick-and-morty':
      switch (true) {
        case score <= 5:
          resultMessage =
            'Wubba lubba dub-dub! It looks like you need more adventures with Rick and Morty. Get schwifty and try again!';
          break;
        case score <= 10:
          resultMessage =
            "Not bad, but you're not quite a dimension-hopping genius yet. Keep watching, and you'll be understanding Rick's burps in no time!";
          break;
        case score <= 13:
          resultMessage =
            "Great job! You're on your way to becoming a member of the Council of Ricks. Just a bit more interdimensional knowledge, and you'll be ready for anything.";
          break;
        case score <= 15:
          resultMessage =
            "Wubba lubba dub-dub! You're a true Rick and Morty genius! Time to celebrate with some Szechuan sauce!";
          break;
        default:
          resultMessage = 'Invalid score';
          break;
      }
      break;

    case 'harry-potter':
      switch (true) {
        case score <= 5:
          resultMessage =
            "Mischief not managed! Looks like you need a few more spells in your repertoire. Keep studying at Hogwarts, and you'll be a wizard in no time!";
          break;
        case score <= 10:
          resultMessage =
            "Not bad, but you're not quite a wizard yet. Keep practicing your charms and potions, and you'll be ready for Quidditch in no time!";
          break;
        case score <= 13:
          resultMessage =
            "Well done! You're on your way to becoming a true wizard or witch. Just a bit more magical knowledge, and you'll ace your O.W.L.s.";
          break;
        case score <= 15:
          resultMessage =
            "Bravo, wizarding prodigy! You're a true expert in the magical world of Harry Potter. Grab your wand and continue your magical journey!";
          break;
        default:
          resultMessage = 'Invalid score';
          break;
      }
      break;

    case 'game-of-thrones':
      switch (true) {
        case score <= 5:
          resultMessage =
            "Winter is coming, and so is more study time! Looks like you need to brush up on your Westeros knowledge. Keep watching, and you'll be a lord or lady in no time!";
          break;
        case score <= 10:
          resultMessage =
            "Not bad, but you're not quite a ruler of the Seven Kingdoms yet. Keep watching, and soon you'll be playing the Game of Thrones like a pro!";
          break;
        case score <= 13:
          resultMessage =
            "Well done! You're on your way to becoming a true Westeros strategist. Just a bit more political intrigue, and you'll be ready for the Iron Throne.";
          break;
        case score <= 15:
          resultMessage =
            "Hail to the ruler of Westeros! You're a true Game of Thrones maestro. Prepare your dragons, because you're destined for greatness!";
          break;
        default:
          resultMessage = 'Invalid score';
          break;
      }
      break;

    default:
      resultMessage = 'Invalid category';
      break;
  }

  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');

    // Set script source and attributes
    script.src = 'https://static.skuflic.com/cookies/cookieconsent.js';
    script.type = 'module';
    script.defer = true;

    // Define onLoad and onError handlers
    const onLoad = () => {
      console.log('Script loaded successfully');
    };

    const onError = (error) => {
      console.error('Script loading error:', error);
    };

    // Add event listeners for script loading events
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Remove event listeners
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);

      // Remove the script from the document body
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {' '}
      {!selectedQuiz && (
        <div className='info'>
          <p>Select your quiz to get started</p>
          <div className='answers quiz-selection'>
            <button onClick={() => selectQuiz('the-simpsons')}>
              <img src={TheSimpsons} alt='The Simpsons' className='logo' />
            </button>

            <button onClick={() => selectQuiz('family-guy')}>
              <img src={FamilyGuy} alt='Family Guy' className='logo' />
            </button>

            <button onClick={() => selectQuiz('futurama')}>
              <img src={Futurama} alt='Futurama' className='logo' />
            </button>

            <button onClick={() => selectQuiz('rick-and-morty')}>
              <img src={RickAndMorty} alt='Rick and Morty' className='logo' />
            </button>

            <button onClick={() => selectQuiz('harry-potter')}>
              <img src={HarryPotter} alt='Harry Potter' className='logo' />
            </button>

            <button onClick={() => selectQuiz('game-of-thrones')}>
              <img src={GameOfThrones} alt='Game of Thrones' className='logo' />
            </button>
          </div>
          <div className='legal'>
            <button data-cc='show-preferencesModal'>Cookie Settings</button>
            <a
              href='https://go.skuflic.com/servicesagreement'
              target='_blank'
              rel='noreferrer'>
              Services Agreement
            </a>
            <a
              href='https://go.skuflic.com/privacy'
              target='_blank'
              rel='noreferrer'>
              Privacy Policy
            </a>
            <p>
              TM and Copyright &copy; {new Date().getFullYear()} Skuflic.com.
              All rights reserved.
            </p>
          </div>
        </div>
      )}
      {loading && selectedQuiz && (
        <div className='info'>
          <h1>Loading...</h1>
          <p>Please wait while we load your quiz</p>
        </div>
      )}
      {error && (
        <div className='info'>
          <h1>That's an error!</h1>
          <p>Error description: {error.message}</p>
        </div>
      )}
      {!loading && !error && (
        <div className='app'>
          {showScore ? (
            <div className='score-section'>
              <img src={Sparkels} alt='Sparkles' />
              <p>
                You've scored {score} out of {questions?.length}
              </p>
              <p>{resultMessage}</p>
              <button
                onClick={() => (window.location = '')}
                className='answers'>
                Play Again
              </button>
            </div>
          ) : (
            <>
              {!feedbackVisibility && (
                <>
                  <div className='question'>
                    <div className='question-text'>
                      <span key={questions[currentQuestion].id}>
                        {questions[currentQuestion]?.question}
                      </span>
                      <span className='count'>
                        Question {currentQuestion + 1} / {questions?.length}
                      </span>
                    </div>
                  </div>

                  <div className='answers'>
                    {questions[currentQuestion]?.possibleAnswers
                      .sort(() => Math.random() - 0.5)
                      ?.map((answer) => (
                        <button
                          onClick={() =>
                            answerClick(
                              answer,
                              questions[currentQuestion].correctAnswer
                            )
                          }
                          key={crypto.randomUUID()}>
                          {answer}
                        </button>
                      ))}
                  </div>
                </>
              )}
              {feedbackVisibility && (
                <div
                  className={
                    feedback
                      ? 'feedback-section correct'
                      : 'feedback-section incorrect'
                  }>
                  {!feedback ? (
                    <svg
                      width='60px'
                      height='60px'
                      stroke-width='1.3'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      color='#000000'>
                      <path
                        d='M8.5 9C8.22386 9 8 8.77614 8 8.5C8 8.22386 8.22386 8 8.5 8C8.77614 8 9 8.22386 9 8.5C9 8.77614 8.77614 9 8.5 9Z'
                        fill='#000000'
                        stroke='#000000'
                        stroke-width='1.3'
                        stroke-linecap='round'
                        stroke-linejoin='round'></path>
                      <path
                        d='M15.5 9C15.2239 9 15 8.77614 15 8.5C15 8.22386 15.2239 8 15.5 8C15.7761 8 16 8.22386 16 8.5C16 8.77614 15.7761 9 15.5 9Z'
                        fill='#000000'
                        stroke='#000000'
                        stroke-width='1.3'
                        stroke-linecap='round'
                        stroke-linejoin='round'></path>
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        stroke='#000000'
                        stroke-width='1.3'
                        stroke-linecap='round'
                        stroke-linejoin='round'></path>
                      <path
                        d='M7.5 15.5C7.5 15.5 9 13.5 12 13.5C15 13.5 16.5 15.5 16.5 15.5'
                        stroke='#000000'
                        stroke-width='1.3'
                        stroke-linecap='round'
                        stroke-linejoin='round'></path>
                    </svg>
                  ) : (
                    <svg
                      width='60px'
                      height='60px'
                      stroke-width='1.3'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      color='#000000'>
                      <path
                        d='M10 9H8M16 9H14M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM14 13H10V16C10 16.6667 10.4 18 12 18C13.6 18 14 16.6667 14 16V13Z'
                        stroke='#000000'
                        stroke-width='1.3'
                        stroke-linecap='round'
                        stroke-linejoin='round'></path>
                    </svg>
                  )}

                  <h2>
                    {!feedback
                      ? 'Oops, better luck next time!'
                      : 'Yay! Your answer is correct!'}
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
