const express = require('express');
const path = require("path");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;


app.use(express.json());


app.post ("/generateProfessional", async (req, res)=>{
    const {
        type,
        name,
        place,
        description,
        insta,
        linkedin,
        experiences,
        academic,
        projects,
        layout,
        color,
        image    
    } = req.body;

    if (type === "Professional") {
        let htmlProfessionalContent = ``;
        let cssProfessioanlContent = ``;
        const destinyDirectory = path.join(__dirname, 'output', `build-${Date.now()}`);
        if(!fs.existsSync(destinyDirectory)) fs.mkdirSync(destinyDirectory);
        if(layout === "top"){
            htmlProfessionalContent = `
                <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Portfólio - ${name}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#experiencia">Experiência</a></li>
        <li><a href="#formacao">Formação</a></li>
        <li><a href="#projetos">Projetos</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="sobre" class="section full-screen">
      <div class="container">
        <img src="${image}" alt="" class="profile-img" />
        <h1>${name}</h1>
        <h2>${place}</h2>
        <p class="descricao">
        ${description}
        </p>
        <div class="social">
          <a href="https://www.linkedin.com/in/${linkedin}/">LinkedIn</a>
          <a href="https://www.instagram.com/${insta}/">Instagram</a>
        </div>
      </div>
    </section>

   <!-- EXPERIÊNCIA -->
<section id="experiencia" class="section full-screen light">
    <div class="container">
      <h2>Experiências Profissionais</h2>
      <ul class="timeline">
      ${
        experiences.map((exp) => `<li><span></span>${exp}</li>`).join("")
       }
      </ul>
    </div>
  </section>
  
  <!-- FORMAÇÃO -->
  <section id="formacao" class="section full-screen">
    <div class="container">
      <h2>Formação e Competências Acadêmicas</h2>
      <ul class="timeline">
      ${
        academic.map((aca) => `<li><span></span>${aca}</li>`)
      }
      </ul>
    </div>
  </section>
  
  <!-- PROJETOS -->
  <section id="projetos" class="section full-screen light">
    <div class="container">
      <h2>Projetos</h2>
      <div class="cards glass-grid">
      ${projects.map((p)=>`
        <div class="card glass">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <a href="${p.link}" target="_blank">Ver Projeto</a> 
        </div>
        `)}
      </div>
    </div>
  </section>
  </main>
</body>
</html>

            `;
            cssProfessioanlContent = `
                :root {
    --cor-primaria: #0A192F;
    --cor-secundaria: ${color};
    --cor-fundo: #F0F4F8;
    --cor-fundo-clara: #ffffff;
    --cor-texto: #111;
    --cor-texto-claro: #fff;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: var(--cor-fundo);
    color: var(--cor-texto);
    scroll-behavior: smooth;
  }
  
  header {
    background-color: var(--cor-primaria);
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 999;
  }
  
  nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
    gap: 2rem;
  }
  
  nav a {
    color: var(--cor-secundaria);
    text-decoration: none;
    font-weight: 600;
    transition: 0.3s ease;
  }
  
  nav a:hover {
    color: white;
  }
  
  .section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    text-align: center;
  }
  
  .full-screen {
    min-height: 100vh;
  }
  
  .section.light {
    background-color: var(--cor-fundo-clara);
  }
  
  .container {
    max-width: 800px;
    width: 100%;
  }
  
  .profile-img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: 3px solid var(--cor-secundaria);
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: var(--cor-primaria);
    margin-bottom: 1rem;
  }
  
  .descricao {
    font-size: 1.1rem;
    margin: 1rem auto;
    max-width: 600px;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
    margin-top: 1rem;
    text-align: left;
  }
  
  ul li {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  .social {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .social a {
    color: var(--cor-primaria);
    text-decoration: none;
    font-weight: bold;
    background-color: var(--cor-secundaria);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: 0.3s ease;
  }
  
  .social a:hover {
    opacity: 0.8;
  }
  
  /* --- Timeline para Experiência e Formação --- */
.timeline {
    list-style: none;
    padding-left: 0;
    margin-top: 2rem;
    position: relative;
  }
  
  .timeline li {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1.2rem;
    font-size: 1.1rem;
    line-height: 1.4;
  }
  
  .timeline li span {
    position: absolute;
    left: 0;
    top: 0.4rem;
    width: 10px;
    height: 10px;
    background-color: var(--cor-secundaria);
    border-radius: 50%;
  }
  
  /* --- Cards para Projetos --- */
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .card {
    background-color: var(--cor-fundo);
    padding: 1.5rem;
    border-left: 5px solid var(--cor-secundaria);
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    border-radius: 8px;
    transition: transform 0.2s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .card h3 {
    margin-bottom: 0.5rem;
    color: var(--cor-primaria);
  }
  
  .card p {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }
  
  .card a {
    background-color: var(--cor-secundaria);
    color: var(--cor-primaria);
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-weight: bold;
    display: inline-block;
  }
  /* --- Glassmorphism Cards em Grid Responsivo --- */
.glass-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .card.glass {
    background: rgba(45, 57, 59, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 1.5rem;
    color: var(--cor-texto);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
  }
  
  .card.glass:hover {
    transform: translateY(-6px);
  }
  
  .card.glass h3 {
    color: var(--cor-primaria);
    margin-bottom: 0.5rem;
  }
  
  .card.glass p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .card.glass a {
    display: inline-block;
    text-decoration: none;
    background-color: var(--cor-secundaria);
    color: var(--cor-primaria);
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: background-color 0.3s ease;
  }
  
  .card.glass a:hover {
    background-color: #52e2c1;
  }
  
  /* Suporte a telas menores */
  @media (max-width: 600px) {
    .card.glass {
      padding: 1rem;
    }
  }
            `
        }
        if(layout === "side"){
            htmlProfessionalContent = `
            <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Portfólio - ${name}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="name-container">
        <span class="dot"></span>
        <h1 class="name">${name}</h1>
      </div>
      <nav>
        <a href="#about">Sobre</a>
        <a href="#experience">Experiência</a>
        <a href="#education">Formação Acadêmica</a>
        <a href="#projects">Projetos</a>
        <a href="#social">Redes Sociais</a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <!-- Seção Sobre -->
      <section class="profile" id="about">
        <img src="${image}" class="profile-img" alt="" />
        <h2>Sobre Mim</h2>
        <p>${description}</p>

      <!-- Seção Experiência -->
      <section id="experience">
        <h2>Experiência</h2>
        <ul>
        ${
            experiences.map((exp) => `<li><span></span>${exp}</li>`).join("")
        }
        </ul>
      </section>

      <!-- Seção Formação Acadêmica -->
      <section id="education">
        <h2>Formação Acadêmica</h2>
        <ul>
        ${
            academic.map((aca) => `<li><span></span>${aca}</li>`)
        }
        </ul>
      </section>

      <!-- Seção Projetos -->
      <section id="projects">
        <h2>Projetos</h2>
        <div class="cards">
                ${projects.map((p)=>`
        <div class="card glass">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <a href="${p.link}" target="_blank">Ver Projeto</a> 
        </div>
        `)}
        </div>
      </section>

      <!-- Seção Redes Sociais -->
      <section id="social">
        <h2>Redes Sociais</h2>
        <p><a href="https://www.linkedin.com/in/${linkedin}/">LinkedIn</a></p>
        <p><a href="https://www.instagram.com/${insta}/">Instagram</a></p>
      </section>
    </main>
  </div>
</body>
</html>

            `;
            cssProfessioanlContent = `
                :root {
    --primary-color: ${color}; /* Cor primária (altere conforme necessário) */
    --text-dark: #222;
    --text-medium: #444;
    --text-light: #666;
    --bg-color: #fafafa;
    --card-bg: #fff;
    --border-color: #e0e0e0;
    --transition-speed: 0.3s;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-medium);
    display: flex;
    min-height: 100vh;
    line-height: 1.6;
  }
  
  .container {
    display: flex;
    width: 100%;
  }
  
  .sidebar {
    width: 250px;
    padding: 2.5rem 1.75rem;
    background-color: var(--primary-color);
    color: #fff;
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 3rem;
    position: sticky;
    top: 0;
    height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
  }
  
  .name-container {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform var(--transition-speed);
  }
  
  .name-container:hover .dot {
    transform: scale(1.2);
  }
  
  .name {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  
  nav {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  nav a {
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
    transition: all var(--transition-speed);
    position: relative;
    padding: 0.5rem 0;
  }
  
  nav a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width var(--transition-speed);
  }
  
  nav a:hover {
    color: var(--text-dark);
    transform: translateX(4px);
  }
  
  nav a:hover::after {
    width: 20px;
  }
  
  .content {
    flex: 1;
    padding: 3.5rem 5rem;
    overflow-y: auto;
    max-width: 1000px;
  }
  
  section {
    margin-bottom: 4rem;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .profile-img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border: 4px solid white;
    transition: transform var(--transition-speed);
  }
  
  .profile-img:hover {
    transform: scale(1.05);
  }
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    position: relative;
    padding-bottom: 0.6rem;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: var(--primary-color);
  }
  
  p, li {
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding-left: 0.5rem;
    margin: 1rem 0;
  }
  
  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.7rem;
  }
  
  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--primary-color);
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--transition-speed);
  }
  
  a:hover {
    color: var(--primary-color);
  }
  
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .card {
    background-color: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform var(--transition-speed);
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .card h3 {
    color: var(--primary-color);
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .card p {
    margin-bottom: 1rem;
  }
  
  .card a {
    text-decoration: none;
    font-weight: 600;
    color: var(--primary-color);
    transition: color var(--transition-speed);
  }
  
  .card a:hover {
    color: var(--text-dark);
  }
  
  /* Responsividade */
  @media (max-width: 1200px) {
    .content {
      padding: 3rem 4rem;
    }
  }
  
  @media (max-width: 900px) {
    .container {
      flex-direction: column;
    }
  
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
      padding: 2rem;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
    }
  
    .content {
      padding: 2rem;
    }
  }
  
  @media (max-width: 600px) {
    html {
      font-size: 14px;
    }
  
    .content {
      padding: 1.5rem;
    }
  
    .profile-img {
      width: 120px;
      height: 120px;
    }
  }
  
            `;
        }
        if(layout === "none"){
            htmlProfessionalContent = `
            <!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Portfólio - ${name}</title>
<link rel="stylesheet" href="style.css" />
</head>
<body>
<main>
<section id="sobre" class="section full-screen">
  <div class="container">
    <img src="${image}" alt="" class="profile-img" />
    <h1>${name}</h1>
    <h2>${place}</h2>
    <p class="descricao">
    ${description}
    </p>
    <div class="social">
      <a href="https://www.linkedin.com/in/${linkedin}/">LinkedIn</a>
      <a href="https://www.instagram.com/${insta}/">Instagram</a>
    </div>
  </div>
</section>

<!-- EXPERIÊNCIA -->
<section id="experiencia" class="section full-screen light">
<div class="container">
  <h2>Experiências Profissionais</h2>
  <ul class="timeline">
  ${
    experiences.map((exp) => `<li><span></span>${exp}</li>`).join("")
   }
  </ul>
</div>
</section>

<!-- FORMAÇÃO -->
<section id="formacao" class="section full-screen">
<div class="container">
  <h2>Formação e Competências Acadêmicas</h2>
  <ul class="timeline">
  ${
    academic.map((aca) => `<li><span></span>${aca}</li>`)
  }
  </ul>
</div>
</section>

<!-- PROJETOS -->
<section id="projetos" class="section full-screen light">
<div class="container">
  <h2>Projetos</h2>
  <div class="cards glass-grid">
  ${projects.map((p)=>`
    <div class="card glass">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <a href="${p.link}" target="_blank">Ver Projeto</a> 
    </div>
    `)}
  </div>
</div>
</section>
</main>
</body>
</html>

        `;
        cssProfessioanlContent = `
            :root {
--cor-primaria: #0A192F;
--cor-secundaria: ${color};
--cor-fundo: #F0F4F8;
--cor-fundo-clara: #ffffff;
--cor-texto: #111;
--cor-texto-claro: #fff;
}

* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
font-family: 'Segoe UI', sans-serif;
background-color: var(--cor-fundo);
color: var(--cor-texto);
scroll-behavior: smooth;
}

header {
background-color: var(--cor-primaria);
padding: 1rem 2rem;
position: sticky;
top: 0;
z-index: 999;
}

nav ul {
display: flex;
justify-content: center;
list-style: none;
gap: 2rem;
}

nav a {
color: var(--cor-secundaria);
text-decoration: none;
font-weight: 600;
transition: 0.3s ease;
}

nav a:hover {
color: white;
}

.section {
display: flex;
align-items: center;
justify-content: center;
padding: 3rem 2rem;
text-align: center;
}

.full-screen {
min-height: 100vh;
}

.section.light {
background-color: var(--cor-fundo-clara);
}

.container {
max-width: 800px;
width: 100%;
}

.profile-img {
width: 140px;
height: 140px;
border-radius: 50%;
margin-bottom: 1rem;
border: 3px solid var(--cor-secundaria);
}

h1 {
font-size: 2.5rem;
margin-bottom: 0.5rem;
}

h2 {
font-size: 1.5rem;
color: var(--cor-primaria);
margin-bottom: 1rem;
}

.descricao {
font-size: 1.1rem;
margin: 1rem auto;
max-width: 600px;
}

ul {
list-style: none;
padding-left: 0;
margin-top: 1rem;
text-align: left;
}

ul li {
margin-bottom: 0.5rem;
font-size: 1.1rem;
}

.social {
margin-top: 1rem;
display: flex;
justify-content: center;
gap: 1.5rem;
}

.social a {
color: var(--cor-primaria);
text-decoration: none;
font-weight: bold;
background-color: var(--cor-secundaria);
padding: 0.5rem 1rem;
border-radius: 5px;
transition: 0.3s ease;
}

.social a:hover {
opacity: 0.8;
}

/* --- Timeline para Experiência e Formação --- */
.timeline {
list-style: none;
padding-left: 0;
margin-top: 2rem;
position: relative;
}

.timeline li {
position: relative;
padding-left: 2rem;
margin-bottom: 1.2rem;
font-size: 1.1rem;
line-height: 1.4;
}

.timeline li span {
position: absolute;
left: 0;
top: 0.4rem;
width: 10px;
height: 10px;
background-color: var(--cor-secundaria);
border-radius: 50%;
}

/* --- Cards para Projetos --- */
.cards {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
gap: 2rem;
margin-top: 2rem;
}

.card {
background-color: var(--cor-fundo);
padding: 1.5rem;
border-left: 5px solid var(--cor-secundaria);
box-shadow: 0 4px 8px rgba(0,0,0,0.05);
border-radius: 8px;
transition: transform 0.2s ease;
}

.card:hover {
transform: translateY(-5px);
}

.card h3 {
margin-bottom: 0.5rem;
color: var(--cor-primaria);
}

.card p {
font-size: 0.95rem;
margin-bottom: 1rem;
}

.card a {
background-color: var(--cor-secundaria);
color: var(--cor-primaria);
text-decoration: none;
padding: 0.4rem 0.8rem;
border-radius: 4px;
font-weight: bold;
display: inline-block;
}
/* --- Glassmorphism Cards em Grid Responsivo --- */
.glass-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 2rem;
margin-top: 2rem;
}

.card.glass {
background: rgba(45, 57, 59, 0.1);
border: 1px solid rgba(0, 0, 0, 0.2);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border-radius: 12px;
padding: 1.5rem;
color: var(--cor-texto);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
transition: transform 0.3s ease;
}

.card.glass:hover {
transform: translateY(-6px);
}

.card.glass h3 {
color: var(--cor-primaria);
margin-bottom: 0.5rem;
}

.card.glass p {
font-size: 1rem;
margin-bottom: 1rem;
}

.card.glass a {
display: inline-block;
text-decoration: none;
background-color: var(--cor-secundaria);
color: var(--cor-primaria);
font-weight: bold;
padding: 0.5rem 1rem;
border-radius: 6px;
transition: background-color 0.3s ease;
}

.card.glass a:hover {
background-color: #52e2c1;
}

/* Suporte a telas menores */
@media (max-width: 600px) {
.card.glass {
  padding: 1rem;
}
}
        `
        }
        fs.writeFileSync(path.join(destinyDirectory, 'index.html'), htmlProfessionalContent);
        fs.writeFileSync(path.join(destinyDirectory, 'style.css'), cssProfessioanlContent);
        const files = fs.readdirSync(destinyDirectory).map((filename)=>{
            const filePath = path.join(destinyDirectory, filename);
            const fileBuffer = fs.readFileSync(filePath);
            return{
                file: filename,
                data: fileBuffer.toString('base64'),
            }
        });

        const payload ={
            name: `portifolio-${Date.now()}-${name}`,
            target: 'production',
            files,
        }
        const response = await fetch('https://api.vercel.com/v13/deployments', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${VERCEL_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        const data = await response.json();
        if(!response.ok){
            console.error(data)
            return res.status(500).json({message: "Erro ao fazer deploy", details: data})
        }

        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const GITHUB_USERNAME = "JTeixeiraz";

        const repoName = `portifolio-${Date.now()}-${name}`;

        // 1. Cria o repositório via GitHub API
        const repoResponse = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: repoName,
            description: 'Portfólio gerado automaticamente',
            private: false
          }),
        });

        const repoData = await repoResponse.json();

        if (!repoResponse.ok) {
          console.error("Erro ao criar repositório:", repoData);
          return res.status(500).json({ message: 'Erro ao criar repositório no GitHub', details: repoData });
        }

        // 2. Usa `simple-git` para inicializar, adicionar, commit e push
        const simpleGit = require('simple-git');
        const git = simpleGit(destinyDirectory);

        await git.init();
        await git.addRemote('origin', `https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${repoName}.git`);
        await git.add('.');
        await git.commit('Commit automático do portfólio');
        await git.push('origin', 'main');

        console.log("Repositório criado e arquivos enviados com sucesso!");

        return res.json({
            message:"Deploy feito com sucesso!",
            url: data.url
        })

        fs.rmSync(destinyDirectory, {recursive: true, force:true});
          
    }else{
        res.json({message:"Nao foi possivel encontrar o tipo do arquivo"});
    }
})

