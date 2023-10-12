import './question.css';
import he from 'he';
import {useEffect, useState} from "react";

function Question({question, index, setQuestionAsAnswered, gameIsFinished, addToScore}) {
	const [shuffledAnswers, setShuffledAnswers] = useState([]);
	const [userAnswer, setUserAnswer] = useState('');
	const [added, setAdded] = useState(false);

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}

	const answers = [...question.incorrect_answers, question.correct_answer];

	useEffect(() => {
		setShuffledAnswers(shuffle(answers));
	}, []);

	const answersElements = shuffledAnswers.map((answer, answerIndex) => {
		const decodedAnswer = he.decode(answer);
		let formCheckClass = 'form-check';

		if (gameIsFinished) {
			if (userAnswer === answer && answer !== question.correct_answer) {
				formCheckClass = 'form-check form-check--is-incorrect';
			} else if (answer === question.correct_answer) {
				formCheckClass = 'form-check form-check--is-correct';
			}

			if (userAnswer === answer && answer === question.correct_answer) {
				formCheckClass = 'form-check form-check--is-valid';
			}
		}

		function handleClick(answer, correctAnswer, added) {
			if (!gameIsFinished) {
				if (answer === correctAnswer) {
					if (!added) {
						addToScore(1);

						setAdded(prev => !prev);
					}
				} else {
					if (added) {
						addToScore(-1);

						setAdded(prev => !prev);
					}
				}

				setUserAnswer(answer);

				setQuestionAsAnswered(answer);
			}
		}

		return (
			<div key={answer} className={formCheckClass}>
				{
					gameIsFinished ?
						<input type="radio" id={`question--${index}--${answerIndex}`} name={`question--${index}`} value={decodedAnswer} disabled aria-disabled/> :
						<input type="radio" id={`question--${index}--${answerIndex}`} name={`question--${index}`} value={decodedAnswer}/>
				}
				<label htmlFor={`question--${index}--${answerIndex}`} onClick={() => handleClick(answer, question.correct_answer, added)}>{decodedAnswer}</label>
			</div>
		);
	})

	return (
		<article className="question">
			{question.question && <h2>{he.decode(question.question)}</h2>}
			<div className="question__answers">
				{answersElements}
			</div>
		</article>
	);
}

export default Question;