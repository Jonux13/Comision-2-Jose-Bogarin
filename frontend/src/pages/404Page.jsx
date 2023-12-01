import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div>
        <h1>404</h1>
        <p>Not Found</p>
        
        <Link to="/">Go to Home</Link>
    </div>
  )
}

export default NotFoundPage