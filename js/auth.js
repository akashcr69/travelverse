/* ==========================================
   TravelVerse Auth Guard
   File : auth.js
========================================== */


// ===============================
// Check User Login
// ===============================

function isLoggedIn() {
    return localStorage.getItem("travelUser") !== null;
}


// ===============================
// Require Login
// ===============================

function requireLogin(message) {

    if (!isLoggedIn()) {

        alert(message || "Please login first.");

        localStorage.setItem(
            "travelverse_redirect_after_login",
            window.location.pathname.split("/").pop()
        );

        window.location.href = "login.html";

        return false;
    }

    return true;
}


// ===============================
// Protected Page Guard
// Works with body data-auth-required="true"
// ===============================

function protectCurrentPage() {

    const authRequired = document.body.getAttribute("data-auth-required");

    const authMessage = document.body.getAttribute("data-auth-message");

    if (authRequired === "true") {

        if (!isLoggedIn()) {

            alert(authMessage || "Please login first.");

            localStorage.setItem(
                "travelverse_redirect_after_login",
                window.location.pathname.split("/").pop()
            );

            window.location.href = "login.html";

        }

    }

}


// ===============================
// Logout User
// ===============================

function logoutUser(event) {

    if (event) {
        event.preventDefault();
    }

    localStorage.removeItem("travelUser");
    localStorage.removeItem("travelverse_current_user");

    window.location.href = "login.html";
}


// ===============================
// Protected Link Guard
// Login ছাড়া এই pages open হবে না
// ===============================

function setupProtectedLinks() {

    const protectedPages = [
        "upload.html",
        "notifications.html"
    ];

    document.querySelectorAll("a").forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) return;

        const pageName = href.split("/").pop();

        if (protectedPages.includes(pageName)) {

            link.addEventListener("click", function (e) {

                if (!isLoggedIn()) {

                    e.preventDefault();

                    alert("Please login first to access this feature.");

                    localStorage.setItem("travelverse_redirect_after_login", pageName);

                    window.location.href = "login.html";

                }

            });

        }

    });

}


// ===============================
// Update Auth UI
// Login হলে Logout দেখাবে
// Login না হলে Login দেখাবে
// ===============================

function updateAuthUI() {

    const logoutLinks = document.querySelectorAll(
        'a[href="login.html"], button.logout-btn'
    );

    logoutLinks.forEach(function (item) {

        if (isLoggedIn()) {

            item.innerText = "Logout";

            item.onclick = function (event) {
                logoutUser(event);
            };

        } else {

            item.innerText = "Login";

            item.onclick = function (event) {

                if (event) {
                    event.preventDefault();
                }

                window.location.href = "login.html";

            };

        }

    });

}


// ===============================
// Page Load
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    protectCurrentPage();

    setupProtectedLinks();

    updateAuthUI();

});


console.log("TravelVerse Auth Guard Loaded");