/* ==================================================
   TravelVerse Hotel Listing
   File: js/hotels.js
================================================== */


// ===============================
// Default Hotel Image
// ===============================

const DEFAULT_HOTEL_IMAGE =
    "/assets/images/hotel-cover.jpg";


// ===============================
// Destination Information
// ===============================

const destinationInformation = {

    "cox-bazar": {
        name: "Cox's Bazar",
        location: "Chattogram",
        description:
            "Explore budget-friendly, premium and luxury hotels near the world's longest sea beach."
    },

    "sajek-valley": {
        name: "Sajek Valley",
        location: "Rangamati",
        description:
            "Find peaceful cottages and hill resorts surrounded by clouds and mountain views."
    },

    "sundarbans": {
        name: "Sundarbans",
        location: "Khulna",
        description:
            "Discover comfortable accommodation near the largest mangrove forest."
    },

    "saint-martin": {
        name: "Saint Martin",
        location: "Cox's Bazar",
        description:
            "Compare island cottages, beach resorts and premium seaside accommodation."
    },

    "bandarban": {
        name: "Bandarban",
        location: "Chattogram Hill Tracts",
        description:
            "Stay close to hills, waterfalls and adventure destinations in Bandarban."
    },

    "rangamati": {
        name: "Rangamati",
        location: "Chattogram Hill Tracts",
        description:
            "Find lakeside hotels and peaceful resorts around Kaptai Lake."
    }

};


// ===============================
// Hotel Data
// Sample hotel information
// ===============================

