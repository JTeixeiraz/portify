const express = require('express');
const path = require("path");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT = process.env.VERCEL_PROJECT_ID;

async function deployToVercel(){
    const output = path.join(__dirname, 'output');
}

app.use(express.json());


app.post('/api/deploy', async (req, res)=>{

})





app.post("/generateProfessional", (req, res)=>{
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
        ayout,
        color,
        image    
    } = req.body;

    if (type === "Professional") {
        const htmlProfessionalContent = ``;
        const cssProfessioanlContent = ``;
        const destinyDirectory = path.join(__dirname, 'output');
        if(!fs.existsSync(destinyDirectory)) fs.mkdirSync(destinyDirectory);

        fs.writeFileSync(path.join(destinyDirectory, 'index.html'), htmlProfessionalContent);
        fs.writeFileSync(path.join(destinyDirectory, 'style.css'), cssProfessioanlContent);
        res.json({message: "Arquivos gerados com sucesso!"});
    }else{
        res.json({message:"Nao foi possivel encontrar o tipo do arquivo"});
    }
})

app.post ("/generatePersonal" , async(req, res)=>{
    const{
        type,
        name,
        description,
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
        const destinyDirectory = path.join(__dirname, 'output');
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam quis iure obcaecati inventore, dolore cupiditate minima fugit quo eum, non perferendis quas at. Maiores vero nostrum ipsam illo quod aut.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam eveniet nobis deleniti officia nesciunt quis cum sed perspiciatis ratione illum quo, enim aliquid suscipit minima, consectetur ut exercitationem voluptatem. Obcaecati.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi distinctio quae, delectus doloribus earum error accusamus iusto voluptatum rem quas at autem aperiam dolor in expedita quos itaque omnis iure.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias aut sequi pariatur eligendi natus accusantium, sed repellat ducimus debitis facere saepe nesciunt incidunt iusto, quos id autem omnis doloremque neque?
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
          Olá! Me chamo Joãozinho e sou apaixonado por tecnologia desde criança. Adoro aprender coisas novas e me
          desafiar com projetos diferentes. Atualmente estudo desenvolvimento web e estou criando meu primeiro portfólio
          pessoal. Também sou curioso por design minimalista e gosto de manter tudo simples, direto e funcional.
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam quis iure obcaecati inventore, dolore cupiditate minima fugit quo eum, non perferendis quas at. Maiores vero nostrum ipsam illo quod aut.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam eveniet nobis deleniti officia nesciunt quis cum sed perspiciatis ratione illum quo, enim aliquid suscipit minima, consectetur ut exercitationem voluptatem. Obcaecati.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi distinctio quae, delectus doloribus earum error accusamus iusto voluptatum rem quas at autem aperiam dolor in expedita quos itaque omnis iure.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias aut sequi pariatur eligendi natus accusantium, sed repellat ducimus debitis facere saepe nesciunt incidunt iusto, quos id autem omnis doloremque neque?
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