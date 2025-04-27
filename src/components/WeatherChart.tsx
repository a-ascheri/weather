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
import { useAppContext } from '../context/AppContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = () => {
  const { city } = useAppContext();
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica si la ciudad está definida
    if (!city) {
      setLoading(false);
      return;
    }
    // Función para obtener los datos del clima
    const fetchWeatherData = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
         // Cambia esto por la ciudad que desees
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        // Procesa los datos para el gráfico
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const filteredData = data.list.filter((item: any) => {
          const date = new Date(item.dt * 1000);
            return date < tomorrow;
        });
        const labels = filteredData.map((item: any) =>
          new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        );
        const temperatures = data.list.map((item: any) => item.main.temp);

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
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (loading) {
    return <p>Cargando datos del clima...</p>;
  }

  return (
    <div>
      <h2>Pronóstico del Clima</h2>
      {chartData ? <Line data={chartData} /> : <p>No se pudieron cargar los datos.</p>}
    </div>
  );
};

export default WeatherChart;