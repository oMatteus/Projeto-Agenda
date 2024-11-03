const { render } = require('ejs');
const {Contact} = require('../models/contactModel')


exports.index = (req,res)=>{

    return res.render('contact', {
        pageTitle: 'contact',
        contact: {}
    });
}

exports.register = async (req,res)=>{
    const contact = new Contact(req.body);
    
    try{
        await contact.register();

        if(contact.errors.length > 0){
            req.flash('errors', contact.errors);
            req.session.save(()=>res.redirect('/contact'))
            return;
        }
    
        req.flash('success', 'Contato adicionado');
        // req.session.save(()=>res.redirect(`/contact/${contact.contact._id}`))
        req.session.save(()=>res.redirect(`/`))
        return;

    }catch(e){
        console.log(e);
        res.render('error', {
            pageTitle: 404
        })
    }
 
};

exports.editIndex = async(req,res)=>{

    if(!req.params.id) return res.render('error');
    
    const contact = await Contact.searchID(req.params.id);
    if(!contact) return res.render('error');


    return res.render('contact', {
        pageTitle: 'contact',
        contact
    });
}

exports.edit = async(req,res)=>{

    try{
        if(!req.params.id) return res.render('error');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);
    
        if(contact.errors.length > 0){
            req.flash('errors', contact.errors);
            req.session.save(()=>res.redirect('/contact'))
            return;
        }
    
        req.flash('success', 'Contato atualizado com sucesso');
        // req.session.save(()=>res.redirect(`/contact/${contact.contact._id}`))
        req.session.save(()=>res.redirect(`/`))
        return;
    }catch(e){
        console.log(e);
        res.render('error',{
            pageTitle: 'Error'
        })
    }
}

exports.delete = async(req,res)=>{

    if(!req.params.id) return res.render('error');
    
    const contact = await Contact.delete(req.params.id);
    if(!contact) return res.render('error');


    req.flash('success', 'Contato apagado com sucesso');
    req.session.save(()=>res.redirect(`/`))
    return;
}