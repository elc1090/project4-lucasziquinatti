import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

import aluraLogo from './alura-logo.svg';
import unityLogo from './unity-logo.svg';

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
            <div className={styles.text}>
                <h2>Sobre o Jogo</h2>
                <p>Este produto foi desenvolvido apenas para fins educacionais, não havendo retorno financeiro de qualquer meio.</p>
                <p>O jogo foi desenvolvido para fins de estudo, através dos cursos disponibilizados pela plataforma Alura.</p>
                <p>O desenvolvimento do jogo foi realizado com a Engine Unity.</p>
                <div className={styles.links}>
                    <Link to={'https://www.alura.com.br/formacao-jogos-unity'}>
                        <img src={aluraLogo} alt='Link para os cursos de Unity no site da Alura'/>
                    </Link>
                    <Link to={'https://unity.com/pt'}>
                        <img src={unityLogo} alt='Link para o site oficial da Unity'/>
                    </Link>
                    
                </div>
            </div>
        </section>
    );
}