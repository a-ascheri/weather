const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeatherByCity(city: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
  );

  if (!response.ok) {
    throw new Error("Ciudad no encontrada");
  }

  return await response.json();
}
