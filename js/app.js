


// Page Load Animation

document.addEventListener("DOMContentLoaded", () => {


    document.body.classList.add("loaded");


});




// Navbar Scroll Effect

window.addEventListener("scroll", () => {


    const navbar = document.querySelector(".navbar");


    if(navbar){


        if(window.scrollY > 50){


            navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.1)";


        }

        else{


            navbar.style.boxShadow = "none";


        }


    }


});





// Common Alert Function
// Future modules will use this


function showMessage(message){


    alert(message);


}




// Check User Login Status
// (LocalStorage for Frontend Demo)


function checkLogin(){


    let user =
    localStorage.getItem("travelUser");



    return user !== null;


}





// Logout Function


function logout(){


    localStorage.removeItem("travelUser");


    window.location.href="login.html";


}