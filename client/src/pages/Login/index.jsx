import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/auth";

import styles from "./Login.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import PopUp from "../../components/PopUp";

export default function Login(){
    const { login, find, setFind } = useContext(AuthContext);
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
            {!find ? 
                <PopUp
                    message={'Usuário ou Senha incorretos!!!'}
                    close={() => {setFind(true)}}
                />:
                ''
            }
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <h2 className={styles.title}>ENTRAR</h2>
                <Input 
                    handleChange={handleChange}
                    value={user.username}
                    type='text'
                    name='username'
                    id='username'
                    label='Usuário'
                    error={!find}
                />
                <Input 
                    handleChange={handleChange}
                    value={user.password}
                    type='password'
                    name='password'
                    id='password'
                    label='Senha'
                    error={!find}
                />
                <Button 
                    type='submit'
                    text='Entrar'
                />
            </form>
        </section>
    );
}