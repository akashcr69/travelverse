// TravelVerse Home JavaScript
// File: home.js


// ===============================
// Default User/Profile
// ===============================

const defaultProfileImage = "assets/WhatsApp Image 2026-07-13 at 03.10.00.jpeg";


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
// Auth Helpers
// ===============================

function isUserLoggedIn() {
    return !!localStorage.getItem("travelUser");
}


function requireHomeLogin(message) {

    if (!isUserLoggedIn()) {

        alert(message || "Please login first.");

        window.location.href = "login.html";

        return false;

    }

    return true;

}


// ===============================
// Get Saved Profile
// ===============================

function getSavedProfile() {
    return safeParse("travelverse_profile", null);
}


// ===============================
// Get Current Logged In User
// ===============================

function getCurrentUser() {

    if (!isUserLoggedIn()) {

        return {
            id: "guest",
            name: "Guest Traveler",
            username: "guest",
            email: "",
            image: defaultProfileImage
        };

    }

    const savedProfile = getSavedProfile();

    const currentUser = safeParse("travelverse_current_user", {
        id: 1,
        name: "Partho Singh",
        username: "partho_singh",
        email: localStorage.getItem("travelUser") || "traveler@gmail.com",
        image: defaultProfileImage
    });

    if (savedProfile) {

        currentUser.name = savedProfile.name || currentUser.name;
        currentUser.username = savedProfile.username || currentUser.username;
        currentUser.image = savedProfile.profileImage || currentUser.image;
        currentUser.email = currentUser.email || localStorage.getItem("travelUser") || "traveler@gmail.com";

        localStorage.setItem("travelverse_current_user", JSON.stringify(currentUser));

    }

    return currentUser;
}


// ===============================
// Load Sidebar Profile Info
// ===============================

function loadSidebarProfile() {

    const currentUser = getCurrentUser();

    const sidebarImage = document.getElementById("sidebarProfileImage");
    const sidebarName = document.getElementById("sidebarProfileName");
    const sidebarUsername = document.getElementById("sidebarProfileUsername");

    if (sidebarImage) {
        sidebarImage.src = currentUser.image || defaultProfileImage;
    }

    if (sidebarName) {
        sidebarName.innerText = currentUser.name || "Guest Traveler";
    }

    if (sidebarUsername) {
        sidebarUsername.innerText = currentUser.username
            ? "@" + currentUser.username
            : "@guest";
    }

}


// ===============================
// Update Login / Logout Button
// ===============================

function updateHomeAuthButton() {

    const authButton = document.querySelector(".nav-icons button");

    if (!authButton) return;

    if (isUserLoggedIn()) {

        authButton.innerText = "Logout";

        authButton.onclick = function () {
            logout();
        };

    } else {

        authButton.innerText = "Login";

        authButton.onclick = function () {
            window.location.href = "login.html";
        };

    }

}


// ===============================
// Refresh Home Profile UI
// ===============================

function refreshHomeProfileUI() {

    loadSidebarProfile();

    updateHomeAuthButton();

    renderPosts();

}


// ===============================
// Notification System
// ===============================

function getNotifications() {

    if (!isUserLoggedIn()) {
        return [];
    }

    return safeParse("travelverse_notifications", []);
}


function saveNotifications(notifications) {
    localStorage.setItem("travelverse_notifications", JSON.stringify(notifications));
}


function addNotification(type, title, message, icon) {

    if (!isUserLoggedIn()) return;

    let notifications = getNotifications();

    const newNotification = {
        id: Date.now(),
        type: type,
        title: title,
        message: message,
        icon: icon,
        time: new Date().toLocaleString(),
        isRead: false
    };

    notifications.unshift(newNotification);

    saveNotifications(notifications);

}


function loadNotificationBadge() {

    const badge = document.getElementById("notificationBadge");

    if (!badge) return;

    if (!isUserLoggedIn()) {
        badge.style.display = "none";
        return;
    }

    const notifications = getNotifications();

    const unreadCount = notifications.filter(function (item) {
        return item.isRead === false;
    }).length;

    if (unreadCount > 0) {
        badge.innerText = unreadCount > 99 ? "99+" : unreadCount;
        badge.style.display = "inline-flex";
    } else {
        badge.style.display = "none";
    }

}


// ===============================
// Home Saved Collection Widget
// ===============================

function getSavedPlaces() {
    return safeParse("savedPlaces", []);
}


