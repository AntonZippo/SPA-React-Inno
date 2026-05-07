import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='notFoundPage'>
      <h1>Page not found 404</h1>
      <Link to="/">Back to the main</Link>
    </div>
  );
};

export default NotFound;