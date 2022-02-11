let http = require("http");
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let postSchema = new mongoose.Schema({
    dbTitulo: "String",
    dbResumo: "String",
    dbConteudo: "String"
});

let postModel = new mongoose.model("Posts", postSchema);

mongoose.connect("mongodb://localhost/Blog")

app.get("/", function(req, resp){

    postModel.find(function(erro, listaPosts){
        console.log(listaPosts);
        resp.render("principal", {posts: listaPosts});
    });

    
});

app.get("/criarPost", function(req, resp){
    resp.render("formulario");
});

app.post("/criarPost", function(req, resp){
    let titulo_post = req.body.titulo;
    let resumo_post = req.body.resumo;
    let conteudo_post = req.body.conteudo;

    let novo = new postModel({
        dbTitulo: titulo_post,
        dbResumo: resumo_post,
        dbConteudo: conteudo_post
    });
    novo.save();

    resp.render("mensagem");
});

var servidor = http.createServer(app);
servidor.listen(80);

console.log("Servidor rodando...");