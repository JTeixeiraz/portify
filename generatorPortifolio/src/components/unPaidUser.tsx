import { useState } from "react";
import "./unPaid.css";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Unpaid() {
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [user, setUser] = useState<User | null>(null);

  // Monitorar usuário autenticado ao carregar a página
  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  });

  const handlePurchase = async () => {
    if (!user) {
      alert("Usuário não autenticado!");
      return;
    }

    const userId = user.uid;
    const email = user.email;

    setIsLoading(true);

    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCodeBase64);
      } else {
        alert("Erro ao criar pagamento");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao tentar realizar a compra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-container">
      <h1>Portify</h1>
      <div className="price-card">
        <div className="price">
          <p id="priceDolar">R$</p>
          <h1 id="priceNumber">5</h1>
        </div>
        <ul>
          <li>Crie portfólios profissionais em poucos cliques</li>
          <li>Modelos prontos e personalizáveis</li>
          <li>Acesso vitalício sem mensalidade</li>
          <li>Suporte técnico rápido e humano</li>
          <li>Atualizações futuras gratuitas</li>
        </ul>
        <button
          className="purchase-button"
          onClick={handlePurchase}
          disabled={isLoading}
        >
          {isLoading ? "Processando..." : "Comprar acesso"}
        </button>
      </div>

      {qrCode && (
        <div className="qr-code-container">
          <h2>Escaneie o QR Code para pagar</h2>
          <img
            src={`data:image/png;base64,${qrCode}`}
            alt="QR Code do pagamento"
          />
        </div>
      )}
    </div>
  );
}

export default Unpaid;
