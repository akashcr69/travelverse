// TravelVerse Module 9
// Saved Places / Saved Hotels
// Updated Version
// File: saved.js


// ===============================
// Get Data
// ===============================

function getSavedPlaces() {
    return JSON.parse(localStorage.getItem("savedPlaces")) || [];
}

function getSavedHotels() {
    return JSON.parse(localStorage.getItem("savedHotels")) || [];
}

function savePlaces(places) {
    localStorage.setItem("savedPlaces", JSON.stringify(places));
}

function saveHotels(hotels) {
    localStorage.setItem("savedHotels", JSON.stringify(hotels));
}


// ===============================
// Render Counts
// ===============================

function renderCounts() {

    const placeCount = document.getElementById("placeCount");
    const hotelCount = document.getElementById("hotelCount");

    const places = getSavedPlaces();
    const hotels = getSavedHotels();

    if (placeCount) placeCount.innerText = places.length;
    if (hotelCount) hotelCount.innerText = hotels.length;

}


// ===============================
// Render Saved Places
// ===============================

function renderSavedPlaces() {

    const savedPlacesList = document.getElementById("savedPlacesList");

    if (!savedPlacesList) return;

    const places = getSavedPlaces();

    if (places.length === 0) {

        savedPlacesList.innerHTML = `
            <div class="empty-message">
                <i class="fa-solid fa-location-dot"></i>
                <h3>No saved places yet.</h3>
                <p>Save your favorite tourist spots to see them here.</p>
            </div>
        `;

        return;
    }

    savedPlacesList.innerHTML = "";

    places.forEach(function (place) {

        const card = document.createElement("div");
        card.className = "saved-item";

        card.innerHTML = `
            <img src="${place.image || '/assets/images.jpeg'}" alt="${place.name || 'Saved Place'}">

            <div class="saved-info">

                <h3>${place.name || place.place || 'Saved Place'}</h3>

                <p>
                    <i class="fa-solid fa-location-dot"></i>
                    ${place.location || 'Bangladesh'}
                </p>

                <p class="rating">
                    <i class="fa-solid fa-star"></i>
                    ${place.rating || '4.8'} / 5
                </p>

                <button class="remove-btn" onclick="removeSavedPlace('${place.id}')">
                    Remove
                </button>

            </div>
        `;

        savedPlacesList.appendChild(card);

    });

}


// ===============================
// Render Saved Hotels
// ===============================

function renderSavedHotels() {

    const savedHotelsList = document.getElementById("savedHotelsList");

    if (!savedHotelsList) return;

    const hotels = getSavedHotels();

    if (hotels.length === 0) {

        savedHotelsList.innerHTML = `
            <div class="empty-message">
                <i class="fa-solid fa-hotel"></i>
                <h3>No saved hotels yet.</h3>
                <p>Save hotels from hotel details page to see them here.</p>
            </div>
        `;

        return;
    }

    savedHotelsList.innerHTML = "";

    hotels.forEach(function (hotel) {

        const card = document.createElement("div");
        card.className = "saved-item";

        card.innerHTML = `
            <img src="${hotel.image || '/assets/922_giant.jpg'}" alt="${hotel.name || 'Saved Hotel'}">

            <div class="saved-info">

                <h3>${hotel.name || hotel.hotelName || 'Saved Hotel'}</h3>

                <p>
                    <i class="fa-solid fa-location-dot"></i>
                    ${hotel.location || hotel.hotelLocation || 'Bangladesh'}
                </p>

                <p class="rating">
                    <i class="fa-solid fa-star"></i>
                    ${hotel.rating || hotel.hotelRating || '4.7'} / 5
                </p>

                <p class="price">
                    <i class="fa-solid fa-money-bill-wave"></i>
                    ${hotel.price || hotel.hotelPrice || 'Price not available'}
                </p>

                <button class="remove-btn" onclick="removeSavedHotel('${hotel.id}')">
                    Remove
                </button>

            </div>
        `;

        savedHotelsList.appendChild(card);

    });

}


// ===============================
// Remove Saved Place
// ===============================

function removeSavedPlace(id) {

    let places = getSavedPlaces();

    places = places.filter(function (place) {
        return String(place.id) !== String(id);
    });

    savePlaces(places);

    renderSavedPlaces();
    renderCounts();

}


// ===============================
// Remove Saved Hotel
// ===============================

function removeSavedHotel(id) {

    let hotels = getSavedHotels();

    hotels = hotels.filter(function (hotel) {
        return String(hotel.id) !== String(id);
    });

    saveHotels(hotels);

    renderSavedHotels();
    renderCounts();

}


// ===============================
// Clear All Places
// ===============================

function clearSavedPlaces() {

    const confirmClear = confirm("Clear all saved places?");

    if (!confirmClear) return;

    savePlaces([]);

    renderSavedPlaces();
    renderCounts();

}


// ===============================
// Clear All Hotels
// ===============================

function clearSavedHotels() {

    const confirmClear = confirm("Clear all saved hotels?");

    if (!confirmClear) return;

    saveHotels([]);

    renderSavedHotels();
    renderCounts();

}


// ===============================
// Tabs
// ===============================

function initTabs() {

    document.querySelectorAll(".tab-btn").forEach(function (btn) {

        btn.addEventListener("click", function () {

            document.querySelectorAll(".tab-btn").forEach(function (item) {
                item.classList.remove("active");
            });

            document.querySelectorAll(".tab-content").forEach(function (content) {
                content.classList.remove("active");
            });

            btn.classList.add("active");

            const tab = document.getElementById(btn.dataset.tab);

            if (tab) {
                tab.classList.add("active");
            }

        });

    });

}


// ===============================
// Logout
// ===============================

function logout() {

    localStorage.removeItem("travelUser");
    localStorage.removeItem("travelverse_current_user");

    window.location.href = "login.html";

}


// ===============================
// Page Load
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    renderSavedPlaces();
    renderSavedHotels();
    renderCounts();
    initTabs();

    const clearPlacesBtn = document.getElementById("clearPlacesBtn");
    const clearHotelsBtn = document.getElementById("clearHotelsBtn");

    if (clearPlacesBtn) {
        clearPlacesBtn.addEventListener("click", clearSavedPlaces);
    }

    if (clearHotelsBtn) {
        clearHotelsBtn.addEventListener("click", clearSavedHotels);
    }

});