document
  .getElementById("loginForm")
  .addEventListener("submit", function (e) {

    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email == "admin@gmail.com" && password == "1234") {

      // Old login storage
      localStorage.setItem("travelUser", email);

      // New current user storage for own post delete system
      const currentUser = {
        id: 1,
        name: "Admin User",
        email: email,
        image: "assets/images/user.png"
      };

      localStorage.setItem("travelverse_current_user", JSON.stringify(currentUser));

      alert("Login Successful");

      window.location.href = "home.html";

    } else {

      alert("Invalid Email or Password");

    }

  });