const hotelsData = [

    // ==========================================
    // Cox's Bazar Hotels
    // ==========================================

    {
        id: "cox-hotel-01",
        destination: "cox-bazar",
        name: "Sea Breeze Budget Inn",
        location: "Kolatoli, Cox's Bazar",
        star: 1,
        rating: 3.8,
        price: 1500,
        budget: "low",
        image: "/assets/longest-sea-beach-in.jpg",
        facilities: [
            "Free Wi-Fi",
            "Parking",
            "Room Service"
        ],
        featured: false
    },

    {
        id: "cox-hotel-02",
        destination: "cox-bazar",
        name: "Beach Point Residence",
        location: "Sugandha Point, Cox's Bazar",
        star: 2,
        rating: 4.0,
        price: 2500,
        budget: "low",
        image: "/assets/longest-sea-beach-in.jpg",
        facilities: [
            "Air Conditioning",
            "Restaurant",
            "Family Rooms"
        ],
        featured: false
    },

    {
        id: "cox-hotel-03",
        destination: "cox-bazar",
        name: "Ocean View Hotel",
        location: "Kolatoli Beach Road, Cox's Bazar",
        star: 3,
        rating: 4.3,
        price: 4500,
        budget: "mid",
        image: "/assets/longest-sea-beach-in.jpg",
        facilities: [
            "Sea View",
            "Breakfast",
            "Free Wi-Fi",
            "Restaurant"
        ],
        featured: true
    },

    {
        id: "cox-hotel-04",
        destination: "cox-bazar",
        name: "Marine Drive Grand",
        location: "Marine Drive, Cox's Bazar",
        star: 4,
        rating: 4.6,
        price: 7800,
        budget: "premium",
        image: "/assets/longest-sea-beach-in.jpg",
        facilities: [
            "Swimming Pool",
            "Airport Pickup",
            "Sea View",
            "Gym"
        ],
        featured: true
    },

    {
        id: "cox-hotel-05",
        destination: "cox-bazar",
        name: "Royal Ocean Resort",
        location: "Inani Marine Drive, Cox's Bazar",
        star: 5,
        rating: 4.9,
        price: 13500,
        budget: "luxury",
        image: "/assets/longest-sea-beach-in.jpg",
        facilities: [
            "Infinity Pool",
            "Private Beach",
            "Spa",
            "Premium Restaurant"
        ],
        featured: true
    },


    // ==========================================
    // Sajek Valley Hotels
    // ==========================================

    {
        id: "sajek-hotel-01",
        destination: "sajek-valley",
        name: "Hill Track Guest House",
        location: "Sajek Valley",
        star: 1,
        rating: 3.7,
        price: 1300,
        budget: "low",
        image: "/assets/images.jpeg",
        facilities: [
            "Hill View",
            "Parking",
            "Family Rooms"
        ],
        featured: false
    },

    {
        id: "sajek-hotel-02",
        destination: "sajek-valley",
        name: "Cloud Corner Cottage",
        location: "Ruilui Para, Sajek",
        star: 2,
        rating: 4.1,
        price: 2300,
        budget: "low",
        image: "/assets/images.jpeg",
        facilities: [
            "Balcony",
            "Breakfast",
            "Mountain View"
        ],
        featured: false
    },

    {
        id: "sajek-hotel-03",
        destination: "sajek-valley",
        name: "Sajek Green Valley Resort",
        location: "Ruilui Para, Sajek",
        star: 3,
        rating: 4.4,
        price: 4200,
        budget: "mid",
        image: "/assets/images.jpeg",
        facilities: [
            "Cloud View",
            "Restaurant",
            "Free Wi-Fi",
            "Balcony"
        ],
        featured: true
    },

    {
        id: "sajek-hotel-04",
        destination: "sajek-valley",
        name: "Mountain Crown Resort",
        location: "Konglak Road, Sajek",
        star: 4,
        rating: 4.7,
        price: 7000,
        budget: "premium",
        image: "/assets/images.jpeg",
        facilities: [
            "Premium Balcony",
            "Restaurant",
            "Bonfire",
            "Family Suite"
        ],
        featured: true
    },

    {
        id: "sajek-hotel-05",
        destination: "sajek-valley",
        name: "Cloud Kingdom Luxury Resort",
        location: "Sajek Valley",
        star: 5,
        rating: 4.9,
        price: 11000,
        budget: "luxury",
        image: "/assets/images.jpeg",
        facilities: [
            "Panoramic View",
            "Luxury Suite",
            "Premium Dining",
            "Private Balcony"
        ],
        featured: true
    },


    // ==========================================
    // Sundarbans Hotels
    // ==========================================

    {
        id: "sundarbans-hotel-01",
        destination: "sundarbans",
        name: "Forest Gate Lodge",
        location: "Mongla, Khulna",
        star: 1,
        rating: 3.6,
        price: 1200,
        budget: "low",
        image: "/assets/922_giant.jpg",
        facilities: [
            "Parking",
            "Room Service",
            "Tour Assistance"
        ],
        featured: false
    },

    {
        id: "sundarbans-hotel-02",
        destination: "sundarbans",
        name: "Mangrove View Inn",
        location: "Mongla Port Area",
        star: 2,
        rating: 4.0,
        price: 2200,
        budget: "low",
        image: "/assets/922_giant.jpg",
        facilities: [
            "Breakfast",
            "Air Conditioning",
            "River View"
        ],
        featured: false
    },

    {
        id: "sundarbans-hotel-03",
        destination: "sundarbans",
        name: "Sundarban Nature Hotel",
        location: "Mongla, Khulna",
        star: 3,
        rating: 4.3,
        price: 3900,
        budget: "mid",
        image: "/assets/922_giant.jpg",
        facilities: [
            "Restaurant",
            "Tour Guide",
            "Free Wi-Fi",
            "Family Rooms"
        ],
        featured: true
    },

    {
        id: "sundarbans-hotel-04",
        destination: "sundarbans",
        name: "Royal Mangrove Resort",
        location: "Near Mongla River",
        star: 4,
        rating: 4.6,
        price: 6900,
        budget: "premium",
        image: "/assets/922_giant.jpg",
        facilities: [
            "River Cruise",
            "Premium Restaurant",
            "Tour Package",
            "Balcony"
        ],
        featured: true
    },

    {
        id: "sundarbans-hotel-05",
        destination: "sundarbans",
        name: "Mangrove Heritage Retreat",
        location: "Sundarbans Gateway",
        star: 5,
        rating: 4.8,
        price: 10500,
        budget: "luxury",
        image: "/assets/922_giant.jpg",
        facilities: [
            "Luxury Cottage",
            "Private Cruise",
            "Nature Guide",
            "Fine Dining"
        ],
        featured: true
    },


    // ==========================================
    // Saint Martin Hotels
    // ==========================================

    {
        id: "saint-hotel-01",
        destination: "saint-martin",
        name: "Island Budget Cottage",
        location: "Saint Martin Island",
        star: 1,
        rating: 3.8,
        price: 1600,
        budget: "low",
        image: "/assets/image-299881-1754634544.jpg",
        facilities: [
            "Beach Access",
            "Fan Room",
            "Local Food"
        ],
        featured: false
    },

    {
        id: "saint-hotel-02",
        destination: "saint-martin",
        name: "Coral Beach Inn",
        location: "West Beach, Saint Martin",
        star: 2,
        rating: 4.1,
        price: 2700,
        budget: "low",
        image: "/assets/image-299881-1754634544.jpg",
        facilities: [
            "Sea View",
            "Breakfast",
            "Family Room"
        ],
        featured: false
    },

    {
        id: "saint-hotel-03",
        destination: "saint-martin",
        name: "Blue Island Resort",
        location: "Saint Martin Island",
        star: 3,
        rating: 4.4,
        price: 4800,
        budget: "mid",
        image: "/assets/image-299881-1754634544.jpg",
        facilities: [
            "Beach View",
            "Restaurant",
            "Air Conditioning",
            "Balcony"
        ],
        featured: true
    },

    {
        id: "saint-hotel-04",
        destination: "saint-martin",
        name: "Coral Crown Resort",
        location: "South Beach, Saint Martin",
        star: 4,
        rating: 4.7,
        price: 8200,
        budget: "premium",
        image: "/assets/image-299881-1754634544.jpg",
        facilities: [
            "Private Beach",
            "Seafood Restaurant",
            "Premium Room",
            "Island Tour"
        ],
        featured: true
    },

    {
        id: "saint-hotel-05",
        destination: "saint-martin",
        name: "Azure Island Luxury Resort",
        location: "Saint Martin Island",
        star: 5,
        rating: 4.9,
        price: 14500,
        budget: "luxury",
        image: "/assets/image-299881-1754634544.jpg",
        facilities: [
            "Luxury Villa",
            "Private Beach",
            "Ocean View",
            "Premium Dining"
        ],
        featured: true
    },


    // ==========================================
    // Bandarban Hotels
    // ==========================================

    {
        id: "bandarban-hotel-01",
        destination: "bandarban",
        name: "Hill Town Guest House",
        location: "Bandarban Town",
        star: 1,
        rating: 3.7,
        price: 1100,
        budget: "low",
        image: "/assets/a93a9706d01a595cf222de17a931d03e.jpg",
        facilities: [
            "Parking",
            "Room Service",
            "Tour Information"
        ],
        featured: false
    },

    {
        id: "bandarban-hotel-02",
        destination: "bandarban",
        name: "Nilachal View Inn",
        location: "Bandarban",
        star: 2,
        rating: 4.0,
        price: 2100,
        budget: "low",
        image: "/assets/a93a9706d01a595cf222de17a931d03e.jpg",
        facilities: [
            "Hill View",
            "Breakfast",
            "Family Rooms"
        ],
        featured: false
    },

    {
        id: "bandarban-hotel-03",
        destination: "bandarban",
        name: "Mountain Trail Resort",
        location: "Bandarban Hill District",
        star: 3,
        rating: 4.4,
        price: 4100,
        budget: "mid",
        image: "/assets/a93a9706d01a595cf222de17a931d03e.jpg",
        facilities: [
            "Restaurant",
            "Balcony",
            "Free Wi-Fi",
            "Tour Guide"
        ],
        featured: true
    },

    {
        id: "bandarban-hotel-04",
        destination: "bandarban",
        name: "Nilgiri Premium Retreat",
        location: "Nilgiri Road, Bandarban",
        star: 4,
        rating: 4.7,
        price: 7500,
        budget: "premium",
        image: "/assets/a93a9706d01a595cf222de17a931d03e.jpg",
        facilities: [
            "Mountain View",
            "Premium Cottage",
            "Restaurant",
            "Bonfire"
        ],
        featured: true
    },

    {
        id: "bandarban-hotel-05",
        destination: "bandarban",
        name: "Hill Crown Luxury Resort",
        location: "Bandarban",
        star: 5,
        rating: 4.9,
        price: 12000,
        budget: "luxury",
        image: "/assets/a93a9706d01a595cf222de17a931d03e.jpg",
        facilities: [
            "Luxury Cottage",
            "Infinity View",
            "Fine Dining",
            "Private Tour"
        ],
        featured: true
    },


    // ==========================================
    // Rangamati Hotels
    // ==========================================

    {
        id: "rangamati-hotel-01",
        destination: "rangamati",
        name: "Lake Side Budget Inn",
        location: "Rangamati Town",
        star: 1,
        rating: 3.6,
        price: 1000,
        budget: "low",
        image: "/assets/1525327366_1.jpg",
        facilities: [
            "Parking",
            "Fan Room",
            "Lake Access"
        ],
        featured: false
    },

    {
        id: "rangamati-hotel-02",
        destination: "rangamati",
        name: "Kaptai View Residence",
        location: "Rangamati",
        star: 2,
        rating: 4.0,
        price: 2000,
        budget: "low",
        image: "/assets/1525327366_1.jpg",
        facilities: [
            "Lake View",
            "Breakfast",
            "Family Rooms"
        ],
        featured: false
    },

    {
        id: "rangamati-hotel-03",
        destination: "rangamati",
        name: "Lake Paradise Hotel",
        location: "Kaptai Lake, Rangamati",
        star: 3,
        rating: 4.3,
        price: 3800,
        budget: "mid",
        image: "/assets/1525327366_1.jpg",
        facilities: [
            "Restaurant",
            "Boat Service",
            "Free Wi-Fi",
            "Balcony"
        ],
        featured: true
    },

    {
        id: "rangamati-hotel-04",
        destination: "rangamati",
        name: "Kaptai Premium Resort",
        location: "Kaptai Lake",
        star: 4,
        rating: 4.6,
        price: 6800,
        budget: "premium",
        image: "/assets/1525327366_1.jpg",
        facilities: [
            "Lake View",
            "Premium Restaurant",
            "Boat Tour",
            "Family Suite"
        ],
        featured: true
    },

    {
        id: "rangamati-hotel-05",
        destination: "rangamati",
        name: "Lake Crown Luxury Retreat",
        location: "Rangamati",
        star: 5,
        rating: 4.8,
        price: 10800,
        budget: "luxury",
        image: "/assets/1525327366_1.jpg",
        facilities: [
            "Luxury Cottage",
            "Private Boat",
            "Lakefront Dining",
            "Premium Suite"
        ],
        featured: true
    }

];


