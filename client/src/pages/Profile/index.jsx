import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import styles from './Profile.module.css';
import Ranking from "../../components/Ranking";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function Profile(){
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const skin = process.env.PUBLIC_URL + `/assets/characters/char_${user.idSkin}.png`;
    const brick_wall = process.env.PUBLIC_URL + "/assets/brick-wall2.jpg";
    const background_image2 = process.env.PUBLIC_URL + "/assets/background_2.png";

    const changePage = (path) => {
        navigate(`/${path}`);
    }

    return (
        <div 
            className={styles.background}
            style={{ backgroundImage: `url('${background_image2}'), url('${brick_wall}')` }}
        >
            <section className={styles.profile}>
                <div className={styles.char}>
                    <img src={skin} alt="Skin do personagem"/>
                </div>
                <div className={styles.infos}>
                    <p className={styles.username}>{user.username}</p>
                    <p className={styles.time}>MELHOR TEMPO<br></br>{parseInt(user.bestTime / 60)}min e {parseInt(user.bestTime % 60)}s</p>
                    <div className={styles.options}>
                        <Button 
                            text='Mudar Personagem'
                            onClick={() => changePage('change')}
                        />
                        <Button 
                            text='Jogar'
                            onClick={() => changePage('game')}
                        />
                    </div>
                </div>
            </section>
            <Ranking />
        </div>
    );
}