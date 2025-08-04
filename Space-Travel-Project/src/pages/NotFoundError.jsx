import { Link, useRouteError } from 'react-router-dom'

const NotFoundError = () => {
    const error = useRouteError();
    return (
        <div className="not-found-error">
            <h2>Error</h2>
            <p>{error.message}</p>
            <Link to='/'>Back to Home</Link>
        </div>
    )
    
}

export default NotFoundError;