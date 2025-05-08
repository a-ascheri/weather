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
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  display: "flex",
  alignItems: "center",
  transition: theme.transitions.create("width"),
  width: "auto",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 5), // más padding izquierdo para el ícono
    width: "16ch",
    transition: theme.transitions.create(["width", "background-color"], {
      duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.up("sm")]: {
      "&:focus": {
        width: "20ch",
      },
    },
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
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Sol fijo a la izquierda */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationCityIcon />
          </Box>


          {/* Campo centrado */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Search>
              <PlainIconButton
                onClick={handleSearch}
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "6px",
                  zIndex: 1,
                  pointerEvents: "none", // evita vibraciones al foco
                }}
              >
                <SearchIcon />
              </PlainIconButton>
              <StyledInputBase
                placeholder="Buscar ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                inputProps={{ "aria-label": "buscar ciudad" }}
              />
            </Search>
          </Box>
          {/* Caja vacía para balancear el layout */}
          <Box sx={{ width: "40px" }} />
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