app.post ("/generatePersonal" , async(req, res)=>{
    const{
        type,
        name,
        description,
        history,
        image,
        hobbies,
        insta,
        tiktok,
        color,
        layout
    } = req.body;

    if(type === "Personal"){
        //top, side, none
        let htmlPesonalContent = ``;
        let cssPersonalContent = ``;
        const destinyDirectory = path.join(__dirname, 'output', `build-${Date.now()}`);
        if(!fs.existsSync(destinyDirectory)) fs.mkdirSync(destinyDirectory);

        if(layout === "top"){
            htmlPesonalContent = `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Portfólio - ${name}</title>
            <link rel="stylesheet" href="style.css">
            </head>
            <body>

            <header>
                <div class="logo">
                <div class="dot"></div>
                <h1>${name}</h1>
                </div>
                <nav>
                <a href="#home">Início</a>
                <a href="#about">História</a>
                <a href="#hobbies">Hobbies</a>
                <a href="#social">Redes</a>
                </nav>
            </header>

            <main>
                <section class="hero" id="home">
                <div class="profile-pic">
                    <img src="${image}" />
                </div>
                <div class="bio">
                    <h2>${name}</h2>
                    <p>
                    ${description}
                    </p>
                </div>
                </section>

                <section class="about" id="about">
                <h2>Minha História</h2>
                <p>
                ${history}
                </p>
                </section>

                <section class="hobbies" id="hobbies">
                <h2>Hobbies e Interesses</h2>
                <ul>
                   ${
                    hobbies.map((hobbie) => `<li>${hobbie}</li>`).join("")
                   }
                </ul>
                </section>

                <section class="social" id="social">
                <h2>Minhas Redes</h2>
                <a href="https://instagram.com/${insta}/" target="_blank">Instagram</a>
                <a href="https://tiktok.com/@${tiktok}?lang=pt-br" target="_blank">TikTok</a>
                </section>

            </main>

            </body>
            </html>
            `
            cssPersonalContent = `
                :root {
                --bg: #f8f8f8;
                --text: #111;
                --muted: #555;
                --primary: ${color}]};
                --accent1: ${color};
                --accent2: ${color};
                --accent3: ${color};
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                scroll-behavior: smooth;
            }

            body {
                background: var(--bg);
                color: var(--text);
                font-family: 'Segoe UI', sans-serif;
                line-height: 1.6;
            }

            header {
                position: fixed;
                width: 100%;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.096);
                border-bottom: 1px solid #ddd;
                z-index: 1000;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 40px;
            }

            .logo {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .logo .dot {
                width: 12px;
                height: 12px;
                background: var(--primary);
                border-radius: 50%;
            }

            .logo h1 {
                font-size: 1.2rem;
            }

            nav a {
                margin-left: 20px;
                text-decoration: none;
                color: var(--muted);
                font-weight: 500;
                transition: color 0.3s;
            }

            nav a:hover {
                color: var(--text);
            }

            main {
                padding-top: 100px;
            }

            section {
                max-width: 1100px;
                margin: 60px auto;
                padding: 0 20px;
            }

            .hero {
                display: flex;
                flex-wrap: wrap;
                gap: 40px;
                align-items: center;
                justify-content: center;
            }

            .profile-pic {
                flex: 1 1 300px;
                max-width: 300px;
                border-radius: 50%;
                overflow: hidden;
                box-shadow: 0 0 12px rgba(0,0,0,0.1);
            }

            .profile-pic img {
                width: 100%;
                height: auto;
                display: block;
            }

            .bio {
                flex: 2 1 400px;
            }

            .bio h2 {
                font-size: 2rem;
                margin-bottom: 10px;
            }

            .bio h3 {
                font-size: 1.1rem;
                color: var(--muted);
                margin-bottom: 20px;
            }

            .bio p {
                font-size: 1rem;
                color: #333;
            }

            .about, .hobbies, .social {
                margin-top: 80px;
            }

            .about h2,
            .hobbies h2,
            .social h2 {
                font-size: 1.8rem;
                margin-bottom: 20px;
                color: var(--text);
            }

            .about p {
                font-size: 1rem;
                color: #444;
            }

            .hobbies ul {
                list-style: disc;
                padding-left: 20px;
            }

            .hobbies li {
                margin-bottom: 8px;
                color: #333;
            }

            .social a {
                display: inline-block;
                margin-right: 20px;
                font-size: 1rem;
                text-decoration: none;
                color: var(--text);
                border: 2px solid var(--primary);
                border-radius: 30px;
                padding: 10px 20px;
                transition: all 0.3s;
            }

            .social a:hover {
                background: var(--primary);
                color: #fff;
            }

            @media (max-width: 768px) {
                .hero {
                flex-direction: column;
                text-align: center;
                }

                nav {
                display: none;
                }
            }
            `;
        }
        if(layout === "side"){
            htmlPesonalContent = `
                <!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Portfólio - ${name}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <aside class="sidebar">
      <div class="name-container">
        <span class="dot"></span>
        <h1 class="name">${name}</h1>
      </div>
      <nav>
        <a href="#about">Sobre</a>
        <a href="#hobbies">Hobbies</a>
        <a href="#social">Redes</a>
      </nav>
    </aside>

    <main class="content">
      <section class="profile" id="about">
        <img src="${image}" />
        <h2>Sobre Mim</h2>
        <p>
          ${history}
        </p>
      </section>

      <section id="hobbies">
        <h2>Hobbies</h2>
        <ul>
          <${
            hobbies.map((hobbie) => `<li>${hobbie}</li>`).join("")
           }
        </ul>
      </section>

      <section id="social">
        <h2>Redes Sociais</h2>
        <p><a href="https://instagram.com/${insta}/" target="_blank">Instagram</a></p>
        <p><a href="https://tiktok.com/@${tiktok}?lang=pt-br" target="_blank">TikTok</a></p>
      </section>
    </main>
  </div>
</body>
</html>

            `;
            cssPersonalContent = `
                :root {
    --primary-color: ${color};
    --text-dark: #222;
    --text-medium: #444;
    --text-light: #666;
    --bg-color: #fafafa;
    --card-bg: ${color};
    --border-color: ${color};
    --transition-speed: 0.3s;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-medium);
    display: flex;
    min-height: 100vh;
    line-height: 1.6;
  }
  
  .container {
    display: flex;
    width: 100%;
  }
  
  .sidebar {
    width: 250px;
    padding: 2.5rem 1.75rem;
    background-color: var(--card-bg);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 3rem;
    position: sticky;
    top: 0;
    height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
  }
  
  .name-container {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    background-color: var(--primary-color);
    border-radius: 50%;
    transition: transform var(--transition-speed);
  }
  
  .name-container:hover .dot {
    transform: scale(1.2);
  }
  
  .name {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-dark);
    letter-spacing: -0.01em;
  }
  
  nav {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  nav a {
    text-decoration: none;
    color: var(--text-light);
    font-size: 1rem;
    transition: all var(--transition-speed);
    position: relative;
    padding: 0.5rem 0;
  }
  
  nav a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width var(--transition-speed);
  }
  
  nav a:hover {
    color: var(--text-dark);
    transform: translateX(4px);
  }
  
  nav a:hover::after {
    width: 20px;
  }
  
  .content {
    flex: 1;
    padding: 3.5rem 5rem;
    overflow-y: auto;
    max-width: 1000px;
  }
  
  section {
    margin-bottom: 4rem;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .profile-img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border: 4px solid white;
    transition: transform var(--transition-speed);
  }
  
  .profile-img:hover {
    transform: scale(1.05);
  }
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    color: var(--text-dark);
    position: relative;
    padding-bottom: 0.6rem;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: var(--primary-color);
  }
  
  p, li {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text-medium);
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding-left: 0.5rem;
    margin: 1rem 0;
  }
  
  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.7rem;
  }
  
  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--primary-color);
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--transition-speed);
  }
  
  a:hover {
    color: ${color};
    text-decoration: none;
  }
  
  /* Responsividade */
  @media (max-width: 1200px) {
    .content {
      padding: 3rem 4rem;
    }
  }
  
  @media (max-width: 900px) {
    .container {
      flex-direction: column;
    }
    
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
      padding: 2rem;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
    }
    
    .content {
      padding: 2rem;
    }
  }
  
  @media (max-width: 600px) {
    html {
      font-size: 14px;
    }
    
    .content {
      padding: 1.5rem;
    }
    
    .profile-img {
      width: 120px;
      height: 120px;
    }
  }
            `;
        }
        if(layout === "none"){
            htmlPesonalContent = `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Portfólio - ${name}</title>
            <link rel="stylesheet" href="style.css">
            </head>
            <body>

            <header>
                <div class="logo">
                <div class="dot"></div>
                <h1>${name}</h1>
                </div>
                <nav>
                <a href="#home">Início</a>
                <a href="#about">História</a>
                <a href="#hobbies">Hobbies</a>
                <a href="#social">Redes</a>
                </nav>
            </header>

            <main>
                <section class="hero" id="home">
                <div class="profile-pic">
                    <img src="${image}" />
                </div>
                <div class="bio">
                    <h2>${name}</h2>
                    <p>
                    ${description}
                    </p>
                </div>
                </section>

                <section class="about" id="about">
                <h2>Minha História</h2>
                <p>
                  ${history}
                </p>
                </section>

                <section class="hobbies" id="hobbies">
                <h2>Hobbies e Interesses</h2>
                <ul>
                   ${
                    hobbies.map((hobbie) => `<li>${hobbie}</li>`).join("")
                   }
                </ul>
                </section>

                <section class="social" id="social">
                <h2>Minhas Redes</h2>
                <a href="https://instagram.com/${insta}/" target="_blank">Instagram</a>
                <a href="https://tiktok.com/@${tiktok}?lang=pt-br" target="_blank">TikTok</a>
                </section>

            </main>

            </body>
            </html>
            `;
            cssPersonalContent = `
            :root {
            --bg: #f8f8f8;
            --text: #111;
            --muted: #555;
            --primary: ${color}]};
            --accent1: ${color};
            --accent2: ${color};
            --accent3: ${color};
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            scroll-behavior: smooth;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Segoe UI', sans-serif;
            line-height: 1.6;
        }

        header {
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.096);
            border-bottom: 1px solid #ddd;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo .dot {
            width: 12px;
            height: 12px;
            background: var(--primary);
            border-radius: 50%;
        }

        .logo h1 {
            font-size: 1.2rem;
        }

        nav a {
            margin-left: 20px;
            text-decoration: none;
            color: var(--muted);
            font-weight: 500;
            transition: color 0.3s;
        }

        nav a:hover {
            color: var(--text);
        }

        main {
            padding-top: 100px;
        }

        section {
            max-width: 1100px;
            margin: 60px auto;
            padding: 0 20px;
        }

        .hero {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            align-items: center;
            justify-content: center;
        }

        .profile-pic {
            flex: 1 1 300px;
            max-width: 300px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 0 12px rgba(0,0,0,0.1);
        }

        .profile-pic img {
            width: 100%;
            height: auto;
            display: block;
        }

        .bio {
            flex: 2 1 400px;
        }

        .bio h2 {
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .bio h3 {
            font-size: 1.1rem;
            color: var(--muted);
            margin-bottom: 20px;
        }

        .bio p {
            font-size: 1rem;
            color: #333;
        }

        .about, .hobbies, .social {
            margin-top: 80px;
        }

        .about h2,
        .hobbies h2,
        .social h2 {
            font-size: 1.8rem;
            margin-bottom: 20px;
            color: var(--text);
        }

        .about p {
            font-size: 1rem;
            color: #444;
        }

        .hobbies ul {
            list-style: disc;
            padding-left: 20px;
        }

        .hobbies li {
            margin-bottom: 8px;
            color: #333;
        }

        .social a {
            display: inline-block;
            margin-right: 20px;
            font-size: 1rem;
            text-decoration: none;
            color: var(--text);
            border: 2px solid var(--primary);
            border-radius: 30px;
            padding: 10px 20px;
            transition: all 0.3s;
        }

        .social a:hover {
            background: var(--primary);
            color: #fff;
        }

        @media (max-width: 768px) {
            .hero {
            flex-direction: column;
            text-align: center;
            }

            nav {
            display: none;
            }
        }
        `;

        }

        fs.writeFileSync(path.join(destinyDirectory, 'index.html'), htmlPesonalContent);
        fs.writeFileSync(path.join(destinyDirectory, 'style.css'), cssPersonalContent);
        const files = fs.readdirSync(destinyDirectory).map((filename)=>{
            const filePath = path.join(destinyDirectory, filename);
            const fileBuffer = fs.readFileSync(filePath);
            return{
                file: filename,
                data: fileBuffer.toString('base64'),
            }
        });

        const payload ={
            name: `portifolio-${Date.now()}-${name}`,
            target: 'production',
            files,
        }
        const response = await fetch('https://api.vercel.com/v13/deployments', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${VERCEL_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        const data = await response.json();
        if(!response.ok){
            console.error(data)
            return res.status(500).json({message: "Erro ao fazer deploy", details: data})
        }
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const GITHUB_USERNAME = "JTeixeiraz";

        const repoName = `portifolio-${Date.now()}-${name}`;

        // 1. Cria o repositório via GitHub API
        const repoResponse = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: repoName,
            description: 'Portfólio gerado automaticamente',
            private: false
          }),
        });

        const repoData = await repoResponse.json();

        if (!repoResponse.ok) {
          console.error("Erro ao criar repositório:", repoData);
          return res.status(500).json({ message: 'Erro ao criar repositório no GitHub', details: repoData });
        }

        // 2. Usa `simple-git` para inicializar, adicionar, commit e push
        const simpleGit = require('simple-git');
        const git = simpleGit(destinyDirectory);

        await git.init();
        await git.addRemote('origin', `https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${repoName}.git`);
        await git.add('.');
        await git.commit('Commit automático do portfólio');
        await git.push('origin', 'main');

        console.log("Repositório criado e arquivos enviados com sucesso!");


        return res.json({
            message:"Deploy feito com sucesso!",
            url: data.url
        })

        fs.rmSync(destinyDirectory, {recursive: true, force:true});
          
    }else{
        res.json({message:"Nao foi possivel encontrar o tipo do arquivo"});
    }
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})