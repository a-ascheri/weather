import SearchWeather from "./components/SearchWeather";
import WeatherChart from './components/WeatherChart';

import "./App.css";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="app-container">
        <h1>FreeWeather</h1>
        <SearchWeather />
        <WeatherChart />
      </div>
    </AppContextProvider>
  );
}

export default App;
