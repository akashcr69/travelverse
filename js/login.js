document
.getElementById("loginForm")
.addEventListener("submit",function(e){

e.preventDefault();

let email=document.getElementById("email").value;

let password=document.getElementById("password").value;

if(email=="admin@gmail.com" && password=="1234"){

localStorage.setItem("travelUser",email);

alert("Login Successful");

window.location.href="home.html";

}
else{

alert("Invalid Email or Password");

}

});