/* =====================================
   TravelVerse
   File : js/places.js
===================================== */


// ===============================
// Search + Category Filter
// ===============================

function filterPlaces() {

    const searchInput = document.getElementById("searchPlace");
    const categorySelect = document.getElementById("category");

    const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const categoryValue = categorySelect ? categorySelect.value : "all";

    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {

        const title = card.querySelector("h2")
            ? card.querySelector("h2").innerText.toLowerCase()
            : "";

        const cardCategory = card.dataset.category;

        const matchSearch = title.includes(searchValue);
        const matchCategory = categoryValue === "all" || cardCategory === categoryValue;

        if (matchSearch && matchCategory) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}


// ===============================
// Search Tourist Place
// ===============================

function searchPlace() {
    filterPlaces();
}


// ===============================
// Category Filter
// ===============================

const category = document.getElementById("category");

if (category) {

    category.addEventListener("change", function () {
        filterPlaces();
    });

}


// ===============================
// Live Search While Typing
// ===============================

const searchInput = document.getElementById("searchPlace");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {
        filterPlaces();
    });

}


// ===============================
// Open Hotel Details
// Only View Hotels button will save selectedPlace
// ===============================

const hotelButtons = document.querySelectorAll(".content a button");

hotelButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card = this.closest(".card");

        if (!card) return;

        const placeName = card.querySelector("h2")
            ? card.querySelector("h2").innerText
            : "Tourist Place";

        localStorage.setItem("selectedPlace", placeName);

    });

});


// ===============================
// Save / Remove Place Toggle
// ===============================

function savePlace(button) {

    const place = {
        id: button.dataset.id || "place_" + Date.now(),
        name: button.dataset.name || "Tourist Place",
        location: button.dataset.location || "Bangladesh",
        rating: button.dataset.rating || "4.8",
        image: button.dataset.image || "/assets/images.jpeg"
    };

    let savedPlaces = JSON.parse(localStorage.getItem("savedPlaces")) || [];

    const alreadySaved = savedPlaces.some(function (item) {
        return String(item.id) === String(place.id);
    });

    // Already saved হলে remove হবে
    if (alreadySaved) {

        savedPlaces = savedPlaces.filter(function (item) {
            return String(item.id) !== String(place.id);
        });

        localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));

        markButtonAsUnsaved(button);

        alert("Place removed from saved list!");

        return;
    }

    // Not saved হলে save হবে
    savedPlaces.unshift(place);

    localStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));

    markButtonAsSaved(button);

    alert("Place saved successfully!");

}


// ===============================
// Mark Button as Saved
// ===============================

function markButtonAsSaved(button) {

    button.innerHTML = `
        <i class="fa-solid fa-check"></i>
        Saved
    `;

    button.disabled = false;

    button.classList.add("saved");

}


// ===============================
// Mark Button as Unsaved
// ===============================

function markButtonAsUnsaved(button) {

    button.innerHTML = `
        <i class="fa-solid fa-bookmark"></i>
        Save
    `;

    button.disabled = false;

    button.classList.remove("saved");

}


// ===============================
// Keep Saved Buttons Active After Reload
// ===============================

function loadSavedPlaceButtons() {

    const savedPlaces = JSON.parse(localStorage.getItem("savedPlaces")) || [];

    const saveButtons = document.querySelectorAll(".save-place-btn");

    saveButtons.forEach(function (button) {

        const placeId = button.dataset.id;

        const isSaved = savedPlaces.some(function (item) {
            return String(item.id) === String(placeId);
        });

        if (isSaved) {
            markButtonAsSaved(button);
        } else {
            markButtonAsUnsaved(button);
        }

    });

}


// ===============================
// Hover Animation
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        card.style.transition = ".3s";

        card.style.transform = "translateY(-8px) scale(1.02)";

    });

    card.addEventListener("mouseleave", function () {

        card.style.transform = "translateY(0px) scale(1)";

    });

});


// ===============================
// Future Ready
// Dynamic Hotel Count
// ===============================

window.addEventListener("load", function () {

    const hotels = JSON.parse(localStorage.getItem("hotels")) || [];

    console.log("Hotels :", hotels.length);

});


// ===============================
// Future Ready
// Dynamic Review Count
// ===============================

window.addEventListener("load", function () {

    const reviews = JSON.parse(localStorage.getItem("travelReviews")) || [];

    console.log("Reviews :", reviews.length);

});


// ===============================
// Scroll To Top
// ===============================

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        console.log("Scrolling...");

    }

});


// ===============================
// Page Load
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    loadSavedPlaceButtons();

});


console.log("TravelVerse Places Loaded Successfully");