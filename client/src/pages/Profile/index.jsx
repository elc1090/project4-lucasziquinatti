import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import styles from './Profile.module.css';
import Ranking from "../../components/Ranking";
import { useNavigate } from "react-router-dom";

export default function Profile(){
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const skin = process.env.PUBLIC_URL + `/assets/characters/char_${user.idSkin}.png`;

    const changePage = (path) => {
        navigate(`/${path}`);
    }

    return (
        <>
            <section className={styles.profile}>
                <div className={styles.char}>
                    <img src={skin} alt="Skin do personagem"/>
                </div>
                <div className={styles.infos}>
                    <p className={styles.username}>{user.username}</p>
                    <p className={styles.time}>MELHOR TEMPO<br></br>{parseInt(user.bestTime / 60)}min e {parseInt(user.bestTime % 60)}s</p>
                    <div className={styles.options}>
                        <button onClick={() => changePage('change')}>Mudar Personagem</button>
                        <button onClick={() => changePage('game')}>Jogar</button>
                    </div>
                </div>
            </section>
            <section>
                <Ranking />
            </section>
        </>
    );
}