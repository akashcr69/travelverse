/* ==================================================
   TravelVerse Global Theme
   File: js/theme.js
   Full Website Dark / Light / System / Accent Support
================================================== */


// ===============================
// Default Theme Settings
// ===============================

const travelVerseDefaultTheme = {
    appearance: {
        themeMode: "light",
        accentColor: "purple"
    }
};


// ===============================
// Safe Settings Reader
// ===============================

function getTravelVerseThemeSettings() {

    try {

        const savedSettings = JSON.parse(localStorage.getItem("travelverse_settings"));

        if (!savedSettings) {
            return travelVerseDefaultTheme;
        }

        return {
            appearance: {
                ...travelVerseDefaultTheme.appearance,
                ...(savedSettings.appearance || {})
            }
        };

    } catch (error) {

        return travelVerseDefaultTheme;

    }

}


// ===============================
// Apply Theme To Current Page
// ===============================

function applyTravelVerseTheme() {

    const settings = getTravelVerseThemeSettings();

    const themeMode = settings.appearance.themeMode || "light";

    const accentColor = settings.appearance.accentColor || "purple";

    document.body.setAttribute("data-theme", themeMode);

    document.body.setAttribute("data-accent", accentColor);

}


// ===============================
// Apply Theme Immediately
// ===============================

applyTravelVerseTheme();


// ===============================
// Apply After DOM Ready
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    applyTravelVerseTheme();

});


// ===============================
// Apply When Page Comes Back
// Browser back / forward cache fix
// ===============================

window.addEventListener("pageshow", function () {

    applyTravelVerseTheme();

});


// ===============================
// Apply When Tab Focused
// ===============================

window.addEventListener("focus", function () {

    applyTravelVerseTheme();

});


// ===============================
// Apply When Page Becomes Visible
// ===============================

document.addEventListener("visibilitychange", function () {

    if (!document.hidden) {
        applyTravelVerseTheme();
    }

});


// ===============================
// Apply If Settings Changed From Another Tab
// ===============================

window.addEventListener("storage", function (event) {

    if (event.key === "travelverse_settings") {
        applyTravelVerseTheme();
    }

});


// ===============================
// Listen Custom Event From Settings Page
// ===============================

window.addEventListener("travelverseThemeChanged", function () {

    applyTravelVerseTheme();

});


console.log("TravelVerse Global Theme Loaded");