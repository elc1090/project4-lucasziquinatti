import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Button from '../../components/Button';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import aluraLogo from './alura-logo.svg';
import unityLogo from './unity-logo.svg';

export default function Home(){
    const navigate = useNavigate();
    const { authenticated } = useContext(AuthContext);

    const background_image = process.env.PUBLIC_URL + "/assets/background.png";
    const background_image2 = process.env.PUBLIC_URL + "/assets/background_2.png";
    const logo = process.env.PUBLIC_URL + "/assets/logo2.png";
    const brick_wall = process.env.PUBLIC_URL + "/assets/brick-wall3.jpg";

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
                    {
                        authenticated ?
                        <>
                            <Button 
                                text='Acessar Perfil'
                                onClick={() => changePage('profile')}
                            />
                        </>:
                        <>
                            <Button 
                                text='Entrar'
                                onClick={() => changePage('login')}
                            />
                            <Button 
                                text='Criar conta'
                                onClick={() => changePage('cadastro')}
                            />
                        </>
                    }
                    
                </div>
            </div>
            <div
                className={styles.about}
                style={{ backgroundImage: `url('${background_image2}'), url('${brick_wall}')` }}
            >
                <div className={styles.text}>
                    <h2>Sobre o Jogo</h2>
                    <p>Este jogo foi desenvolvido como um projeto dos cursos de "Desenvolvimento de Jogos" ofertado pela Alura. Todos os assets utilizados no jogo são apenas para fins educacionais.</p>
                    <p>O jogo foi desenvolvido através da Game Engine Unity e a API WebGL.</p>
                    <div className={styles.links}>
                        <Link className={styles.alura} to={'https://www.alura.com.br/formacao-jogos-unity'}>
                            <img src={aluraLogo} alt='Link para os cursos de Unity no site da Alura'/>
                        </Link>
                        <Link className={styles.unity} to={'https://unity.com/pt'}>
                            <img src={unityLogo} alt='Link para o site oficial da Unity'/>
                        </Link>
                    </div>
                    <h2>Sobre a Página Web</h2>
                    <p>Esta página foi construida utilizando a biblioteca React para o Front-End, com a linguagem JavaScript.</p>
                    <p>Enqunto que para o Back-End foi desenvolvida uma API em Express.js, para controlar as requisições de autenticação e conexão com o banco de dados. Para o armazenamento dos dados foi utilizado o MongoDB Atlas.</p>
                </div>
            </div>
        </section>
    );
}