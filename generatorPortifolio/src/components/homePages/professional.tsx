import { useRef, useState } from "react";
import "./personal.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

function Professional(){
        const nameRef = useRef<HTMLInputElement>(null);
        const placeRef = useRef<HTMLInputElement>(null);
        const descriptionRef = useRef<HTMLInputElement>(null);
        const instaRef = useRef<HTMLInputElement>(null);
        const linkedinRef = useRef<HTMLInputElement>(null);
        const [exp, setExp] = useState<string[]>([""]);
        const [academic, setAcademic] = useState<string[]>([""]);
        const [project, setProject] = useState<{title: string; description: string; link:string}[]>([{title: "", description: "", link: ""}]);
        const [selectedColor, setSelectedColor] = useState<string>("");
        const [selectedLayout, setSelectedLayout] = useState<string>("top");

        //Isso e quando for enviar tudo
        //NAO ESQUECER DO CODIGO FETCH PARA CONECTAR COM A API
        function handleSubmit(e: React.FormEvent) {
            e.preventDefault();
            const filteredExpArray = exp.map((h) => h.trim()).filter((h) => h !== "");
            if (filteredExpArray.length === 0) {
                alert("Você precisa adicionar pelo menos um hobby.");
                return;
            }
            const filteredAcademicArray = academic.map((h)=> h.trim()).filter((h) => h!== "")
            const name = nameRef.current?.value || "";
            const place = placeRef.current?.value || "";
            const description = descriptionRef.current?.value || "";
            const insta = instaRef.current?.value || "";
            const linkedin = linkedinRef.current?.value || "";
            if (name === "" || description === "" || place === "" || insta === "" || linkedin === "") {
                alert("Não deixe os campos em branco");
                return;
            }
            const payload ={
                type:"Professional",
                name,
                place,
                description,
                insta,
                linkedin,
                experiences:filteredExpArray,
                academic: filteredAcademicArray,
                projects: project,
                layout: selectedLayout,
                color: selectedColor,
                image: localStorage.getItem("PortifolioImage") || ""
            };
            fetch("http://localhost:3000/generateProfessional",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(payload),
            })
            .then((res)=> res.json())
            .then((res)=>{
                console.log(res);
                alert("Portifolio enviado com sucesso")
            })
            .catch((erro)=>{
                console.log(erro);
                alert("Erro ao enviar portifólio")
            })
        }

        const handleProjectChange = (index:number, field: "title" | "description" | "link",value:string) =>{
            const projectUpdates = [...project];
            projectUpdates[index][field] = value;
            setProject(projectUpdates);
        }
    
        const handleAddInputProject = ()=>{
            setProject([...project, {title: "", description: "", link: "" }])
        }
        const handleDeleteInputProject = () =>{
            if(project.length>1){
                const deleteProjectArray = project.slice(0, -1);
                setProject(deleteProjectArray);
            }
        }

        const handleAcademicChange = (index:number, value: string) =>{
            const academicUpdated = [...academic]
            academicUpdated[index] = value;
            setAcademic(academicUpdated);
        }
        const handleAddInputAcademic = ()=>{
            setAcademic([...academic, ""]);
        }
        const handleDeleteInputAcademic = ()=>{
            if(academic.length >1){
                const deletedAcademicArray = academic.slice(0, -1);
                setAcademic(deletedAcademicArray);
            }else{
                alert("Você precisa adicionar pelo menos uma formação")
            }
        }

        const handleExpirienceChange = (index: number, value: string) => {
            const updated = [...exp];
            updated[index] = value;
            setExp(updated);
        };
    
        const handleAddInputHobbie = () => {
            setExp([...exp, ""]);
        };
    
        const handleDeleteInputHobbie = () => {
            if (exp.length > 1) {
                const deletedArray = exp.slice(0, -1);
                setExp(deletedArray);
            } else {
                alert("Você precisa adicionar pelo menos um hobby!");
            }
        };
    
        //esta setando a img no local storage!!! Nao precisa colcoar no handle submit
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
                        <h1>Para começar o seu portifolio, vamos começar com o seu nome ou o nome da sua empresa:</h1>
                        <input type="text" placeholder="nome..." ref={nameRef} />
                    </div>
                    <div className="input-box">
                        <h1>Adicione seu cargo profissional:</h1>
                        <input type="text" placeholder="nome..." ref={placeRef} />
                    </div>
                    <div className="input-box">
                        <h1>Adicione um breve resumo sobre você:</h1>
                        <input type="text" placeholder="descrição..." ref={descriptionRef} />
                    </div>
                    <div className="input-box">
                        <h1>Agora vamos inserir uma foto sua ou a logo da sua empresa</h1>
                        <input type="file" accept="image" onChange={handleImageChange}/>
                    </div>
                    <hr />
                    <div className="input-box">
                        <h1>Vamos adicionar sua experiência profissional:</h1>
                        {exp.map((experience, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder={`#${index + 1}`}
                                    value={experience}
                                    onChange={(e) => handleExpirienceChange(index, e.target.value)}
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
                        <h1>Vamos adicionar sua formação academica:</h1>
                        {academic.map((academic, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder={`#${index + 1}`}
                                    value={academic}
                                    onChange={(e) => handleAcademicChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        <div id="buttons-more-menos">
                            <button type="button" onClick={handleAddInputAcademic}>
                                +
                            </button>
                            <button type="button" onClick={handleDeleteInputAcademic}>
                                -
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="input-box">
                        <h1>Agora vamos adicionar os seus projetos:</h1>
                        {project.map((proj, index) => (
                            <div className="project-box" key={index}>
                                <div className="grup-project">
                                <label>Nome do projeto:</label>
                                <input
                                    type="text"
                                    placeholder="Nome do projeto..."
                                    className="input-project"
                                    value={proj.title}
                                    onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                                />
                                </div>
                                <div className="grup-project">
                                <label>Descrição do projeto</label>
                                <input
                                    type="text"
                                    placeholder="Descrição do projeto..."
                                    className="input-project"
                                    value={proj.description}
                                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                                />
                                </div>
                                <div className="grup-project">
                                <label>Link do projeto</label>
                                <input
                                    type="text"
                                    placeholder="URL..."
                                    className="input-project"
                                    value={proj.link}
                                    onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                                />
                                </div>
                            </div>
                            ))}
                        <div id="buttons-more-menos">
                            <button type="button" onClick={handleAddInputProject}>
                                +
                            </button>
                            <button type="button" onClick={handleDeleteInputProject}>
                                -
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="input-box">
                        <h1>Agora, informe suas redes sociais</h1>
                        <div className="social-media-group">
                            <FaInstagram id="insta-logo" />
                            <input type="text" placeholder="@ do instagram:" ref={instaRef}/>
                        </div>
                        <div className="social-media-group">
                            <CiLinkedin id="insta-logo" />
                            <input type="text" placeholder="UserName do LinkedIn:" ref={linkedinRef}/>
                        </div>
                    </div>
                    <div className="input-box">
                        <h1>Agora nos informe suas formas de contato</h1>
                        <div className="social-media-group">
                            <FaWhatsapp id="insta-logo" />
                            <input type="text" placeholder="(xx) xxxxx-xxxx:" />
                        </div>
                        <div className="social-media-group">
                            <FiPhone id="insta-logo" />
                            <input type="text" placeholder="(xx) xxxxx-xxxx:" />
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

export default Professional;