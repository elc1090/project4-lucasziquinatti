import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/auth";

import styles from "./SignUp.module.css";
import Input from "../../components/Input";
import PopUp from "../../components/PopUp";

export default function SignUp(){
    const { signup, exist, setExist } = useContext(AuthContext);

    const [user, setUser] = useState({ username:'', password:'', rep_password:'' });
    const [errorPass, setErrorPass] = useState(false);
    const [errorUser, setErrorUser] = useState(false);
    const [messagePass, setMessagePass] = useState('');
    const [messageUser, setMessageUser] = useState('');

    useEffect(() => {
        if(exist){
            setErrorUser(true);
            setMessageUser('Este usuário já está cadastrado!');
        }
    }, [exist])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(user.username === '' || user.username.trim() === ''){
            setErrorUser(true);
            setMessageUser('O campo de usuário não deve ficar em branco!');
            return;
        }

        if(user.password.length <= 3){
            setErrorPass(true);
            setMessagePass('A senha deve conter mais de 3 dígitos!');
            return;
        }
        else if(user.password !== user.rep_password){
            setErrorPass(true);
            setMessagePass('As senhas não são iguais!');
            return;
        }

        signup(user);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({...user, [e.target.name]:value});
    }

    return(
        <section className={styles.signup}>
            {errorPass ? 
                <PopUp
                    message={messagePass}
                    close={() => {setErrorPass(false)}}
                />:
                ''
            }
            {errorUser ? 
                <PopUp
                    message={messageUser}
                    close={() => {
                        setErrorUser(false);
                        setExist(false);
                    }}
                />:
                ''
            }
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <h2 className={styles.title}>CRIAR CONTA</h2>
                <Input 
                    handleChange={handleChange}
                    value={user.username}
                    type='text'
                    name='username'
                    id='username'
                    label='Usuário'
                    error={errorUser}
                />
                <Input 
                    handleChange={handleChange}
                    value={user.password}
                    type='password'
                    name='password'
                    id='password'
                    label='Senha'
                    error={errorPass}
                />
                <Input 
                    handleChange={handleChange}
                    value={user.rep_password}
                    type='password'
                    name='rep_password'
                    id='rep_password'
                    label='Repita a senha'
                    error={errorPass}
                />
                <div className={styles.actions}>
                    <button type='submit'>Cadastrar</button>
                </div>
            </form>
        </section>
    );
}