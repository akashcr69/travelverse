// TravelVerse Module 7
// User Profile with localStorage
// File: profile.js


// ===============================
// Elements
// ===============================

const coverPreview = document.getElementById("coverPreview");
const coverImageInput = document.getElementById("coverImageInput");

const profilePreview = document.getElementById("profilePreview");
const profileImageInput = document.getElementById("profileImageInput");

const displayName = document.getElementById("displayName");
const displayBio = document.getElementById("displayBio");
const displayLocation = document.getElementById("displayLocation");
const displayJoined = document.getElementById("displayJoined");
const displayVisited = document.getElementById("displayVisited");
const displayReviewed = document.getElementById("displayReviewed");

const profileForm = document.getElementById("profileForm");
const profileName = document.getElementById("profileName");
const profileUsername = document.getElementById("profileUsername");
const profileLocation = document.getElementById("profileLocation");
const profileJoined = document.getElementById("profileJoined");
const profileVisited = document.getElementById("profileVisited");
const profileReviewed = document.getElementById("profileReviewed");
const profileBio = document.getElementById("profileBio");

const openEditBtn = document.getElementById("openEditBtn");
const editProfileBox = document.getElementById("editProfileBox");

const myPosts = document.getElementById("myPosts");
const myReviews = document.getElementById("myReviews");
const myPhotos = document.getElementById("myPhotos");
const mySaved = document.getElementById("mySaved");
const myHotels = document.getElementById("myHotels");


// ===============================
// Default Image
// ===============================

