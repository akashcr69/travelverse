/* ==========================================================
   Module 10 : settings.js
   TravelVerse - Control Center / Settings Page
========================================================== */


// ===============================
// Default Values
// ===============================

const defaultProfileImage = "assets/WhatsApp Image 2026-07-13 at 03.10.00.jpeg";

const defaultSettings = {
    appearance: {
        themeMode: "light",
        accentColor: "purple"
    },
    notifications: {
        likes: true,
        comments: true,
        saved: true,
        travel: false
    },
    privacy: {
        publicProfile: true,
        savedPlaces: true,
        reviews: true,
        email: false
    }
};


// ===============================
// LocalStorage Helpers
// ===============================

function getSettings() {
    const saved = JSON.parse(localStorage.getItem("travelverse_settings"));

    if (!saved) {
        return defaultSettings;
    }

    return {
        appearance: {
            ...defaultSettings.appearance,
            ...(saved.appearance || {})
        },
        notifications: {
            ...defaultSettings.notifications,
            ...(saved.notifications || {})
        },
        privacy: {
            ...defaultSettings.privacy,
            ...(saved.privacy || {})
        }
    };
}


function saveSettings(settings) {
    localStorage.setItem("travelverse_settings", JSON.stringify(settings));
}


function getSavedProfile() {
    return JSON.parse(localStorage.getItem("travelverse_profile")) || {};
}


function getCurrentUser() {
    return JSON.parse(localStorage.getItem("travelverse_current_user")) || {
        id: 1,
        name: "Partho Singh",
        username: "partho_singh",
        email: localStorage.getItem("travelUser") || "traveler@gmail.com",
        image: defaultProfileImage
    };
}


// ===============================
// Apply Appearance
// ===============================

function applyAppearance(themeMode, accentColor) {

    document.body.setAttribute("data-theme", themeMode || "light");

    document.body.setAttribute("data-accent", accentColor || "purple");

}


// ===============================
// Load Appearance UI
// ===============================

function loadAppearanceSettings() {

    const settings = getSettings();

    const themeMode = settings.appearance.themeMode || "light";
    const accentColor = settings.appearance.accentColor || "purple";

    applyAppearance(themeMode, accentColor);

    const themeInput = document.querySelector(`input[name="themeMode"][value="${themeMode}"]`);

    if (themeInput) {
        themeInput.checked = true;
    }

    document.querySelectorAll(".color-dot").forEach(function (dot) {

        dot.classList.remove("active");

        if (dot.dataset.color === accentColor) {
            dot.classList.add("active");
        }

    });

}


// ===============================
// Save Appearance Settings
// ===============================

function saveAppearanceSettings() {

    const settings = getSettings();

    const selectedTheme = document.querySelector('input[name="themeMode"]:checked');

    const activeColor = document.querySelector(".color-dot.active");

    settings.appearance.themeMode = selectedTheme ? selectedTheme.value : "light";

    settings.appearance.accentColor = activeColor ? activeColor.dataset.color : "purple";

    saveSettings(settings);

    applyAppearance(
        settings.appearance.themeMode,
        settings.appearance.accentColor
    );

    alert("Appearance settings saved successfully!");

}


// ===============================
// Live Appearance Preview
// ===============================

function setupAppearancePreview() {

    const themeInputs = document.querySelectorAll('input[name="themeMode"]');

    themeInputs.forEach(function (input) {

        input.addEventListener("change", function () {

            const activeColor = document.querySelector(".color-dot.active");

            applyAppearance(
                input.value,
                activeColor ? activeColor.dataset.color : "purple"
            );

        });

    });


    const colorDots = document.querySelectorAll(".color-dot");

    colorDots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            colorDots.forEach(function (item) {
                item.classList.remove("active");
            });

            dot.classList.add("active");

            const selectedTheme = document.querySelector('input[name="themeMode"]:checked');

            applyAppearance(
                selectedTheme ? selectedTheme.value : "light",
                dot.dataset.color
            );

        });

    });

}


// ===============================
// Settings Menu Switch
// ===============================

function setupSettingsMenu() {

    const menuButtons = document.querySelectorAll(".settings-menu-btn");

    const sections = document.querySelectorAll(".settings-section");

    menuButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const targetSection = button.dataset.section;

            menuButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            sections.forEach(function (section) {
                section.classList.remove("active");
            });

            button.classList.add("active");

            const section = document.getElementById(targetSection);

            if (section) {
                section.classList.add("active");
            }

        });

    });

}


