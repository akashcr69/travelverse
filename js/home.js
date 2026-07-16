/* ==================================================
   TravelVerse Home Page
   File: js/home.js
   Public home feed + logged-in/guest sidebar state
================================================== */


/* ===============================
   Configuration
================================ */

const HOME_DEFAULT_PROFILE_IMAGE =
    "/assets/WhatsApp Image 2026-07-13 at 03.10.00.jpeg";

const HOME_FALLBACK_PROFILE_IMAGE =
    "/assets/images/user1.jpg";

const HOME_LOGIN_REDIRECT_KEY =
    "travelverse_redirect_after_login";


/* ===============================
   Safe Helpers
================================ */

function safeParse(key, fallback) {

    try {

        const rawValue = localStorage.getItem(key);

        if (!rawValue) return fallback;

        const parsedValue = JSON.parse(rawValue);

        return parsedValue !== null
            ? parsedValue
            : fallback;

    } catch (error) {

        console.error(
            "TravelVerse storage parse error:",
            key,
            error
        );

        return fallback;

    }

}


function escapeHomeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function normalizeHomeUsername(username) {

    const cleanUsername =
        String(username || "traveler")
            .trim()
            .replace(/^@+/, "");

    return cleanUsername || "traveler";

}


function formatHomeDate(dateValue) {

    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {

        return String(dateValue);

    }

    return new Intl.DateTimeFormat(
        "en-GB",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    ).format(date);

}


/* ===============================
   Authentication Helpers
================================ */

function isUserLoggedIn() {

    return Boolean(
        localStorage.getItem("travelUser")
    );

}


function rememberHomeLoginRedirect(targetPage) {

    localStorage.setItem(
        HOME_LOGIN_REDIRECT_KEY,
        targetPage || "home.html"
    );

}


function redirectGuestToLogin(
    message,
    targetPage = "home.html"
) {

    rememberHomeLoginRedirect(targetPage);

    if (message) {

        alert(message);

    }

    window.location.href = "login.html";

}


function requireHomeLogin(
    message,
    targetPage = "home.html"
) {

    if (isUserLoggedIn()) {

        return true;

    }

    redirectGuestToLogin(
        message || "Please login first.",
        targetPage
    );

    return false;

}


/* ===============================
   Current User/Profile
================================ */

function getSavedProfile() {

    return safeParse(
        "travelverse_profile",
        {}
    );

}


function getCurrentUser() {

    if (!isUserLoggedIn()) {

        return null;

    }

    const loginValue =
        localStorage.getItem("travelUser") || "";

    const savedProfile =
        getSavedProfile();

    const savedUser =
        safeParse(
            "travelverse_current_user",
            {}
        );

    const email =
        savedUser.email ||
        savedProfile.email ||
        loginValue ||
        "";

    const currentUser = {

        id:
            savedUser.id ||
            savedProfile.id ||
            email ||
            "travelverse-user",

        name:
            savedProfile.name ||
            savedUser.name ||
            "Traveler",

        username:
            normalizeHomeUsername(
                savedProfile.username ||
                savedUser.username ||
                (
                    email
                        ? email.split("@")[0]
                        : "traveler"
                )
            ),

        email: email,

        image:
            savedProfile.profileImage ||
            savedProfile.image ||
            savedUser.profileImage ||
            savedUser.image ||
            HOME_DEFAULT_PROFILE_IMAGE

    };

    localStorage.setItem(
        "travelverse_current_user",
        JSON.stringify(currentUser)
    );

    return currentUser;

}


/* ===============================
   Sidebar Login / Guest State
================================ */

function loadSidebarProfile() {

    if (!isUserLoggedIn()) return;

    const currentUser =
        getCurrentUser();

    if (!currentUser) return;

    const sidebarImage =
        document.getElementById(
            "sidebarProfileImage"
        );

    const sidebarName =
        document.getElementById(
            "sidebarProfileName"
        );

    const sidebarUsername =
        document.getElementById(
            "sidebarProfileUsername"
        );

    if (sidebarImage) {

        sidebarImage.src =
            currentUser.image ||
            HOME_DEFAULT_PROFILE_IMAGE;

        sidebarImage.onerror = function () {

            this.onerror = null;
            this.src =
                HOME_FALLBACK_PROFILE_IMAGE;

        };

    }

    if (sidebarName) {

        sidebarName.textContent =
            currentUser.name ||
            "Traveler";

    }

    if (sidebarUsername) {

        sidebarUsername.textContent =
            "@" +
            normalizeHomeUsername(
                currentUser.username
            );

    }

}


