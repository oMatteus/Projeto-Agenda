const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const loginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const loginModel = mongoose.model('login', loginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    };

    async register(){
        this.valida();
        if(this.errors.length > 0) return;
        
        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await loginModel.create(this.body);
        
    };

    async userExists(){
        this.user = await loginModel.findOne({email: this.body.email})

        if(this.user) this.errors.push('Email já cadastrado');
        
    }

    valida(){
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido')
        
        if(this.body.password.length <6 || this.body.password.length > 50){
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres')
        }
    }

    cleanUp(){
        for( const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        } 

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

}

class SignIn{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async checkData(){

        await this.userExists();
        if(this.errors.length > 0) return;

        if(!bcryptjs.compareSync(this.body.password,this.user.password)){
            this.errors.push('Senha invalida')
            this.user = null;
            return
        }
    }

    async userExists(){
        this.user = await loginModel.findOne({email: this.body.email})
        // console.log(this.user);

        if(!this.user){
            this.errors.push('Usuário inválido. Verifique os dados e tente novamente')
            return
        }
    }

}

exports.Login = Login;
exports.SignIn = SignIn;