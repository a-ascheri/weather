import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { getWeatherByCity } from "../services/weather";

import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  flexGrow: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 2),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const PlainIconButton = styled(IconButton)(() => ({
  color: "inherit",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&:focus": {
    outline: "none",
  },
}));

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
      setError("No se registró consulta.");
      setWeather(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WbSunnyIcon sx={{ mr: 1 }} />
          <Search>
            <StyledInputBase
              placeholder="Buscar ciudad..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              inputProps={{ "aria-label": "buscar ciudad" }}
            />
          </Search>
          <PlainIconButton onClick={handleSearch}>
            <SearchIcon />
          </PlainIconButton>
        </Toolbar>
      </AppBar>

      {error && <p style={{ color: "red", margin: "1rem" }}>{error}</p>}

      {weather && (
        <Box sx={{ p: 2 }}>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icono del clima"
          />
        </Box>
      )}
    </Box>
  );
}
