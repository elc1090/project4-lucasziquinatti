import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function Header() {
	const { authenticated, logout } = useContext(AuthContext);

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

	const exit = () => {
		logout();
	}

	return (
		<header className={`${styles.header} ${show && styles.hidden}`}>
			<img className={styles.logo} src={logo} alt='Nome do jogo "Survive in the Apocalypse"' />
			<nav className={styles.navbar}>
				<div>
					<NavLink to={process.env.PUBLIC_URL + '/'}>PRINCIPAL</NavLink>
					<NavLink to={process.env.PUBLIC_URL + '/profile'}>PERFIL</NavLink>
				</div>
				<div className={styles.right}>
					{ authenticated ?
						<button
							className={styles.exit}
							onClick={exit}
						>SAIR</button>:
						<>
							<NavLink to={process.env.PUBLIC_URL + '/login'}>ENTRAR</NavLink>
							<NavLink to={process.env.PUBLIC_URL + '/cadastro'}>CRIAR CONTA</NavLink>
						</>
					}
				</div>
			</nav>
		</header>
	);
}