import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
 </AuthProvider>
)
