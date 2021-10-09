const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path")

//server.use é um comando usado para setar/habilitar configs no server

//abilitando a view engine ejs no express
server.set('view engine', 'ejs') 


// => mudando a localização da pasta views 
server.set("views", path.join(__dirname, "views"))

server.use(express.static("public"));
//habilitando statics, arquivos publicos que não serão mudados com muita frequencia e que são publicos

//abilitando a visualização do req.body
server.use(express.urlencoded( { extended: true } ))

server.use(routes)
//importando as rotas para possibilitar o servidor de seguir os caminhos estabelecidos

server.listen(3000, () => console.log("rodando")); 
// habilitando o server para detectar a porta padrão 3000
