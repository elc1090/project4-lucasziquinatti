import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home(){
    const navigate = useNavigate();

    const background_image = process.env.PUBLIC_URL + "/assets/background.png";
    const background_image2 = process.env.PUBLIC_URL + "/assets/background_2.png";
    const logo = process.env.PUBLIC_URL + "/assets/logo2.png";

    const changePage = (path) => {
        navigate(`/${path}`);
    }

    return(
        <section>
            <div
                className={styles.content}
                style={{ backgroundImage: `url('${background_image2}'), url('${background_image}')` }}
            >
                <img className={styles.logo} src={logo} alt='Nome do jogo "Survive in the Apocalypse"'/>
                <div className={styles.options}>
                    <button onClick={() => changePage('login')}>Logar</button>
                    <button onClick={() => changePage('cadastro')}>Cadatrar-se</button>
                </div>
            </div>
            <div>
                <p>Texto explicativo</p>
            </div>
        </section>
    );
}