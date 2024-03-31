"use strict"


const userForm = new UserForm();
userForm.loginFormCallback = (data) => { 

ApiConnector.login(data, (response) => {
    if (response.success === true) {
        location.reload();
    } else {
        console.log("data", data);
        console.log(response);
        userForm.setLoginErrorMessage(response.error);
    }
 });
}

userForm.registerFormCallback = (data) => {  

    ApiConnector.register(data, (response) => {
        if (response.success === true) {
            location.reload();
        } else {
            console.log("data", data);
            console.log(response);
            userForm.setRegisterErrorMessage(response.error)
        }
    })
}

