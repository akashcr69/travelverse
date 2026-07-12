/* =====================================
   TravelVerse
   File : js/places.js
===================================== */

// ===============================
// Search Tourist Place
// ===============================

function searchPlace() {

    let input = document
        .getElementById("searchPlace")
        .value
        .toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        let title = card.querySelector("h2")
            .innerText
            .toLowerCase();

        if (title.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}



// ===============================
// Category Filter
// ===============================

const category =
document.getElementById("category");

category.addEventListener("change", function () {

    let value = this.value;

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        if (value === "all") {

            card.style.display = "block";

        }

        else if (card.dataset.category === value) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

});



// ===============================
// Open Hotel Details
// ===============================

const hotelButtons =
document.querySelectorAll(".content button");

hotelButtons.forEach(button => {

    button.addEventListener("click", function () {

        let card =
        this.closest(".card");

        let placeName =
        card.querySelector("h2").innerText;

        localStorage.setItem(
            "selectedPlace",
            placeName
        );

    });

});



// ===============================
// Hover Animation
// ===============================

const cards =
document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = ".3s";

        card.style.transform =
        "translateY(-8px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "translateY(0px) scale(1)";

    });

});



// ===============================
// Future Ready
// Dynamic Hotel Count
// ===============================

window.addEventListener("load", () => {

    let hotels =
    JSON.parse(localStorage.getItem("hotels")) || [];

    console.log("Hotels :", hotels.length);

});



// ===============================
// Future Ready
// Dynamic Review Count
// ===============================

window.addEventListener("load", () => {

    let reviews =
    JSON.parse(localStorage.getItem("travelReviews")) || [];

    console.log("Reviews :", reviews.length);

});



// ===============================
// Scroll To Top
// ===============================

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        console.log("Scrolling...");

    }

});



console.log("TravelVerse Places Loaded Successfully");