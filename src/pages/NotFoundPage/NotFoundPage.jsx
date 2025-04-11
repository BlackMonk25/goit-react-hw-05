import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={styles.notFoundPage}>
    <h1>Page Not Found</h1>
    <Link to="/">Go Back to Home</Link>
  </div>
);

export default NotFoundPage;
