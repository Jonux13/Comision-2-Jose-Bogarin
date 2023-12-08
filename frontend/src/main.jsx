import ReactDOM from 'react-dom/client'
import Modal from 'react-modal';
import AppRouter from './AppRouter'
import './Header.css'
import './HomePage.css'
import './PostPage.css'
import './PostCard.css'
import './ModalForm.css'; 
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
// import 'bootstrap/dist/css/bootstrap.min.css'

Modal.setAppElement('#root');


ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
 </AuthProvider>
)
