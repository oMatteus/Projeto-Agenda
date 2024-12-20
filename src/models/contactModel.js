const mongoose = require('mongoose');
const validator = require('validator')


const ContactSchema = new mongoose.Schema({
    ownerId: {type: String, required: true},
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    telefone: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now},
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contact = null;
    };

    async register(){
        this.valida();
        if(this.errors.length > 0) return;
        
    
        this.contact = await ContactModel.create(this.body);
    };

    valida(){
        this.cleanUp();

        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido');
        if(!this.body.nome) this.errors.push('"Nome" é um campo obrigatório');
        if(!this.body.telefone && !this.body.email) this.errors.push('Cadastre no mínimo um email ou um telefone');
    }

    cleanUp(){
        for( const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        } 

        this.body = {
            ownerId: this.body.ownerId,
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        }
    };

    async edit(id){
        
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.findByIdAndUpdate(id,this.body,{new: true});
    };

    static async searchID(id){
        if(typeof id !== 'string') return;
        const user = await ContactModel.findById(id);
        return user;
    };

    static async searchContacts(userId){
        const contatos = await ContactModel.find({ownerId:userId}).sort({criadoEm: 1}); //-1 para decrescente e 1 para crescente
        return contatos;
    }

    static async delete(id){
        if(typeof id !== 'string') return;
        const user = await ContactModel.findOneAndDelete({_id: id});
        return user;
    };

}

exports.Contact = Contact;
