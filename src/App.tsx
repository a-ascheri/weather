import SearchWeather from "./components/SearchWeather";
import WeatherChart from './components/WeatherChart';

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>FreeWeather</h1>
      <SearchWeather />
      <WeatherChart />
    </div>
  );
}

export default App;
