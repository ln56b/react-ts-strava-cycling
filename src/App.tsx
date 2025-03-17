import { Button } from './components/ui/button';

function App() {
	return (
		<>
			<p>Click on the Vite and React logos to learn more</p>

			<Button onClick={() => alert('Button clicked')} variant="default">
				Click me
			</Button>
		</>
	);
}

export default App;
