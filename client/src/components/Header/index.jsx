import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';

export default function Header() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
  
    const controlNavbar = () => {
      if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
          setShow(false); 
        } else { // if scroll up show the navbar
          setShow(true);  
        }
        setLastScrollY(window.scrollY); 
      }
    };
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', controlNavbar);
        return () => {
          window.removeEventListener('scroll', controlNavbar);
        };
      }
    }, [lastScrollY]);

    return (
        <header className={`${styles.header} ${show && styles.hidden}`}>
            <h1>Survive in the Apocalypse</h1>
            <nav className={styles.navbar}>
                <NavLink to={process.env.PUBLIC_URL + '/login'}>Login</NavLink>
            </nav>
        </header>
    );
}