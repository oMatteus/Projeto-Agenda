require("dotenv").config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING).then( ()=>{
    console.log('Base de dados conectada');
    app.emit('already')
} ).catch(e => console.log('connect error '+ e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes')
const path = require('path')

const helmet = require('helmet');
const csrf = require('csurf');

const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware')

// app.use(helmet())

app.use(express.urlencoded({extended:true})); //trata o body das requisições para termos um objeto a partir dela
app.use(express.json()); //Permite postar json para dentro da nossa aplicação
app.use(express.static(path.resolve(__dirname,'public'))) //apontando para um diretório padrão para arquivos estáticos

const sessionOptions = session({

    secret: 'meu pastel é mais barato',
    //Pode ser qualquer coisa. Uma boa prática é que seja algo tipo um token e que seja puxado do arquivo env

    store:  MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING}),
    //Chamando o banco

    resave: false, //recomendação da documentação
    saveUninitialized: false, //recomendação da documentação
    cookie: {
        maxAge: 1000*60*60*24*7, //tempo de duração do cookie
        httpOnly: true 
    }
});
app.use(sessionOptions);
app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);

app.on('already',()=>{
    app.listen(3000, ()=>{
        console.log('acesse http://localhost:3000');
        console.log('Servidor executando na porta 3000')
    })
})

