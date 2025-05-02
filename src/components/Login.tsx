import "./login.css";
import '@fontsource/roboto/400.css'; // Regular
// Importar a autenticação do seu arquivo firebase.ts
import { auth } from '../firebase';
// Importar as funções da API modular
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  function loginfunctionality(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Botão de login clicado");
    
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    
    if (!email || !password) {
      alert("Por favor, preencha email e senha");
      return;
    }
    
    setIsLoading(true);
    
    // Usar a API modular para fazer login
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Login bem-sucedido', userCredential.user);
        alert("Login realizado com sucesso!");
        // Redirecionar para dashboard ou página principal
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Erro de login:", error.code, error.message);
        alert("Usuário não encontrado!\n" + error.message);
        setIsLoading(false);
      });
  }
  
  function goToRegister() {
    console.log("Navegando para registro...");
    navigate("/register");
  }

  return (
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
          <button 
            id="button-login" 
            onClick={loginfunctionality}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Login"}
          </button>
          <button 
            type="button" 
            onClick={goToRegister}
          >
            Cadastro
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;