function updateHomeSidebarState() {

    const loggedIn =
        isUserLoggedIn();

    const loggedInProfile =
        document.getElementById(
            "loggedInSidebarProfile"
        );

    const guestCard =
        document.getElementById(
            "guestSidebarCard"
        );

    const logoutButton =
        document.getElementById(
            "homeLogoutBtn"
        );

    const createPostBox =
        document.getElementById(
            "homeCreatePostBox"
        );

    const createPostInput =
        document.getElementById(
            "postText"
        );

    const savedWidget =
        document.getElementById(
            "homeSavedWidget"
        );

    const protectedLinks =
        document.querySelectorAll(
            ".login-required-link"
        );


    if (loggedInProfile) {

        loggedInProfile.hidden =
            !loggedIn;

    }


    if (guestCard) {

        guestCard.hidden =
            loggedIn;

    }


    if (logoutButton) {

        logoutButton.hidden =
            !loggedIn;

    }


    if (createPostBox) {

        createPostBox.classList.toggle(
            "guest-mode",
            !loggedIn
        );

    }


    if (createPostInput) {

        createPostInput.placeholder =
            loggedIn
                ? "Share your travel story..."
                : "Login to share your travel story...";

        createPostInput.readOnly =
            !loggedIn;

    }


    if (savedWidget) {

        savedWidget.classList.toggle(
            "guest-mode",
            !loggedIn
        );

    }


    protectedLinks.forEach(
        function (link) {

            link.classList.toggle(
                "guest-locked",
                !loggedIn
            );

            link.setAttribute(
                "aria-disabled",
                loggedIn
                    ? "false"
                    : "true"
            );

        }
    );


    if (loggedIn) {

        loadSidebarProfile();

    }

}


/* ===============================
   Protected Link Handling
================================ */

function setupHomeProtectedLinks() {

    const protectedLinks =
        document.querySelectorAll(
            ".login-required-link"
        );

    protectedLinks.forEach(
        function (link) {

            if (
                link.dataset.homeAuthReady ===
                "true"
            ) {

                return;

            }

            link.dataset.homeAuthReady =
                "true";

            link.addEventListener(
                "click",
                function (event) {

                    if (isUserLoggedIn()) {

                        return;

                    }

                    event.preventDefault();

                    const destination =
                        link.getAttribute("href") ||
                        "home.html";

                    redirectGuestToLogin(
                        "Please login to use this feature.",
                        destination
                    );

                }
            );

        }
    );

}


function setupGuestCreatePostBox() {

    const createPostBox =
        document.getElementById(
            "homeCreatePostBox"
        );

    const createPostInput =
        document.getElementById(
            "postText"
        );

    if (!createPostBox) return;


    createPostBox.addEventListener(
        "click",
        function (event) {

            if (isUserLoggedIn()) {

                return;

            }

            const clickedInput =
                event.target === createPostInput;

            const clickedButton =
                event.target.closest(
                    "#homeCreatePostBtn"
                );

            if (
                clickedInput ||
                clickedButton
            ) {

                event.preventDefault();

                redirectGuestToLogin(
                    "Please login to create a post.",
                    "upload.html"
                );

            }

        }
    );

}


/* ===============================
   Notification System
================================ */

function getNotifications() {

    if (!isUserLoggedIn()) {

        return [];

    }

    return safeParse(
        "travelverse_notifications",
        []
    );

}


function saveNotifications(notifications) {

    localStorage.setItem(
        "travelverse_notifications",
        JSON.stringify(notifications)
    );

}


function addNotification(
    type,
    title,
    message,
    icon
) {

    if (!isUserLoggedIn()) return;

    const notifications =
        getNotifications();

    notifications.unshift({

        id: Date.now(),

        type: type,

        title: title,

        message: message,

        icon: icon,

        time:
            new Date().toISOString(),

        isRead: false

    });

    saveNotifications(notifications);

}


function loadNotificationBadge() {

    const badge =
        document.getElementById(
            "notificationBadge"
        );

    if (!badge) return;


    if (!isUserLoggedIn()) {

        badge.style.display = "none";

        return;

    }


    const unreadCount =
        getNotifications().filter(
            function (item) {

                return item.isRead === false;

            }
        ).length;


    if (unreadCount > 0) {

        badge.textContent =
            unreadCount > 99
                ? "99+"
                : unreadCount;

        badge.style.display =
            "inline-flex";

    } else {

        badge.style.display = "none";

    }

}


