import "./register.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    if (auth) {
      console.log("Auth inicializado:", auth);
      setAuthInitialized(true);
    } else {
      console.error("Auth não inicializado corretamente");
    }
  }, []);

  async function createUserDoc (user : User){
    const userRef = doc(db, "users", user.uid);
      await setDoc(userRef,{
        email: user.email,
        status:"free",
        plan: "free"
      });
  }

  function handleRegisterButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Botão de registro clicado");
    if (!authInitialized) {
      console.error("Autenticação não inicializada ainda");
      alert("Sistema de autenticação não está pronto. Tente novamente em alguns instantes.");
      return;
    }
    
    const confirm = confirmPasswordRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const email = emailRef.current?.value || "";
    
    console.log("Email:", email);
    console.log("Senha coincide:", password === confirm);
    if (!email) {
      alert("Por favor, insira um email.");
      return;
    }
    
    if (password === "") {
      alert("Por favor, insira uma senha.");
      return;
    } 
    if (confirm !== password) {
      alert("A senha inserida em confirmar senha não condiz com a senha passada no campo senha.");
      return;
    } 
    setIsLoading(true);   
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("Usuário registrado com sucesso:", userCredential.user);
        await createUserDoc(userCredential.user);
        alert("Conta criada com sucesso! Redirecionando para a página de login...");
        setTimeout(() => {
          console.log("Navegando para /login");
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        console.error("Erro ao registrar:", error.code, error.message);
        let mensagemErro = "Erro ao registrar: ";
        switch(error.code) {
          case 'auth/email-already-in-use':
            mensagemErro += "Este email já está em uso.";
            break;
          case 'auth/invalid-email':
            mensagemErro += "Email inválido.";
            break;
          case 'auth/weak-password':
            mensagemErro += "Senha muito fraca.";
            break;
          case 'auth/configuration-not-found':
            mensagemErro += "Problema na configuração do Firebase. Por favor, tente novamente mais tarde.";
            break;
          default:
            mensagemErro += error.message;
        }
        
        alert(mensagemErro);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div id="box-login">
      <h1 id="portify">Portify</h1>
      <form>
        <div className="form-input-group">
          <label>Email</label>
          <input type="email" name="" id="user-email" ref={emailRef} />
        </div>
        <div className="form-input-group">
          <label>Senha</label>
          <input type="password" name="" id="user-password" ref={passwordRef} />
        </div>
        <div className="form-input-group">
          <label>Confirmar Senha</label>
          <input type="password" name="" id="user-confirm-password" ref={confirmPasswordRef} />
        </div>
        <div className="form-input-group button-group">
          <button
            id="button-login"
            onClick={handleRegisterButton}
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrar"}
          </button>
        </div>
        <div style={{marginTop: '15px', textAlign: 'center'}}>
          <a href="/login" style={{color: '#007bff', textDecoration: 'none'}}>
            Já tem uma conta? Faça login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;