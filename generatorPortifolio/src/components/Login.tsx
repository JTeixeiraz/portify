import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { UserCredential } from "firebase/auth";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function verifyPaidUser(uid: string) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("Usuario existe");
      const data = userSnap.data();
      if (data.status === "paid") {
        navigate("/home");
      } else {
        navigate("/plano");
      }
    } else {
      console.log(
        "Erro no código, usuário passou pela verificação de login mas não existe no Doc do firestore"
      );
    }
  }

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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        console.log("Login bem-sucedido", userCredential.user);
        alert("Login realizado com sucesso!");
        verifyPaidUser(userCredential.user.uid);
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
      <h1 id="portify">Portify</h1>
      <form>
        <div className="form-input-group">
          <label>Email</label>
          <input type="email" id="user-email" ref={emailRef} />
        </div>
        <div className="form-input-group">
          <label>Senha</label>
          <input type="password" id="user-password" ref={passwordRef} />
        </div>
        <div className="form-input-group button-group">
          <button
            id="button-login"
            onClick={loginfunctionality}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Login"}
          </button>
          <button type="button" onClick={goToRegister}>
            Cadastro
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
