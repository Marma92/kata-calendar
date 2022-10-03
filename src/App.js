import logo from './logo.svg';
import './App.css';
import Calendar from './components/calendar/calendar';




function App() {
  const events = require ('./data/input.json')
  return (
    <div className="App">
      <Calendar events={events}/>
    </div>
  );
}

export default App;