// ===============================
// Load Profile Summary + Form
// ===============================

function loadProfileData() {

    const currentUser = getCurrentUser();

    const savedProfile = getSavedProfile();

    const profile = {
        name: savedProfile.name || currentUser.name || "Partho Singh",
        username: savedProfile.username || currentUser.username || "partho_singh",
        email: currentUser.email || localStorage.getItem("travelUser") || "traveler@gmail.com",
        location: savedProfile.location || "Rajshahi, Bangladesh",
        bio: savedProfile.bio || "Travel Enthusiast | Rajshahi/Dhaka",
        profileImage: savedProfile.profileImage || currentUser.image || defaultProfileImage
    };

    const image = document.getElementById("settingsProfileImage");
    const name = document.getElementById("settingsProfileName");
    const username = document.getElementById("settingsUsername");

    if (image) image.src = profile.profileImage;
    if (name) name.innerText = profile.name;
    if (username) username.innerText = "@" + profile.username;

    const settingName = document.getElementById("settingName");
    const settingUsername = document.getElementById("settingUsername");
    const settingEmail = document.getElementById("settingEmail");
    const settingLocation = document.getElementById("settingLocation");
    const settingBio = document.getElementById("settingBio");

    if (settingName) settingName.value = profile.name;
    if (settingUsername) settingUsername.value = profile.username;
    if (settingEmail) settingEmail.value = profile.email;
    if (settingLocation) settingLocation.value = profile.location;
    if (settingBio) settingBio.value = profile.bio;

    const securityEmail = document.getElementById("securityEmail");

    if (securityEmail) {
        securityEmail.innerText = profile.email;
    }

}


// ===============================
// Save Account Settings
// ===============================

function setupAccountForm() {

    const accountForm = document.getElementById("accountForm");

    if (!accountForm) return;

    accountForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const currentUser = getCurrentUser();

        const savedProfile = getSavedProfile();

        const updatedProfile = {
            ...savedProfile,
            name: document.getElementById("settingName").value.trim() || "Traveler",
            username: document.getElementById("settingUsername").value.trim() || "traveler",
            location: document.getElementById("settingLocation").value.trim() || "Bangladesh",
            bio: document.getElementById("settingBio").value.trim() || "Travel Enthusiast",
            profileImage: savedProfile.profileImage || currentUser.image || defaultProfileImage
        };

        const updatedUser = {
            ...currentUser,
            name: updatedProfile.name,
            username: updatedProfile.username,
            email: document.getElementById("settingEmail").value.trim() || currentUser.email,
            image: updatedProfile.profileImage
        };

        localStorage.setItem("travelverse_profile", JSON.stringify(updatedProfile));

        localStorage.setItem("travelverse_current_user", JSON.stringify(updatedUser));

        localStorage.setItem("travelUser", updatedUser.email);

        loadProfileData();

        alert("Account settings saved successfully!");

    });

}


// ===============================
// Load Notification Settings
// ===============================

function loadNotificationSettings() {

    const settings = getSettings();

    const notifyLikes = document.getElementById("notifyLikes");
    const notifyComments = document.getElementById("notifyComments");
    const notifySaved = document.getElementById("notifySaved");
    const notifyTravel = document.getElementById("notifyTravel");

    if (notifyLikes) notifyLikes.checked = settings.notifications.likes;
    if (notifyComments) notifyComments.checked = settings.notifications.comments;
    if (notifySaved) notifySaved.checked = settings.notifications.saved;
    if (notifyTravel) notifyTravel.checked = settings.notifications.travel;

}


// ===============================
// Save Notification Settings
// ===============================

function saveNotificationSettings() {

    const settings = getSettings();

    settings.notifications.likes = document.getElementById("notifyLikes").checked;

    settings.notifications.comments = document.getElementById("notifyComments").checked;

    settings.notifications.saved = document.getElementById("notifySaved").checked;

    settings.notifications.travel = document.getElementById("notifyTravel").checked;

    saveSettings(settings);

    alert("Notification settings saved successfully!");

}


// ===============================
// Load Privacy Settings
// ===============================

function loadPrivacySettings() {

    const settings = getSettings();

    const publicProfile = document.getElementById("privacyPublicProfile");
    const savedPlaces = document.getElementById("privacySavedPlaces");
    const reviews = document.getElementById("privacyReviews");
    const email = document.getElementById("privacyEmail");

    if (publicProfile) publicProfile.checked = settings.privacy.publicProfile;
    if (savedPlaces) savedPlaces.checked = settings.privacy.savedPlaces;
    if (reviews) reviews.checked = settings.privacy.reviews;
    if (email) email.checked = settings.privacy.email;

}


