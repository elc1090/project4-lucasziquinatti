import styles from './Button.module.css';

export default function Button({ type, text, onClick = null}){
    return(
        <div className={styles.actions}>
            <button
                type={type}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}