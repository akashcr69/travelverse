/* ==================================================
   TravelVerse Traveler Reviews
   File: js/reviews.js
================================================== */


// ===============================
// Storage Keys
// ===============================

const REVIEWS_STORAGE_KEY = "travelverse_reviews";

const GUEST_REVIEWER_ID_KEY = "travelverse_guest_reviewer_id";

const GUEST_REVIEWER_NAME_KEY = "travelverse_guest_reviewer_name";

const DEFAULT_PROFILE_IMAGE =
    "assets/WhatsApp Image 2026-07-13 at 03.10.00.jpeg";


// ===============================
// Current Form State
// ===============================

let selectedReviewImage = "";

let editingReviewId = null;


// ===============================
// Default Reviews
// প্রথমবার page open হলে এগুলো দেখাবে
// ===============================

const defaultReviews = [

    {
        id: 1001,

        userId: "demo-user-1",
        userEmail: "ayesha@example.com",
        userName: "Ayesha Rahman",
        userImage: DEFAULT_PROFILE_IMAGE,

        verified: true,

        destination: "Cox's Bazar",
        rating: 5,

        title: "An unforgettable beach experience",

        description:
            "The beach was beautiful and the sunset was unforgettable. Hotels, food and transportation were easily available. Early morning and sunset were the best times to enjoy the beach.",

        travelDate: "2026-06-12",

        image: "/assets/longest-sea-beach-in.jpg",

        helpful: 18,
        helpfulUsers: [],

        comments: [
            {
                id: 1,
                text: "Very helpful review.",
                createdAt: "2026-07-10T10:30:00"
            }
        ],

        createdAt: "2026-07-12T09:30:00"
    },


    {
        id: 1002,

        userId: "demo-user-2",
        userEmail: "tanvir@example.com",
        userName: "Tanvir Hasan",
        userImage: DEFAULT_PROFILE_IMAGE,

        verified: true,

        destination: "Sajek Valley",
        rating: 5,

        title: "Clouds, hills and peaceful mornings",

        description:
            "Sajek Valley is perfect for travelers who love mountains, clouds and peaceful surroundings. The road journey was long, but the view made it completely worthwhile.",

        travelDate: "2026-05-22",

        image: "/assets/images.jpeg",

        helpful: 14,
        helpfulUsers: [],

        comments: [],

        createdAt: "2026-07-08T14:15:00"
    },


    {
        id: 1003,

        userId: "demo-user-3",
        userEmail: "farhana@example.com",
        userName: "Farhana Islam",
        userImage: DEFAULT_PROFILE_IMAGE,

        verified: true,

        destination: "Sundarbans",
        rating: 4,

        title: "A remarkable wildlife adventure",

        description:
            "The Sundarbans offered a unique experience with rivers, forests and wildlife. Traveling with an experienced guide is strongly recommended for safety and better exploration.",

        travelDate: "2026-04-18",

        image: "/assets/922_giant.jpg",

        helpful: 11,
        helpfulUsers: [],

        comments: [],

        createdAt: "2026-07-03T11:45:00"
    },


    {
        id: 1004,

        userId: "demo-user-4",
        userEmail: "sabbir@example.com",
        userName: "Sabbir Ahmed",
        userImage: DEFAULT_PROFILE_IMAGE,

        verified: true,

        destination: "Saint Martin",
        rating: 5,

        title: "Crystal-clear water and island beauty",

        description:
            "Saint Martin was peaceful and visually stunning. The sea water was clear, seafood was fresh and the island atmosphere was relaxing. Avoid peak holiday crowds for a better experience.",

        travelDate: "2026-03-14",

        image: "/assets/image-299881-1754634544.jpg",

        helpful: 20,
        helpfulUsers: [],

        comments: [
            {
                id: 1,
                text: "Thanks for sharing the travel tip.",
                createdAt: "2026-07-02T08:20:00"
            }
        ],

        createdAt: "2026-06-28T16:20:00"
    }

];


// ===============================
// Safe JSON Parse
// ===============================

function safeReviewParse(key, fallback) {

    try {

        const value = JSON.parse(localStorage.getItem(key));

        return value !== null ? value : fallback;

    } catch (error) {

        console.error("Review storage parsing error:", error);

        return fallback;

    }

}


// ===============================
// Guest Reviewer Identity
// Allows guest ownership on this browser
// ===============================

function getGuestReviewerId() {

    let guestId =
        localStorage.getItem(
            GUEST_REVIEWER_ID_KEY
        );

    if (!guestId) {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
        ) {

            guestId =
                "guest_" +
                window.crypto.randomUUID();

        } else {

            guestId =
                "guest_" +
                Date.now() +
                "_" +
                Math.random()
                    .toString(36)
                    .slice(2, 10);

        }

        localStorage.setItem(
            GUEST_REVIEWER_ID_KEY,
            guestId
        );

    }

    return guestId;

}


