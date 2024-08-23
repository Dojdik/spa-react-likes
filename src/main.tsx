import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { SnackbarProvider } from 'notistack'



createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
)
