//removendo flash msg

const messages = document.querySelector('.danger, .success');
if(messages){
    setTimeout(() => messages.remove(), 5000);
    // console.log('remove flash messages');
}