function getSavedHotels() {
    return safeParse("savedHotels", []);
}


function loadHomeSavedCollection() {

    const savedPlaces = getSavedPlaces();
    const savedHotels = getSavedHotels();

    const placeCount = document.getElementById("homeSavedPlacesCount");
    const hotelCount = document.getElementById("homeSavedHotelsCount");
    const savedList = document.getElementById("homeSavedList");

    if (placeCount) {
        placeCount.innerText = savedPlaces.length;
    }

    if (hotelCount) {
        hotelCount.innerText = savedHotels.length;
    }

    if (!savedList) return;

    const combinedSaved = [
        ...savedPlaces.map(function (item) {
            return {
                type: "Place",
                name: item.name || item.place || "Saved Place",
                location: item.location || "Bangladesh",
                rating: item.rating || "4.8",
                image: item.image || "/assets/images.jpeg"
            };
        }),

        ...savedHotels.map(function (item) {
            return {
                type: "Hotel",
                name: item.name || item.hotelName || "Saved Hotel",
                location: item.location || item.hotelLocation || "Bangladesh",
                rating: item.rating || item.hotelRating || "4.7",
                image: item.image || "/assets/922_giant.jpg"
            };
        })
    ];

    if (combinedSaved.length === 0) {
        savedList.innerHTML = `
            <div class="home-saved-empty">
                No saved items yet.
            </div>
        `;
        return;
    }

    savedList.innerHTML = "";

    combinedSaved.slice(0, 4).forEach(function (item) {

        const savedItem = document.createElement("div");
        savedItem.className = "home-saved-item";

        savedItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div>
                <h4>${item.name}</h4>
                <p>${item.type} • ${item.location}</p>
                <p>⭐ ${item.rating}</p>
            </div>
        `;

        savedList.appendChild(savedItem);

    });

}


// ===============================
// Get All Posts
// ===============================

function getPosts() {
    return safeParse("travelPosts", []);
}


// ===============================
// Save Posts
// ===============================

function savePosts(posts) {
    localStorage.setItem("travelPosts", JSON.stringify(posts));
}


// ===============================
// Render Posts in Home Feed
// ===============================

function renderPosts() {

    const postContainer = document.getElementById("postContainer");

    if (!postContainer) return;

    const posts = getPosts();
    const currentUser = getCurrentUser();

    postContainer.innerHTML = "";

    if (posts.length === 0) {
        postContainer.innerHTML = `
            <div class="post-card">
                <p>No posts yet. Login and create your first travel post!</p>
            </div>
        `;
        return;
    }

    posts.forEach(function (post) {

        const isOwner =
            isUserLoggedIn() &&
            (
                String(post.userId) === String(currentUser.id) ||
                String(post.userEmail) === String(currentUser.email)
            );

        const userName = post.userName || post.user || "Traveler";
        const userImage = post.userImage || post.profile || defaultProfileImage;
        const location = post.location || post.place || "Travel Place";
        const caption = post.caption || "";
        const date = post.date || "";

        const imageHtml = post.image ? `
            <img class="feed-post-image" src="${post.image}" alt="Travel Post">
        ` : "";

        const deleteOption = isOwner ? `
            <div class="post-options">
                <button class="post-menu-btn" type="button">⋯</button>

                <div class="post-menu">
                    <button class="delete-post-btn" type="button" data-id="${post.id}">
                        🗑 Delete Post
                    </button>
                </div>
            </div>
        ` : "";

        const postCard = document.createElement("div");
        postCard.className = "post-card";
        postCard.setAttribute("data-post-id", post.id);

        postCard.innerHTML = `
            <div class="post-header">

                <div class="post-user">
                    <img src="${userImage}" alt="User">

                    <div>
                        <h4>${userName}</h4>
                        <span>📍 ${location}</span>
                        <small>${date}</small>
                    </div>
                </div>

                ${deleteOption}

            </div>

            <p style="margin-top:20px">
                ${caption}
            </p>

            ${imageHtml}

            <div class="actions">

                <button onclick="likePost(this)">
                    ❤️ Like
                </button>

                <button onclick="commentPost()">
                    💬 Comment
                </button>

            </div>
        `;

        postContainer.appendChild(postCard);

    });

}


// ===============================
// Create Text Post from Home
// ===============================

function createPost() {

    if (!requireHomeLogin("Please login to create a post.")) return;

    const postText = document.getElementById("postText");

    if (!postText) return;

    let text = postText.value;

    if (text.trim() === "") {

        alert("Write something first");

        return;

    }

    const currentUser = getCurrentUser();

    const newPost = {
        id: Date.now(),

        userId: currentUser.id,
        userEmail: currentUser.email,

        user: currentUser.name || "Traveler",
        profile: currentUser.image || defaultProfileImage,
        userName: currentUser.name || "Traveler",
        userImage: currentUser.image || defaultProfileImage,

        image: "",
        place: "Travel Place",
        location: "Travel Place",
        caption: text,

        likes: 0,
        comments: [],
        date: new Date().toLocaleString()
    };

    let posts = getPosts();

    posts.unshift(newPost);

    savePosts(posts);

    postText.value = "";

    renderPosts();

}


// ===============================
// Like Post
// ===============================

function likePost(button) {

    if (!requireHomeLogin("Please login to like posts.")) return;

    button.innerHTML = "❤️ Liked";

    button.style.color = "red";

    addNotification(
        "like",
        "New Like",
        "Someone liked your travel post.",
        "fa-heart"
    );

    loadNotificationBadge();

}


// ===============================
// Comment Notification Demo
// ===============================

function commentPost() {

    if (!requireHomeLogin("Please login to comment on posts.")) return;

    addNotification(
        "comment",
        "New Comment",
        "Someone commented on your travel post.",
        "fa-comment"
    );

    loadNotificationBadge();

    alert("Comment notification added!");

}


// ===============================
// Three Dot Menu + Delete Post
// ===============================

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("post-menu-btn")) {

        if (!requireHomeLogin("Please login first.")) return;

        const menu = e.target.nextElementSibling;

        document.querySelectorAll(".post-menu").forEach(function (item) {
            if (item !== menu) {
                item.classList.remove("active");
            }
        });

        menu.classList.toggle("active");

        return;
    }

    if (e.target.classList.contains("delete-post-btn")) {

        if (!requireHomeLogin("Please login to delete your post.")) return;

        const postId = Number(e.target.getAttribute("data-id"));

        deletePost(postId);

        return;
    }

    document.querySelectorAll(".post-menu").forEach(function (menu) {
        menu.classList.remove("active");
    });

});


// ===============================
// Delete Own Post Only
// ===============================

function deletePost(postId) {

    if (!requireHomeLogin("Please login to delete your post.")) return;

    const currentUser = getCurrentUser();

    let posts = getPosts();

    const selectedPost = posts.find(function (post) {
        return Number(post.id) === Number(postId);
    });

    if (!selectedPost) {
        alert("Post not found!");
        return;
    }

    const isOwner =
        String(selectedPost.userId) === String(currentUser.id) ||
        String(selectedPost.userEmail) === String(currentUser.email);

    if (!isOwner) {
        alert("You can only delete your own post!");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (!confirmDelete) return;

    posts = posts.filter(function (post) {
        return Number(post.id) !== Number(postId);
    });

    savePosts(posts);

    renderPosts();

    alert("Post deleted successfully!");

}


// ===============================
// Auto Refresh When Coming Back From Profile
// ===============================

window.addEventListener("pageshow", function () {

    refreshHomeProfileUI();

    loadHomeSavedCollection();

    loadNotificationBadge();

});


window.addEventListener("focus", function () {

    refreshHomeProfileUI();

});


document.addEventListener("visibilitychange", function () {

    if (!document.hidden) {
        refreshHomeProfileUI();
        loadHomeSavedCollection();
    }

});


window.addEventListener("storage", function (event) {

    const keysToWatch = [
        "travelverse_profile",
        "travelverse_current_user",
        "travelverse_profile_updated_at",
        "travelPosts",
        "savedPlaces",
        "savedHotels",
        "travelverse_notifications",
        "travelUser"
    ];

    if (keysToWatch.includes(event.key)) {

        refreshHomeProfileUI();

        loadHomeSavedCollection();

        loadNotificationBadge();

    }

});


// ===============================
// Logout
// ===============================

function logout() {

    localStorage.removeItem("travelUser");
    localStorage.removeItem("travelverse_current_user");

    window.location.href = "login.html";

}


// ===============================
// Load Everything When Page Opens
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    loadSidebarProfile();

    updateHomeAuthButton();

    renderPosts();

    loadNotificationBadge();

    loadHomeSavedCollection();

});