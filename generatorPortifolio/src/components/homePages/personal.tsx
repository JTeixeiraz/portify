import { useRef, useState } from "react";
import "./personal.css";
import { FaInstagram } from "react-icons/fa";
import { PiTiktokLogo } from "react-icons/pi";

function Personal() {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [hobbies, setHobbies] = useState<string[]>([""]);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedLayout, setSelectedLayout] = useState<string>("top");

    const handleHobbiesChange = (index: number, value: string) => {
        const updated = [...hobbies];
        updated[index] = value;
        setHobbies(updated);
    };

    const handleAddInputHobbie = () => {
        setHobbies([...hobbies, ""]);
    };

    const handleDeleteInputHobbie = () => {
        if (hobbies.length > 1) {
            const deletedArray = hobbies.slice(0, -1);
            setHobbies(deletedArray);
        } else {
            alert("Você precisa adicionar pelo menos um hobby!");
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const loadedimage = reader.result as string;
                localStorage.setItem("PortifolioImage", loadedimage);
            };
            reader.readAsDataURL(file);
        }
    };

    //Isso salva cor
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value);
        localStorage.setItem("PortifolioColor", e.target.value);
    };

    //isso salva layout
    const handleLayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLayout(e.target.value);
        localStorage.setItem("PortifolioLayout", e.target.value); 
    };

    //Isso e quando for enviar tudo
    //NAO ESQUECER DO CODIGO FETCH PARA CONECTAR COM A API
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const filteredHobbiesArray = hobbies.map((h) => h.trim()).filter((h) => h !== "");
        if (filteredHobbiesArray.length === 0) {
            alert("Você precisa adicionar pelo menos um hobby.");
            return;
        }
        const name = nameRef.current?.value || "";
        const description = descriptionRef.current?.value || "";
        if (name === "" || description === "") {
            alert("Não deixe os campos em branco");
            return;
        }
        localStorage.setItem("PortifolioHobbies", JSON.stringify(filteredHobbiesArray));
        localStorage.setItem("PortifolioName", name);
        localStorage.setItem("PortifolioDescription", description);
    }

    return (

            <form>
                <div className="input-box">
                    <h3>Para começar o seu portifolio, vamos começar com o seu nome:</h3>
                    <input type="text" placeholder="seu nome aqui..." ref={nameRef} />
                </div>
                <div className="input-box">
                    <h3>Agora vamos Inserir uma breve descrição, fale sobre você com poucas palavras:</h3>
                    <input type="text" placeholder="descrição..." ref={descriptionRef} />
                </div>
                <div className="input-box">
                    <h3>Agora vamos inserir uma foto sua</h3>
                    <h4>Caso deseje não inserir, apenas deixe em branco</h4>
                    <input type="file" accept="image" onChange={handleImageChange} />
                </div>
                <hr />
                <div className="input-box">
                    <h3>Quais são seus hobbies ou interesses?</h3>
                    {hobbies.map((hobby, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder={`Hobby #${index + 1}`}
                                value={hobby}
                                onChange={(e) => handleHobbiesChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <div id="buttons-more-menos">
                        <button type="button" onClick={handleAddInputHobbie}>
                            +
                        </button>
                        <button type="button" onClick={handleDeleteInputHobbie}>
                            -
                        </button>
                    </div>
                </div>
                <hr />
                <div className="input-box">
                    <h3>Agora nos informe suas redes sociais</h3>
                    <div className="social-media-group">
                        <FaInstagram id="insta-logo" />
                        <input type="text" placeholder="@ do instagram:" />
                    </div>
                    <div className="social-media-group">
                        <PiTiktokLogo id="insta-logo" />
                        <input type="text" placeholder="@ do TikTok:" />
                    </div>
                </div>
                <hr />
                <div className="input-box">
                    <h3>Selecione a cor principal do seu portifolio</h3>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="blue"
                                checked={selectedColor === "blue"}
                                onChange={handleColorChange}
                            />
                            Azul
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="green"
                                checked={selectedColor === "green"}
                                onChange={handleColorChange}
                            />
                            Verde
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="color"
                                value="purple"
                                checked={selectedColor === "purple"}
                                onChange={handleColorChange}
                            />
                            Roxo
                        </label>
                    </div>
                </div>

    
                <div className="input-box">
                    <h3>Escolha o layout do seu portifolio</h3>
                    <div className="layout-options">
                        <div className="layout-option layout-top">
                            <div className="layout-radio">
                                <input
                                    type="radio"
                                    name="layout"
                                    id="layout-top"
                                    value="top"
                                    checked={selectedLayout === "top"}
                                    onChange={handleLayoutChange}
                                />
                            </div>
                            <label htmlFor="layout-top">Layout com cabeçalho no topo</label>
                            <div className="layout-preview">
                                <div className="header"></div>
                                <div className="content">
                                    <div className="content-main"></div>
                                    <div className="content-side"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="layout-option layout-side">
                            <div className="layout-radio">
                                <input
                                    type="radio"
                                    name="layout"
                                    id="layout-side"
                                    value="side"
                                    checked={selectedLayout === "side"}
                                    onChange={handleLayoutChange}
                                />
                            </div>
                            <label htmlFor="layout-side">Layout com cabeçalho lateral</label>
                            <div className="layout-preview">
                                <div className="header"></div>
                                <div className="content">
                                    <div className="content-main"></div>
                                    <div className="content-side"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="layout-option layout-none">
                            <div className="layout-radio">
                                <input
                                    type="radio"
                                    name="layout"
                                    id="layout-none"
                                    value="none"
                                    checked={selectedLayout === "none"}
                                    onChange={handleLayoutChange}
                                />
                            </div>
                            <label htmlFor="layout-none">Layout sem cabeçalho</label>
                            <div className="layout-preview">
                                <div className="content-main"></div>
                                <div className="content-side"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" onClick={handleSubmit}>
                    Continuar
                </button>
            </form>

    );
}

export default Personal;
