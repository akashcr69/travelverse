/* ==========================================
   TravelVerse
   Upload Post JavaScript
   File : upload.js
========================================== */

// Image Preview

const imageInput = document.getElementById("image");
const previewImage = document.getElementById("previewImage");

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;

        };

        reader.readAsDataURL(file);

    }

});

const imageInput = document.getElementById("hotelImage");
const preview = document.getElementById("preview");
const deleteBtn = document.getElementById("deleteImageBtn");

deleteBtn.addEventListener("click", function () {

    imageInput.value = "";

    preview.src = "assets/images/upload-placeholder.png";

});


// Upload Form

const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const place = document.getElementById("place").value;
    const location = document.getElementById("location").value;
    const caption = document.getElementById("caption").value;

    if (location.trim() === "" || caption.trim() === "") {

        alert("Please fill all required fields.");

        return;

    }

    const post = {

        user: "Traveler",

        profile: "assets/images/user1.jpg",

        image: previewImage.src,

        place: place,

        location: location,

        caption: caption,

        likes: 0,

        comments: [],

        date: new Date().toLocaleString()

    };

    let posts = JSON.parse(localStorage.getItem("travelPosts")) || [];

    posts.unshift(post);

    localStorage.setItem("travelPosts", JSON.stringify(posts));

    alert("Post Published Successfully!");

    uploadForm.reset();

    previewImage.src = "assets/images/upload-placeholder.png";

    window.location.href = "home.html";

});


// Reset Preview if Form Reset

uploadForm.addEventListener("reset", function () {

    previewImage.src = "assets/images/upload-placeholder.png";

});