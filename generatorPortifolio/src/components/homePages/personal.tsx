import "./personal.css";
function Personal(){
    return(
        <div>
            <form>
                <div className="input-box">
                    <h3>Para começar o seu portifolio, vamos começar com o seu nome:</h3>
                    <input type="text" placeholder="seu nome aqui..."/>
                </div>
                <div className="input-box">
                    <h3>Agora vamos Inserir uma breve descrição, fale sobre você com poucas palavras:</h3>
                    <input type="text" placeholder="descrição..."/>
                </div>
                <div className="input-box">
                    <h3>Agora vamos inserir uma foto sua</h3>
                    <h4>Caso deseje não inserir, apenas deixe em branco</h4>
                    <input type="image" />
                </div>
            </form>
        </div>
    )
}

export default Personal;