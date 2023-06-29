import UnityGame from "../../components/UnityGame";

import styles from './Game.module.css';

export default function Game() {
    const brick_wall = process.env.PUBLIC_URL + "/assets/brick-wall2.jpg";
    const background_image2 = process.env.PUBLIC_URL + "/assets/background_2.png";

    return (
        <section
            className={styles.game}
            style={{ backgroundImage: `url('${background_image2}'), url('${brick_wall}')` }}
        >
            <UnityGame />

        </section>
    );
}