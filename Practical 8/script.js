const form = document.getElementById("gymForm");
const name = document.getElementById("name");
const eyeColor = document.getElementById("eyeColor");
const ability = document.getElementById("ability");
const result = document.getElementById("result");

function validateName() {
    if (name.value.trim() === "") {
        document.getElementById("nameError").textContent =
            "Name is required";
        name.classList.add("invalid");
        return false;
    }

    if (!/^[A-Za-z ]+$/.test(name.value.trim())) {
        document.getElementById("nameError").textContent =
            "Use alphabets only";
        name.classList.add("invalid");
        return false;
    }

    document.getElementById("nameError").textContent = "";
    name.classList.remove("invalid");
    name.classList.add("valid");
    return true;
}

function validateSex() {
    const sex = document.querySelector('input[name="sex"]:checked');

    if (!sex) {
        document.getElementById("sexError").textContent =
            "Please select sex";
        return false;
    }

    document.getElementById("sexError").textContent = "";
    return true;
}

function validateEyeColor() {
    if (eyeColor.value === "") {
        document.getElementById("eyeError").textContent =
            "Please select eye color";
        eyeColor.classList.add("invalid");
        return false;
    }

    document.getElementById("eyeError").textContent = "";
    eyeColor.classList.remove("invalid");
    eyeColor.classList.add("valid");
    return true;
}

function validateAbility() {
    if (ability.value.trim() === "") {
        document.getElementById("abilityError").textContent =
            "Please describe your athletic ability";
        ability.classList.add("invalid");
        return false;
    }

    document.getElementById("abilityError").textContent = "";
    ability.classList.remove("invalid");
    ability.classList.add("valid");
    return true;
}

name.addEventListener("input", validateName);
eyeColor.addEventListener("change", validateEyeColor);
ability.addEventListener("input", validateAbility);

document.querySelectorAll('input[name="sex"]').forEach(function(radio) {
    radio.addEventListener("change", validateSex);
});

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const validName = validateName();
    const validSex = validateSex();
    const validEye = validateEyeColor();
    const validAbility = validateAbility();

    if (validName && validSex && validEye && validAbility) {

        const sex = document.querySelector(
            'input[name="sex"]:checked'
        ).value;

        const fitness = [];

        document.querySelectorAll(
            'input[name="fitness"]:checked'
        ).forEach(function(item) {
            fitness.push(item.value);
        });

        result.innerHTML =
            "<b>Registration Successful!</b><br>" +
            "Name: " + name.value + "<br>" +
            "Sex: " + sex + "<br>" +
            "Eye Color: " + eyeColor.value + "<br>" +
            "Fitness Details: " +
            (fitness.length ? fitness.join(", ") : "None");

        result.classList.add("show");

        alert("Gym Admission Form Submitted Successfully!");
    } else {
        result.classList.remove("show");
        alert("Please fill the form correctly.");
    }
});