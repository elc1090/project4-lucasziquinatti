import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';

export default function Header() {
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const logo = process.env.PUBLIC_URL + "/assets/logo2.png";

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
			<img className={styles.logo} src={logo} alt='Nome do jogo "Survive in the Apocalypse"' />
			<nav className={styles.navbar}>
				<div>
					<NavLink to={process.env.PUBLIC_URL + '/'}>Home</NavLink>
					<NavLink to={process.env.PUBLIC_URL + '/profile'}>Perfil</NavLink>
				</div>
				<div className={styles.right}>
					<NavLink to={process.env.PUBLIC_URL + '/login'}>Login</NavLink>
					<NavLink to={process.env.PUBLIC_URL + '/cadastro'}>Cadastro</NavLink>
				</div>
			</nav>
		</header>
	);
}