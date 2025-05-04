import { useRef, useState } from "react";
import "./personal.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

function Professional() {
    const nameRef = useRef<HTMLInputElement>(null);
    const placeRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const instaRef = useRef<HTMLInputElement>(null);
    const linkedinRef = useRef<HTMLInputElement>(null);

    const [exp, setExp] = useState<string[]>([""]);
    const [academic, setAcademic] = useState<string[]>([""]);
    const [project, setProject] = useState<{ title: string; description: string; link: string }[]>([
        { title: "", description: "", link: "" },
    ]);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedLayout, setSelectedLayout] = useState<string>("top");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const name = nameRef.current?.value.trim() || "";
        const place = placeRef.current?.value.trim() || "";
        const description = descriptionRef.current?.value.trim() || "";
        const insta = instaRef.current?.value.trim() || "";
        const linkedin = linkedinRef.current?.value.trim() || "";

        if (!name || !place || !description || !insta || !linkedin) {
            alert("Não deixe os campos em branco");
            return;
        }

        const filteredExp = exp.map((e) => e.trim()).filter((e) => e);
        const filteredAcademic = academic.map((a) => a.trim()).filter((a) => a);

        if (filteredExp.length === 0) {
            alert("Você precisa adicionar pelo menos uma experiência.");
            return;
        }

        const payload = {
            type: "Professional",
            name,
            place,
            description,
            insta,
            linkedin,
            experiences: filteredExp,
            academic: filteredAcademic,
            projects: project,
            layout: selectedLayout,
            color: selectedColor,
            image: localStorage.getItem("PortifolioImage") || ""
        };

        fetch("http://localhost:3000/generateProfessional", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        .then((res) => res.json())
        .then(() => alert("Portfólio enviado com sucesso"))
        .catch(() => alert("Erro ao enviar portfólio"));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result as string;
                localStorage.setItem("PortifolioImage", imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value);
        localStorage.setItem("PortifolioColor", e.target.value);
    };

    const handleLayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLayout(e.target.value);
        localStorage.setItem("PortifolioLayout", e.target.value);
    };

    const handleProjectChange = (index: number, field: "title" | "description" | "link", value: string) => {
        const updated = [...project];
        updated[index][field] = value;
        setProject(updated);
    };

    const handleAddInputProject = () => setProject([...project, { title: "", description: "", link: "" }]);
    const handleDeleteInputProject = () => project.length > 1 && setProject(project.slice(0, -1));

    const handleAcademicChange = (index: number, value: string) => {
        const updated = [...academic];
        updated[index] = value;
        setAcademic(updated);
    };

    const handleAddInputAcademic = () => setAcademic([...academic, ""]);
    const handleDeleteInputAcademic = () => {
        academic.length > 1
            ? setAcademic(academic.slice(0, -1))
            : alert("Você precisa adicionar pelo menos uma formação.");
    };

    const handleExperienceChange = (index: number, value: string) => {
        const updated = [...exp];
        updated[index] = value;
        setExp(updated);
    };

    const handleAddInputExperience = () => setExp([...exp, ""]);
    const handleDeleteInputExperience = () => {
        exp.length > 1
            ? setExp(exp.slice(0, -1))
            : alert("Você precisa adicionar pelo menos uma experiência.");
    };

    return (
        <form id="form-personal" onSubmit={handleSubmit}>
            {/* Nome, Cargo, Descrição */}
            <div className="input-box">
                <h1>Nome ou nome da empresa:</h1>
                <input type="text" placeholder="nome..." ref={nameRef} />
            </div>
            <div className="input-box">
                <h1>Cargo profissional:</h1>
                <input type="text" placeholder="cargo..." ref={placeRef} />
            </div>
            <div className="input-box">
                <h1>Resumo sobre você:</h1>
                <input type="text" placeholder="descrição..." ref={descriptionRef} />
            </div>

            {/* Imagem */}
            <div className="input-box">
                <h1>Foto ou logo da empresa:</h1>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            {/* Experiência */}
            <div className="input-box">
                <h1>Experiência profissional:</h1>
                {exp.map((e, i) => (
                    <input key={i} type="text" value={e} onChange={(ev) => handleExperienceChange(i, ev.target.value)} />
                ))}
                <div id="buttons-more-menos">
                    <button type="button" onClick={handleAddInputExperience}>+</button>
                    <button type="button" onClick={handleDeleteInputExperience}>-</button>
                </div>
            </div>

            {/* Formação Acadêmica */}
            <div className="input-box">
                <h1>Formação acadêmica:</h1>
                {academic.map((a, i) => (
                    <input key={i} type="text" value={a} onChange={(ev) => handleAcademicChange(i, ev.target.value)} />
                ))}
                <div id="buttons-more-menos">
                    <button type="button" onClick={handleAddInputAcademic}>+</button>
                    <button type="button" onClick={handleDeleteInputAcademic}>-</button>
                </div>
            </div>

            {/* Projetos */}
            <div className="input-box">
                <h1>Seus projetos:</h1>
                {project.map((p, i) => (
                    <div key={i} className="project-box">
                        <input type="text" placeholder="Nome do projeto..." value={p.title} onChange={(e) => handleProjectChange(i, "title", e.target.value)} />
                        <input type="text" placeholder="Descrição do projeto..." value={p.description} onChange={(e) => handleProjectChange(i, "description", e.target.value)} />
                        <input type="text" placeholder="Link do projeto..." value={p.link} onChange={(e) => handleProjectChange(i, "link", e.target.value)} />
                    </div>
                ))}
                <div id="buttons-more-menos">
                    <button type="button" onClick={handleAddInputProject}>+</button>
                    <button type="button" onClick={handleDeleteInputProject}>-</button>
                </div>
            </div>

            {/* Redes sociais */}
            <div className="input-box">
                <h1>Redes sociais:</h1>
                <div className="social-media-group">
                    <FaInstagram />
                    <input type="text" placeholder="@instagram" ref={instaRef} />
                </div>
                <div className="social-media-group">
                    <CiLinkedin />
                    <input type="text" placeholder="LinkedIn" ref={linkedinRef} />
                </div>
            </div>

            {/* Contato */}
            <div className="input-box">
                <h1>Contato:</h1>
                <div className="social-media-group">
                    <FaWhatsapp />
                    <input type="text" placeholder="WhatsApp" />
                </div>
                <div className="social-media-group">
                    <FiPhone />
                    <input type="text" placeholder="Telefone" />
                </div>
            </div>

            {/* Cor e Layout */}
            <div className="input-box">
                <h1>Cor do portfólio:</h1>
                {["blue", "green", "purple"].map((color) => (
                    <label key={color}>
                        <input type="radio" name="color" value={color} checked={selectedColor === color} onChange={handleColorChange} />
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                    </label>
                ))}
            </div>

            <div className="input-box">
                <h1>Layout do portfólio:</h1>
                {["top", "side", "none"].map((layout) => (
                    <label key={layout}>
                        <input type="radio" name="layout" value={layout} checked={selectedLayout === layout} onChange={handleLayoutChange} />
                        {layout}
                    </label>
                ))}
            </div>

            <button type="submit">Continuar</button>
        </form>
    );
}

export default Professional;
