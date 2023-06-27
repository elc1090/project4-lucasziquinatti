import styles from './PopUp.module.css';

export default function PopUp({ message, close }){
    return(
        <div className={styles.popup}>
            <label>{message}</label>
            <button onClick={close}>X</button>
        </div>
    );
}