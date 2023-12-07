import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter'
import './Header.css'
import './HomePage.css'
import './PostPage.css'
import './PostCard.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
// import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
 </AuthProvider>
)
