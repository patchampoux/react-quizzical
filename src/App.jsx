import {useState} from 'react';
import blobTopRight from './assets/blob-top-right.svg';
import blobBottomLeft from './assets/blob-bottom-left.svg';
import Home from "./components/Home";
import Quiz from "./components/Quiz";

function App() {
	const [started, setStarted] = useState(false)

	return (
		<main className={started ? 'has-started' : 'not-started'}>
			{!started ? <Home start={() => setStarted(prevState => !prevState)}/> : <Quiz/>}
			<img className="blob blob--top-right" aria-hidden={true} src={blobTopRight} alt="Decorative blob" width={158} height={151}/>
			<img className="blob blob--bottom-left" aria-hidden={true} src={blobBottomLeft} alt="Decorative blob" width={148} height={118}/>
		</main>
	)
}

export default App
