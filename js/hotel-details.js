/* ==========================================
   TravelVerse
   File: js/hotel-details.js
   Dynamic Hotel Details Page
========================================== */

"use strict";

const HOTEL_REVIEW_KEY = "travelverse_hotel_reviews";
const SAVED_HOTELS_KEY = "savedHotels";
const DEFAULT_HOTEL_IMAGE = "/assets/images/hotel-cover.jpg";
const FALLBACK_IMAGE = "/assets/images.jpeg";

let currentHotel = null;

/* ==========================================
   BASIC HELPERS
========================================== */

function safeJSONParse(value, fallback = null) {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }

    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

function readStorage(key, fallback = null) {
    return safeJSONParse(localStorage.getItem(key), fallback);
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function titleCase(value) {
    return String(value ?? "")
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        });
}

function createSlug(value) {
    return String(value ?? "hotel")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "hotel";
}

function numberFromValue(value, fallback = 0) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    const cleaned = String(value ?? "").replace(/[^0-9.]/g, "");
    const parsed = Number(cleaned);

    return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeImagePath(value) {
    const image = String(value ?? "").trim();

    if (!image) return DEFAULT_HOTEL_IMAGE;

    if (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("data:image/") ||
        image.startsWith("blob:") ||
        image.startsWith("/")
    ) {
        return image;
    }

    if (image.startsWith("assets/")) {
        return "/" + image;
    }

    return image;
}

function setImageWithFallback(imageElement, source, altText) {
    if (!imageElement) return;

    imageElement.alt = altText || "Hotel image";
    imageElement.src = normalizeImagePath(source);

    imageElement.onerror = function () {
        this.onerror = null;
        this.src = FALLBACK_IMAGE;
    };
}

function uniqueStrings(items) {
    const seen = new Set();

    return items.filter(function (item) {
        const value = String(item ?? "").trim();

        if (!value || seen.has(value)) return false;

        seen.add(value);
        return true;
    });
}

function normalizeArray(value) {
    if (Array.isArray(value)) return value;

    if (typeof value === "string") {
        return value
            .split(/[,|\n]/)
            .map(function (item) {
                return item.trim();
            })
            .filter(Boolean);
    }

    return [];
}

function formatPriceText(value) {
    if (typeof value === "string" && /bdt|৳|night/i.test(value)) {
        return value.trim();
    }

    const price = numberFromValue(value, 0);

    if (!price) return "Price on request";

    return price.toLocaleString("en-BD") + " BDT / Night";
}

function getPriceNumber(value) {
    return numberFromValue(value, 0);
}

function getCurrentUser() {
    const user = readStorage("travelUser", null) ||
        readStorage("travelverse_current_user", null);

    if (!user) return null;

    if (typeof user === "string") {
        return {
            id: user,
            name: user,
            email: "",
            profile: "/assets/images/user1.jpg"
        };
    }

    return {
        id: String(
            user.uid ||
            user.id ||
            user.email ||
            user.username ||
            user.name ||
            "traveler"
        ),
        name: user.name || user.fullName || user.username || "Traveler",
        email: user.email || "",
        profile: normalizeImagePath(
            user.profile ||
            user.avatar ||
            user.image ||
            "/assets/images/user1.jpg"
        )
    };
}

function requireUserLogin(message) {
    if (getCurrentUser()) return true;

    if (typeof window.requireLogin === "function") {
        window.requireLogin(message || "Please login to continue.");
        return false;
    }

    localStorage.setItem(
        "travelverse_redirect_after_login",
        window.location.href
    );

    alert(message || "Please login to continue.");
    window.location.href = "login.html";

    return false;
}