// ===============================
// Save Privacy Settings
// ===============================

function savePrivacySettings() {

    const settings = getSettings();

    settings.privacy.publicProfile = document.getElementById("privacyPublicProfile").checked;

    settings.privacy.savedPlaces = document.getElementById("privacySavedPlaces").checked;

    settings.privacy.reviews = document.getElementById("privacyReviews").checked;

    settings.privacy.email = document.getElementById("privacyEmail").checked;

    saveSettings(settings);

    alert("Privacy settings saved successfully!");

}


// ===============================
// Data Count Manager
// ===============================

function loadDataCounts() {

    const savedPlaces = JSON.parse(localStorage.getItem("savedPlaces")) || [];

    const savedHotels = JSON.parse(localStorage.getItem("savedHotels")) || [];

    const posts = JSON.parse(localStorage.getItem("travelPosts")) || [];

    const reviews = JSON.parse(localStorage.getItem("travelReviews")) || [];

    const settingsSavedPlaceCount = document.getElementById("settingsSavedPlaceCount");
    const settingsSavedHotelCount = document.getElementById("settingsSavedHotelCount");
    const settingsPostCount = document.getElementById("settingsPostCount");

    if (settingsSavedPlaceCount) settingsSavedPlaceCount.innerText = savedPlaces.length;
    if (settingsSavedHotelCount) settingsSavedHotelCount.innerText = savedHotels.length;
    if (settingsPostCount) settingsPostCount.innerText = posts.length;

    const dataSavedPlaces = document.getElementById("dataSavedPlaces");
    const dataSavedHotels = document.getElementById("dataSavedHotels");
    const dataPosts = document.getElementById("dataPosts");
    const dataReviews = document.getElementById("dataReviews");

    if (dataSavedPlaces) dataSavedPlaces.innerText = savedPlaces.length;
    if (dataSavedHotels) dataSavedHotels.innerText = savedHotels.length;
    if (dataPosts) dataPosts.innerText = posts.length;
    if (dataReviews) dataReviews.innerText = reviews.length;

}


// ===============================
// Clear Data Functions
// ===============================

function clearSavedPlaces() {

    if (!confirm("Clear all saved places?")) return;

    localStorage.removeItem("savedPlaces");

    loadDataCounts();

    alert("Saved places cleared!");

}


function clearSavedHotels() {

    if (!confirm("Clear all saved hotels?")) return;

    localStorage.removeItem("savedHotels");

    loadDataCounts();

    alert("Saved hotels cleared!");

}


function clearPosts() {

    if (!confirm("Clear all travel posts?")) return;

    localStorage.removeItem("travelPosts");

    loadDataCounts();

    alert("Posts cleared!");

}


function clearReviews() {

    if (!confirm("Clear all reviews?")) return;

    localStorage.removeItem("travelReviews");

    loadDataCounts();

    alert("Reviews cleared!");

}


// ===============================
// Security Demo
// ===============================

function changePasswordDemo() {

    alert("This is a frontend demo. Password change will work after backend integration.");

}


// ===============================
// Danger Zone
// ===============================

function clearAllAppData() {

    const confirmClear = confirm("Are you sure? This will clear all TravelVerse demo data from this browser.");

    if (!confirmClear) return;

    localStorage.removeItem("travelverse_profile");
    localStorage.removeItem("travelverse_current_user");
    localStorage.removeItem("travelverse_settings");
    localStorage.removeItem("travelverse_notifications");

    localStorage.removeItem("travelUser");

    localStorage.removeItem("savedPlaces");
    localStorage.removeItem("savedHotels");

    localStorage.removeItem("travelPosts");
    localStorage.removeItem("travelReviews");

    localStorage.removeItem("selectedPlace");
    localStorage.removeItem("selectedHotel");

    alert("All TravelVerse data cleared!");

    window.location.href = "login.html";

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
// First Time Settings Save
// ===============================

function initializeSettings() {

    const saved = localStorage.getItem("travelverse_settings");

    if (!saved) {
        saveSettings(defaultSettings);
    }

}


// ===============================
// Load Everything
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    initializeSettings();

    setupSettingsMenu();

    setupAppearancePreview();

    loadAppearanceSettings();

    loadProfileData();

    setupAccountForm();

    loadNotificationSettings();

    loadPrivacySettings();

    loadDataCounts();

});