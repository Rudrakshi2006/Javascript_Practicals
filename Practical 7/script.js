const form = document.getElementById("registrationForm");

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const website = document.getElementById("website");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");

const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const terms = document.getElementById("terms");
const signupBtn = document.getElementById("signupBtn");

const successMessage = document.getElementById("successMessage");


const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];


for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    day.appendChild(option);
}


months.forEach(function(monthName, index) {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = monthName;
    month.appendChild(option);
});


for (let i = 2026; i >= 1950; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
};


function showError(input, errorId, message) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    document.getElementById(errorId).textContent = message;
}


function clearError(input, errorId) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    document.getElementById(errorId).textContent = "";
}


function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        showError(email, "emailError", "E-mail is required.");
        return false;
    }

    if (!emailPattern.test(email.value.trim())) {
        showError(email, "emailError", "Enter a valid e-mail address.");
        return false;
    }

    clearError(email, "emailError");
    return true;
}


function validatePassword() {
    if (password.value === "") {
        showError(password, "passwordError", "Password is required.");
        return false;
    }

    if (password.value.length < 6) {
        showError(password, "passwordError", "Password must contain at least 6 characters.");
        return false;
    }

    clearError(password, "passwordError");
    return true;
}


function validateRePassword() {
    if (repassword.value === "") {
        showError(repassword, "repasswordError", "Please re-enter your password.");
        return false;
    }

    if (password.value !== repassword.value) {
        showError(repassword, "repasswordError", "Passwords do not match.");
        return false;
    }

    clearError(repassword, "repasswordError");
    return true;
}


function validateWebsite() {
    if (website.value.trim() === "") {
        website.classList.remove("invalid", "valid");
        document.getElementById("websiteError").textContent = "";
        return true;
    }

    const websitePattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;

    if (!websitePattern.test(website.value.trim())) {
        showError(website, "websiteError", "Enter a valid website URL.");
        return false;
    }

    clearError(website, "websiteError");
    return true;
}


function validateName(input, errorId, fieldName) {
    if (input.value.trim() === "") {
        showError(input, errorId, fieldName + " is required.");
        return false;
    }

    clearError(input, errorId);
    return true;
}


function validateBirthday() {
    const birthdayError = document.getElementById("birthdayError");

    if (day.value === "" || month.value === "" || year.value === "") {
        birthdayError.textContent = "Please select your complete birthday.";
        return false;
    }

    birthdayError.textContent = "";
    return true;
}


function showBirthday() {
    const birthdayMessage = document.getElementById("birthdayMessage");

    if (day.value !== "" && month.value !== "" && year.value !== "") {
        birthdayMessage.textContent =
            "Selected Birthday: " +
            day.value + " " +
            months[month.value - 1] + " " +
            year.value;
    } else {
        birthdayMessage.textContent = "";
    }
}


function validateForm() {

    let isValid = true;

    if (!validateName(firstname, "firstnameError", "Firstname")) {
        isValid = false;
    }

    if (!validateName(username, "usernameError", "Username")) {
        isValid = false;
    }

    if (!validateEmail()) {
        isValid = false;
    }

    if (!validateWebsite()) {
        isValid = false;
    }

    if (!validatePassword()) {
        isValid = false;
    }

    if (!validateRePassword()) {
        isValid = false;
    }

    if (!validateBirthday()) {
        isValid = false;
    }

    if (!terms.checked) {
        document.getElementById("termsError").textContent =
            "You must agree to the terms & conditions.";
        isValid = false;
    } else {
        document.getElementById("termsError").textContent = "";
    }

    return isValid;
}


const inputs = [
    firstname,
    lastname,
    username,
    email,
    website,
    password,
    repassword
];


inputs.forEach(function(input) {

    input.addEventListener("focus", function() {
        input.style.borderColor = "#333";
    });

    input.addEventListener("blur", function() {

        if (input === firstname) {
            validateName(firstname, "firstnameError", "Firstname");
        }

        if (input === username) {
            validateName(username, "usernameError", "Username");
        }

        if (input === email) {
            validateEmail();
        }

        if (input === website) {
            validateWebsite();
        }

        if (input === password) {
            validatePassword();
        }

        if (input === repassword) {
            validateRePassword();
        }
    });
});


email.addEventListener("input", function() {
    validateEmail();
});


password.addEventListener("input", function() {
    validatePassword();

    if (repassword.value !== "") {
        validateRePassword();
    }
});


repassword.addEventListener("input", function() {
    validateRePassword();
});


day.addEventListener("change", showBirthday);
month.addEventListener("change", showBirthday);
year.addEventListener("change", showBirthday);


terms.addEventListener("change", function() {

    if (terms.checked) {
        document.getElementById("termsError").textContent = "";
    }
});


signupBtn.addEventListener("click", function() {
    successMessage.textContent = "";
});


form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (validateForm()) {
        successMessage.textContent = "Registration successful!";
    } else {
        successMessage.textContent = "";
    }
});