function formatDate(dateValue) {
    const date = new Date(dateValue || Date.now());

    if (Number.isNaN(date.getTime())) return "Recently";

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

/* ==========================================
   FIND AND NORMALIZE SELECTED HOTEL
========================================== */

function collectHotelSources() {
    const keys = [
        "travelverse_hotels",
        "hotels",
        "travelverse_hotel_submissions",
        SAVED_HOTELS_KEY
    ];

    const hotels = [];

    keys.forEach(function (key) {
        const stored = readStorage(key, []);

        if (Array.isArray(stored)) {
            hotels.push(...stored);
        }
    });

    return hotels.filter(function (hotel) {
        return hotel && typeof hotel === "object";
    });
}

function getSelectedHotelRaw() {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id");
    const storedSelectedHotel = readStorage("selectedHotel", null);
    const allHotels = collectHotelSources();

    if (storedSelectedHotel && typeof storedSelectedHotel === "object") {
        const storedId = String(
            storedSelectedHotel.id ||
            storedSelectedHotel.hotelId ||
            ""
        );

        if (!requestedId || storedId === String(requestedId)) {
            return storedSelectedHotel;
        }
    }

    if (requestedId) {
        const foundById = allHotels.find(function (hotel) {
            return String(hotel.id || hotel.hotelId || "") === String(requestedId);
        });

        if (foundById) return foundById;
    }

    if (typeof storedSelectedHotel === "string") {
        const selectedText = storedSelectedHotel.toLowerCase();

        const foundByStoredText = allHotels.find(function (hotel) {
            return (
                String(hotel.id || "").toLowerCase() === selectedText ||
                String(hotel.name || "").toLowerCase() === selectedText
            );
        });

        if (foundByStoredText) return foundByStoredText;
    }

    return null;
}

function getSelectedPlaceData() {
    const selectedPlace = readStorage("selectedPlace", null);

    if (selectedPlace && typeof selectedPlace === "object") {
        return selectedPlace;
    }

    if (typeof selectedPlace === "string") {
        return {
            id: createSlug(selectedPlace),
            name: selectedPlace
        };
    }

    return {};
}

function normalizeHotel(rawHotel) {
    if (!rawHotel || typeof rawHotel !== "object") return null;

    const params = new URLSearchParams(window.location.search);
    const selectedPlace = getSelectedPlaceData();

    const name = String(
        rawHotel.name ||
        rawHotel.hotelName ||
        "Hotel"
    ).trim();

    const id = String(
        rawHotel.id ||
        rawHotel.hotelId ||
        params.get("id") ||
        createSlug(name)
    );

    const destinationId = String(
        rawHotel.destination ||
        rawHotel.destinationId ||
        rawHotel.placeId ||
        selectedPlace.id ||
        params.get("destination") ||
        "bangladesh"
    );

    const destinationName = String(
        rawHotel.destinationName ||
        rawHotel.touristSpot ||
        rawHotel.placeName ||
        selectedPlace.name ||
        titleCase(destinationId)
    );

    const location = String(
        rawHotel.location ||
        rawHotel.address ||
        rawHotel.district ||
        destinationName
    );

    const star = Math.max(
        0,
        Math.min(
            5,
            Math.round(
                numberFromValue(
                    rawHotel.star || rawHotel.stars || rawHotel.hotelStar,
                    0
                )
            )
        )
    );

    const rating = Math.max(
        0,
        Math.min(
            5,
            numberFromValue(rawHotel.rating || rawHotel.averageRating, 0)
        )
    );

    const priceSource =
        rawHotel.price ??
        rawHotel.pricePerNight ??
        rawHotel.cost ??
        0;

    const coverImage = normalizeImagePath(
        rawHotel.image ||
        rawHotel.cover ||
        rawHotel.coverImage ||
        rawHotel.thumbnail ||
        DEFAULT_HOTEL_IMAGE
    );

    let gallery = normalizeArray(
        rawHotel.gallery ||
        rawHotel.images ||
        rawHotel.additionalImages
    ).map(normalizeImagePath);

    gallery = uniqueStrings([coverImage, ...gallery]);

    if (gallery.length < 4) {
        gallery = uniqueStrings([
            ...gallery,
            "/assets/images/hotel1.jpg",
            "/assets/images/hotel2.jpg",
            "/assets/images/hotel3.jpg",
            "/assets/images/hotel4.jpg"
        ]).slice(0, 4);
    }

    const facilities = uniqueStrings(
        normalizeArray(
            rawHotel.facilities ||
            rawHotel.features ||
            rawHotel.amenities
        )
    );

    const roomTypes = Array.isArray(rawHotel.roomTypes)
        ? rawHotel.roomTypes
        : normalizeArray(rawHotel.roomTypes || rawHotel.rooms);

    return {
        id: id,
        name: name,
        destinationId: destinationId,
        destinationName: destinationName,
        location: location,
        district: String(rawHotel.district || destinationName),
        star: star,
        rating: rating,
        reviewCount: Math.max(
            0,
            Math.round(numberFromValue(rawHotel.reviewCount || rawHotel.reviewsCount, 0))
        ),
        budget: titleCase(rawHotel.budget || rawHotel.budgetType || "Standard"),
        price: getPriceNumber(priceSource),
        priceText: formatPriceText(priceSource),
        image: coverImage,
        gallery: gallery,
        facilities: facilities.length
            ? facilities
            : [
                "Free Wi-Fi",
                "Air Conditioning",
                "Room Service",
                "Family Rooms"
            ],
        description: String(
            rawHotel.description ||
            rawHotel.about ||
            "Enjoy a comfortable stay with convenient facilities and friendly service."
        ),
        phone: String(rawHotel.phone || rawHotel.contact || ""),
        email: String(rawHotel.email || ""),
        website: String(rawHotel.website || rawHotel.url || ""),
        roomTypes: roomTypes,
        status: String(rawHotel.status || "approved")
    };
}

/* ==========================================
   PAGE STATE
========================================== */

function showHotelNotFound() {
    const notFound = document.getElementById("hotelNotFound");
    const content = document.getElementById("hotelDetailsContent");

    if (notFound) notFound.hidden = false;
    if (content) content.hidden = true;
}

function showHotelContent() {
    const notFound = document.getElementById("hotelNotFound");
    const content = document.getElementById("hotelDetailsContent");

    if (notFound) notFound.hidden = true;
    if (content) content.hidden = false;
}

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

function renderHotelDetails() {
    if (!currentHotel) {
        showHotelNotFound();
        return;
    }

    showHotelContent();

    document.title = currentHotel.name + " | TravelVerse";

    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) {
        pageTitle.textContent = currentHotel.name + " | TravelVerse";
    }

    setImageWithFallback(
        document.getElementById("hotelCover"),
        currentHotel.image,
        currentHotel.name
    );

    setText("hotelName", currentHotel.name);
    setText("infoHotel", currentHotel.name);
    setText("infoDestination", currentHotel.destinationName);
    setText("infoDistrict", currentHotel.location);
    setText("infoStar", currentHotel.star + " Star Hotel");
    setText("hotelStar", currentHotel.star + " Star");
    setText("infoBudget", currentHotel.budget);
    setText("hotelPrice", currentHotel.priceText);
    setText("coverPrice", currentHotel.priceText);
    setText("summaryPrice", currentHotel.priceText.replace(/\s*\/\s*Night/i, ""));
    setText("coverBudget", currentHotel.budget);
    setText("hotelDescription", currentHotel.description);

    const touristSpot = document.getElementById("touristSpot");
    if (touristSpot) {
        touristSpot.innerHTML = `
            <i class="fa-solid fa-location-dot"></i>
            ${escapeHTML(currentHotel.location)}, Bangladesh
        `;
    }

    const coverRating = document.getElementById("coverRating");
    if (coverRating) {
        coverRating.innerHTML = `
            <i class="fa-solid fa-star"></i>
            ${currentHotel.rating.toFixed(1)} Rating
        `;
    }

    const backLink = document.getElementById("backToHotels");
    if (backLink) {
        backLink.href =
            "hotels.html?destination=" +
            encodeURIComponent(currentHotel.destinationId);
    }

    renderContactInformation();
    renderFacilities();
    renderRoomTypes();
    renderGallery();
    prepareSaveHotelButton();
}

