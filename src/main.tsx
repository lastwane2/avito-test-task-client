import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/shared/styles/globals.scss';
import App from '@/App';
import { ThemeProvider } from '@mui/material';
import { theme } from './app/theme';
import "@/shared/styles/carousel.scss"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </StrictMode>,
);
