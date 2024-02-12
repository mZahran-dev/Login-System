
let inputName =document.querySelector("#inputName");
let inputEmail =document.querySelector("#inputEmail");
let inputPass =document.querySelector("#inputPass");
let signUpBtn =document.querySelector("#signUpBtn");
let signUpAlert = document.querySelector("#signUpAlert");
let userContainer = [];

if(localStorage.getItem('Users') != null){ 
    userContainer = JSON.parse(localStorage.getItem('Users'));
}else{ 
    userContainer = [];
}

function signUp(event) {
    event.preventDefault();
    let user = { 
        userName : inputName.value,
        userEmail : inputEmail.value,
        userPass : inputPass.value
    }

    if(checkInput() == true){ 
        signUpAlert.classList.remove('text-success');  
        getAlertMessage('All Inputs Required' , 'text-danger');
    }

    else{
        signUpAlert.classList.remove('text-success');         
        
        if(checkEmailExists())   
            getAlertMessage('E-mail Already Exists!' , 'text-danger');

        if(checkEmailValid()){
            signUpAlert.classList.remove('text-success');    
            getAlertMessage('Invalid E-mail' , 'text-danger');
            // console.log('asdfadsf');
        }
     
        if(checkPasswordValid())  
            getAlertMessage(errorMessage , 'text-danger');

    
        if(!checkPasswordValid() && !checkEmailValid() && !checkEmailExists()) {
            signUpAlert.classList.remove('text-danger');  
            userContainer.push(user);
            localStorage.setItem('Users' , JSON.stringify(userContainer));  
            clearSignUpForm();
            getAlertMessage('Success' , 'text-success');
        }
    }
}

let errorMessage = '';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function checkEmailValid() {
    return !emailRegex.test(inputEmail.value);
}

function checkPasswordValid(){
    errorMessage = '';
    if (!passRegex.test(inputPass.value)) {
        if (!/(?=.*?[A-Z])/.test(inputPass.value)) {
            errorMessage += 'Password must contain at least one upper case letter\n';
            return true;
        }

        if (!/(?=.*?[a-z])/.test(inputPass.value)) {
            errorMessage += 'Password must contain at least one lower case letter\n';
            return true;
        }

        if (!/(?=.*?[0-9])/.test(inputPass.value)) {
            errorMessage += 'Password must contain at least one digit\n';
            return true;
        }

        if (!/(?=.*?[#?!@$%^&*-])/.test(inputPass.value)) {
            errorMessage += 'Password must contain at least one special character\n';
            return true;
        }

        if (inputPass.value.length < 8) {
            errorMessage += 'Password must be at least eight characters in length\n';
            return true;
        }
    }
    
}


function checkEmailExists(){ 
    for(let i = 0; i < userContainer.length; i++){ 
        if(userContainer[i].userEmail == inputEmail.value)
            return true;
    }
    return false;
}

function checkInput(){ 
    if(inputName.value == '' || inputEmail.value == ''|| inputPass.value == '' )
        return true;
    else    
        return false;
}

function getAlertMessage(text, alertType){ 
    signUpAlert.classList.add(alertType);
    signUpAlert.innerHTML = text;
}

function clearSignUpForm(){ 
    inputName.value  = '';
    inputEmail.value = '';
    inputPass.value = '';
}


signUpBtn.addEventListener("click" , signUp);




