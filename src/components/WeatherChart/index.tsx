import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = () => {
  const { city, hasSearched } = useAppContext();
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Solo ejecuta si el usuario hizo una búsqueda
    if (!hasSearched || !city) {
      return;
    }

    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const filteredData = data.list.filter((item: any) => {
          const date = new Date(item.dt * 1000);
          return date < tomorrow;
        });

        const labels = filteredData.map((item: any) =>
          new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        );
        const temperatures = filteredData.map((item: any) => item.main.temp); // <- importante usar filteredData acá

        setChartData({
          labels,
          datasets: [
            {
              label: 'Temperatura (°C)',
              data: temperatures,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, hasSearched]);

  if (!hasSearched) return null;

  return (
    <div>
      <h2>Pronóstico del Clima</h2>
      {loading && <p>Cargando datos del clima...</p>}
      {chartData ? <Line data={chartData} /> : <p>No hay datos disponibles</p>}
    </div>
  );
};

export default WeatherChart;
