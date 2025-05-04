import { useRef, useState } from "react";
import "./personal.css";
import { FaInstagram } from "react-icons/fa";
import { PiTiktokLogo } from "react-icons/pi";

function Personal() {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HTMLInputElement>(null);
    const instaRef =  useRef<HTMLInputElement>(null);
    const tiktokRef = useRef<HTMLInputElement>(null);
    const [hobbies, setHobbies] = useState<string[]>([""]);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedLayout, setSelectedLayout] = useState<string>("top");

    //Isso e quando for enviar tudo
    //NAO ESQUECER DO CODIGO FETCH PARA CONECTAR COM A API
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const filteredHobbiesArray = hobbies.map((h) => h.trim()).filter((h) => h !== "");
        if (filteredHobbiesArray.length === 0) {
            alert("Você precisa adicionar pelo menos um hobby.");
            return;
        }
        const history = historyRef.current?.value || "";
        const name = nameRef.current?.value || "";
        const insta = instaRef.current?.value || "";
        const tiktok = tiktokRef.current?.value || "";
        const description = descriptionRef.current?.value || "";
        if (name === "" || description === "") {
            alert("Não deixe os campos em branco");
            return;
        }
        const payload={
            type: "Personal",
            name,
            description,
            history,
            image: localStorage.getItem("PortifolioImage") || "",
            hobbies: hobbies,
            insta: insta,
            tiktok: tiktok,
            color: selectedColor,
            layout: selectedLayout,
        }
        try {
            const response = await fetch("http://localhost:3000/generatePersonal",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json();
            if(response.ok){
                console.log(data);
                alert("Portifolio gerado com sucesso")
                const url = data.url;
                if(url){
                    window.location.href = url;
                }
            }else{
                alert("Erro ao gerar portifólio.");
            }
        } catch (error) {
            alert("Erro ao enviar portifólio.")
        }
        

    }

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

    

    return (

            <form id="form-personal">
                <div className="input-box">
                    <h1>Para começar o seu portifolio, vamos começar com o seu nome:</h1>
                    <input type="text" placeholder="seu nome aqui..." ref={nameRef} />
                </div>
                <div className="input-box">
                    <h1>Escreva uma breve descrição, fale sobre você com poucas palavras:</h1>
                    <input type="text" placeholder="descrição..." ref={descriptionRef} />
                </div>
                <div className="input-box">
                    <h1>Conte sobre você, sua historia e oque te move:</h1>
                    <input type="text" placeholder="descrição..." ref={historyRef} />
                </div>
                <div className="input-box">
                    <h1>Envie uma foto sua</h1>
                    <h4>Caso deseje não inserir, apenas deixe em branco</h4>
                    <input type="file" accept="image" onChange={handleImageChange} />
                </div>
                <hr />
                <div className="input-box">
                    <h1>Quais são seus hobbies ou interesses?</h1>
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
                    <h1>Agora nos informe suas redes sociais</h1>
                    <div className="social-media-group">
                        <FaInstagram id="insta-logo" />
                        <input type="text" placeholder="@ do instagram:" ref={instaRef}/>
                    </div>
                    <div className="social-media-group">
                        <PiTiktokLogo id="insta-logo" />
                        <input type="text" placeholder="@ do TikTok:" ref={tiktokRef}/>
                    </div>
                </div>
                <hr />
                <div className="input-box">
                    <h1>Selecione a cor principal do seu portifolio</h1>
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
                    <h1>Escolha o layout do seu portifolio</h1>
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
