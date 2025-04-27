import { useState } from "react";
import { getWeatherByCity } from "../services/weather";
import { useAppContext } from "../context/AppContext";

export default function SearchWeather() {
  const { city, setCity } = useAppContext();
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setError("");
    } catch (err) {
      setError("No se pudo obtener el clima.");
      setWeather(null);
    }
  };

  return (
    <div>
      <h2>Buscar clima</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ej: Buenos Aires"
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icono del clima"
          />
        </div>
      )}
    </div>
  );
}
