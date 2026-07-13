// TravelVerse Module 8
// Notifications with localStorage
// File: notifications.js


// ===============================
// Default Notifications
// ===============================

const defaultNotifications = [
    {
        id: 1,
        type: "like",
        title: "New Like",
        message: "Someone liked your travel post.",
        icon: "fa-heart",
        time: "Just now",
        isRead: false
    },
    {
        id: 2,
        type: "comment",
        title: "New Comment",
        message: "Someone commented on your Cox's Bazar post.",
        icon: "fa-comment",
        time: "5 minutes ago",
        isRead: false
    },
    {
        id: 3,
        type: "review",
        title: "New Review Activity",
        message: "Your hotel review received attention.",
        icon: "fa-star",
        time: "1 hour ago",
        isRead: true
    }
];


// ===============================
// Get Notifications
// ===============================

function getNotifications() {

    let notifications = JSON.parse(localStorage.getItem("travelverse_notifications"));

    if (!notifications) {
        notifications = defaultNotifications;
        localStorage.setItem("travelverse_notifications", JSON.stringify(notifications));
    }

    return notifications;

}


// ===============================
// Save Notifications
// ===============================

function saveNotifications(notifications) {
    localStorage.setItem("travelverse_notifications", JSON.stringify(notifications));
}


// ===============================
// Render Notifications
// ===============================

function renderNotifications() {

    const notificationList = document.getElementById("notificationList");
    const totalNotifications = document.getElementById("totalNotifications");
    const unreadNotifications = document.getElementById("unreadNotifications");
    const readNotifications = document.getElementById("readNotifications");

    if (!notificationList) return;

    const notifications = getNotifications();

    const unreadCount = notifications.filter(item => !item.isRead).length;
    const readCount = notifications.filter(item => item.isRead).length;

    if (totalNotifications) totalNotifications.innerText = notifications.length;
    if (unreadNotifications) unreadNotifications.innerText = unreadCount;
    if (readNotifications) readNotifications.innerText = readCount;

    if (notifications.length === 0) {
        notificationList.innerHTML = `
            <div class="empty-message">
                No notifications yet.
            </div>
        `;
        return;
    }

    notificationList.innerHTML = "";

    notifications.forEach(function (item) {

        const notificationItem = document.createElement("div");

        notificationItem.className = item.isRead
            ? "notification-item"
            : "notification-item unread";

        notificationItem.innerHTML = `
            <div class="notification-icon">
                <i class="fa-solid ${item.icon}"></i>
            </div>

            <div class="notification-content">
                <h4>${item.title}</h4>
                <p>${item.message}</p>
                <span class="notification-time">${item.time}</span>
            </div>

            ${
                item.isRead
                ? ""
                : `<button class="read-btn" onclick="markAsRead(${item.id})">Mark Read</button>`
            }
        `;

        notificationList.appendChild(notificationItem);

    });

}


// ===============================
// Mark Single Notification Read
// ===============================

function markAsRead(id) {

    let notifications = getNotifications();

    notifications = notifications.map(function (item) {

        if (Number(item.id) === Number(id)) {
            item.isRead = true;
        }

        return item;

    });

    saveNotifications(notifications);

    renderNotifications();

}


// ===============================
// Mark All as Read
// ===============================

function markAllAsRead() {

    let notifications = getNotifications();

    notifications = notifications.map(function (item) {
        item.isRead = true;
        return item;
    });

    saveNotifications(notifications);

    renderNotifications();

}


// ===============================
// Clear All Notifications
// ===============================

function clearAllNotifications() {

    const confirmClear = confirm("Are you sure you want to clear all notifications?");

    if (!confirmClear) return;

    saveNotifications([]);

    renderNotifications();

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

    renderNotifications();

    const markAllReadBtn = document.getElementById("markAllReadBtn");
    const clearAllBtn = document.getElementById("clearAllBtn");

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener("click", markAllAsRead);
    }

    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", clearAllNotifications);
    }

});