// ===============================
// Escape HTML
// XSS protection
// ===============================

function escapeReviewHTML(value) {

    return String(value ?? "")

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


// ===============================
// Authentication Helpers
// ===============================

function reviewUserIsLoggedIn() {

    if (typeof isLoggedIn === "function") {

        return isLoggedIn();

    }

    return Boolean(localStorage.getItem("travelUser"));

}


function requireReviewLogin(message) {

    if (reviewUserIsLoggedIn()) {

        return true;

    }

    if (typeof requireLogin === "function") {

        return requireLogin(
            message || "Please login to use this feature."
        );

    }

    alert(message || "Please login to use this feature.");

    localStorage.setItem(
        "travelverse_redirect_after_login",
        "reviews.html"
    );

    window.location.href = "login.html";

    return false;

}


// ===============================
// Current User
// ===============================

function getReviewCurrentUser() {

    const savedUser = safeReviewParse(
        "travelverse_current_user",
        {}
    );

    const savedProfile = safeReviewParse(
        "travelverse_profile",
        {}
    );

    const email =
        savedUser.email ||
        localStorage.getItem("travelUser") ||
        "";

    return {

        id:
            savedUser.id ||
            email ||
            "travelverse-user",

        name:
            savedProfile.name ||
            savedUser.name ||
            "Traveler",

        username:
            savedProfile.username ||
            savedUser.username ||
            "traveler",

        email: email,

        image:
            savedProfile.profileImage ||
            savedUser.image ||
            DEFAULT_PROFILE_IMAGE

    };

}


// ===============================
// Review Storage
// ===============================

function initializeDefaultReviews() {

    const existingReviews =
        localStorage.getItem(REVIEWS_STORAGE_KEY);

    if (existingReviews === null) {

        saveReviews(defaultReviews);

    }

}


function getReviews() {

    return safeReviewParse(
        REVIEWS_STORAGE_KEY,
        []
    );

}


function saveReviews(reviews) {

    try {

        localStorage.setItem(
            REVIEWS_STORAGE_KEY,
            JSON.stringify(reviews)
        );

        return true;

    } catch (error) {

        console.error("Unable to save reviews:", error);

        alert(
            "Unable to save the review. The uploaded image may be too large."
        );

        return false;

    }

}


// ===============================
// Ownership Check
// ===============================

function isReviewOwner(review) {

    if (!review) {

        return false;

    }

    if (review.isGuest) {

        const guestOwnerId =
            getGuestReviewerId();

        return Boolean(
            review.guestOwnerId &&
            String(review.guestOwnerId) ===
            String(guestOwnerId)
        );

    }

    if (!reviewUserIsLoggedIn()) {

        return false;

    }

    const currentUser =
        getReviewCurrentUser();

    const sameUserId =
        review.userId &&
        currentUser.id &&
        String(review.userId) ===
        String(currentUser.id);

    const sameEmail =
        review.userEmail &&
        currentUser.email &&
        String(review.userEmail).toLowerCase() ===
        String(currentUser.email).toLowerCase();

    return Boolean(
        sameUserId ||
        sameEmail
    );

}


// ===============================
// Date Formatting
// ===============================

function formatReviewDate(dateValue) {

    if (!dateValue) {

        return "Date unavailable";

    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {

        return escapeReviewHTML(dateValue);

    }

    return new Intl.DateTimeFormat(
        "en-GB",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    ).format(date);

}


function formatReviewDateTime(dateValue) {

    if (!dateValue) {

        return "Date and time unavailable";

    }

    const date =
        new Date(dateValue);

    if (Number.isNaN(date.getTime())) {

        return escapeReviewHTML(dateValue);

    }

    const dateText =
        new Intl.DateTimeFormat(
            "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(date);

    const timeText =
        new Intl.DateTimeFormat(
            "en-US",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }
        ).format(date);

    return (
        dateText +
        " • " +
        timeText
    );

}


// ===============================
// Star Display
// ===============================

function createReviewStars(rating) {

    const safeRating = Math.max(
        0,
        Math.min(5, Number(rating) || 0)
    );

    return "★".repeat(safeRating) +
           "☆".repeat(5 - safeRating);

}


// ===============================
// Filter and Sort Reviews
// ===============================

function getFilteredReviews() {

    const reviews = getReviews();

    const searchInput =
        document.getElementById("reviewSearchInput");

    const destinationFilter =
        document.getElementById("destinationFilter");

    const ratingFilter =
        document.getElementById("ratingFilter");

    const sortFilter =
        document.getElementById("sortFilter");


    const searchValue =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

    const destinationValue =
        destinationFilter
            ? destinationFilter.value
            : "all";

    const ratingValue =
        ratingFilter
            ? ratingFilter.value
            : "all";

    const sortValue =
        sortFilter
            ? sortFilter.value
            : "newest";


    let filteredReviews = reviews.filter(function (review) {

        const searchableText = [

            review.destination,

            review.userName,

            review.userUsername,

            review.title,

            review.description

        ].join(" ").toLowerCase();


        const matchesSearch =
            !searchValue ||
            searchableText.includes(searchValue);


        const matchesDestination =
            destinationValue === "all" ||
            review.destination === destinationValue;


        const matchesRating =
            ratingValue === "all" ||
            Number(review.rating) >= Number(ratingValue);


        return (
            matchesSearch &&
            matchesDestination &&
            matchesRating
        );

    });


    filteredReviews.sort(function (firstReview, secondReview) {

        if (sortValue === "highest") {

            return (
                Number(secondReview.rating) -
                Number(firstReview.rating)
            );

        }


        if (sortValue === "helpful") {

            return (
                Number(secondReview.helpful || 0) -
                Number(firstReview.helpful || 0)
            );

        }


        return (
            new Date(secondReview.createdAt).getTime() -
            new Date(firstReview.createdAt).getTime()
        );

    });


    return filteredReviews;

}


// ===============================
// Render Reviews
// ===============================

function renderReviews() {

    const reviewsContainer =
        document.getElementById("reviewsContainer");

    const emptyReviewsState =
        document.getElementById("emptyReviewsState");

    if (!reviewsContainer) return;


    const reviews = getFilteredReviews();

    reviewsContainer.innerHTML = "";


    if (reviews.length === 0) {

        if (emptyReviewsState) {

            emptyReviewsState.classList.add("show");

        }

        return;

    }


    if (emptyReviewsState) {

        emptyReviewsState.classList.remove("show");

    }


    reviews.forEach(function (review) {

        const reviewCard =
            document.createElement("article");

        reviewCard.className = "review-card";

        reviewCard.setAttribute(
            "data-review-id",
            review.id
        );


        const helpfulUsers =
            Array.isArray(review.helpfulUsers)
                ? review.helpfulUsers
                : [];

        const comments =
            Array.isArray(review.comments)
                ? review.comments
                : [];


        const currentUser =
            reviewUserIsLoggedIn()
                ? getReviewCurrentUser()
                : null;

        const currentUserKey =
            currentUser
                ? String(
                    currentUser.email ||
                    currentUser.id
                )
                : "";

        const isHelpful =
            currentUserKey &&
            helpfulUsers.includes(currentUserKey);


        const reviewerLabel =
            review.isGuest
                ? "Guest Traveler"
                : (
                    review.userUsername
                        ? (
                            String(
                                review.userUsername
                            ).startsWith("@")
                                ? review.userUsername
                                : "@" + review.userUsername
                        )
                        : "Traveler"
                );


        const verifiedBadge = review.verified ? `

            <span class="verified-badge">

                <i class="fa-solid fa-circle-check"></i>

                Verified Traveler

            </span>

        ` : "";


        const ownerButtons = isReviewOwner(review) ? `

            <div class="review-owner-actions">

                <button
                    type="button"
                    class="edit-review-btn"
                    data-action="edit"
                    data-id="${review.id}"
                    title="Edit review">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    type="button"
                    class="delete-review-btn"
                    data-action="delete"
                    data-id="${review.id}"
                    title="Delete review">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        ` : "";


        const reviewImage = review.image ? `

            <img
                src="${escapeReviewHTML(review.image)}"
                alt="${escapeReviewHTML(review.destination)} review"
                class="review-photo">

        ` : "";


        reviewCard.innerHTML = `

            <div class="review-card-header">

                <div class="review-user">

                    <img
                        src="${escapeReviewHTML(
                            review.userImage ||
                            DEFAULT_PROFILE_IMAGE
                        )}"
                        alt="${escapeReviewHTML(
                            review.userName ||
                            "Traveler"
                        )}">

                    <div>

                        <h4>
                            ${escapeReviewHTML(
                                review.userName ||
                                "Traveler"
                            )}
                        </h4>

                        <div class="review-user-meta">

                            <span class="reviewer-label">

                                ${escapeReviewHTML(
                                    reviewerLabel
                                )}

                            </span>

                            ${verifiedBadge}

                            <span class="review-posted-time">

                                <i class="fa-regular fa-clock"></i>

                                Posted
                                ${formatReviewDateTime(
                                    review.createdAt
                                )}

                            </span>

                        </div>

                    </div>

                </div>


                <div>

                    <div
                        class="review-stars"
                        title="${Number(review.rating)} out of 5">

                        ${createReviewStars(
                            Number(review.rating)
                        )}

                    </div>

                    ${ownerButtons}

                </div>

            </div>


            <span class="review-destination">

                <i class="fa-solid fa-location-dot"></i>

                ${escapeReviewHTML(
                    review.destination
                )}

            </span>


            <h3>
                ${escapeReviewHTML(
                    review.title
                )}
            </h3>


            <p class="review-description">
                ${escapeReviewHTML(
                    review.description
                )}
            </p>


            ${reviewImage}


            <div class="review-footer">

                <div class="review-actions">

                    <button
                        type="button"
                        class="review-action-btn helpful-review-btn
                        ${isHelpful ? "active" : ""}"
                        data-action="helpful"
                        data-id="${review.id}">

                        <i class="fa-solid fa-thumbs-up"></i>

                        <span>
                            ${isHelpful ? "Helpful" : "Helpful"}
                        </span>

                        <strong>
                            ${Number(review.helpful || 0)}
                        </strong>

                    </button>


                    <button
                        type="button"
                        class="review-action-btn comment-review-btn"
                        data-action="comment"
                        data-id="${review.id}">

                        <i class="fa-solid fa-comment"></i>

                        Comment

                        <strong>
                            ${comments.length}
                        </strong>

                    </button>

                </div>


                <span class="review-date">

                    Visited
                    ${formatReviewDate(
                        review.travelDate
                    )}

                </span>

            </div>

        `;


        reviewsContainer.appendChild(reviewCard);

    });

}


// ===============================
// Review Statistics
// ===============================

function updateReviewStatistics() {

    const reviews = getReviews();

    const totalReviews = reviews.length;


    const totalRating = reviews.reduce(
        function (total, review) {

            return total + Number(review.rating || 0);

        },
        0
    );


    const averageRating =
        totalReviews > 0
            ? totalRating / totalReviews
            : 0;


    const destinations = new Set(

        reviews
            .map(function (review) {

                return review.destination;

            })
            .filter(Boolean)

    );


    updateTextContent(
        "averageRatingStat",
        averageRating.toFixed(1)
    );

    updateTextContent(
        "totalReviewsStat",
        totalReviews
    );

    updateTextContent(
        "totalDestinationsStat",
        destinations.size
    );

    updateTextContent(
        "sidebarAverageRating",
        averageRating.toFixed(1)
    );

    updateTextContent(
        "sidebarReviewCount",
        totalReviews
    );


    const ratingCounts = {

        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0

    };


    reviews.forEach(function (review) {

        const rating = Math.round(
            Number(review.rating)
        );

        if (ratingCounts[rating] !== undefined) {

            ratingCounts[rating] += 1;

        }

    });


    updateRatingBreakdown(
        "fiveStarCount",
        "fiveStarBar",
        ratingCounts[5],
        totalReviews
    );

    updateRatingBreakdown(
        "fourStarCount",
        "fourStarBar",
        ratingCounts[4],
        totalReviews
    );

    updateRatingBreakdown(
        "threeStarCount",
        "threeStarBar",
        ratingCounts[3],
        totalReviews
    );

    updateRatingBreakdown(
        "twoStarCount",
        "twoStarBar",
        ratingCounts[2],
        totalReviews
    );

    updateRatingBreakdown(
        "oneStarCount",
        "oneStarBar",
        ratingCounts[1],
        totalReviews
    );

}


function updateTextContent(elementId, value) {

    const element =
        document.getElementById(elementId);

    if (element) {

        element.textContent = value;

    }

}


function updateRatingBreakdown(
    countElementId,
    barElementId,
    count,
    total
) {

    updateTextContent(
        countElementId,
        count
    );

    const bar =
        document.getElementById(barElementId);

    if (bar) {

        const percentage =
            total > 0
                ? (count / total) * 100
                : 0;

        bar.style.width =
            percentage.toFixed(1) + "%";

    }

}


// ===============================
// Reviewer Identity Form
// ===============================

function updateReviewerIdentityFields() {

    const guestGroup =
        document.getElementById(
            "guestReviewerGroup"
        );

    const guestNameInput =
        document.getElementById(
            "guestReviewerName"
        );

    if (!guestGroup || !guestNameInput) {

        return;

    }

    const loggedIn =
        reviewUserIsLoggedIn();

    guestGroup.hidden =
        loggedIn;

    guestNameInput.required =
        !loggedIn;

    if (loggedIn) {

        guestNameInput.value = "";

        return;

    }

    if (!guestNameInput.value.trim()) {

        guestNameInput.value =
            localStorage.getItem(
                GUEST_REVIEWER_NAME_KEY
            ) || "";

    }

}


// ===============================
// Open Review Modal
// ===============================

function openReviewModal(reviewId = null) {

    const modal =
        document.getElementById("reviewModal");

    if (!modal) return;


    resetReviewForm();


    if (reviewId !== null) {

        const review = getReviews().find(
            function (item) {

                return (
                    String(item.id) ===
                    String(reviewId)
                );

            }
        );


        if (!review || !isReviewOwner(review)) {

            alert(
                "You can only edit your own review."
            );

            return;

        }


        editingReviewId = review.id;

        updateReviewerIdentityFields();

        const guestNameInput =
            document.getElementById(
                "guestReviewerName"
            );

        if (
            guestNameInput &&
            review.isGuest
        ) {

            guestNameInput.value =
                review.userName || "";

        }

        document.getElementById(
            "reviewDestination"
        ).value = review.destination || "";

        document.getElementById(
            "travelDate"
        ).value = review.travelDate || "";

        document.getElementById(
            "reviewTitle"
        ).value = review.title || "";

        document.getElementById(
            "reviewDescription"
        ).value = review.description || "";


        setSelectedRating(
            Number(review.rating)
        );


        selectedReviewImage =
            review.image || "";

        updateReviewImagePreview();


        const modalTitle =
            document.querySelector(
                ".modal-heading h2"
            );

        const submitButton =
            document.querySelector(
                ".submit-review-btn"
            );


        if (modalTitle) {

            modalTitle.textContent =
                "Edit Your Travel Review";

        }


        if (submitButton) {

            submitButton.innerHTML = `

                <i class="fa-solid fa-floppy-disk"></i>

                Save Changes

            `;

        }


        updateReviewDescriptionCounter();

    }


    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


// ===============================
// Close Review Modal
// ===============================

function closeReviewModal() {

    const modal =
        document.getElementById("reviewModal");

    if (!modal) return;


    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );


    resetReviewForm();

}


// ===============================
// Reset Review Form
// ===============================

function resetReviewForm() {

    const reviewForm =
        document.getElementById("reviewForm");

    if (reviewForm) {

        reviewForm.reset();

    }


    editingReviewId = null;

    selectedReviewImage = "";


    setSelectedRating(0);

    updateReviewImagePreview();

    updateReviewDescriptionCounter();


    const modalTitle =
        document.querySelector(
            ".modal-heading h2"
        );

    const submitButton =
        document.querySelector(
            ".submit-review-btn"
        );


    if (modalTitle) {

        modalTitle.textContent =
            "Share Your Travel Experience";

    }


    if (submitButton) {

        submitButton.innerHTML = `

            <i class="fa-solid fa-paper-plane"></i>

            Publish Review

        `;

    }


    updateReviewerIdentityFields();

}


// ===============================
// Star Rating Input
// ===============================

function setSelectedRating(rating) {

    const safeRating = Math.max(
        0,
        Math.min(5, Number(rating) || 0)
    );

    const ratingInput =
        document.getElementById("reviewRating");

    const ratingText =
        document.getElementById(
            "selectedRatingText"
        );

    const starButtons =
        document.querySelectorAll(
            "#starRatingInput button"
        );


    if (ratingInput) {

        ratingInput.value = safeRating;

    }


    starButtons.forEach(function (button) {

        const buttonRating =
            Number(button.dataset.rating);

        button.classList.toggle(
            "active",
            buttonRating <= safeRating
        );

    });


    const ratingLabels = {

        0: "Select a rating",
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very Good",
        5: "Excellent"

    };


    if (ratingText) {

        ratingText.textContent =
            ratingLabels[safeRating];

    }

}


// ===============================
// Description Counter
// ===============================

function updateReviewDescriptionCounter() {

    const description =
        document.getElementById(
            "reviewDescription"
        );

    const counter =
        document.getElementById(
            "reviewDescriptionCounter"
        );

    if (!description || !counter) return;


    counter.textContent =
        description.value.length + "/600";

}


// ===============================
// Review Image Upload
// ===============================

function handleReviewImageUpload(event) {

    const file =
        event.target.files[0];

    if (!file) return;


    if (!file.type.startsWith("image/")) {

        alert(
            "Please select a valid image file."
        );

        event.target.value = "";

        return;

    }


    const maximumFileSize =
        4 * 1024 * 1024;


    if (file.size > maximumFileSize) {

        alert(
            "Please upload an image smaller than 4 MB."
        );

        event.target.value = "";

        return;

    }


    const reader =
        new FileReader();


    reader.onload = function () {

        selectedReviewImage =
            reader.result;

        updateReviewImagePreview();

    };


    reader.onerror = function () {

        alert(
            "Unable to read the selected image."
        );

    };


    reader.readAsDataURL(file);

}


function updateReviewImagePreview() {

    const preview =
        document.getElementById(
            "reviewImagePreview"
        );

    const placeholder =
        document.getElementById(
            "reviewUploadPlaceholder"
        );

    const removeButton =
        document.getElementById(
            "removeReviewImageBtn"
        );


    if (!preview) return;


    if (selectedReviewImage) {

        preview.src =
            selectedReviewImage;

        preview.classList.add("show");


        if (placeholder) {

            placeholder.style.display =
                "none";

        }


        if (removeButton) {

            removeButton.classList.add(
                "show"
            );

        }

    } else {

        preview.removeAttribute("src");

        preview.classList.remove("show");


        if (placeholder) {

            placeholder.style.display =
                "flex";

        }


        if (removeButton) {

            removeButton.classList.remove(
                "show"
            );

        }

    }

}


function removeReviewImage() {

    selectedReviewImage = "";


    const imageInput =
        document.getElementById(
            "reviewImage"
        );

    if (imageInput) {

        imageInput.value = "";

    }


    updateReviewImagePreview();

}


// ===============================
// Submit Review
// ===============================

function submitReview(event) {

    event.preventDefault();


    const destination =
        document.getElementById(
            "reviewDestination"
        ).value;

    const travelDate =
        document.getElementById(
            "travelDate"
        ).value;

    const rating =
        Number(
            document.getElementById(
                "reviewRating"
            ).value
        );

    const title =
        document.getElementById(
            "reviewTitle"
        ).value.trim();

    const description =
        document.getElementById(
            "reviewDescription"
        ).value.trim();

    const loggedIn =
        reviewUserIsLoggedIn();

    const guestNameInput =
        document.getElementById(
            "guestReviewerName"
        );

    const guestName =
        guestNameInput
            ? guestNameInput.value.trim()
            : "";


    if (!loggedIn) {

        if (guestName.length < 2) {

            alert(
                "Please enter your name before publishing the review."
            );

            if (guestNameInput) {

                guestNameInput.focus();

            }

            return;

        }

        localStorage.setItem(
            GUEST_REVIEWER_NAME_KEY,
            guestName
        );

    }


    if (!destination) {

        alert(
            "Please select a destination."
        );

        return;

    }


    if (!travelDate) {

        alert(
            "Please select your travel date."
        );

        return;

    }


    const today =
        new Date().toISOString().split("T")[0];


    if (travelDate > today) {

        alert(
            "Travel date cannot be in the future."
        );

        return;

    }


    if (rating < 1 || rating > 5) {

        alert(
            "Please select a star rating."
        );

        return;

    }


    if (title.length < 5) {

        alert(
            "Please write a meaningful review title."
        );

        return;

    }


    if (description.length < 20) {

        alert(
            "Please write at least 20 characters about your experience."
        );

        return;

    }


    const currentUser =
        loggedIn
            ? getReviewCurrentUser()
            : null;

    let reviews =
        getReviews();


    if (editingReviewId !== null) {

        const reviewIndex =
            reviews.findIndex(
                function (review) {

                    return (
                        String(review.id) ===
                        String(editingReviewId)
                    );

                }
            );


        if (reviewIndex === -1) {

            alert("Review not found.");

            return;

        }


        if (!isReviewOwner(
            reviews[reviewIndex]
        )) {

            alert(
                "You can only edit your own review."
            );

            return;

        }


        const existingReview =
            reviews[reviewIndex];

        reviews[reviewIndex] = {

            ...existingReview,

            userName:
                existingReview.isGuest
                    ? guestName
                    : (
                        currentUser?.name ||
                        existingReview.userName ||
                        "Traveler"
                    ),

            userUsername:
                existingReview.isGuest
                    ? "Guest Traveler"
                    : (
                        currentUser?.username ||
                        existingReview.userUsername ||
                        "traveler"
                    ),

            userImage:
                existingReview.isGuest
                    ? (
                        existingReview.userImage ||
                        DEFAULT_PROFILE_IMAGE
                    )
                    : (
                        currentUser?.image ||
                        existingReview.userImage ||
                        DEFAULT_PROFILE_IMAGE
                    ),

            destination: destination,

            travelDate: travelDate,

            rating: rating,

            title: title,

            description: description,

            image: selectedReviewImage,

            updatedAt:
                new Date().toISOString()

        };


        if (!saveReviews(reviews)) return;


        alert(
            "Review updated successfully!"
        );

    } else {

        const newReview = {

            id: Date.now(),

            userId:
                loggedIn
                    ? currentUser.id
                    : null,

            userEmail:
                loggedIn
                    ? currentUser.email
                    : "",

            userName:
                loggedIn
                    ? (
                        currentUser.name ||
                        "Traveler"
                    )
                    : guestName,

            userUsername:
                loggedIn
                    ? (
                        currentUser.username ||
                        "traveler"
                    )
                    : "Guest Traveler",

            userImage:
                loggedIn
                    ? (
                        currentUser.image ||
                        DEFAULT_PROFILE_IMAGE
                    )
                    : DEFAULT_PROFILE_IMAGE,

            verified:
                loggedIn,

            isGuest:
                !loggedIn,

            guestOwnerId:
                loggedIn
                    ? null
                    : getGuestReviewerId(),

            destination: destination,

            travelDate: travelDate,

            rating: rating,

            title: title,

            description: description,

            image: selectedReviewImage,

            helpful: 0,

            helpfulUsers: [],

            comments: [],

            createdAt:
                new Date().toISOString()

        };


        reviews.unshift(newReview);


        if (!saveReviews(reviews)) return;


        if (loggedIn) {

            addReviewNotification(

                "review",

                "Review Published",

                "Your review for " +
                destination +
                " was published successfully.",

                "fa-star"

            );

        }


        alert(
            loggedIn
                ? "Review published successfully!"
                : "Guest review published successfully!"
        );

    }


    closeReviewModal();

    refreshReviewsPage();

}


// ===============================
// Helpful Review
// ===============================

function toggleHelpfulReview(reviewId) {

    if (!requireReviewLogin(
        "Please login to mark reviews as helpful."
    )) {

        return;

    }


    const currentUser =
        getReviewCurrentUser();

    const userKey =
        String(
            currentUser.email ||
            currentUser.id
        );


    let reviews =
        getReviews();


    const reviewIndex =
        reviews.findIndex(
            function (review) {

                return (
                    String(review.id) ===
                    String(reviewId)
                );

            }
        );


    if (reviewIndex === -1) return;


    const helpfulUsers =
        Array.isArray(
            reviews[reviewIndex].helpfulUsers
        )
            ? reviews[reviewIndex].helpfulUsers
            : [];


    const existingIndex =
        helpfulUsers.indexOf(userKey);


    if (existingIndex >= 0) {

        helpfulUsers.splice(
            existingIndex,
            1
        );

        reviews[reviewIndex].helpful =
            Math.max(
                0,
                Number(
                    reviews[reviewIndex].helpful ||
                    0
                ) - 1
            );

    } else {

        helpfulUsers.push(userKey);

        reviews[reviewIndex].helpful =
            Number(
                reviews[reviewIndex].helpful ||
                0
            ) + 1;

    }


    reviews[reviewIndex].helpfulUsers =
        helpfulUsers;


    saveReviews(reviews);

    renderReviews();

}


// ===============================
// Add Review Comment
// ===============================

function addReviewComment(reviewId) {

    if (!requireReviewLogin(
        "Please login to comment on reviews."
    )) {

        return;

    }


    const commentText =
        prompt(
            "Write your comment:"
        );


    if (commentText === null) return;


    const cleanComment =
        commentText.trim();


    if (cleanComment.length < 2) {

        alert(
            "Please write a valid comment."
        );

        return;

    }


    if (cleanComment.length > 250) {

        alert(
            "Comment cannot exceed 250 characters."
        );

        return;

    }


    const currentUser =
        getReviewCurrentUser();


    let reviews =
        getReviews();


    const reviewIndex =
        reviews.findIndex(
            function (review) {

                return (
                    String(review.id) ===
                    String(reviewId)
                );

            }
        );


    if (reviewIndex === -1) return;


    const comments =
        Array.isArray(
            reviews[reviewIndex].comments
        )
            ? reviews[reviewIndex].comments
            : [];


    comments.push({

        id: Date.now(),

        userId: currentUser.id,

        userName:
            currentUser.name ||
            "Traveler",

        text: cleanComment,

        createdAt:
            new Date().toISOString()

    });


    reviews[reviewIndex].comments =
        comments;


    saveReviews(reviews);

    renderReviews();


    alert(
        "Comment added successfully!"
    );

}


// ===============================
// Delete Review
// ===============================

function deleteReview(reviewId) {

    let reviews =
        getReviews();


    const selectedReview =
        reviews.find(
            function (review) {

                return (
                    String(review.id) ===
                    String(reviewId)
                );

            }
        );


    if (!selectedReview) {

        alert("Review not found.");

        return;

    }


    if (!isReviewOwner(selectedReview)) {

        alert(
            "You can only delete your own review."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this review?"
        );


    if (!confirmDelete) return;


    reviews = reviews.filter(
        function (review) {

            return (
                String(review.id) !==
                String(reviewId)
            );

        }
    );


    saveReviews(reviews);

    refreshReviewsPage();


    alert(
        "Review deleted successfully!"
    );

}


// ===============================
// Notification Integration
// ===============================

function addReviewNotification(
    type,
    title,
    message,
    icon
) {

    if (!reviewUserIsLoggedIn()) return;


    if (typeof addNotification === "function") {

        addNotification(
            type,
            title,
            message,
            icon
        );

        return;

    }


    const notifications =
        safeReviewParse(
            "travelverse_notifications",
            []
        );


    notifications.unshift({

        id: Date.now(),

        type: type,

        title: title,

        message: message,

        icon: icon,

        time:
            new Date().toLocaleString(),

        isRead: false

    });


    localStorage.setItem(
        "travelverse_notifications",
        JSON.stringify(notifications)
    );

}


// ===============================
// Refresh Reviews Page
// ===============================

function refreshReviewsPage() {

    renderReviews();

    updateReviewStatistics();

}


// ===============================
// Dynamic Review Button Actions
// ===============================

function handleReviewCardAction(event) {

    const actionButton =
        event.target.closest(
            "[data-action]"
        );

    if (!actionButton) return;


    const action =
        actionButton.dataset.action;

    const reviewId =
        actionButton.dataset.id;


    if (action === "helpful") {

        toggleHelpfulReview(reviewId);

    }


    if (action === "comment") {

        addReviewComment(reviewId);

    }


    if (action === "edit") {

        openReviewModal(reviewId);

    }


    if (action === "delete") {

        deleteReview(reviewId);

    }

}


// ===============================
// Setup Events
// ===============================

function setupReviewEvents() {

    const writeReviewButtons = [

        document.getElementById(
            "navWriteReviewBtn"
        ),

        document.getElementById(
            "heroWriteReviewBtn"
        ),

        document.getElementById(
            "sectionWriteReviewBtn"
        )

    ];


    writeReviewButtons.forEach(
        function (button) {

            if (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openReviewModal();

                    }
                );

            }

        }
    );


    const closeModalButton =
        document.getElementById(
            "closeReviewModalBtn"
        );

    const cancelReviewButton =
        document.getElementById(
            "cancelReviewBtn"
        );

    const modalOverlay =
        document.getElementById(
            "reviewModalOverlay"
        );


    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            closeReviewModal
        );

    }


    if (cancelReviewButton) {

        cancelReviewButton.addEventListener(
            "click",
            closeReviewModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeReviewModal
        );

    }


    const reviewForm =
        document.getElementById(
            "reviewForm"
        );

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            submitReview
        );

    }


    const reviewImage =
        document.getElementById(
            "reviewImage"
        );

    if (reviewImage) {

        reviewImage.addEventListener(
            "change",
            handleReviewImageUpload
        );

    }


    const removeImageButton =
        document.getElementById(
            "removeReviewImageBtn"
        );

    if (removeImageButton) {

        removeImageButton.addEventListener(
            "click",
            removeReviewImage
        );

    }


    const reviewDescription =
        document.getElementById(
            "reviewDescription"
        );

    if (reviewDescription) {

        reviewDescription.addEventListener(
            "input",
            updateReviewDescriptionCounter
        );

    }


    document
        .querySelectorAll(
            "#starRatingInput button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    setSelectedRating(
                        Number(
                            button.dataset.rating
                        )
                    );

                }
            );

        });


    const guestReviewerName =
        document.getElementById(
            "guestReviewerName"
        );

    if (guestReviewerName) {

        guestReviewerName.addEventListener(
            "input",
            function () {

                const cleanName =
                    guestReviewerName.value.trim();

                if (cleanName) {

                    localStorage.setItem(
                        GUEST_REVIEWER_NAME_KEY,
                        cleanName
                    );

                }

            }
        );

    }


    const searchInput =
        document.getElementById(
            "reviewSearchInput"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderReviews
        );

    }


    [

        "destinationFilter",

        "ratingFilter",

        "sortFilter"

    ].forEach(function (filterId) {

        const filter =
            document.getElementById(
                filterId
            );

        if (filter) {

            filter.addEventListener(
                "change",
                renderReviews
            );

        }

    });


    const reviewsContainer =
        document.getElementById(
            "reviewsContainer"
        );

    if (reviewsContainer) {

        reviewsContainer.addEventListener(
            "click",
            handleReviewCardAction
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeReviewModal();

            }

        }
    );

}


// ===============================
// Set Maximum Travel Date
// ===============================

function setMaximumTravelDate() {

    const travelDateInput =
        document.getElementById(
            "travelDate"
        );

    if (!travelDateInput) return;


    travelDateInput.max =
        new Date()
            .toISOString()
            .split("T")[0];

}


// ===============================
// Storage and Page Refresh
// ===============================

window.addEventListener(
    "storage",
    function (event) {

        const watchedKeys = [

            REVIEWS_STORAGE_KEY,

            "travelverse_profile",

            "travelverse_current_user",

            "travelUser"

        ];


        if (watchedKeys.includes(event.key)) {

            refreshReviewsPage();

        }

    }
);


window.addEventListener(
    "pageshow",
    function () {

        refreshReviewsPage();

    }
);


// ===============================
// Initialize Reviews Page
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeDefaultReviews();

        setupReviewEvents();

        setMaximumTravelDate();

        updateReviewDescriptionCounter();

        updateReviewImagePreview();

        updateReviewerIdentityFields();

        refreshReviewsPage();

    }
);


console.log(
    "TravelVerse Traveler Reviews Loaded"
);