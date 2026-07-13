/* ==========================================
   TravelVerse
   Upload Post JavaScript
   File : upload.js
========================================== */


// ===============================
// Elements
// ===============================

const postImageInput = document.getElementById("image");
const previewImage = document.getElementById("previewImage");

const changeImageBtn = document.getElementById("changeImageBtn");
const deleteImageBtn = document.getElementById("deleteImageBtn");

const uploadForm = document.getElementById("uploadForm");

const placeInput = document.getElementById("place");
const locationInput = document.getElementById("location");
const captionInput = document.getElementById("caption");
const captionCounter = document.getElementById("captionCounter");

const livePreviewUserImage = document.getElementById("livePreviewUserImage");
const livePreviewUserName = document.getElementById("livePreviewUserName");
const livePreviewLocation = document.getElementById("livePreviewLocation");
const livePreviewImage = document.getElementById("livePreviewImage");
const livePreviewPlace = document.getElementById("livePreviewPlace");
const livePreviewCaption = document.getElementById("livePreviewCaption");

const totalPostsCount = document.getElementById("totalPostsCount");
const uploadedPhotosCount = document.getElementById("uploadedPhotosCount");

const placeholderImage = "assets/images/upload-placeholder.png";


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
// Get Current User
// ===============================

function getCurrentUser() {

    const savedProfile = safeParse("travelverse_profile", null);

    const currentUser = safeParse("travelverse_current_user", {
        id: 1,
        name: "Traveler",
        username: "traveler",
        email: localStorage.getItem("travelUser") || "traveler@gmail.com",
        image: "assets/images/user1.jpg"
    });

    if (savedProfile) {
        currentUser.name = savedProfile.name || currentUser.name;
        currentUser.username = savedProfile.username || currentUser.username;
        currentUser.image = savedProfile.profileImage || currentUser.image;

        localStorage.setItem("travelverse_current_user", JSON.stringify(currentUser));
    }

    return currentUser;

}


// ===============================
// Load User In Live Preview
// ===============================

function loadLivePreviewUser() {

    const currentUser = getCurrentUser();

    if (livePreviewUserImage) {
        livePreviewUserImage.src = currentUser.image || "assets/images/user1.jpg";
    }

    if (livePreviewUserName) {
        livePreviewUserName.innerText = currentUser.name || "Traveler";
    }

}


// ===============================
// Update Live Preview
// ===============================

function updateLivePreview() {

    const place = placeInput ? placeInput.value : "Travel Place";
    const location = locationInput ? locationInput.value.trim() : "";
    const caption = captionInput ? captionInput.value.trim() : "";

    if (livePreviewPlace) {
        livePreviewPlace.innerText = place || "Travel Place";
    }

    if (livePreviewLocation) {
        livePreviewLocation.innerText = location || "Travel Location";
    }

    if (livePreviewCaption) {
        livePreviewCaption.innerText = caption || "Your travel story preview will appear here.";
    }

    if (captionCounter && captionInput) {
        captionCounter.innerText = captionInput.value.length + "/250";
    }

}


// ===============================
// Load Upload Stats
// ===============================

function loadUploadStats() {

    const posts = safeParse("travelPosts", []);

    const uploadedPhotos = posts.filter(function (post) {
        return post.image && post.image !== "" && post.image !== placeholderImage;
    });

    if (totalPostsCount) {
        totalPostsCount.innerText = posts.length;
    }

    if (uploadedPhotosCount) {
        uploadedPhotosCount.innerText = uploadedPhotos.length;
    }

}


// ===============================
// Change Image Button
// ===============================

if (changeImageBtn && postImageInput) {

    changeImageBtn.addEventListener("click", function () {
        postImageInput.click();
    });

}


// ===============================
// Image Preview
// ===============================

if (postImageInput && previewImage) {

    postImageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file.");
            postImageInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;

            if (livePreviewImage) {
                livePreviewImage.src = e.target.result;
            }

        };

        reader.readAsDataURL(file);

    });

}


// ===============================
// Delete Image Button
// ===============================

if (deleteImageBtn && postImageInput && previewImage) {

    deleteImageBtn.addEventListener("click", function () {

        postImageInput.value = "";

        previewImage.src = placeholderImage;

        if (livePreviewImage) {
            livePreviewImage.src = placeholderImage;
        }

    });

}


// ===============================
// Live Preview Input Events
// ===============================

if (placeInput) {
    placeInput.addEventListener("change", updateLivePreview);
}

if (locationInput) {
    locationInput.addEventListener("input", updateLivePreview);
}

if (captionInput) {
    captionInput.addEventListener("input", updateLivePreview);
}


// ===============================
// Upload Form Submit
// ===============================

if (uploadForm) {

    uploadForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const place = placeInput ? placeInput.value : "";
        const location = locationInput ? locationInput.value.trim() : "";
        const caption = captionInput ? captionInput.value.trim() : "";

        if (location === "" || caption === "") {

            alert("Please fill all required fields.");

            return;

        }

        const currentUser = getCurrentUser();

        const post = {

            id: Date.now(),

            userId: currentUser.id,
            userEmail: currentUser.email,

            user: currentUser.name || "Traveler",
            profile: currentUser.image || "assets/images/user1.jpg",

            userName: currentUser.name || "Traveler",
            userImage: currentUser.image || "assets/images/user1.jpg",

            image: previewImage ? previewImage.src : "",

            place: place,
            location: location,
            caption: caption,

            likes: 0,
            comments: [],

            date: new Date().toLocaleString()
        };

        let posts = safeParse("travelPosts", []);

        posts.unshift(post);

        localStorage.setItem("travelPosts", JSON.stringify(posts));

        alert("Post Published Successfully!");

        uploadForm.reset();

        if (previewImage) {
            previewImage.src = placeholderImage;
        }

        if (livePreviewImage) {
            livePreviewImage.src = placeholderImage;
        }

        updateLivePreview();

        loadUploadStats();

        window.location.href = "home.html";

    });


    uploadForm.addEventListener("reset", function () {

        if (previewImage) {
            previewImage.src = placeholderImage;
        }

        if (livePreviewImage) {
            livePreviewImage.src = placeholderImage;
        }

        updateLivePreview();

    });

}


// ===============================
// Page Load
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    loadLivePreviewUser();

    updateLivePreview();

    loadUploadStats();

});