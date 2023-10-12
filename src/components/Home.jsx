import './home.css';

function Home({start}) {
	return (
		<div className="home">
			<h1>Quizzical</h1>
			<p className="lead">Some description if needed</p>
			<button onClick={start} className="btn btn--large">Start quiz</button>
		</div>
	)
}

export default Home;