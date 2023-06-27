import styles from './Input.module.css';

export default function Input({ handleChange, value, type, name, id, label, error }){
    return (
        <div className={`${styles.field} ${error? styles.fieldError : ''}`}>
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} id={id} value={value} onChange={handleChange}/>
        </div>
    );
}