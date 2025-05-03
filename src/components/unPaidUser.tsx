import "./unPaid.css";
function Unpaid(){
    return(
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
            <button className="purchase-button">Comprar acesso</button>
          </div>
        </div>
    )
}


export default Unpaid;