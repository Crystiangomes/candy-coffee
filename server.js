/* 
==================================
1 PARTE - CONFIGURAÇÃO DO SERVIDOR
==================================
*/

require("dotenv").config(); 
const pool = require("./db.js");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


/* 
==================================
2 PARTE - CRIAÇÃO DAS ROTAS E INÍCIO
==================================
*/

// POST mensagem
app.post("/mensagem", async (req,res) => {
    try{
        const nome = req.body.nome
        const email = req.body.email
        const mensagem = req.body.mensagem
        
        if(!nome || !email || !mensagem){
            return res.status(400).json({mensagem: "Preencha todos os campos"});
        };

        await pool.execute(
            "INSERT INTO tb_mensagem(nome,email,mensagem) VALUES(?,?,?)",
            [nome,email,mensagem]
        );

        res.status(201).json({mensagem: "Mensagem enviada com sucesso!"});

    } catch(error){
        console.error(error);
        res.status(500).json({ erro: "Erro ao enviar mensagem" });
    }
});

// ROTA INICIAL
app.get("/", (req, res) => {
    res.send("API Candy Coffee funcionando!");
});

// GET mensagens
app.get("/mensagem", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM tb_mensagem");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar mensagens" });
    }
});

// GET produtos
app.get("/produtos", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM produtos");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
});

// POST produtos
app.post("/produtos", async (req, res) => {
    try {
        const { nome, preco } = req.body;

        if (!nome || !preco) {
            return res.status(400).json({ mensagem: "Preencha todos os campos" });
        }

        await pool.execute(
            "INSERT INTO produtos (nome, preco) VALUES (?, ?)",
            [nome, preco]
        );

        res.status(201).json({ mensagem: "Produto criado!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao criar produto" });
    }
});


/* 
==================================
3 PARTE - INICIAR SERVIDOR
==================================
*/

app.listen(3000, ()=>{
    console.log("Servidor rodando em http://localhost:3000");
});

// UPDATE
app.put("/produtos/:id", async (req, res) => {
    try {
        const { nome, preco } = req.body;
        const { id } = req.params;

        await pool.execute(
            "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?",
            [nome, preco, id]
        );

        res.json({ mensagem: "Produto atualizado!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar produto" });
    }
});

//DELETE 

app.delete("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.execute(
            "DELETE FROM produtos WHERE id = ?",
            [id]
        );

        res.json({ mensagem: "Produto deletado!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao deletar produto" });
    }
});

