class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
            
            
     })
    }
    handleSubmit(e) {
        const camposValidos = this.camposValidacao();
        if(!camposValidos) e.preventDefault()
    }

    camposValidacao() {
        let valid = true;
        
        for(let error of this.formulario.querySelectorAll('.error-text')) {
            error.remove();

        }

        for(let campo of document.querySelectorAll('.validar')) {
            campo.classList.remove('animationInput')
            const label = campo.previousElementSibling.innerText;
            if(!campo.value) {
                this.criaErro(campo, `Campo ${label} não pode estar vazio`)
                valid = false;
            }
            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valid = false;
            }
            if(campo.classList.contains('usuario')) {
                if(campo.value.length < 3 || campo.value.length > 12) {
                    this.criaErro(campo, `Campo ${label} precisa conter de 3 a 12 caracteres`)
                    valid = false;
                }
                //  incluir verificacao de caracteres especiais aqui
            }
            if(campo.classList.contains('senha')) {
                if(campo.value.length < 6 || campo.value.length > 12) {
                    this.criaErro(campo, `Campo ${label} precisa conter de 6 a 12 caracteres`)
                    valid = false;
                }
            }
            if(campo.classList.contains('repetir-senha')) {
                if(campo.value.length < 6 || campo.value.length > 12) {
                    this.criaErro(campo, `Campo ${label} precisa conter de 6 a 12 caracteres`)
                    valid = false;
                }
                if(campo.value != this.formulario.querySelector('.senha').value) {
                    this.criaErro(campo, `Campo ${label} precisa ser igual a senha`)
                    valid = false;
                }
            }
        }

        return valid;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value)

        if(!cpf.valida()) {
            this.criaErro(campo, `Campo CPF precisa ser válido`)
            return false;
        }

        return true;
    }

    criaErro(campo, msg) {
        campo.classList.add('animationInput')
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div)
    }


}

const valida = new ValidaFormulario();