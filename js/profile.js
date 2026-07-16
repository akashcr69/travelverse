/* TravelVerse Profile - Complete Replacement */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const PROFILE_KEY = "travelverse_profile";
    const USER_KEY = "travelverse_current_user";
    const UPDATED_KEY = "travelverse_profile_updated_at";

    const DEFAULT_COVER =
        "/assets/f558dcac-c4ee-474a-9354-9ff3921c662c.jpeg";

    const DEFAULT_AVATAR =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
                <rect width="100%" height="100%" fill="#eef2ff"/>
                <circle cx="300" cy="220" r="105" fill="#6C63FF"/>
                <circle cx="300" cy="520" r="205" fill="#8A2BE2"/>
            </svg>
        `);

    const DEFAULT_PROFILE = {
        name: "Akash Ahmed",
        username: "akash_ahmed",
        bio: "Travel Enthusiast | Rajshahi",
        location: "Rajshahi",
        joined: "July 2026",
        visited: 35,
        reviewed: 20,
        profileImage: DEFAULT_AVATAR,
        coverImage: ""
    };


    /* ===============================
       ELEMENTS
    ================================ */

    const $ = (id) =>
        document.getElementById(id);

    const els = {
        coverPreview: $("coverPreview"),
        editCoverBtn: $("editCoverBtn"),
        coverInput: $("coverImageInput"),

        profilePreview: $("profilePreview"),
        changePhotoBtn: $("changeProfilePhotoBtn"),
        profileInput: $("profileImageInput"),

        displayName: $("displayName"),
        displayBio: $("displayBio"),
        displayLocation: $("displayLocation"),
        displayJoined: $("displayJoined"),
        displayVisited: $("displayVisited"),
        displayReviewed: $("displayReviewed"),

        openEditBtn: $("openEditBtn"),
        editBox: $("editProfileBox"),
        form: $("profileForm"),

        name: $("profileName"),
        username: $("profileUsername"),
        location: $("profileLocation"),
        joined: $("profileJoined"),
        visited: $("profileVisited"),
        reviewed: $("profileReviewed"),
        bio: $("profileBio"),

        modal: $("imagePreviewModal"),
        modalClose: $("closeImagePreviewModal"),
        modalTitle: $("previewModalTitle"),
        imageType: $("previewImageType"),
        modalImage: $("previewModalImage"),

        miniCover: $("miniCoverPreview"),
        miniPhoto: $("miniProfilePreviewImage"),
        miniName: $("miniPreviewName"),
        miniBio: $("miniPreviewBio"),

        chooseAnother: $("chooseAnotherImageBtn"),
        cancelPreview: $("cancelImagePreviewBtn"),
        savePreview: $("saveImagePreviewBtn"),

        posts: $("myPosts"),
        reviews: $("myReviews"),
        photos: $("myPhotos"),
        saved: $("mySaved"),
        hotels: $("myHotels")
    };


    /* ===============================
       TEMPORARY IMAGE STATE
    ================================ */

    let pendingType = "";
    let pendingData = "";
    let pendingInput = null;


    /* ===============================
       GENERAL HELPERS
    ================================ */

    function safeParse(key, fallback) {
        try {
            const raw =
                localStorage.getItem(key);

            return raw
                ? JSON.parse(raw) ?? fallback
                : fallback;

        } catch (error) {
            return fallback;
        }
    }


    function escapeHTML(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    function normalizeUsername(value) {
        return String(value || "")
            .trim()
            .replace(/^@+/, "")
            .replace(/\s+/g, "_");
    }


    function readLoginUser() {
        const raw =
            localStorage.getItem("travelUser");

        if (!raw) {
            return {};
        }

        try {
            const parsed =
                JSON.parse(raw);

            return parsed &&
                typeof parsed === "object"
                ? parsed
                : {
                    email: raw
                };

        } catch (error) {
            return {
                email: raw
            };
        }
    }


    /* ===============================
       PROFILE AND USER DATA
    ================================ */

    function getProfile() {
        return {
            ...DEFAULT_PROFILE,
            ...safeParse(PROFILE_KEY, {})
        };
    }


    function getCurrentUser() {
        const profile =
            getProfile();

        const login =
            readLoginUser();

        const saved =
            safeParse(USER_KEY, {});

        const email =
            saved.email ||
            login.email ||
            "";

        const user = {
            ...saved,

            id:
                saved.id ||
                login.id ||
                email ||
                "travelverse-user",

            name:
                profile.name ||
                saved.name ||
                login.name ||
                DEFAULT_PROFILE.name,

            username:
                normalizeUsername(
                    profile.username ||
                    saved.username ||
                    login.username ||
                    (
                        email
                            ? email.split("@")[0]
                            : DEFAULT_PROFILE.username
                    )
                ),

            email: email,

            image:
                profile.profileImage ||
                saved.image ||
                saved.profileImage ||
                DEFAULT_AVATAR,

            profileImage:
                profile.profileImage ||
                saved.profileImage ||
                saved.image ||
                DEFAULT_AVATAR
        };

        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );

        return user;
    }


    function belongsToUser(item, user) {
        if (!item || !user) {
            return false;
        }

        const itemId =
            item.userId ||
            item.ownerId ||
            item.authorId ||
            "";

        const itemEmail =
            item.userEmail ||
            item.email ||
            item.authorEmail ||
            "";

        const itemUsername =
            normalizeUsername(
                item.username ||
                item.userUsername ||
                ""
            );

        if (
            itemId &&
            user.id &&
            String(itemId) === String(user.id)
        ) {
            return true;
        }

        if (
            itemEmail &&
            user.email &&
            String(itemEmail).toLowerCase() ===
            String(user.email).toLowerCase()
        ) {
            return true;
        }

        return Boolean(
            itemUsername &&
            user.username &&
            itemUsername ===
            normalizeUsername(user.username)
        );
    }


    /* ===============================
       UPDATE OWN POSTS AND REVIEWS
    ================================ */

    function updateOwnedContent(profile, user) {
        const posts =
            safeParse("travelPosts", []);

        if (Array.isArray(posts)) {
            const updatedPosts =
                posts.map((post) => {
                    if (
                        !belongsToUser(
                            post,
                            user
                        )
                    ) {
                        return post;
                    }

                    return {
                        ...post,
                        user: profile.name,
                        userName: profile.name,
                        username: profile.username,
                        profile: profile.profileImage,
                        userImage: profile.profileImage
                    };
                });

            localStorage.setItem(
                "travelPosts",
                JSON.stringify(updatedPosts)
            );
        }

        [
            "travelverse_reviews",
            "travelReviews"
        ].forEach((key) => {
            const reviews =
                safeParse(key, null);

            if (!Array.isArray(reviews)) {
                return;
            }

            const updatedReviews =
                reviews.map((review) => {
                    if (
                        !belongsToUser(
                            review,
                            user
                        )
                    ) {
                        return review;
                    }

                    return {
                        ...review,
                        user: profile.name,
                        userName: profile.name,
                        username: profile.username,
                        profile: profile.profileImage,
                        userImage: profile.profileImage
                    };
                });

            localStorage.setItem(
                key,
                JSON.stringify(updatedReviews)
            );
        });
    }


    /* ===============================
       SAVE PROFILE
    ================================ */

    function saveProfile(changes) {
        const profile = {
            ...getProfile(),
            ...changes
        };

        profile.username =
            normalizeUsername(
                profile.username
            );

        try {
            localStorage.setItem(
                PROFILE_KEY,
                JSON.stringify(profile)
            );

            const user =
                getCurrentUser();

            user.name =
                profile.name;

            user.username =
                profile.username;

            user.image =
                profile.profileImage;

            user.profileImage =
                profile.profileImage;

            localStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            localStorage.setItem(
                UPDATED_KEY,
                String(Date.now())
            );

            updateOwnedContent(
                profile,
                user
            );

            window.dispatchEvent(
                new CustomEvent(
                    "travelverseProfileUpdated",
                    {
                        detail: profile
                    }
                )
            );

            return profile;

        } catch (error) {
            console.error(error);

            alert(
                "Image save করা যায়নি। ছোট size-এর JPG বা WEBP image ব্যবহার করো।"
            );

            return null;
        }
    }


    /* ===============================
       LOAD PROFILE
    ================================ */

    function setCover(source) {
        if (!els.coverPreview) {
            return;
        }

        els.coverPreview.style.backgroundImage =
            `url("${source || DEFAULT_COVER}")`;

        els.coverPreview.style.backgroundSize =
            "cover";

        els.coverPreview.style.backgroundPosition =
            "center";

        els.coverPreview.style.backgroundRepeat =
            "no-repeat";
    }


    function loadProfile() {
        const profile =
            getProfile();

        if (els.displayName) {
            els.displayName.textContent =
                profile.name;
        }

        if (els.displayBio) {
            els.displayBio.textContent =
                profile.bio;
        }

        if (els.displayLocation) {
            els.displayLocation.textContent =
                profile.location;
        }

        if (els.displayJoined) {
            els.displayJoined.textContent =
                profile.joined;
        }

        if (els.displayVisited) {
            els.displayVisited.textContent =
                profile.visited ?? 0;
        }

        if (els.displayReviewed) {
            els.displayReviewed.textContent =
                profile.reviewed ?? 0;
        }

        if (els.profilePreview) {
            els.profilePreview.src =
                profile.profileImage ||
                DEFAULT_AVATAR;

            els.profilePreview.onerror =
                function () {
                    this.onerror = null;
                    this.src = DEFAULT_AVATAR;
                };
        }

        setCover(
            profile.coverImage ||
            DEFAULT_COVER
        );

        if (els.coverPreview) {
            els.coverPreview.dataset.cover =
                profile.coverImage || "";
        }

        if (els.name) {
            els.name.value =
                profile.name || "";
        }

        if (els.username) {
            els.username.value =
                profile.username || "";
        }

        if (els.location) {
            els.location.value =
                profile.location || "";
        }

        if (els.joined) {
            els.joined.value =
                profile.joined || "";
        }

        if (els.visited) {
            els.visited.value =
                profile.visited ?? "";
        }

        if (els.reviewed) {
            els.reviewed.value =
                profile.reviewed ?? "";
        }

        if (els.bio) {
            els.bio.value =
                profile.bio || "";
        }
    }


    /* ===============================
       IMAGE VALIDATION
    ================================ */

    function validateImage(file) {
        if (!file) {
            return false;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (
            !allowedTypes.includes(
                file.type
            )
        ) {
            alert(
                "শুধু JPG, PNG অথবা WEBP image নির্বাচন করো।"
            );

            return false;
        }

        if (
            file.size >
            10 * 1024 * 1024
        ) {
            alert(
                "Image 10 MB-এর কম হতে হবে।"
            );

            return false;
        }

        return true;
    }


    function loadImage(file) {
        return new Promise(
            (resolve, reject) => {
                const reader =
                    new FileReader();

                reader.onload =
                    (event) => {
                        const image =
                            new Image();

                        image.onload =
                            () => resolve(image);

                        image.onerror =
                            () => reject(
                                new Error(
                                    "Image load failed"
                                )
                            );

                        image.src =
                            event.target.result;
                    };

                reader.onerror =
                    () => reject(
                        new Error(
                            "File read failed"
                        )
                    );

                reader.readAsDataURL(file);
            }
        );
    }


    /* ===============================
       RESIZE AND CROP IMAGE
    ================================ */

    async function prepareImage(file, type) {
        const image =
            await loadImage(file);

        const width =
            type === "cover"
                ? 1600
                : 700;

        const height =
            type === "cover"
                ? 600
                : 700;

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.width =
            width;

        canvas.height =
            height;

        const context =
            canvas.getContext("2d");

        context.fillStyle =
            "#ffffff";

        context.fillRect(
            0,
            0,
            width,
            height
        );

        const scale =
            Math.max(
                width /
                image.naturalWidth,

                height /
                image.naturalHeight
            );

        const drawWidth =
            image.naturalWidth *
            scale;

        const drawHeight =
            image.naturalHeight *
            scale;

        const drawX =
            (
                width -
                drawWidth
            ) / 2;

        const drawY =
            (
                height -
                drawHeight
            ) / 2;

        context.drawImage(
            image,
            drawX,
            drawY,
            drawWidth,
            drawHeight
        );

        return canvas.toDataURL(
            "image/jpeg",
            0.82
        );
    }


    /* ===============================
       MINI LIVE PREVIEW
    ================================ */

    function updateMiniPreview(
        type,
        imageData
    ) {
        const profile =
            getProfile();

        const coverImage =
            type === "cover"
                ? imageData
                : (
                    profile.coverImage ||
                    DEFAULT_COVER
                );

        const profileImage =
            type === "profile"
                ? imageData
                : (
                    profile.profileImage ||
                    DEFAULT_AVATAR
                );

        if (els.miniCover) {
            els.miniCover.style.backgroundImage =
                `url("${coverImage}")`;

            els.miniCover.style.backgroundSize =
                "cover";

            els.miniCover.style.backgroundPosition =
                "center";
        }

        if (els.miniPhoto) {
            els.miniPhoto.src =
                profileImage;
        }

        if (els.miniName) {
            els.miniName.textContent =
                profile.name;
        }

        if (els.miniBio) {
            els.miniBio.textContent =
                profile.bio;
        }
    }


    /* ===============================
       OPEN PREVIEW MODAL
    ================================ */

    function openPreview(
        type,
        imageData,
        input
    ) {
        if (
            !els.modal ||
            !els.modalImage
        ) {
            alert(
                "Preview modal পাওয়া যায়নি। profile.html check করো।"
            );

            return;
        }

        pendingType =
            type;

        pendingData =
            imageData;

        pendingInput =
            input;

        if (els.imageType) {
            els.imageType.value =
                type;
        }

        if (els.modalTitle) {
            els.modalTitle.textContent =
                type === "cover"
                    ? "Preview Cover Photo"
                    : "Preview Profile Photo";
        }

        els.modalImage.src =
            imageData;

        els.modalImage.style.objectFit =
            type === "cover"
                ? "cover"
                : "contain";

        els.modalImage.style.aspectRatio =
            type === "cover"
                ? "8 / 3"
                : "1 / 1";

        updateMiniPreview(
            type,
            imageData
        );

        els.modal.classList.add(
            "active"
        );

        els.modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "preview-modal-open"
        );
    }


    /* ===============================
       CLOSE PREVIEW MODAL
    ================================ */

    function closePreview(
        clearInput = true
    ) {
        if (els.modal) {
            els.modal.classList.remove(
                "active"
            );

            els.modal.setAttribute(
                "aria-hidden",
                "true"
            );
        }

        document.body.classList.remove(
            "preview-modal-open"
        );

        if (
            clearInput &&
            pendingInput
        ) {
            pendingInput.value = "";
        }

        pendingType = "";
        pendingData = "";
        pendingInput = null;

        if (els.imageType) {
            els.imageType.value = "";
        }
    }


    /* ===============================
       HANDLE SELECTED IMAGE
    ================================ */

    async function handleImageSelection(
        event,
        type
    ) {
        const input =
            event.currentTarget;

        const file =
            input.files?.[0];

        if (!validateImage(file)) {
            input.value = "";
            return;
        }

        try {
            const imageData =
                await prepareImage(
                    file,
                    type
                );

            openPreview(
                type,
                imageData,
                input
            );

        } catch (error) {
            console.error(error);

            input.value = "";

            alert(
                "Image preview তৈরি করা যায়নি। অন্য image ব্যবহার করো।"
            );
        }
    }


    /* ===============================
       SAVE PENDING IMAGE
    ================================ */

    function savePendingImage() {
        if (
            !pendingType ||
            !pendingData
        ) {
            return;
        }

        const type =
            pendingType;

        const savedProfile =
            type === "cover"
                ? saveProfile({
                    coverImage:
                        pendingData
                })
                : saveProfile({
                    profileImage:
                        pendingData
                });

        if (!savedProfile) {
            return;
        }

        closePreview(false);

        loadProfile();
        renderAll();

        alert(
            type === "cover"
                ? "Cover photo saved successfully!"
                : "Profile photo saved successfully!"
        );
    }


    /* ===============================
       CHOOSE ANOTHER IMAGE
    ================================ */

    function chooseAnotherImage() {
        const input =
            pendingType === "cover"
                ? els.coverInput
                : els.profileInput;

        closePreview(false);

        if (!input) {
            return;
        }

        input.value = "";

        setTimeout(
            () => input.click(),
            100
        );
    }


    /* ===============================
       COVER BUTTON
    ================================ */

    if (
        els.editCoverBtn &&
        els.coverInput
    ) {
        els.editCoverBtn.onclick =
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                els.coverInput.value = "";
                els.coverInput.click();
            };
    }


    /* ===============================
       PROFILE PHOTO BUTTON
    ================================ */

    if (
        els.changePhotoBtn &&
        els.profileInput
    ) {
        els.changePhotoBtn.onclick =
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                els.profileInput.value = "";
                els.profileInput.click();
            };
    }


    /* ===============================
       IMAGE INPUT EVENTS
    ================================ */

    els.coverInput?.addEventListener(
        "change",
        (event) => {
            handleImageSelection(
                event,
                "cover"
            );
        }
    );

    els.profileInput?.addEventListener(
        "change",
        (event) => {
            handleImageSelection(
                event,
                "profile"
            );
        }
    );


    /* ===============================
       MODAL BUTTON EVENTS
    ================================ */

    if (els.modalClose) {
        els.modalClose.onclick =
            () => closePreview(true);
    }

    if (els.cancelPreview) {
        els.cancelPreview.onclick =
            () => closePreview(true);
    }

    if (els.savePreview) {
        els.savePreview.onclick =
            savePendingImage;
    }

    if (els.chooseAnother) {
        els.chooseAnother.onclick =
            chooseAnotherImage;
    }

    els.modal?.addEventListener(
        "click",
        (event) => {
            if (
                event.target ===
                els.modal
            ) {
                closePreview(true);
            }
        }
    );

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                els.modal?.classList.contains(
                    "active"
                )
            ) {
                closePreview(true);
            }
        }
    );


    /* ===============================
       OPEN EDIT PROFILE
    ================================ */

    if (
        els.openEditBtn &&
        els.editBox
    ) {
        els.openEditBtn.onclick =
            () => {
                els.editBox.classList.toggle(
                    "show"
                );

                if (
                    els.editBox.classList.contains(
                        "show"
                    )
                ) {
                    els.editBox.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            };
    }


    /* ===============================
       SAVE PROFILE FORM
    ================================ */

    els.form?.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            const oldProfile =
                getProfile();

            const name =
                els.name.value.trim();

            const username =
                normalizeUsername(
                    els.username.value
                );

            if (
                !name ||
                !username
            ) {
                alert(
                    "Name and username are required."
                );

                return;
            }

            const savedProfile =
                saveProfile({
                    name: name,

                    username:
                        username,

                    location:
                        els.location.value.trim(),

                    joined:
                        els.joined.value.trim(),

                    visited:
                        Number(
                            els.visited.value
                        ) || 0,

                    reviewed:
                        Number(
                            els.reviewed.value
                        ) || 0,

                    bio:
                        els.bio.value.trim(),

                    profileImage:
                        oldProfile.profileImage ||
                        DEFAULT_AVATAR,

                    coverImage:
                        oldProfile.coverImage ||
                        ""
                });

            if (!savedProfile) {
                return;
            }

            loadProfile();
            renderAll();

            els.editBox.classList.remove(
                "show"
            );

            alert(
                "Profile saved successfully!"
            );
        }
    );


    /* ===============================
       PROFILE TABS
    ================================ */

    document
        .querySelectorAll(".tab-btn")
        .forEach((button) => {
            button.addEventListener(
                "click",
                () => {
                    document
                        .querySelectorAll(
                            ".tab-btn"
                        )
                        .forEach((item) => {
                            item.classList.remove(
                                "active"
                            );
                        });

                    document
                        .querySelectorAll(
                            ".tab-content"
                        )
                        .forEach((content) => {
                            content.classList.remove(
                                "active"
                            );
                        });

                    button.classList.add(
                        "active"
                    );

                    document
                        .getElementById(
                            button.dataset.tab
                        )
                        ?.classList.add(
                            "active"
                        );
                }
            );
        });


    /* ===============================
       RENDER MY POSTS
    ================================ */

    function renderMyPosts() {
        if (!els.posts) {
            return;
        }

        const user =
            getCurrentUser();

        const posts =
            safeParse(
                "travelPosts",
                []
            );

        const ownPosts =
            Array.isArray(posts)
                ? posts.filter(
                    (post) =>
                        belongsToUser(
                            post,
                            user
                        )
                )
                : [];

        if (!ownPosts.length) {
            els.posts.innerHTML =
                `<div class="empty-message">No posts yet.</div>`;

            return;
        }

        els.posts.innerHTML =
            ownPosts
                .map((post) => `
                    <article class="my-post-card">

                        ${
                            post.image
                                ? `
                                    <img
                                        src="${escapeHTML(post.image)}"
                                        alt="Post image">
                                `
                                : ""
                        }

                        <div>

                            <h4>
                                ${escapeHTML(
                                    post.place ||
                                    post.location ||
                                    "Travel Place"
                                )}
                            </h4>

                            <p>
                                ${escapeHTML(
                                    post.caption ||
                                    ""
                                )}
                            </p>

                        </div>

                    </article>
                `)
                .join("");
    }


    /* ===============================
       GET ALL REVIEWS
    ================================ */

    function getAllReviews() {
        const modern =
            safeParse(
                "travelverse_reviews",
                []
            );

        const legacy =
            safeParse(
                "travelReviews",
                []
            );

        const reviewMap =
            new Map();

        [
            ...(
                Array.isArray(modern)
                    ? modern
                    : []
            ),

            ...(
                Array.isArray(legacy)
                    ? legacy
                    : []
            )
        ].forEach(
            (review, index) => {
                const key =
                    String(
                        review.id ||
                        review.createdAt ||
                        review.date ||
                        `${
                            review.title ||
                            review.place ||
                            "review"
                        }-${index}`
                    );

                if (!reviewMap.has(key)) {
                    reviewMap.set(
                        key,
                        review
                    );
                }
            }
        );

        return Array.from(
            reviewMap.values()
        );
    }


    /* ===============================
       RENDER MY REVIEWS
    ================================ */

    function renderMyReviews() {
        if (!els.reviews) {
            return;
        }

        const user =
            getCurrentUser();

        const ownReviews =
            getAllReviews().filter(
                (review) =>
                    belongsToUser(
                        review,
                        user
                    )
            );

        if (!ownReviews.length) {
            els.reviews.innerHTML =
                `<div class="empty-message">No reviews yet.</div>`;

            return;
        }

        els.reviews.innerHTML =
            ownReviews
                .map((review) => `
                    <article class="review-card">

                        <h4>
                            ${escapeHTML(
                                review.title ||
                                review.destination ||
                                review.place ||
                                "Travel Review"
                            )}
                        </h4>

                        <p>
                            ⭐ ${escapeHTML(
                                review.rating ||
                                0
                            )}/5
                        </p>

                        <p>
                            ${escapeHTML(
                                review.description ||
                                review.text ||
                                review.review ||
                                ""
                            )}
                        </p>

                    </article>
                `)
                .join("");
    }


    /* ===============================
       RENDER MY PHOTOS
    ================================ */

    function renderMyPhotos() {
        if (!els.photos) {
            return;
        }

        const user =
            getCurrentUser();

        const posts =
            safeParse(
                "travelPosts",
                []
            );

        const photos =
            Array.isArray(posts)
                ? posts.filter(
                    (post) =>
                        post.image &&
                        belongsToUser(
                            post,
                            user
                        )
                )
                : [];

        if (!photos.length) {
            els.photos.innerHTML =
                `<div class="empty-message">No photos yet.</div>`;

            return;
        }

        els.photos.innerHTML =
            photos
                .map((post) => `
                    <div class="photo-card">

                        <img
                            src="${escapeHTML(post.image)}"
                            alt="Travel photo">

                    </div>
                `)
                .join("");
    }


    /* ===============================
       RENDER SAVED PLACES
    ================================ */

    function renderSavedPlaces() {
        if (!els.saved) {
            return;
        }

        const places =
            safeParse(
                "savedPlaces",
                []
            );

        if (
            !Array.isArray(places) ||
            !places.length
        ) {
            els.saved.innerHTML =
                `<div class="empty-message">No saved places yet.</div>`;

            return;
        }

        els.saved.innerHTML =
            places
                .map((place) => `
                    <article class="saved-card">

                        <h4>
                            ${escapeHTML(
                                place.name ||
                                place.place ||
                                "Saved Place"
                            )}
                        </h4>

                        <p>
                            ${escapeHTML(
                                place.location ||
                                "Travel Location"
                            )}
                        </p>

                        <p>
                            ⭐ ${escapeHTML(
                                place.rating ||
                                "Not rated"
                            )}
                        </p>

                    </article>
                `)
                .join("");
    }


    /* ===============================
       RENDER SAVED HOTELS
    ================================ */

    function renderSavedHotels() {
        if (!els.hotels) {
            return;
        }

        const hotels =
            safeParse(
                "savedHotels",
                []
            );

        if (
            !Array.isArray(hotels) ||
            !hotels.length
        ) {
            els.hotels.innerHTML =
                `<div class="empty-message">No saved hotels yet.</div>`;

            return;
        }

        els.hotels.innerHTML =
            hotels
                .map((hotel) => `
                    <article class="saved-card">

                        <h4>
                            ${escapeHTML(
                                hotel.name ||
                                "Saved Hotel"
                            )}
                        </h4>

                        <p>
                            ${escapeHTML(
                                hotel.location ||
                                "Hotel Location"
                            )}
                        </p>

                        <p>
                            ⭐ ${escapeHTML(
                                hotel.rating ||
                                "Not rated"
                            )}
                        </p>

                        <p>
                            ${escapeHTML(
                                hotel.price ||
                                ""
                            )}
                        </p>

                    </article>
                `)
                .join("");
    }


    /* ===============================
       RENDER ALL
    ================================ */

    function renderAll() {
        renderMyPosts();
        renderMyReviews();
        renderMyPhotos();
        renderSavedPlaces();
        renderSavedHotels();
    }


    /* ===============================
       LOGOUT
    ================================ */

    window.logout = function () {
        localStorage.removeItem(
            "travelUser"
        );

        localStorage.removeItem(
            USER_KEY
        );

        window.location.href =
            "login.html";
    };


    /* ===============================
       PAGE REFRESH EVENTS
    ================================ */

    window.addEventListener(
        "pageshow",
        () => {
            loadProfile();
            renderAll();
        }
    );


    window.addEventListener(
        "storage",
        (event) => {
            const watchedKeys = [
                PROFILE_KEY,
                USER_KEY,
                UPDATED_KEY,
                "travelPosts",
                "travelverse_reviews",
                "travelReviews",
                "savedPlaces",
                "savedHotels"
            ];

            if (
                watchedKeys.includes(
                    event.key
                )
            ) {
                loadProfile();
                renderAll();
            }
        }
    );


    /* ===============================
       INITIAL LOAD
    ================================ */

    loadProfile();
    renderAll();

    console.log(
        "TravelVerse Profile Loaded Successfully"
    );
});