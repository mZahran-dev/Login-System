let welcomeMessage = document.querySelector("#welcomeMessage");

if(localStorage.getItem('userName') != null){ 
    welcomeMessage.innerHTML = `Welcome to our website 
    ${localStorage.getItem('userName')} :)`
}