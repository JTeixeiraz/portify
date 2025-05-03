const express = require('express');
const path = require("path");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/generate", (req, res)=>{
    const { name, description } = req.body;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Portfólio de ${name}</title>
    <link rel="stylesheet" href="style.css">
    </head>
    <body>
    <h1>${name}</h1>
    <p>${description}</p>
    </body>
    </html>
    `;

    const cssContent = `
    body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    color: #333;
    padding: 40px;
    }
    `;

    const destinyDirectory = path.join(__dirname, 'output');
    if(!fs.existsSync(destinyDirectory)) fs.mkdirSync(destinyDirectory);

    fs.writeFileSync(path.join(destinyDirectory, 'index.html'), htmlContent);
    fs.writeFileSync(path.join(destinyDirectory, 'style.css'), cssContent);

    res.json({message: "Arquivos gerados com sucesso!"});
})

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})