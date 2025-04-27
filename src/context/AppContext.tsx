import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
    city: string;
    setCity: (city: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [city, setCity] = useState<string>('');

    return (
        <AppContext.Provider value={{ city, setCity }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};