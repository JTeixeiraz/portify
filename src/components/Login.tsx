import firebase from "firebase/compat/app";
import "./login.css";
import '@fontsource/roboto/400.css'; // Regular
const emailInput = document.getElementById("user-email") as HTMLInputElement;
const passwordInput = document.getElementById("user-password") as HTMLInputElement;
function loginfunctionality(){
    const email = emailInput.value;
    const password = passwordInput.value;
    firebase.auth().signInWithEmailAndPassword(email,password)
        .then(response =>{
            console.log('funcionou');
        }).catch(error=>{
            alert("usuário não encontrado!\n"+error.code)
        })
}

function Login(){
    return(
        <div id="box-login">
            <h1>Portify</h1>
            <form>
                <div className="form-input-group">
                    <label>Email</label>
                    <input type="email" name="" id="user-email" />
                </div>
                <div className="form-input-group">
                    <label>Senha</label>
                    <input type="password" name="" id="user-password" />
                </div>
                <div className="form-input-group button-group">
                    <button>Login</button>
                    <button>Cadastrar</button>
                </div>
            </form>
        </div>
    )
}
export default Login;