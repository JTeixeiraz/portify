import { IoPerson } from "react-icons/io5";
import { BsSuitcaseLgFill } from "react-icons/bs";
import "./home.css";
function Home(){
    return (
        <div>
            <h1 className="title">Portify</h1>
            <div id="card-portifolio-styles">
                <div className="card-1">
                    <IoPerson />
                    <h2 className="style-title">Portifolio Pessoal</h2>
                    <p>
                    Ideal para quem deseja compartilhar sua trajetória 
                    de forma simples e autêntica. Perfeito para 
                    apresentar sua história, interesses e personalidade
                    em um site leve, moderno e fácil de personalizar.
                    </p>
                </div> 
                <div className="card-2">
                    <BsSuitcaseLgFill />
                    <h2 className="style-title">Portifolio Profissional</h2>
                    <p>
                    Desenvolvido para destacar suas habilidades, 
                    projetos e experiências de forma profissional e 
                    impactante. Inclui seções de portfólio, contato 
                    e currículo, com diversas opções de personalização 
                    para valorizar seu trabalho.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home;