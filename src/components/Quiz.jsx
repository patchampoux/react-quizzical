import './quiz.css';
import {useEffect, useState} from "react";
import Question from "./Question";

function Quiz() {
	const nbQuestions = 5;
	const [nbCorrect, setNbCorrect] = useState(0);
	const [gameIsFinished, setGameIsFinished] = useState(false);
	const [quizItems, setQuizItems] = useState([]);
	const [hasAnsweredAllQuestions, setHasAnsweredAllQuestions] = useState(Array(nbQuestions).fill(false));

	async function fetchQuestions() {
		const response = await fetch(`https://opentdb.com/api.php?amount=${nbQuestions}`);
		const questions = await response.json();

		setQuizItems(questions.results);
	}

	useEffect(() => {
		fetchQuestions().catch(console.error);
	}, []);

	function validateAnswers() {
		setGameIsFinished(true);
	}

	function restart() {
		setGameIsFinished(false);
		setHasAnsweredAllQuestions(Array(nbQuestions).fill(false))

		fetchQuestions().catch(console.error);
	}

	function addToScore(value) {
		setNbCorrect(prev => prev + value);
	}

	function setQuestionAsAnswered(index) {
		let newArray = [...hasAnsweredAllQuestions];

		newArray[index] = true;

		setHasAnsweredAllQuestions(newArray);
	}

	const elements = quizItems.map((question, index) => (
		<Question
			key={question.question}
			question={question}
			index={index}
			setQuestionAsAnswered={() => setQuestionAsAnswered(index)}
			gameIsFinished={gameIsFinished}
			addToScore={addToScore}
		/>
	));

	return (
		<div className="quiz">
			{elements}
			<div className="quiz__action">
				{gameIsFinished && <p>You scored {nbCorrect}/{nbQuestions} correct answers</p>}
				{
					hasAnsweredAllQuestions.every((item) => item === true) ?
						<button onClick={gameIsFinished ? restart : validateAnswers} className="btn">{gameIsFinished ? 'Restart' : 'Check answers'}</button> :
						<button className="btn" disabled aria-disabled>Check answers</button>
				}
			</div>
		</div>
	);
}

export default Quiz;