// ===============================
// Safe JSON Parse
// ===============================

function safeHotelParse(key, fallback) {

    try {

        const value = JSON.parse(
            localStorage.getItem(key)
        );

        return value !== null
            ? value
            : fallback;

    } catch (error) {

        return fallback;

    }

}


// ===============================
// Escape HTML
// ===============================

function escapeHotelHTML(value) {

    return String(value ?? "")

        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ===============================
// Get Destination from URL
// ===============================

function getSelectedDestination() {

    const parameters =
        new URLSearchParams(
            window.location.search
        );

    return parameters.get("destination") || "all";

}


// ===============================
// Get Destination Name
// ===============================

function getDestinationName(destinationId) {

    if (
        destinationInformation[destinationId]
    ) {

        return destinationInformation[
            destinationId
        ].name;

    }

    return "Bangladesh";

}


// ===============================
// Price Formatting
// ===============================

function formatHotelPrice(price) {

    return "৳" +
        Number(price || 0).toLocaleString(
            "en-BD"
        );

}


// ===============================
// Budget Labels
// ===============================

function getBudgetLabel(budget) {

    const labels = {

        low: "Low Budget",
        mid: "Mid Range",
        premium: "Premium",
        luxury: "Luxury"

    };

    return labels[budget] || "Hotel";

}


// ===============================
// Facility Icons
// ===============================

function getFacilityIcon(facility) {

    const text =
        facility.toLowerCase();


    if (
        text.includes("wifi") ||
        text.includes("wi-fi")
    ) {

        return "fa-wifi";

    }


    if (
        text.includes("pool")
    ) {

        return "fa-person-swimming";

    }


    if (
        text.includes("restaurant") ||
        text.includes("dining") ||
        text.includes("food")
    ) {

        return "fa-utensils";

    }


    if (
        text.includes("parking")
    ) {

        return "fa-square-parking";

    }


    if (
        text.includes("breakfast")
    ) {

        return "fa-mug-hot";

    }


    if (
        text.includes("view") ||
        text.includes("balcony")
    ) {

        return "fa-mountain-sun";

    }


    if (
        text.includes("beach")
    ) {

        return "fa-umbrella-beach";

    }


    if (
        text.includes("boat") ||
        text.includes("cruise")
    ) {

        return "fa-sailboat";

    }


    if (
        text.includes("air conditioning")
    ) {

        return "fa-snowflake";

    }


    if (
        text.includes("airport")
    ) {

        return "fa-plane";

    }


    if (
        text.includes("spa")
    ) {

        return "fa-spa";

    }


    if (
        text.includes("family")
    ) {

        return "fa-people-roof";

    }


    return "fa-circle-check";

}


// ===============================
// Create Star Icons
// ===============================

function createHotelStars(starCount) {

    let stars = "";

    for (
        let index = 1;
        index <= 5;
        index++
    ) {

        if (index <= starCount) {

            stars +=
                '<i class="fa-solid fa-star"></i>';

        } else {

            stars +=
                '<i class="fa-regular fa-star"></i>';

        }

    }

    return stars;

}


// ===============================
// Saved Hotels
// ===============================

function getSavedHotels() {

    return safeHotelParse(
        "savedHotels",
        []
    );

}


function saveSavedHotels(hotels) {

    localStorage.setItem(
        "savedHotels",
        JSON.stringify(hotels)
    );

}


function hotelIsSaved(hotelId) {

    return getSavedHotels().some(
        function (hotel) {

            return String(hotel.id) ===
                String(hotelId);

        }
    );

}


// ===============================
// Toggle Save Hotel
// ===============================

function toggleSaveHotel(hotelId) {

    const hotel =
        hotelsData.find(
            function (item) {

                return String(item.id) ===
                    String(hotelId);

            }
        );


    if (!hotel) return;


    let savedHotels =
        getSavedHotels();


    const existingIndex =
        savedHotels.findIndex(
            function (item) {

                return String(item.id) ===
                    String(hotelId);

            }
        );


    if (existingIndex >= 0) {

        savedHotels.splice(
            existingIndex,
            1
        );

    } else {

        savedHotels.unshift({

            ...hotel,

            destinationName:
                getDestinationName(
                    hotel.destination
                ),

            priceText:
                formatHotelPrice(
                    hotel.price
                ) + " / Night"

        });

    }


    saveSavedHotels(savedHotels);

    renderHotels();

}


// ===============================
// Get Destination Hotels
// ===============================

function getDestinationHotels() {

    const selectedDestination =
        getSelectedDestination();


    if (selectedDestination === "all") {

        return [...hotelsData];

    }


    return hotelsData.filter(
        function (hotel) {

            return (
                hotel.destination ===
                selectedDestination
            );

        }
    );

}


// ===============================
// Filter Hotels
// ===============================

function getFilteredHotels() {

    const destinationHotels =
        getDestinationHotels();


    const searchInput =
        document.getElementById(
            "hotelSearchInput"
        );

    const starFilter =
        document.getElementById(
            "starFilter"
        );

    const budgetFilter =
        document.getElementById(
            "budgetFilter"
        );

    const sortFilter =
        document.getElementById(
            "sortFilter"
        );


    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const starValue =
        starFilter
            ? starFilter.value
            : "all";


    const budgetValue =
        budgetFilter
            ? budgetFilter.value
            : "all";


    const sortValue =
        sortFilter
            ? sortFilter.value
            : "recommended";


    let filteredHotels =
        destinationHotels.filter(
            function (hotel) {

                const searchableText = [

                    hotel.name,
                    hotel.location,
                    hotel.destination,
                    hotel.budget,
                    hotel.facilities.join(" ")

                ]
                    .join(" ")
                    .toLowerCase();


                const matchesSearch =
                    searchValue === "" ||
                    searchableText.includes(
                        searchValue
                    );


                const matchesStar =
                    starValue === "all" ||
                    Number(hotel.star) ===
                    Number(starValue);


                const matchesBudget =
                    budgetValue === "all" ||
                    hotel.budget ===
                    budgetValue;


                return (
                    matchesSearch &&
                    matchesStar &&
                    matchesBudget
                );

            }
        );


    filteredHotels.sort(
        function (firstHotel, secondHotel) {

            if (
                sortValue === "price-low"
            ) {

                return (
                    firstHotel.price -
                    secondHotel.price
                );

            }


            if (
                sortValue === "price-high"
            ) {

                return (
                    secondHotel.price -
                    firstHotel.price
                );

            }


            if (
                sortValue === "rating-high"
            ) {

                return (
                    secondHotel.rating -
                    firstHotel.rating
                );

            }


            if (
                sortValue === "star-high"
            ) {

                return (
                    secondHotel.star -
                    firstHotel.star
                );

            }


            if (
                firstHotel.featured !==
                secondHotel.featured
            ) {

                return firstHotel.featured
                    ? -1
                    : 1;

            }


            return (
                secondHotel.rating -
                firstHotel.rating
            );

        }
    );


    return filteredHotels;

}


// ===============================
// Render Hotel Cards
// ===============================

function renderHotels() {

    const hotelGrid =
        document.getElementById(
            "hotelsGrid"
        );

    const emptyState =
        document.getElementById(
            "emptyHotelsState"
        );

    const resultCount =
        document.getElementById(
            "resultsCount"
        );


    if (!hotelGrid) return;


    const hotels =
        getFilteredHotels();


    if (resultCount) {

        resultCount.textContent =
            hotels.length;

    }


    hotelGrid.innerHTML = "";


    if (hotels.length === 0) {

        hotelGrid.style.display = "none";


        if (emptyState) {

            emptyState.classList.add(
                "show"
            );

        }

        return;

    }


    hotelGrid.style.display = "grid";


    if (emptyState) {

        emptyState.classList.remove(
            "show"
        );

    }


    hotels.forEach(
        function (hotel) {

            const saved =
                hotelIsSaved(hotel.id);


            const facilitiesHTML =
                hotel.facilities
                    .slice(0, 4)
                    .map(
                        function (facility) {

                            return `

                                <span class="facility-chip">

                                    <i class="fa-solid ${getFacilityIcon(
                                        facility
                                    )}"></i>

                                    ${escapeHotelHTML(
                                        facility
                                    )}

                                </span>

                            `;

                        }
                    )
                    .join("");


            const hotelCard =
                document.createElement(
                    "article"
                );


            hotelCard.className =
                "hotel-card";


            hotelCard.setAttribute(
                "data-hotel-id",
                hotel.id
            );


            hotelCard.innerHTML = `

                <div class="hotel-image-wrapper">

                    <img
                        src="${escapeHotelHTML(
                            hotel.image ||
                            DEFAULT_HOTEL_IMAGE
                        )}"
                        alt="${escapeHotelHTML(
                            hotel.name
                        )}"
                        onerror="this.onerror=null;this.src='${DEFAULT_HOTEL_IMAGE}';">

                    <div class="hotel-overlay"></div>


                    <div class="hotel-badges">

                        <span class="hotel-star-badge">

                            <i class="fa-solid fa-star"></i>

                            ${hotel.star} Star

                        </span>


                        <span class="budget-badge ${hotel.budget}">

                            ${escapeHotelHTML(
                                getBudgetLabel(
                                    hotel.budget
                                )
                            )}

                        </span>

                    </div>


                    <button
                        type="button"
                        class="hotel-image-save-btn
                        ${saved ? "saved" : ""}"
                        data-action="save"
                        data-id="${hotel.id}"
                        title="${saved
                            ? "Remove from saved"
                            : "Save hotel"
                        }">

                        <i class="fa-${
                            saved
                                ? "solid"
                                : "regular"
                        } fa-bookmark"></i>

                    </button>

                </div>


                <div class="hotel-card-content">


                    <div class="hotel-title-row">

                        <h3 class="hotel-name">

                            ${escapeHotelHTML(
                                hotel.name
                            )}

                        </h3>


                        <span class="guest-rating">

                            ${Number(
                                hotel.rating
                            ).toFixed(1)}

                        </span>

                    </div>


                    <p class="hotel-location">

                        <i class="fa-solid fa-location-dot"></i>

                        ${escapeHotelHTML(
                            hotel.location
                        )}

                    </p>


                    <div class="hotel-stars">

                        ${createHotelStars(
                            hotel.star
                        )}

                        <span>
                            Guest rating
                            ${Number(
                                hotel.rating
                            ).toFixed(1)}
                        </span>

                    </div>


                    <div class="hotel-facilities">

                        ${facilitiesHTML}

                    </div>


                    <div class="hotel-price-row">

                        <div class="hotel-price">

                            <small>
                                Starting from
                            </small>

                            <strong>

                                ${formatHotelPrice(
                                    hotel.price
                                )}

                            </strong>

                            <span>
                                per night
                            </span>

                        </div>


                        <span class="hotel-category-badge">

                            ${escapeHotelHTML(
                                getBudgetLabel(
                                    hotel.budget
                                )
                            )}

                        </span>

                    </div>


                    <div class="hotel-card-actions">

                        <button
                            type="button"
                            class="view-details-btn"
                            data-action="details"
                            data-id="${hotel.id}">

                            <i class="fa-solid fa-eye"></i>

                            View Details

                        </button>


                        <button
                            type="button"
                            class="save-hotel-btn
                            ${saved ? "saved" : ""}"
                            data-action="save"
                            data-id="${hotel.id}">

                            <i class="fa-${
                                saved
                                    ? "solid"
                                    : "regular"
                            } fa-bookmark"></i>

                            ${saved
                                ? "Saved"
                                : "Save"
                            }

                        </button>

                    </div>

                </div>

            `;


            hotelGrid.appendChild(
                hotelCard
            );

        }
    );

}


// ===============================
// Hero and Destination Content
// ===============================

function updateDestinationContent() {

    const selectedDestination =
        getSelectedDestination();


    const destination =
        destinationInformation[
            selectedDestination
        ];


    const destinationBadge =
        document.getElementById(
            "destinationBadge"
        );

    const destinationTitle =
        document.getElementById(
            "destinationTitle"
        );

    const destinationSubtitle =
        document.getElementById(
            "destinationSubtitle"
        );

    const hotelSectionTitle =
        document.getElementById(
            "hotelSectionTitle"
        );


    if (
        selectedDestination === "all" ||
        !destination
    ) {

        if (destinationBadge) {

            destinationBadge.innerHTML = `

                <i class="fa-solid fa-location-dot"></i>

                Bangladesh

            `;

        }


        if (destinationTitle) {

            destinationTitle.textContent =
                "Hotels Across Bangladesh";

        }


        if (destinationSubtitle) {

            destinationSubtitle.textContent =
                "Explore hotels from popular destinations across Bangladesh.";

        }


        if (hotelSectionTitle) {

            hotelSectionTitle.textContent =
                "Find the Perfect Hotel";

        }


        document.title =
            "TravelVerse | Hotels";

        return;

    }


    if (destinationBadge) {

        destinationBadge.innerHTML = `

            <i class="fa-solid fa-location-dot"></i>

            ${escapeHotelHTML(
                destination.location
            )}

        `;

    }


    if (destinationTitle) {

        destinationTitle.textContent =
            "Hotels in " +
            destination.name;

    }


    if (destinationSubtitle) {

        destinationSubtitle.textContent =
            destination.description;

    }


    if (hotelSectionTitle) {

        hotelSectionTitle.textContent =
            destination.name +
            " Hotels";

    }


    document.title =
        "Hotels in " +
        destination.name +
        " | TravelVerse";

}


// ===============================
// Update Hero Statistics
// ===============================

function updateHotelStatistics() {

    const hotels =
        getDestinationHotels();


    const totalHotelStat =
        document.getElementById(
            "totalHotelStat"
        );

    const lowestPriceStat =
        document.getElementById(
            "lowestPriceStat"
        );

    const topRatingStat =
        document.getElementById(
            "topRatingStat"
        );


    if (totalHotelStat) {

        totalHotelStat.textContent =
            hotels.length;

    }


    if (hotels.length === 0) {

        if (lowestPriceStat) {

            lowestPriceStat.textContent =
                "৳0";

        }


        if (topRatingStat) {

            topRatingStat.textContent =
                "0.0";

        }

        return;

    }


    const lowestPrice =
        Math.min(
            ...hotels.map(
                function (hotel) {

                    return hotel.price;

                }
            )
        );


    const topRating =
        Math.max(
            ...hotels.map(
                function (hotel) {

                    return hotel.rating;

                }
            )
        );


    if (lowestPriceStat) {

        lowestPriceStat.textContent =
            formatHotelPrice(
                lowestPrice
            );

    }


    if (topRatingStat) {

        topRatingStat.textContent =
            Number(
                topRating
            ).toFixed(1);

    }

}


// ===============================
// Open Hotel Details
// ===============================

function openHotelDetails(hotelId) {

    const hotel =
        hotelsData.find(
            function (item) {

                return String(item.id) ===
                    String(hotelId);

            }
        );


    if (!hotel) {

        alert(
            "Hotel information was not found."
        );

        return;

    }


    const destination =
        destinationInformation[
            hotel.destination
        ] || {};


    const selectedHotel = {

        ...hotel,

        destinationName:
            destination.name ||
            hotel.destination,

        destinationLocation:
            destination.location ||
            hotel.location,

        priceText:
            formatHotelPrice(
                hotel.price
            ) + " / Night"

    };


    localStorage.setItem(
        "selectedHotel",
        JSON.stringify(
            selectedHotel
        )
    );


    localStorage.setItem(
        "selectedPlace",
        JSON.stringify({

            id: hotel.destination,

            name:
                destination.name ||
                hotel.destination,

            location:
                destination.location ||
                hotel.location

        })
    );


    window.location.href =

        "hotel-details.html?id=" +

        encodeURIComponent(
            hotel.id
        ) +

        "&destination=" +

        encodeURIComponent(
            hotel.destination
        );

}


// ===============================
// Reset Filters
// ===============================

function resetHotelFilters() {

    const searchInput =
        document.getElementById(
            "hotelSearchInput"
        );

    const starFilter =
        document.getElementById(
            "starFilter"
        );

    const budgetFilter =
        document.getElementById(
            "budgetFilter"
        );

    const sortFilter =
        document.getElementById(
            "sortFilter"
        );


    if (searchInput) {

        searchInput.value = "";

    }


    if (starFilter) {

        starFilter.value = "all";

    }


    if (budgetFilter) {

        budgetFilter.value = "all";

    }


    if (sortFilter) {

        sortFilter.value =
            "recommended";

    }


    setActiveQuickFilter("all");

    renderHotels();

}


// ===============================
// Quick Filter Active State
// ===============================

function setActiveQuickFilter(budget) {

    document
        .querySelectorAll(
            ".quick-filter-btn"
        )
        .forEach(
            function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.budget ===
                    budget
                );

            }
        );

}


