"use client";
import { createContext, useContext, useState, useMemo } from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeModeContext = createContext();

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: mode === 'dark' ? '#181818' : '#fff',
      paper: mode === 'dark' ? '#232323' : '#fff',
    },
  },
  typography: {
    fontFamily: 'var(--font-numans), Arial, sans-serif',
  },
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function ClientProvider({ children }) {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}