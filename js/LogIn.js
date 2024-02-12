

let emailLoginInput = document.querySelector("#emailLoginInput");
let passLoginInput = document.querySelector("#passLoginInput");
let signInBtn = document.querySelector("#signInBtn");
let loginAlert = document.querySelector("#loginAlert");

if(localStorage.getItem('Users') != null){ 
    userContainer = JSON.parse(localStorage.getItem('Users'));
}

function signIn(event) {
    event.preventDefault();

    if (checkEmailPassEmpty() == true) {
        loginAlertMessage('All Inputs Required');
    }
    else {
        if (checkEmailPass() == true) {
            window.location.href = 'home.html';
        } 
        else {
            loginAlertMessage('Invalid E-mail or Password');
        }
    }
}

function checkEmailPass(){  
    for (let i = 0; i < userContainer.length; i++){ 
        if(userContainer[i].userEmail == emailLoginInput.value && userContainer[i].userPass == passLoginInput.value){
                localStorage.setItem('userName' ,userContainer[i].userName);
                return true;
            }
        
    }
    return false;
}

function checkEmailPassEmpty(){  
    if(emailLoginInput.value == '' || passLoginInput.value == '')
        return true;
    else    
        return false;
}

function loginAlertMessage(text){
    loginAlert.classList.replace('d-none' ,'d-block');
    loginAlert.innerHTML = text;
    console.log('dsfdsf');
}
signInBtn.addEventListener("click" , signIn)





