import { AppContextProvider } from "./context/AppContext";
import SearchWeather from "./components/SearchWeather";
import WeatherChart from './components/WeatherChart';
import "./App.css";


// funcion principal llamada desde main.tsx por App
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

/* 
function App() es la funcion principal de la aplicacion
que se encarga de renderizar todos los componentes
y de manejar la logica de la aplicacion.
Es un componente React, que retorna JSX.
que JSX es como HTML pero mas poderoso.
Se usa un provider llamado AppContextProvider.

------------------------------------------
<div className="app-container"> es un contenedor que se encarga de
darle estilo a la aplicacion y de centrarla en la pantalla.

------------------------------------------
<AppContextProvider
es el contexto de la aplicacion la envuelve completamente,
se encarga de manejar el estado global de la aplicacion
y de compartirlo entre los componentes.

------------------------------------------
<SearchWeather
es el componente que se encarga de buscar el clima
y de mostrarlo en la aplicacion.

------------------------------------------
<WeatherChart
es el componente que se encarga de mostrar el grafico
del clima y de mostrarlo en la aplicacion.

------------------------------------------
export default App; es la exportacion del componente App
que se encarga de exportar el componente App
para que pueda ser utilizado en otros archivos.

App es el componente principal de la aplicacion
que contiene toda la logica y el diseño de la aplicacion.
es el componente principal de la aplicacion
que se renderiza en el contenedor root.
Todo lo que está dentro de <App /> se inyecta en el #root del HTML.
*/