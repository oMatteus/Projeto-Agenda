export default function mascaraTelefone(inputClass) {

    const input = document.querySelector(inputClass);

    if(input){

        input.addEventListener('input',()=>{

            let value = input.value.replace(/\D/g, '');

            if (value.length >= 11) {
                input.value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length >= 7) {
                input.value = value.replace(/^(\d{2})(\d{4})(\d{1,4})$/, '($1) $2-$3');
            } else if (value.length >= 3) {
                input.value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            } else {
                input.value = value;
            }
        });
    }
}