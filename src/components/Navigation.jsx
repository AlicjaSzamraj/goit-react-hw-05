import { NavLink } from "react-router-dom";
import styles from "../styles/Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
