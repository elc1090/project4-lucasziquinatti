import { useEffect, useState } from "react";
import { getRanking } from "../../services/api";

import styles from './Ranking.module.css';

export default function Ranking(){
    const [rank, setRanking] = useState(null);

    useEffect(() => {
        const ranking = async () => {
            const response = await getRanking();
            setRanking(response.data.rank);
        }
        ranking();
    }, []);

    return(
        <section className={styles.rank}>
            <h2 className={styles.title}>Ranking</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Usuário</th>
                        <th>Tempo Sobrevivido</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rank ?
                        rank.map((player, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td>#{index + 1}</td>
                                    <td>{player.username}</td>
                                    <td>{parseInt(player.bestTime / 60)}min e {parseInt(player.bestTime % 60)}s</td>
                                </tr>
                            )
                        }):
                        <tr>
                            <td colSpan={3}>Carregando ...</td>
                        </tr>
                    }
                </tbody>
            </table>
        </section>
    );
}