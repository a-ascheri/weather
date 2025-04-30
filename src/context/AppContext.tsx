import React, { createContext, useContext, useState, ReactNode } from 'react';

//1 - propiedades del contexto
interface AppContextProps {
    city: string;
    setCity: (city: string) => void;
}

//2 - creacion del contexto
const AppContext = createContext<AppContextProps | undefined>(undefined);

//3 - propiedades del proveedor
interface AppContextProviderProps {
    children: ReactNode;
}

//4 - creacion proveedor del contexto
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [city, setCity] = useState<string>('');

    return (
        <AppContext.Provider value={{ city, setCity }}>
            {children}
        </AppContext.Provider>
    );
};

//5 - hook para utilizar el contexto
export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

/*
1 - interface AppContextProps {
es una interfaz que define las propiedades del contexto
que se encarga de manejar el estado global de la aplicacion
y de compartirlo entre los componentes.
Define qué datos/funciones estarán disponibles en el contexto 
(en este caso, city y su setter setCity).
city: string;
es una propiedad que se encarga de almacenar la ciudad
que se va a buscar en la aplicacion. tipo string.
setCity: (city: string) => void;
}

------------------------------------------
2 - const AppContext = createContext<AppContextProps | undefined>(undefined);
es la creacion del contexto de la aplicacion
que se encarga de manejar el estado global de la aplicacion
y de compartirlo entre los componentes.
- AppContext es el "objeto contexto" que se usará para proveer y consumir los datos.
- Se inicializa con undefined porque inicialmente no hay Provider 
(y TypeScript obliga a manejar el caso undefined en el hook personalizado).

------------------------------------------
3 - interface AppContextProviderProps {
    children: ReactNode;
}
es una interfaz que define las propiedades del proveedor
- El Provider acepta children (componentes hijos que tendrán acceso al contexto).
esto es necesario para que el proveedor pueda renderizar
los componentes hijos y compartir el contexto con ellos.

------------------------------------------
4 - export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
const [city, setCity] = useState<string>('');
es la funcion principal del proveedor
que se encarga de renderizar todos los componentes
y de manejar la logica de la aplicacion.
    return (
        <AppContext.Provider value={{ city, setCity }}>
            {children}
        </AppContext.Provider>
    );
};
es el proveedor del contexto de la aplicacion
- El Provider crea el estado (city y setCity) usando useState.
- Este estado se pasa como value al AppContext.Provider.
- Todos los hijos (children) podrán acceder a estos valores mediante useAppContext.
Se encarga de manejar el estado global de la aplicacion
y de compartirlo entre los componentes.

------------------------------------------
5 - export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};
es el hook que se encarga de utilizar el contexto de la aplicacion
y de compartirlo entre los componentes.
- Propósito: Simplificar el consumo del contexto y asegurar que se use dentro de un Provider.
- Si no hay Provider arriba en el árbol de componentes, lanza un error claro.
Si no se encuentra el contexto lanza un error que indica que el hook debe ser utilizado
dentro de un proveedor de contexto.
*/