/* ===============================
   Saved Collection Widget
================================ */

function getSavedPlaces() {

    if (!isUserLoggedIn()) return [];

    return safeParse(
        "savedPlaces",
        []
    );

}


function getSavedHotels() {

    if (!isUserLoggedIn()) return [];

    return safeParse(
        "savedHotels",
        []
    );

}


function loadHomeSavedCollection() {

    const placeCount =
        document.getElementById(
            "homeSavedPlacesCount"
        );

    const hotelCount =
        document.getElementById(
            "homeSavedHotelsCount"
        );

    const savedList =
        document.getElementById(
            "homeSavedList"
        );


    if (!isUserLoggedIn()) {

        if (placeCount) {

            placeCount.textContent = "0";

        }

        if (hotelCount) {

            hotelCount.textContent = "0";

        }

        if (savedList) {

            savedList.innerHTML = "";

        }

        return;

    }


    const savedPlaces =
        getSavedPlaces();

    const savedHotels =
        getSavedHotels();


    if (placeCount) {

        placeCount.textContent =
            savedPlaces.length;

    }


    if (hotelCount) {

        hotelCount.textContent =
            savedHotels.length;

    }


    if (!savedList) return;


    const combinedSaved = [

        ...savedPlaces.map(
            function (item) {

                return {

                    type: "Place",

                    name:
                        item.name ||
                        item.place ||
                        "Saved Place",

                    location:
                        item.location ||
                        item.district ||
                        "Bangladesh",

                    rating:
                        item.rating ||
                        "Not rated",

                    image:
                        item.image ||
                        "/assets/images.jpeg"

                };

            }
        ),

        ...savedHotels.map(
            function (item) {

                return {

                    type: "Hotel",

                    name:
                        item.name ||
                        item.hotelName ||
                        "Saved Hotel",

                    location:
                        item.location ||
                        item.hotelLocation ||
                        "Bangladesh",

                    rating:
                        item.rating ||
                        item.hotelRating ||
                        "Not rated",

                    image:
                        item.image ||
                        "/assets/922_giant.jpg"

                };

            }
        )

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


    combinedSaved
        .slice(0, 4)
        .forEach(
            function (item) {

                const savedItem =
                    document.createElement(
                        "div"
                    );

                savedItem.className =
                    "home-saved-item";

                savedItem.innerHTML = `

                    <img
                        src="${escapeHomeHTML(
                            item.image
                        )}"
                        alt="${escapeHomeHTML(
                            item.name
                        )}"
                        onerror="this.onerror=null; this.src='/assets/images.jpeg';">

                    <div>

                        <h4>
                            ${escapeHomeHTML(
                                item.name
                            )}
                        </h4>

                        <p>
                            ${escapeHomeHTML(
                                item.type
                            )}
                            •
                            ${escapeHomeHTML(
                                item.location
                            )}
                        </p>

                        <p>
                            ⭐
                            ${escapeHomeHTML(
                                item.rating
                            )}
                        </p>

                    </div>

                `;

                savedList.appendChild(
                    savedItem
                );

            }
        );

}


/* ===============================
   Post Storage
================================ */

function getPosts() {

    return safeParse(
        "travelPosts",
        []
    );

}


function savePosts(posts) {

    try {

        localStorage.setItem(
            "travelPosts",
            JSON.stringify(posts)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save posts:",
            error
        );

        alert(
            "Unable to save the post. The uploaded content may be too large."
        );

        return false;

    }

}


/* ===============================
   Render Home Feed
================================ */

function renderPosts() {

    const postContainer =
        document.getElementById(
            "postContainer"
        );

    if (!postContainer) return;


    const posts =
        getPosts();

    const currentUser =
        getCurrentUser();

    const searchInput =
        document.getElementById(
            "homeSearchInput"
        );

    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const filteredPosts =
        posts.filter(
            function (post) {

                if (!searchValue) return true;

                const searchableText = [

                    post.userName,
                    post.user,
                    post.location,
                    post.place,
                    post.caption

                ]
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(
                    searchValue
                );

            }
        );


    postContainer.innerHTML = "";


    if (filteredPosts.length === 0) {

        postContainer.innerHTML = `

            <div class="post-card">

                <p>
                    ${
                        searchValue
                            ? "No matching travel posts found."
                            : "No posts yet. Login and create your first travel post!"
                    }
                </p>

            </div>

        `;

        return;

    }


    filteredPosts.forEach(
        function (post) {

            const isOwner =
                Boolean(
                    isUserLoggedIn() &&
                    currentUser &&
                    (
                        (
                            post.userId &&
                            String(post.userId) ===
                            String(currentUser.id)
                        ) ||
                        (
                            post.userEmail &&
                            currentUser.email &&
                            String(
                                post.userEmail
                            ).toLowerCase() ===
                            String(
                                currentUser.email
                            ).toLowerCase()
                        )
                    )
                );


            const userName =
                post.userName ||
                post.user ||
                "Traveler";

            const userImage =
                post.userImage ||
                post.profile ||
                HOME_DEFAULT_PROFILE_IMAGE;

            const location =
                post.location ||
                post.place ||
                "Travel Place";

            const caption =
                post.caption ||
                "";

            const date =
                formatHomeDate(
                    post.createdAt ||
                    post.date
                );


            const imageHtml =
                post.image
                    ? `

                        <img
                            class="feed-post-image"
                            src="${escapeHomeHTML(
                                post.image
                            )}"
                            alt="Travel post"
                            onerror="this.style.display='none';">

                    `
                    : "";


            const deleteOption =
                isOwner
                    ? `

                        <div class="post-options">

                            <button
                                class="post-menu-btn"
                                type="button"
                                aria-label="Post options">

                                ⋯

                            </button>

                            <div class="post-menu">

                                <button
                                    class="delete-post-btn"
                                    type="button"
                                    data-id="${escapeHomeHTML(
                                        post.id
                                    )}">

                                    <i class="fa-solid fa-trash"></i>

                                    Delete Post

                                </button>

                            </div>

                        </div>

                    `
                    : "";


            const postCard =
                document.createElement(
                    "article"
                );

            postCard.className =
                "post-card";

            postCard.setAttribute(
                "data-post-id",
                post.id
            );


            postCard.innerHTML = `

                <div class="post-header">

                    <div class="post-user">

                        <img
                            src="${escapeHomeHTML(
                                userImage
                            )}"
                            alt="${escapeHomeHTML(
                                userName
                            )}"
                            onerror="this.onerror=null; this.src='${HOME_FALLBACK_PROFILE_IMAGE}';">

                        <div>

                            <h4>
                                ${escapeHomeHTML(
                                    userName
                                )}
                            </h4>

                            <span>
                                📍
                                ${escapeHomeHTML(
                                    location
                                )}
                            </span>

                            <small>
                                ${escapeHomeHTML(
                                    date
                                )}
                            </small>

                        </div>

                    </div>

                    ${deleteOption}

                </div>

                <p>
                    ${escapeHomeHTML(
                        caption
                    )}
                </p>

                ${imageHtml}

                <div class="actions">

                    <button
                        type="button"
                        onclick="likePost(this)">

                        ❤️ Like

                    </button>

                    <button
                        type="button"
                        onclick="commentPost()">

                        💬 Comment

                    </button>

                </div>

            `;


            postContainer.appendChild(
                postCard
            );

        }
    );

}


/* ===============================
   Create Text Post
================================ */

function createPost() {

    if (!requireHomeLogin(
        "Please login to create a post.",
        "upload.html"
    )) {

        return;

    }


    const postText =
        document.getElementById(
            "postText"
        );

    if (!postText) return;


    const text =
        postText.value.trim();


    if (!text) {

        alert("Write something first.");

        return;

    }


    const currentUser =
        getCurrentUser();

    if (!currentUser) return;


    const newPost = {

        id: Date.now(),

        userId:
            currentUser.id,

        userEmail:
            currentUser.email,

        user:
            currentUser.name ||
            "Traveler",

        profile:
            currentUser.image ||
            HOME_DEFAULT_PROFILE_IMAGE,

        userName:
            currentUser.name ||
            "Traveler",

        userImage:
            currentUser.image ||
            HOME_DEFAULT_PROFILE_IMAGE,

        image: "",

        place:
            "Travel Place",

        location:
            "Travel Place",

        caption: text,

        likes: 0,

        comments: [],

        createdAt:
            new Date().toISOString(),

        date:
            new Date().toISOString()

    };


    const posts =
        getPosts();

    posts.unshift(newPost);


    if (!savePosts(posts)) return;


    postText.value = "";

    renderPosts();

}


/* ===============================
   Like and Comment Actions
================================ */

function likePost(button) {

    if (!requireHomeLogin(
        "Please login to like posts.",
        "home.html"
    )) {

        return;

    }


    button.innerHTML =
        "❤️ Liked";

    button.style.color =
        "#dc2626";


    addNotification(

        "like",

        "New Like",

        "Someone liked your travel post.",

        "fa-heart"

    );


    loadNotificationBadge();

}


function commentPost() {

    if (!requireHomeLogin(
        "Please login to comment on posts.",
        "home.html"
    )) {

        return;

    }


    addNotification(

        "comment",

        "New Comment",

        "Someone commented on your travel post.",

        "fa-comment"

    );


    loadNotificationBadge();


    alert(
        "Comment notification added!"
    );

}


/* ===============================
   Post Menu and Delete
================================ */

function deletePost(postId) {

    if (!requireHomeLogin(
        "Please login to delete your post.",
        "home.html"
    )) {

        return;

    }


    const currentUser =
        getCurrentUser();

    if (!currentUser) return;


    let posts =
        getPosts();


    const selectedPost =
        posts.find(
            function (post) {

                return (
                    String(post.id) ===
                    String(postId)
                );

            }
        );


    if (!selectedPost) {

        alert("Post not found!");

        return;

    }


    const isOwner =
        (
            selectedPost.userId &&
            String(selectedPost.userId) ===
            String(currentUser.id)
        ) ||
        (
            selectedPost.userEmail &&
            currentUser.email &&
            String(
                selectedPost.userEmail
            ).toLowerCase() ===
            String(
                currentUser.email
            ).toLowerCase()
        );


    if (!isOwner) {

        alert(
            "You can only delete your own post!"
        );

        return;

    }


    if (!confirm(
        "Are you sure you want to delete this post?"
    )) {

        return;

    }


    posts = posts.filter(
        function (post) {

            return (
                String(post.id) !==
                String(postId)
            );

        }
    );


    if (!savePosts(posts)) return;


    renderPosts();


    alert(
        "Post deleted successfully!"
    );

}


function setupPostMenuEvents() {

    document.addEventListener(
        "click",
        function (event) {

            const menuButton =
                event.target.closest(
                    ".post-menu-btn"
                );


            if (menuButton) {

                if (!requireHomeLogin(
                    "Please login first.",
                    "home.html"
                )) {

                    return;

                }


                const menu =
                    menuButton
                        .nextElementSibling;


                document
                    .querySelectorAll(
                        ".post-menu"
                    )
                    .forEach(
                        function (item) {

                            if (item !== menu) {

                                item.classList.remove(
                                    "active"
                                );

                            }

                        }
                    );


                if (menu) {

                    menu.classList.toggle(
                        "active"
                    );

                }


                return;

            }


            const deleteButton =
                event.target.closest(
                    ".delete-post-btn"
                );


            if (deleteButton) {

                deletePost(
                    deleteButton.dataset.id
                );

                return;

            }


            document
                .querySelectorAll(
                    ".post-menu"
                )
                .forEach(
                    function (menu) {

                        menu.classList.remove(
                            "active"
                        );

                    }
                );

        }
    );

}


/* ===============================
   Home Search
================================ */

function setupHomeSearch() {

    const searchInput =
        document.getElementById(
            "homeSearchInput"
        );

    if (!searchInput) return;


    searchInput.addEventListener(
        "input",
        renderPosts
    );

}


/* ===============================
   Refresh Home UI
================================ */

function refreshHomeProfileUI() {

    updateHomeSidebarState();

    renderPosts();

    loadHomeSavedCollection();

    loadNotificationBadge();

}


/* ===============================
   Logout
================================ */

function logout() {

    localStorage.removeItem(
        "travelUser"
    );

    localStorage.removeItem(
        "travelverse_current_user"
    );

    window.location.href =
        "login.html";

}


/* ===============================
   Page and Storage Events
================================ */

window.addEventListener(
    "pageshow",
    refreshHomeProfileUI
);


window.addEventListener(
    "focus",
    refreshHomeProfileUI
);


document.addEventListener(
    "visibilitychange",
    function () {

        if (!document.hidden) {

            refreshHomeProfileUI();

        }

    }
);


window.addEventListener(
    "storage",
    function (event) {

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


        if (
            keysToWatch.includes(
                event.key
            )
        ) {

            refreshHomeProfileUI();

        }

    }
);


/* ===============================
   Initialize Home Page
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupHomeProtectedLinks();

        setupGuestCreatePostBox();

        setupPostMenuEvents();

        setupHomeSearch();

        refreshHomeProfileUI();

    }
);


console.log(
    "TravelVerse Home Loaded Successfully"
);
