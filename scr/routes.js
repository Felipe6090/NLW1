const express = require("express");
const routes = express.Router();
const profileController = require("./controllers/ProfileController")
const jobController = require("./controllers/JobController")
const dashboardController = require('./controllers/DashboardController')

/* removido após importa o path

const views = __dirname + "/views/"; // __dirname é o caminho até arquivo atual */


/*
req(request): é uma ação de requisição do usuario Ex: clickar em algum link ou botão
res(response): é a ação do back-end a uma requisição do usuario no front-end Ex: direcionamento após clickar em um link
Routes: caminhos que são usados pela aplicação
*/

routes.get("/", dashboardController.index);

routes.get("/job", jobController.create);

routes.post("/job", jobController.save);

routes.get("/job/:id", jobController.show);

routes.post("/job/:id", jobController.update);

routes.post("/job/delete/:id", jobController.delete);

routes.get("/profile", profileController.index);

routes.post("/profile", profileController.update);

module.exports = routes;
