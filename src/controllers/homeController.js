const {Contact} = require('../models/contactModel')

exports.index = async(req,res,)=>{

    const contatos = await Contact.searchContacts(req.session.user._id);
    
    res.render('index', {
        pageTitle: 'home',
        contatos,
    });
};
