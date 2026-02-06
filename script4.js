const form = document.getElementById("regForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const phoneInput = document.getElementById("phone");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const dobError = document.getElementById("dobError");
const phoneError = document.getElementById("phoneError");
const strength = document.getElementById("strength");

/* NAME VALIDATION */
nameInput.addEventListener("input", () => {
    if (!/^[A-Za-z ]+$/.test(nameInput.value)) {
        nameError.textContent = "Only alphabets allowed";
    } else {
        nameError.textContent = "";
    }
});

/* EMAIL VALIDATION */
emailInput.addEventListener("input", () => {
    if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        emailError.textContent = "Invalid email format";
    } else {
        emailError.textContent = "";
    }
});

/* PASSWORD + STRENGTH */
passwordInput.addEventListener("input", () => {
    let score = 0;
    let pwd = passwordInput.value;

    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    let strengthPercent = Math.floor((score / 5) * 100);

    strength.textContent = "Password Strength: " + strengthPercent + "%";

    if (strengthPercent < 60) {
        passwordError.textContent = "Weak password";
    } else {
        passwordError.textContent = "";
    }
});

/* DOB VALIDATION (18+ YEARS) */
dobInput.addEventListener("change", () => {
    let birthYear = new Date(dobInput.value).getFullYear();
    let currentYear = new Date().getFullYear();

    if (currentYear - birthYear < 18) {
        dobError.textContent = "You must be at least 18 years old";
    } else {
        dobError.textContent = "";
    }
});

/* PHONE VALIDATION */
phoneInput.addEventListener("input", () => {
    if (!/^\d{10}$/.test(phoneInput.value)) {
        phoneError.textContent = "Phone must be 10 digits";
    } else {
        phoneError.textContent = "";
    }
});

/* FINAL FORM SUBMIT */
form.addEventListener("submit", (e) => {
    if (
        nameError.textContent ||
        emailError.textContent ||
        passwordError.textContent ||
        dobError.textContent ||
        phoneError.textContent
    ) {
        e.preventDefault();
        alert("Please fix errors before submitting");
    } else {
        alert("Registration Successful!");
    }
});