const defaultAvatar =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
            <rect width="100%" height="100%" fill="#eef2ff"/>
            <circle cx="150" cy="110" r="55" fill="#6C63FF"/>
            <circle cx="150" cy="245" r="100" fill="#8A2BE2"/>
        </svg>
    `);


// ===============================
// Default Profile
// ===============================

const defaultProfile = {
    name: "Akash Ahmed",
    username: "akash_ahmed",
    bio: "Travel Enthusiast | Rajshahi",
    location: "Rajshahi",
    joined: "July 2026",
    visited: 35,
    reviewed: 20,
    profileImage: defaultAvatar,
    coverImage: ""
};


// ===============================
// Safe JSON Parse
// ===============================

function safeParse(key, fallback) {

    try {
        return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch (error) {
        return fallback;
    }

}


// ===============================
// Get Saved Profile
// ===============================

function getSavedProfile() {

    const savedProfile = safeParse("travelverse_profile", {});

    return {
        ...defaultProfile,
        ...savedProfile
    };

}


// ===============================
// Current User
// ===============================

function getCurrentUser() {

    const savedProfile = getSavedProfile();

    const currentUser = safeParse("travelverse_current_user", {
        id: 1,
        name: savedProfile.name || defaultProfile.name,
        username: savedProfile.username || defaultProfile.username,
        email: localStorage.getItem("travelUser") || "admin@gmail.com",
        image: savedProfile.profileImage || defaultAvatar
    });

    currentUser.name = savedProfile.name || currentUser.name;
    currentUser.username = savedProfile.username || currentUser.username;
    currentUser.image = savedProfile.profileImage || currentUser.image;

    localStorage.setItem("travelverse_current_user", JSON.stringify(currentUser));

    return currentUser;
}


// ===============================
// Save Profile To LocalStorage
// Used by image upload and profile form
// ===============================

function saveProfileToStorage(updatedData) {

    const oldProfile = getSavedProfile();

    const profileData = {
        ...oldProfile,
        ...updatedData
    };

    localStorage.setItem("travelverse_profile", JSON.stringify(profileData));

    const currentUser = safeParse("travelverse_current_user", {
        id: 1,
        email: localStorage.getItem("travelUser") || "admin@gmail.com"
    });

    currentUser.name = profileData.name;
    currentUser.username = profileData.username;
    currentUser.image = profileData.profileImage;
    currentUser.email = currentUser.email || localStorage.getItem("travelUser") || "admin@gmail.com";

    localStorage.setItem("travelverse_current_user", JSON.stringify(currentUser));

    localStorage.setItem("travelverse_profile_updated_at", Date.now().toString());

    updateOwnPostsProfile(profileData);

    return profileData;

}


// ===============================
// Load Profile
// ===============================

function loadProfile() {

    const savedProfile = getSavedProfile();

    if (displayName) displayName.innerText = savedProfile.name || defaultProfile.name;
    if (displayBio) displayBio.innerText = savedProfile.bio || defaultProfile.bio;
    if (displayLocation) displayLocation.innerText = savedProfile.location || defaultProfile.location;
    if (displayJoined) displayJoined.innerText = savedProfile.joined || defaultProfile.joined;
    if (displayVisited) displayVisited.innerText = savedProfile.visited || defaultProfile.visited;
    if (displayReviewed) displayReviewed.innerText = savedProfile.reviewed || defaultProfile.reviewed;

    if (profilePreview) {
        profilePreview.src = savedProfile.profileImage || defaultAvatar;
    }

    if (coverPreview) {

        if (savedProfile.coverImage) {
            coverPreview.style.backgroundImage = `url('${savedProfile.coverImage}')`;
            coverPreview.style.backgroundSize = "cover";
            coverPreview.style.backgroundPosition = "center";
            coverPreview.dataset.cover = savedProfile.coverImage;
        } else {
            coverPreview.dataset.cover = "";
        }

    }

    if (profileName) profileName.value = savedProfile.name || "";
    if (profileUsername) profileUsername.value = savedProfile.username || "";
    if (profileLocation) profileLocation.value = savedProfile.location || "";
    if (profileJoined) profileJoined.value = savedProfile.joined || "";
    if (profileVisited) profileVisited.value = savedProfile.visited || "";
    if (profileReviewed) profileReviewed.value = savedProfile.reviewed || "";
    if (profileBio) profileBio.value = savedProfile.bio || "";

}


// ===============================
// Image Reader Helper
// ===============================

function readImageFile(file, callback) {

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        callback(e.target.result);
    };

    reader.readAsDataURL(file);

}


// ===============================
// Cover Image Upload - Auto Save
// ===============================

if (coverImageInput && coverPreview) {

    coverImageInput.addEventListener("change", function () {

        const file = this.files[0];

        readImageFile(file, function (imageData) {

            coverPreview.style.backgroundImage = `url('${imageData}')`;
            coverPreview.style.backgroundSize = "cover";
            coverPreview.style.backgroundPosition = "center";
            coverPreview.dataset.cover = imageData;

            saveProfileToStorage({
                coverImage: imageData
            });

            alert("Cover photo saved successfully!");

        });

    });

}


// ===============================
// Profile Image Upload - Auto Save
// ===============================

if (profileImageInput && profilePreview) {

    profileImageInput.addEventListener("change", function () {

        const file = this.files[0];

        readImageFile(file, function (imageData) {

            profilePreview.src = imageData;

            const updatedProfile = saveProfileToStorage({
                profileImage: imageData
            });

            loadProfile();
            renderMyPosts();
            renderMyPhotos();

            alert("Profile photo saved successfully!");

        });

    });

}


// ===============================
// Open / Close Edit Box
// ===============================

if (openEditBtn && editProfileBox) {

    openEditBtn.addEventListener("click", function () {
        editProfileBox.classList.toggle("show");
    });

}


// ===============================
// Update Own Posts After Profile Save
// ===============================

function updateOwnPostsProfile(profileData) {

    const currentUser = safeParse("travelverse_current_user", {
        id: 1,
        email: localStorage.getItem("travelUser") || "admin@gmail.com"
    });

    let posts = safeParse("travelPosts", []);

    posts = posts.map(function (post) {

        const isOwner =
            String(post.userId) === String(currentUser.id) ||
            String(post.userEmail) === String(currentUser.email);

        if (isOwner) {
            post.user = profileData.name;
            post.userName = profileData.name;
            post.profile = profileData.profileImage;
            post.userImage = profileData.profileImage;
        }

        return post;

    });

    localStorage.setItem("travelPosts", JSON.stringify(posts));

}


// ===============================
// Save Profile Form
// ===============================

if (profileForm) {

    profileForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const oldProfile = getSavedProfile();

        const profileData = {
            name: profileName.value.trim(),
            username: profileUsername.value.trim(),
            bio: profileBio.value.trim(),
            location: profileLocation.value.trim(),
            joined: profileJoined.value.trim(),
            visited: profileVisited.value.trim(),
            reviewed: profileReviewed.value.trim(),
            profileImage: profilePreview.src || oldProfile.profileImage || defaultAvatar,
            coverImage: coverPreview.dataset.cover || oldProfile.coverImage || ""
        };

        if (profileData.name === "" || profileData.username === "") {
            alert("Name and username are required.");
            return;
        }

        saveProfileToStorage(profileData);

        alert("Profile saved successfully!");

        loadProfile();
        renderMyPosts();
        renderMyReviews();
        renderMyPhotos();
        renderSavedPlaces();
        renderSavedHotels();

        if (editProfileBox) {
            editProfileBox.classList.remove("show");
        }

    });

}


// ===============================
// Tabs
// ===============================

document.querySelectorAll(".tab-btn").forEach(function (btn) {

    btn.addEventListener("click", function () {

        document.querySelectorAll(".tab-btn").forEach(function (item) {
            item.classList.remove("active");
        });

        document.querySelectorAll(".tab-content").forEach(function (content) {
            content.classList.remove("active");
        });

        btn.classList.add("active");

        const tabContent = document.getElementById(btn.dataset.tab);

        if (tabContent) {
            tabContent.classList.add("active");
        }

    });

});


// ===============================
// Render My Posts
// ===============================

function renderMyPosts() {

    if (!myPosts) return;

    const currentUser = getCurrentUser();

    const posts = safeParse("travelPosts", []);

    const ownPosts = posts.filter(function (post) {
        return String(post.userId) === String(currentUser.id) ||
               String(post.userEmail) === String(currentUser.email);
    });

    if (ownPosts.length === 0) {
        myPosts.innerHTML = `<div class="empty-message">No posts yet.</div>`;
        return;
    }

    myPosts.innerHTML = "";

    ownPosts.forEach(function (post) {

        const card = document.createElement("div");
        card.className = "my-post-card";

        card.innerHTML = `
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
            <div>
                <h4>${post.place || post.location || "Travel Place"}</h4>
                <p>${post.caption || ""}</p>
            </div>
        `;

        myPosts.appendChild(card);

    });

}


// ===============================
// Render My Reviews
// ===============================

function renderMyReviews() {

    if (!myReviews) return;

    const currentUser = getCurrentUser();

    const reviews = safeParse("travelReviews", []);

    const ownReviews = reviews.filter(function (review) {
        return String(review.userId) === String(currentUser.id) ||
               String(review.userEmail) === String(currentUser.email);
    });

    if (ownReviews.length === 0) {
        myReviews.innerHTML = `<div class="empty-message">No reviews yet.</div>`;
        return;
    }

    myReviews.innerHTML = "";

    ownReviews.forEach(function (review) {

        const card = document.createElement("div");
        card.className = "review-card";

        card.innerHTML = `
            <h4>${review.place || "Tourist Place"}</h4>
            <p>⭐ ${review.rating || 5}/5</p>
            <p>${review.text || review.review || ""}</p>
        `;

        myReviews.appendChild(card);

    });

}


// ===============================
// Render Own Photos
// ===============================

function renderMyPhotos() {

    if (!myPhotos) return;

    const currentUser = getCurrentUser();

    const posts = safeParse("travelPosts", []);

    const photos = posts.filter(function (post) {

        const isOwner =
            String(post.userId) === String(currentUser.id) ||
            String(post.userEmail) === String(currentUser.email);

        return isOwner && post.image;

    });

    if (photos.length === 0) {
        myPhotos.innerHTML = `<div class="empty-message">No photos yet.</div>`;
        return;
    }

    myPhotos.innerHTML = "";

    photos.forEach(function (post) {

        const card = document.createElement("div");
        card.className = "photo-card";

        card.innerHTML = `
            <img src="${post.image}" alt="Travel Photo">
        `;

        myPhotos.appendChild(card);

    });

}


// ===============================
// Render Saved Places
// ===============================

function renderSavedPlaces() {

    if (!mySaved) return;

    const savedPlaces = safeParse("savedPlaces", []);

    if (savedPlaces.length === 0) {
        mySaved.innerHTML = `<div class="empty-message">No saved places yet.</div>`;
        return;
    }

    mySaved.innerHTML = "";

    savedPlaces.forEach(function (place) {

        const card = document.createElement("div");
        card.className = "saved-card";

        card.innerHTML = `
            <h4>${place.name || place.place || "Saved Place"}</h4>
            <p>${place.location || "Travel Location"}</p>
            <p>⭐ ${place.rating || "4.8"}</p>
        `;

        mySaved.appendChild(card);

    });

}


// ===============================
// Render Saved Hotels
// ===============================

function renderSavedHotels() {

    if (!myHotels) return;

    const savedHotels = safeParse("savedHotels", []);

    if (savedHotels.length === 0) {
        myHotels.innerHTML = `<div class="empty-message">No saved hotels yet.</div>`;
        return;
    }

    myHotels.innerHTML = "";

    savedHotels.forEach(function (hotel) {

        const card = document.createElement("div");
        card.className = "saved-card";

        card.innerHTML = `
            <h4>${hotel.name || "Saved Hotel"}</h4>
            <p>${hotel.location || "Hotel Location"}</p>
            <p>⭐ ${hotel.rating || "4.8"}</p>
            <p>${hotel.price || ""}</p>
        `;

        myHotels.appendChild(card);

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

    loadProfile();

    renderMyPosts();
    renderMyReviews();
    renderMyPhotos();
    renderSavedPlaces();
    renderSavedHotels();

});