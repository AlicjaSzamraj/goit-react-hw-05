import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className={styles.homeLink}>Go to Home</Link>
    </div>
  );
}

export default NotFoundPage;
