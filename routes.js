const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')
const contactController = require('./src/controllers/contactController');

const {loginRequired} = require('./src/middlewares/middleware');


//Rotas de login 
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/signIn', loginController.signIn);
route.get('/login/logout', loginController.logout);


//rotas de contato
route.get('/contact',loginRequired ,contactController.index);
route.post('/contact/register',loginRequired ,contactController.register);
route.get('/contact/:id',loginRequired, contactController.editIndex);
route.post('/contact/edit/:id',loginRequired, contactController.edit);
route.get('/contact/delete/:id',loginRequired, contactController.delete);


//Rotas da home
route.get('/', loginRequired, homeController.index);


module.exports = route;
