import firebase from "firebase/compat/app";
import "./login.css";
import '@fontsource/roboto/400.css'; // Regular
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Login(){
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    function loginfunctionality(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(response =>{
                console.log('funcionou' , response);
                //jogar o navigate aqui e redirecionar
            }).catch(error=>{
                alert("usuário não encontrado!\n"+error.code)
            })
    }

function goToRegister(){
    navigate("/register");
}
    return(
        <div id="box-login">
            <h1>Portify</h1>
            <form>
                <div className="form-input-group">
                    <label>Email</label>
                    <input type="email" name="" id="user-email" ref={emailRef}/>
                </div>
                <div className="form-input-group">
                    <label>Senha</label>
                    <input type="password" name="" id="user-password" ref={passwordRef}/>
                </div>
                <div className="form-input-group button-group">
                    <button id="button-login" onClick={loginfunctionality}>Login</button>
                    <button type="button" onClick={goToRegister}>Cadastro</button>
                </div>
            </form>
        </div>
    )
}
export default Login;