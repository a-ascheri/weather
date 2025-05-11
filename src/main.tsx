import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

// Inicia React 18+ y renderiza la aplicación en el contenedor root HTML
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/*
createRoot(document.getElementById('root')!).render(
Es la forma moderna de iniciar React 18+. y la forma moderna de 
renderizar una aplicacion en react. 
Es lo mismo que hacer ReactDOM.render lo cual es la forma 
antigua de renderizar una aplicacion en react para evitar problemas
de rendimiento y errores de renderizado.

------------------------------------------
StrictMode es un componente que ayuda a detectar problemas
en la aplicacion y no se renderiza en produccion.
(solo afecta en modo dev)

------------------------------------------
App es el componente principal de la aplicacion
que contiene toda la logica y el diseño de la aplicacion que se 
renderiza en el contenedor root.
Todo lo que está dentro de <App /> se inyecta en el #root del HTML.
*/