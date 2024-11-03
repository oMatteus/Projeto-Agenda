const {Login, SignIn} = require('../models/loginModel')

exports.index = (req,res,)=>{

    if(req.session.user) return res.render('login-success',{
        pageTitle: 'Login realizado'
    })

    return res.render('login', {
        pageTitle: 'login'
    });
};

exports.register = async(req,res,)=>{
    const login = new Login(req.body);
   
    try {
        await login.register();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
                return res.redirect('/login')
            })
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso');
            req.session.save(function(){
                return res.redirect('/login')
        })


    } catch (e) {
        console.log(e);
        res.render('error')
    }
    
};

exports.signIn = async(req,res,)=>{

    const login = new SignIn(req.body);
   
    try {
        await login.checkData();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
                return res.redirect('/login')
            })
            return;
        }

        req.flash('success', 'Login realizado com sucesso');
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect('/login')
        })


    } catch (e) {
        console.log(e);
        res.render('error',{
           pageTitle: '404'
        })
    }
};

exports.logout = async(req,res)=>{
    req.session.destroy();
    res.redirect('/');
}