function renderContactInformation() {
    const phone = document.getElementById("hotelPhone");
    const email = document.getElementById("hotelEmail");
    const website = document.getElementById("hotelWebsite");

    if (phone) {
        if (currentHotel.phone) {
            phone.textContent = currentHotel.phone;
            phone.href = "tel:" + currentHotel.phone.replace(/\s+/g, "");
        } else {
            phone.textContent = "Not available";
            phone.removeAttribute("href");
        }
    }

    if (email) {
        if (currentHotel.email) {
            email.textContent = currentHotel.email;
            email.href = "mailto:" + currentHotel.email;
        } else {
            email.textContent = "Not available";
            email.removeAttribute("href");
        }
    }

    if (website) {
        if (/^https?:\/\//i.test(currentHotel.website)) {
            website.textContent = currentHotel.website.replace(/^https?:\/\//i, "");
            website.href = currentHotel.website;
        } else if (currentHotel.website) {
            website.textContent = currentHotel.website;
            website.href = "https://" + currentHotel.website;
        } else {
            website.textContent = "Not available";
            website.removeAttribute("href");
        }
    }
}

/* ==========================================
   FACILITIES
========================================== */

function facilityIcon(facility) {
    const text = String(facility).toLowerCase();

    if (text.includes("wifi")) return "fa-wifi";
    if (text.includes("parking")) return "fa-square-parking";
    if (text.includes("pool")) return "fa-person-swimming";
    if (text.includes("restaurant") || text.includes("food")) return "fa-utensils";
    if (text.includes("breakfast")) return "fa-mug-hot";
    if (text.includes("air") || text.includes("ac")) return "fa-snowflake";
    if (text.includes("airport") || text.includes("pickup")) return "fa-plane-arrival";
    if (text.includes("family")) return "fa-people-roof";
    if (text.includes("view")) return "fa-mountain-sun";
    if (text.includes("service")) return "fa-bell-concierge";
    if (text.includes("gym") || text.includes("fitness")) return "fa-dumbbell";

    return "fa-circle-check";
}

function renderFacilities() {
    const container = document.getElementById("hotelFacilities");

    if (!container) return;

    container.innerHTML = currentHotel.facilities
        .map(function (facility) {
            return `
                <div class="facility-item">
                    <i class="fa-solid ${facilityIcon(facility)}"></i>
                    <span>${escapeHTML(facility)}</span>
                </div>
            `;
        })
        .join("");
}

/* ==========================================
   ROOM TYPES
========================================== */

function normalizeRoom(room, index) {
    if (typeof room === "string") {
        return {
            name: room,
            description: "Comfortable room with standard hotel facilities.",
            priceText: currentHotel.priceText
        };
    }

    if (room && typeof room === "object") {
        const roomPrice =
            room.price ??
            room.pricePerNight ??
            currentHotel.price;

        return {
            name: room.name || room.type || "Room " + (index + 1),
            description:
                room.description ||
                room.details ||
                "Comfortable room with standard hotel facilities.",
            priceText: formatPriceText(roomPrice)
        };
    }

    return null;
}

function renderRoomTypes() {
    const container = document.getElementById("hotelRoomTypes");
    const card = document.getElementById("roomInformationCard");

    if (!container || !card) return;

    let rooms = currentHotel.roomTypes
        .map(normalizeRoom)
        .filter(Boolean);

    if (!rooms.length) {
        rooms = [
            {
                name: "Standard Room",
                description: "Room availability and exact type can be confirmed with the hotel.",
                priceText: currentHotel.priceText
            }
        ];
    }

    card.hidden = false;

    container.innerHTML = rooms
        .map(function (room) {
            return `
                <div class="room-type-card">
                    <div>
                        <h3>${escapeHTML(room.name)}</h3>
                        <p>${escapeHTML(room.description)}</p>
                    </div>
                    <strong>${escapeHTML(room.priceText)}</strong>
                </div>
            `;
        })
        .join("");
}

/* ==========================================
   GALLERY
========================================== */

function renderGallery() {
    const gallery = document.getElementById("hotelGallery");

    if (!gallery) return;

    gallery.innerHTML = currentHotel.gallery
        .slice(0, 6)
        .map(function (image, index) {
            return `
                <img
                    src="${escapeHTML(normalizeImagePath(image))}"
                    alt="${escapeHTML(currentHotel.name)} gallery image ${index + 1}"
                    loading="lazy">
            `;
        })
        .join("");

    gallery.querySelectorAll("img").forEach(function (image) {
        image.onerror = function () {
            this.onerror = null;
            this.src = FALLBACK_IMAGE;
        };

        image.addEventListener("click", function () {
            setImageWithFallback(
                document.getElementById("hotelCover"),
                image.src,
                currentHotel.name
            );

            document.querySelector(".cover")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

/* ==========================================
   SAVE / REMOVE HOTEL
========================================== */

function prepareSaveHotelButton() {
    const button = document.getElementById("saveHotelBtn");

    if (!button || !currentHotel) return;

    button.dataset.id = currentHotel.id;
    button.dataset.name = currentHotel.name;
    button.dataset.location = currentHotel.location;
    button.dataset.rating = currentHotel.rating;
    button.dataset.price = currentHotel.priceText;
    button.dataset.image = currentHotel.image;

    button.removeEventListener("click", handleSaveButtonClick);
    button.addEventListener("click", handleSaveButtonClick);

    loadSavedHotelButton();
}

function handleSaveButtonClick(event) {
    saveHotel(event.currentTarget);
}

function saveHotel(button) {
    if (!currentHotel || !button) return;

    let savedHotels = readStorage(SAVED_HOTELS_KEY, []);

    if (!Array.isArray(savedHotels)) {
        savedHotels = [];
    }

    const alreadySaved = savedHotels.some(function (item) {
        return String(item.id) === String(currentHotel.id);
    });

    if (alreadySaved) {
        savedHotels = savedHotels.filter(function (item) {
            return String(item.id) !== String(currentHotel.id);
        });

        writeStorage(SAVED_HOTELS_KEY, savedHotels);
        markHotelButtonAsUnsaved(button);
        alert("Hotel removed from your saved list.");
        return;
    }

    savedHotels.unshift({
        id: currentHotel.id,
        name: currentHotel.name,
        destination: currentHotel.destinationId,
        location: currentHotel.location,
        rating: currentHotel.rating,
        price: currentHotel.price,
        priceText: currentHotel.priceText,
        budget: currentHotel.budget,
        star: currentHotel.star,
        image: currentHotel.image,
        facilities: currentHotel.facilities,
        description: currentHotel.description
    });

    writeStorage(SAVED_HOTELS_KEY, savedHotels);
    markHotelButtonAsSaved(button);
    alert("Hotel saved successfully.");
}

function markHotelButtonAsSaved(button) {
    button.innerHTML = `
        <i class="fa-solid fa-check"></i>
        <span>Saved Hotel</span>
    `;

    button.classList.add("saved");
    button.disabled = false;
}

function markHotelButtonAsUnsaved(button) {
    button.innerHTML = `
        <i class="fa-regular fa-bookmark"></i>
        <span>Save Hotel</span>
    `;

    button.classList.remove("saved");
    button.disabled = false;
}

function loadSavedHotelButton() {
    const button = document.getElementById("saveHotelBtn");

    if (!button || !currentHotel) return;

    const savedHotels = readStorage(SAVED_HOTELS_KEY, []);

    const isSaved = Array.isArray(savedHotels) && savedHotels.some(function (item) {
        return String(item.id) === String(currentHotel.id);
    });

    if (isSaved) {
        markHotelButtonAsSaved(button);
    } else {
        markHotelButtonAsUnsaved(button);
    }
}

/* ==========================================
   HOTEL-SPECIFIC REVIEWS
========================================== */

function readAllHotelReviews() {
    const reviews = readStorage(HOTEL_REVIEW_KEY, []);

    return Array.isArray(reviews) ? reviews : [];
}

function writeAllHotelReviews(reviews) {
    writeStorage(HOTEL_REVIEW_KEY, reviews);
}

function getCurrentHotelReviews() {
    if (!currentHotel) return [];

    return readAllHotelReviews().filter(function (review) {
        return String(review.hotelId) === String(currentHotel.id);
    });
}

function showReviewMessage(message, type) {
    const box = document.getElementById("reviewMessage");

    if (!box) return;

    box.hidden = false;
    box.textContent = message;
    box.className = "review-message " + (type || "info");

    window.clearTimeout(showReviewMessage.timer);

    showReviewMessage.timer = window.setTimeout(function () {
        box.hidden = true;
    }, 3500);
}

function renderStarRating(rating) {
    const fullStars = Math.max(1, Math.min(5, Number(rating) || 1));

    return "⭐".repeat(fullStars) + "☆".repeat(5 - fullStars);
}

function loadReviews() {
    const container = document.getElementById("reviewContainer");
    const emptyState = document.getElementById("noReviewsMessage");
    const summary = document.getElementById("reviewSummaryText");

    if (!container || !currentHotel) return;

    const reviews = getCurrentHotelReviews().sort(function (a, b) {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    const currentUser = getCurrentUser();

    container.innerHTML = "";

    if (!reviews.length) {
        if (emptyState) emptyState.hidden = false;
        if (summary) summary.textContent = "No reviews added yet.";
        updateRating();
        return;
    }

    if (emptyState) emptyState.hidden = true;

    if (summary) {
        summary.textContent =
            reviews.length +
            (reviews.length === 1 ? " traveler review" : " traveler reviews");
    }

    reviews.forEach(function (review) {
        const isOwner = currentUser && String(currentUser.id) === String(review.userId);

        const card = document.createElement("article");
        card.className = "review-card";
        card.dataset.reviewId = review.id;

        card.innerHTML = `
            <div class="review-header">
                <img
                    src="${escapeHTML(normalizeImagePath(review.profile || "/assets/images/user1.jpg"))}"
                    alt="${escapeHTML(review.user || "Traveler")}">

                <div>
                    <h3>${escapeHTML(review.user || "Traveler")}</h3>
                    <p>${renderStarRating(review.rating)}</p>
                    <small>${escapeHTML(formatDate(review.createdAt))}</small>
                </div>
            </div>

            <p>${escapeHTML(review.review)}</p>

            ${isOwner ? `
                <div class="review-footer">
                    <button
                        type="button"
                        class="edit-btn"
                        data-action="edit"
                        data-review-id="${escapeHTML(review.id)}">
                        Edit
                    </button>

                    <button
                        type="button"
                        class="delete-btn"
                        data-action="delete"
                        data-review-id="${escapeHTML(review.id)}">
                        Delete
                    </button>
                </div>
            ` : ""}
        `;

        const avatar = card.querySelector("img");
        if (avatar) {
            avatar.onerror = function () {
                this.onerror = null;
                this.src = "/assets/images/user1.jpg";
            };
        }

        container.appendChild(card);
    });

    updateRating();
}

function submitNewReview() {
    if (!currentHotel) return;

    if (!requireUserLogin("Please login to write a hotel review.")) {
        return;
    }

    const textarea = document.getElementById("newReview");
    const ratingSelect = document.getElementById("newRating");

    if (!textarea || !ratingSelect) return;

    const reviewText = textarea.value.trim();
    const rating = Math.max(1, Math.min(5, Number(ratingSelect.value) || 5));

    if (reviewText.length < 5) {
        showReviewMessage("Please write at least 5 characters.", "error");
        textarea.focus();
        return;
    }

    const currentUser = getCurrentUser();
    const reviews = readAllHotelReviews();

    reviews.push({
        id: "review_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
        hotelId: currentHotel.id,
        userId: currentUser.id,
        user: currentUser.name,
        email: currentUser.email,
        profile: currentUser.profile,
        rating: rating,
        review: reviewText,
        createdAt: new Date().toISOString(),
        updatedAt: null
    });

    writeAllHotelReviews(reviews);

    textarea.value = "";
    ratingSelect.value = "5";

    showReviewMessage("Your review was submitted successfully.", "success");
    loadReviews();
}

function editReview(reviewId) {
    if (!requireUserLogin("Please login to edit your review.")) {
        return;
    }

    const currentUser = getCurrentUser();
    const reviews = readAllHotelReviews();
    const index = reviews.findIndex(function (review) {
        return String(review.id) === String(reviewId);
    });

    if (index === -1) return;

    if (String(reviews[index].userId) !== String(currentUser.id)) {
        alert("You can only edit your own review.");
        return;
    }

    const updatedText = prompt("Edit your review", reviews[index].review);

    if (updatedText === null) return;

    if (updatedText.trim().length < 5) {
        alert("Review must contain at least 5 characters.");
        return;
    }

    reviews[index].review = updatedText.trim();
    reviews[index].updatedAt = new Date().toISOString();

    writeAllHotelReviews(reviews);
    loadReviews();
    showReviewMessage("Review updated successfully.", "success");
}

function deleteReview(reviewId) {
    if (!requireUserLogin("Please login to delete your review.")) {
        return;
    }

    const currentUser = getCurrentUser();
    const reviews = readAllHotelReviews();
    const targetReview = reviews.find(function (review) {
        return String(review.id) === String(reviewId);
    });

    if (!targetReview) return;

    if (String(targetReview.userId) !== String(currentUser.id)) {
        alert("You can only delete your own review.");
        return;
    }

    if (!confirm("Delete this review?")) return;

    const remainingReviews = reviews.filter(function (review) {
        return String(review.id) !== String(reviewId);
    });

    writeAllHotelReviews(remainingReviews);
    loadReviews();
    showReviewMessage("Review deleted successfully.", "success");
}

function updateRating() {
    if (!currentHotel) return;

    const reviews = getCurrentHotelReviews();
    const reviewCount = document.getElementById("reviewCount");
    const averageRating = document.getElementById("averageRating");

    let rating = currentHotel.rating;
    let count = reviews.length;

    if (reviews.length) {
        const total = reviews.reduce(function (sum, review) {
            return sum + Number(review.rating || 0);
        }, 0);

        rating = total / reviews.length;
    } else if (currentHotel.reviewCount) {
        count = currentHotel.reviewCount;
    }

    if (reviewCount) {
        reviewCount.textContent = String(count);
    }

    if (averageRating) {
        averageRating.textContent = rating.toFixed(1) + " ⭐";
    }
}

function bindReviewEvents() {
    const submitButton = document.getElementById("submitReview");
    const container = document.getElementById("reviewContainer");

    if (submitButton) {
        submitButton.addEventListener("click", submitNewReview);
    }

    if (container) {
        container.addEventListener("click", function (event) {
            const button = event.target.closest("button[data-action]");

            if (!button) return;

            const reviewId = button.dataset.reviewId;
            const action = button.dataset.action;

            if (action === "edit") {
                editReview(reviewId);
            }

            if (action === "delete") {
                deleteReview(reviewId);
            }
        });
    }
}

/* ==========================================
   INITIALIZE PAGE
========================================== */

function initializeHotelDetailsPage() {
    const rawHotel = getSelectedHotelRaw();
    currentHotel = normalizeHotel(rawHotel);

    if (!currentHotel) {
        showHotelNotFound();
        return;
    }

    localStorage.setItem("selectedHotel", JSON.stringify(currentHotel));

    renderHotelDetails();
    bindReviewEvents();
    loadReviews();

    console.log("Hotel Details Loaded:", currentHotel.name);
}

document.addEventListener("DOMContentLoaded", initializeHotelDetailsPage);

window.addEventListener("pageshow", function () {
    if (currentHotel) {
        loadSavedHotelButton();
        loadReviews();
    }
});

/* Keep these functions globally available */
window.saveHotel = saveHotel;
window.editReview = editReview;
window.deleteReview = deleteReview;
