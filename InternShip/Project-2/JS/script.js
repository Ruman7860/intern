var nameError = document.querySelector('.name-error');
var userNameError = document.querySelector('.username-error');
var emailError = document.querySelector('.email-error');
var phoneError = document.querySelector('.phone-error');
var passwordError = document.querySelector('.password-error');
var confirmError = document.querySelector('.confirm-error');
var registration = document.querySelector('.registration');
var maleRadio = document.querySelector('.male-radio-btn');
var femaleRadio = document.querySelector('.female-radio-btn');
var genderError = document.querySelector('.gender-error');



function validateName(){
    var name = document.querySelector('.contact-name').value;
    if(name.length == 0){
        nameError.innerHTML = 'Name is Required';
        return false;
    }
    if(!name.match(/^[A-Za-z]+\s[A-Za-z]+$/) && !name.match(/^[A-Za-z]+\s[A-Za-z]+\s[A-Za-z]+$/) && !name.match(/^[A-Za-z]+\s[A-Za-z]+\s[A-Za-z]+\s[A-Za-z]+$/)){
        nameError.innerHTML = "write full name";
        return false;
    }
    nameError.innerHTML = "";
    return true;
}

function validateUser(){
    var user = document.querySelector('.contact-username').value;
    if(user.length == 0){
        userNameError.innerHTML = 'Username is Required';
        return false;
    }

    userNameError.innerHTML = "";
    return true;
}

function validatePhone(){
    var phone = document.querySelector('.contact-phone').value;
    if(phone.length == 0){
        phoneError.innerHTML = "Phone Number is required";
        return false;
    }
    
    if(phone.length != 10){
        phoneError.innerHTML = "phone no. should be 10 digits";
        return false;

    }
    if(!phone.match(/^[0-9]{10}$/)){
        phoneError.innerHTML = 'Only digits Please';
        return false;
    }
    phoneError.innerHTML = '';
    return true;
}

function validateEmail(){
    var email = document.querySelector('.contact-email').value;
    if(email.length == 0){
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        emailError.innerHTML = 'Invalid Email';
        return false;
    }
    emailError.innerHTML = '';
    return true;
}
function validatePassword(){
    var password = document.querySelector('.contact-password').value;
    if(password.length == 0){
        passwordError.innerHTML = 'Password is required';
        passwordError.style.color = '#D14E4E';
        return false;
    }
    if(password.length < 8){
        passwordError.innerHTML = 'Weak Password';
        return false;
    }
    passwordError.innerHTML = 'Strong Password';
    passwordError.style.color = 'green';
    return true;
}
function validateConfirm(){
    var confirm = document.querySelector('.contact-confirm').value;
    var password = document.querySelector('.contact-password').value;

    if(confirm != password){
        confirmError.innerHTML = 'Password is not matching';
        return false;
    }
    confirmError.innerHTML = '';
    return true
}
function validateGender(){
    if(!maleRadio.checked && !femaleRadio.checked){
        genderError.innerHTML = 'Please Select Your Gender';
        return false;
    }
    genderError.innerHTML = '';
    return true;

}

function validateForm(){
    var error = document.querySelector('.error');
    var submit = document.querySelector('.submitMessage');
        
    if(!validateName() || !validateUser() || !validatePhone() || !validateEmail() || !validatePassword() || !validateConfirm() || !validateGender()){
        // error.innerHTML = "Please enter required feilds";
        return false;
    }
    else{
        // error.innerHTML = "";
        registration.style.display = 'none';
        submit.style.display = 'block';
        return true;
    }
    

    // else{
        
    // }
}

