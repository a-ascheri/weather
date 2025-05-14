import { useAppContext } from "@context/AppContext";
import { useState } from "react";
import { getWeatherByCity } from "@services/weather";
import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import "./styles.scss";

export default function SearchWeather() {
  const {
    city,
    setCity,
    setHasSearched,
    setLastSearchedCity
  } = useAppContext();

  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Por favor, ingrese una ciudad.");
      setHasSearched(false); // <- oculta el gráfico
      setLastSearchedCity(""); // <- resetea
      setWeather(null);
      return;
    }

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setHasSearched(true); // <- activa el gráfico
      setLastSearchedCity(city); // <- guarda la ciudad confirmada
      setError("");
    } catch (err) {
      setError("No se encontró la ciudad.");
      setWeather(null);
      setHasSearched(false);
      setLastSearchedCity("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box className="search-weather">
      <AppBar position="static" className="search-weather__appbar">
        <Toolbar className="search-weather__toolbar">
          <LocationCityIcon className="search-weather__icon" />
          <Box className="search-weather__input-wrapper">
            <InputBase
              className="search-weather__input"
              placeholder="Buscar ciudad"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              inputProps={{ "aria-label": "buscar ciudad" }}
            />
          </Box>
          <IconButton
            onClick={handleSearch}
            className="search-weather__search-button"
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {error && <p className="search-weather__error">{error}</p>}

      {weather && (
        <div className="search-weather__result">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icono del clima"
          />
        </div>
      )}
    </Box>
  );
}