// ===============================
// Hotel Grid Actions
// ===============================

function handleHotelGridAction(event) {

    const actionButton =
        event.target.closest(
            "[data-action]"
        );


    if (!actionButton) return;


    const action =
        actionButton.dataset.action;

    const hotelId =
        actionButton.dataset.id;


    if (action === "details") {

        openHotelDetails(hotelId);

    }


    if (action === "save") {

        toggleSaveHotel(hotelId);

    }

}


// ===============================
// Setup Events
// ===============================

function setupHotelEvents() {

    const hotelSearchInput =
        document.getElementById(
            "hotelSearchInput"
        );


    if (hotelSearchInput) {

        hotelSearchInput.addEventListener(
            "input",
            renderHotels
        );

    }


    [
        "starFilter",
        "budgetFilter",
        "sortFilter"
    ].forEach(
        function (filterId) {

            const filter =
                document.getElementById(
                    filterId
                );


            if (filter) {

                filter.addEventListener(
                    "change",
                    function () {

                        if (
                            filterId ===
                            "budgetFilter"
                        ) {

                            setActiveQuickFilter(
                                filter.value
                            );

                        }

                        renderHotels();

                    }
                );

            }

        }
    );


    document
        .querySelectorAll(
            ".quick-filter-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const budget =
                            button.dataset.budget;


                        const budgetFilter =
                            document.getElementById(
                                "budgetFilter"
                            );


                        if (budgetFilter) {

                            budgetFilter.value =
                                budget;

                        }


                        setActiveQuickFilter(
                            budget
                        );

                        renderHotels();

                    }
                );

            }
        );


    const clearFiltersButton =
        document.getElementById(
            "clearFiltersBtn"
        );


    if (clearFiltersButton) {

        clearFiltersButton.addEventListener(
            "click",
            resetHotelFilters
        );

    }


    const emptyResetButton =
        document.getElementById(
            "resetEmptyFilterBtn"
        );


    if (emptyResetButton) {

        emptyResetButton.addEventListener(
            "click",
            resetHotelFilters
        );

    }


    const hotelGrid =
        document.getElementById(
            "hotelsGrid"
        );


    if (hotelGrid) {

        hotelGrid.addEventListener(
            "click",
            handleHotelGridAction
        );

    }

}


// ===============================
// Storage Synchronization
// ===============================

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === "savedHotels"
        ) {

            renderHotels();

        }

    }
);


window.addEventListener(
    "pageshow",
    function () {

        renderHotels();

    }
);


// ===============================
// Initialize Hotels Page
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateDestinationContent();

        updateHotelStatistics();

        setupHotelEvents();

        renderHotels();

    }
);


console.log(
    "TravelVerse Hotel Listing Loaded"
);