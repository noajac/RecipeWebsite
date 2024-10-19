import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import styles from './Navbar.module.css'; // CSS for styling the navbar
import logo from '../project-logo.png'; // Import your logo

const Navbar = () => {
  const { user } = useAuthContext(); // Access user information

  return (
    <nav className={styles.navbar}>
      {/* Add Logo and Home link */}
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.homeLink}>
          <img src={logo} alt="Project Logo" className={styles.logo} /> {/* Logo image */}
        </Link>
        <Link to="/" className={styles.homeLink}>Home</Link> {/* Home link */}
      </div>

      {/* If user is logged in, show their email and a log out button */}
      {user && (
        <div className={styles.userSection}>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
