import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/auth";

import styles from "./Login.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login(){
    const { login } = useContext(AuthContext);
    const [user, setUser] = useState({ username:'', password:'' });

    const brick_wall = process.env.PUBLIC_URL + "/assets/brick-wall2.jpg";
    const background_image2 = process.env.PUBLIC_URL + "/assets/background_2.png";

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('submit');
        login(user);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({...user, [e.target.name]:value});
    }

    return(
        <section
            className={styles.login}
            style={{ backgroundImage: `url('${background_image2}'), url('${brick_wall}')` }}
        >
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <h2 className={styles.title}>ENTRAR</h2>
                <Input 
                    handleChange={handleChange}
                    value={user.username}
                    type='text'
                    name='username'
                    id='username'
                    label='Usuário'
                    error={null}
                />
                <Input 
                    handleChange={handleChange}
                    value={user.password}
                    type='password'
                    name='password'
                    id='password'
                    label='Senha'
                    error={null}
                />
                <Button 
                    type='submit'
                    text='Entrar'
                />
            </form>
        </section>
    );
}