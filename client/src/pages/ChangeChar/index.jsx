import { useContext } from 'react';
import styles from './ChangeChar.module.css';
import { AuthContext } from '../../contexts/auth';

export default function ChangeChar(){
    const { user, update } = useContext(AuthContext);

    const brick_wall = process.env.PUBLIC_URL + "/assets/brick-wall2.jpg";
    const background_image2 = process.env.PUBLIC_URL + "/assets/background_2.png";

    const handleClick = (index) => {
        // console.log(index);
        // console.log(user)

        const newUser = {...user, idSkin:index};

        // console.log(newUser);
        update(newUser);
    }

    return (
        <section
            className={styles.background}
            style={{ backgroundImage: `url('${background_image2}'), url('${brick_wall}')` }}
        >
            <div className={styles.content}>
                <h2 className={styles.title}>ESCOLHA SEU PERSONAGEM</h2>
                <div className={styles.characters}>
                    {
                        [...Array(22)].map((x, i) => {
                            let skin = process.env.PUBLIC_URL + `/assets/characters/char_${i+1}.png`;
                            return (
                                <button onClick={() => handleClick(i+1)} key={i+1}>
                                    <img src={skin} alt={`Skin número ${i+1}`}/>
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}