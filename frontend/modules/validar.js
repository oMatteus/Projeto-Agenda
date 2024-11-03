import validator from "validator";

export default class Valida{
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(type){
        this.evento(type);
    }

    evento(type){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            switch (type) {
                case 'login':
                    this.login(e)
                    break;
                case 'registro':
                    this.registro(e)
                    break;
                case 'contato':
                    this.contato(e)
                    break;
                default:
                    break;
            }
        })
    }

    login(event){
        const el = event.target;

        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)){
            this.criaErro(emailInput,'Email inválido');
            error = true;
        };

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
            this.criaErro(passwordInput,'Senha inválida');
            error = true;
        };

        if(!error) el.submit();
    }

    registro(event){
        const el = event.target;

        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)){
            this.criaErro(emailInput,'Email inválido');
            error = true;
        };

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
            this.criaErro(passwordInput,'A Senha precisa ter entre 3 e 50 caracteres');
            error = true;
        };

        if(!error) el.submit();
    }

    contato(event){

        console.log('Validando contato');

    }

    criaErro(inputElement, message){
        const alerta = document.createElement('p');
        alerta.innerText = `* ${message}`;
        alerta.setAttribute('class', 'validateError')

        inputElement.parentNode.insertBefore(alerta, inputElement.nextSibling);
    }
}

