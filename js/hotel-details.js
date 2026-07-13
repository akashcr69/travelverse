/* ==========================================
   TravelVerse
   File : hotel-details.js
========================================== */


// ===============================
// Load Selected Hotel / Place
// ===============================

const selectedPlace = localStorage.getItem("selectedPlace");

if (selectedPlace) {

    const touristSpot = document.getElementById("touristSpot");

    if (touristSpot) {
        touristSpot.innerHTML = "📍 " + selectedPlace + ", Bangladesh";
    }

    const saveHotelButton = document.querySelector(".save-hotel-btn");

    if (saveHotelButton) {
        saveHotelButton.dataset.location = selectedPlace;
    }

}


// ===============================
// Save / Remove Hotel Toggle
// ===============================

function saveHotel(button) {

    const hotel = {
        id: button.dataset.id || "hotel_" + Date.now(),
        name: button.dataset.name || "Saved Hotel",
        location: button.dataset.location || "Bangladesh",
        rating: button.dataset.rating || "4.8",
        price: button.dataset.price || "4500 BDT / Night",
        image: button.dataset.image || "/assets/images/hotel-cover.jpg"
    };

    let savedHotels = JSON.parse(localStorage.getItem("savedHotels")) || [];

    const alreadySaved = savedHotels.some(function (item) {
        return String(item.id) === String(hotel.id);
    });

    // Already saved হলে remove হবে
    if (alreadySaved) {

        savedHotels = savedHotels.filter(function (item) {
            return String(item.id) !== String(hotel.id);
        });

        localStorage.setItem("savedHotels", JSON.stringify(savedHotels));

        markHotelButtonAsUnsaved(button);

        alert("Hotel removed from saved list!");

        return;
    }

    // Not saved হলে save হবে
    savedHotels.unshift(hotel);

    localStorage.setItem("savedHotels", JSON.stringify(savedHotels));

    markHotelButtonAsSaved(button);

    alert("Hotel saved successfully!");

}


// ===============================
// Mark Hotel Button as Saved
// ===============================

function markHotelButtonAsSaved(button) {

    button.innerHTML = `
        <i class="fa-solid fa-check"></i>
        Saved
    `;

    button.disabled = false;

    button.classList.add("saved");

}


// ===============================
// Mark Hotel Button as Unsaved
// ===============================

function markHotelButtonAsUnsaved(button) {

    button.innerHTML = `
        <i class="fa-solid fa-bookmark"></i>
        Save Hotel
    `;

    button.disabled = false;

    button.classList.remove("saved");

}


// ===============================
// Keep Hotel Button Active After Reload
// ===============================

function loadSavedHotelButton() {

    const button = document.querySelector(".save-hotel-btn");

    if (!button) return;

    const savedHotels = JSON.parse(localStorage.getItem("savedHotels")) || [];

    const hotelId = button.dataset.id;

    const isSaved = savedHotels.some(function (item) {
        return String(item.id) === String(hotelId);
    });

    if (isSaved) {
        markHotelButtonAsSaved(button);
    } else {
        markHotelButtonAsUnsaved(button);
    }

}



// ===============================
// Load Reviews
// ===============================

window.onload = function () {

    loadReviews();

    updateRating();

    loadSavedHotelButton();

};



// ===============================
// Load Reviews Function
// ===============================

function loadReviews() {

    const container = document.getElementById("reviewContainer");

    if (!container) return;

    container.innerHTML = "";

    let reviews = JSON.parse(localStorage.getItem("travelReviews")) || [];

    reviews.forEach(function (review, index) {

        const card = document.createElement("div");

        card.className = "review-card";

        card.innerHTML = `

            <div class="review-header">

                <img src="${review.profile || 'assets/images/user1.jpg'}">

                <div>

                    <h3>${review.user || 'Traveler'}</h3>

                    <p>${"⭐".repeat(review.rating)}</p>

                </div>

            </div>

            <p>${review.review}</p>

            <div class="review-footer">

                <button class="edit-btn"
                onclick="editReview(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                onclick="deleteReview(${index})">
                    Delete
                </button>

            </div>

        `;

        container.appendChild(card);

    });

}



// ===============================
// Submit New Review
// ===============================

const submitReviewButton = document.getElementById("submitReview");

if (submitReviewButton) {

    submitReviewButton.addEventListener("click", function () {

        const text = document.getElementById("newReview").value;

        const rating = parseInt(document.getElementById("newRating").value);

        if (text.trim() === "") {

            alert("Write a review.");

            return;

        }

        let reviews = JSON.parse(localStorage.getItem("travelReviews")) || [];

        reviews.push({

            user: "Traveler",

            profile: "assets/images/user1.jpg",

            rating: rating,

            review: text

        });

        localStorage.setItem(
            "travelReviews",
            JSON.stringify(reviews)
        );

        document.getElementById("newReview").value = "";

        document.getElementById("newRating").value = "5";

        loadReviews();

        updateRating();

    });

}



// ===============================
// Delete Review
// ===============================

function deleteReview(index) {

    if (confirm("Delete this review?")) {

        let reviews = JSON.parse(localStorage.getItem("travelReviews")) || [];

        reviews.splice(index, 1);

        localStorage.setItem(
            "travelReviews",
            JSON.stringify(reviews)
        );

        loadReviews();

        updateRating();

    }

}



// ===============================
// Edit Review
// ===============================

function editReview(index) {

    let reviews = JSON.parse(localStorage.getItem("travelReviews")) || [];

    let newText = prompt("Edit Review", reviews[index].review);

    if (newText != null && newText.trim() !== "") {

        reviews[index].review = newText;

        localStorage.setItem(
            "travelReviews",
            JSON.stringify(reviews)
        );

        loadReviews();

    }

}



// ===============================
// Average Rating
// ===============================

function updateRating() {

    let reviews = JSON.parse(localStorage.getItem("travelReviews")) || [];

    const reviewCount = document.getElementById("reviewCount");
    const averageRating = document.getElementById("averageRating");

    if (reviewCount) {
        reviewCount.innerHTML = reviews.length;
    }

    if (!averageRating) return;

    if (reviews.length === 0) {

        averageRating.innerHTML = "0 ⭐";

        return;

    }

    let total = 0;

    reviews.forEach(function (r) {

        total += Number(r.rating);

    });

    let avg = (total / reviews.length).toFixed(1);

    averageRating.innerHTML = avg + " ⭐";

}



// ===============================
// Gallery Click Effect
// ===============================

const images = document.querySelectorAll(".gallery-grid img");

images.forEach(function (img) {

    img.addEventListener("click", function () {

        const hotelCover = document.getElementById("hotelCover");

        if (hotelCover) {
            hotelCover.src = img.src;
        }

    });

});



// ===============================
// Future Ready
// Hotel Data
// ===============================

let hotels = JSON.parse(localStorage.getItem("hotels")) || [];

console.log(hotels);



// ===============================
// Future Ready
// Selected Hotel
// ===============================

console.log(
    localStorage.getItem("selectedHotel")
);



// ===============================
// TravelVerse
// ===============================

console.log("Hotel Details Loaded Successfully");