import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@emotion/react'
import { theme } from './Theme/mainTheme.tsx'
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
         <App />
      </Provider>
    </ThemeProvider>
    
  </StrictMode>,
)
