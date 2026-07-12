

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // Input Values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const country = document.getElementById("country").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Empty Validation
        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill in all fields.");
            return;
        }

        // Password Match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Password Length
        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        // Create User Object
        const user = {
            name: name,
            email: email,
            phone: phone,
            country: country,
            password: password
        };

        // Save to LocalStorage
        localStorage.setItem("travelUser", JSON.stringify(user));

        alert("Registration Successful!");

        // Redirect
        window.location.href = "login.html";

    });

});