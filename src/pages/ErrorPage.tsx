import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
        <h1>Oops! Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="text-blue-500 hover:text-blue-600">
        Go back to the home page
        </Link>
    </div>
  )
}

export default ErrorPage