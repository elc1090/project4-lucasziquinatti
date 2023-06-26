import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/auth";

import styles from "./Login.module.css";

export default function Login(){
    const { login } = useContext(AuthContext);

    const [user, setUser] = useState({ username:'', password:'' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        login(user);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({...user, [e.target.name]:value});
    }

    return(
        <section className={styles.login}>
            <h2 className={styles.title}>Login</h2>
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label htmlFor="username">Usuário</label>
                    <input type='text' name="username" id="username" value={user.username} onChange={handleChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="user">Senha</label>
                    <input type='password' name="password" id="password" value={user.password} onChange={handleChange}/>
                </div>
                <div className={styles.actions}>
                    <button type='submit'>Entrar</button>
                </div>
            </form>
        </section>
    );
}