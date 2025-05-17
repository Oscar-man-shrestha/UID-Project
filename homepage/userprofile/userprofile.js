// Initialize or get user data from localStorage
const user = JSON.parse(localStorage.getItem("user")) || {
  username: "Demo",
  password: "admin123",
  role: "AdminUser",
  age: 25,
  upiID: "demo@ybl",
  profileImage: "https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg",
  joinDate: "Apr 2025",
  ratingsCount: 0,
  watchlistCount: 1,
  listsCount: 0
};

// Function to update UI based on user role
function updateUIForUserRole() {
  // Common elements that might exist
  const userStatus = document.getElementById('userStatus');
  const starRating = document.getElementById('starRating');
  const joined = document.getElementById('joined');
  const wh = document.getElementById('wh');
  const watchlistStatus = document.getElementById('watchlistStatus');
  const watchlist = document.getElementById('watchlist');
  const ratings = document.getElementById('ratings');
  const lists = document.getElementById('lists');
  const yourRatingLink = document.querySelector("li .yourrating");
  
  const adminwh = document.getElementById('adminwh');
  const adminwhlink = document.getElementById('adminwhlink');
  const addlink = document.getElementById('addlink');
  const logoWatchlist = document.getElementById('logoWatchlist');
  const linkwatchhour = document.getElementById('linkwatchhour');
  const count = document.getElementById('count');
  const count1 = document.getElementById('count1');
  const count2 = document.getElementById('count2');
  const checkins = document.getElementById('checkins');
  const checkin = document.getElementById('checkin');

  switch (user.role) {
    case "PremiumUser":
      if (userStatus) userStatus.innerText = "Premium User";
      if (starRating) {
        starRating.innerHTML = "";
        const star = document.createElement("i");
        star.classList.add("fas", "fa-star");
        starRating.appendChild(star);
        starRating.classList.add("glowing");
      }
      break;
      
    case "FreemiumUser":
      if (userStatus) userStatus.innerText = "Freemium User";
      if (starRating) starRating.innerHTML = "";
      break;
      
    case "Admin":
    case "AdminUser":
      // Admin-specific changes
      if (userStatus) userStatus.innerText = "Admin";
      if (joined) joined.innerText = "";
      
      // Update all watchlist text to "Watch Hours"
      const watchhourElements = document.querySelectorAll('[id*="watch"], [id*="Watch"], .watch-nav a');
      watchhourElements.forEach(element => {
        if (element.textContent.toLowerCase().includes('watchlist')) {
          element.textContent = element.textContent.replace('Watchlist', 'Watch Hour');
        }
      });
      
      // Update navigation links for admin
      const watchlistLinks = document.querySelectorAll('a[href*="watchlist"]');
      watchlistLinks.forEach(link => {
        link.href = link.href.replace('watchlist', 'watch hours');
        if (link.textContent.toLowerCase().includes('watchlist')) {
          link.textContent = 'Watch Hour';
        }
      });
      
      if (watchlist) {
        watchlist.innerText = "10000+";
      }
      
      if (ratings) ratings.innerText = "10000+";
      if (lists) lists.innerText = "10000+";
      
      // Hide ratings section if exists
      const ratingsSection = document.querySelector('.section:first-child');
      if (ratingsSection) ratingsSection.style.display = "none";
      
      // Remove counts for admin
      if (count) count.remove();
      if (count1) count1.remove();
      if (count2) count2.remove();
      if (checkin) checkin.remove();

      if (wh) wh.innerText = "Watch Hour";
      if (watchlistStatus) watchlistStatus.remove();
      
      // Update star rating to show crown icon for admin
      if (starRating) {
        starRating.innerHTML = "";
        const crown = document.createElement("i");
        crown.classList.add("fas", "fa-crown");
        starRating.appendChild(crown);
        starRating.classList.add("glowing");
      }
      
      // Update the "Your rating" link in menu
      const yourRatingLinks = document.querySelectorAll('.yourrating');
      yourRatingLinks.forEach(link => {
        link.style.display = "none";
      });
      
      // Add admin-specific link
      if (addlink) {
        addlink.innerHTML = '<a href="../watch hours/index.html" style="color: black;">See Watch Hours</a>';
      }
      
      // Update admin watchlist link in header
      if (adminwhlink) {
        adminwhlink.innerHTML = `
          <div class="edit-btn">
            <a href="../watch hours/index.html">Watch Hour</a>
          </div>
        `;
      }
      
      // Update menu watchlist link
      const menuWatchlistLink = document.querySelector('.menu a[href*="watchlist"]');
      if (menuWatchlistLink) {
        menuWatchlistLink.href = "../watch hours/index.html";
        menuWatchlistLink.textContent = "Watch Hour";
      }
      break;
  }
  
  // Remove rating element for admin
  if (user.role === "Admin" || user.role === "AdminUser") {
    const ratingElement = document.getElementById('rating');
    if (ratingElement) ratingElement.remove();
  }
}

// Check theme preference on load
function checkThemePreference() {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
    updateDarkModeElements(true);
  }
}

 

// Check theme preference on load
function checkThemePreference() {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
    updateDarkModeElements(true);
  }
}

// Initialize friend check-ins
function initializeFriendCheckIns() {
  const friends = [
    { 
      name: "Alex", 
      avatar: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
      status: "Online",
      lastCheckin: "2 hours ago"
    },
    { 
      name: "Jamie", 
      avatar: "https://i.pinimg.com/736x/94/3e/46/943e468e2193f42206c4640dfec13ea4.jpg",
      status: "Offline",
      lastCheckin: "Yesterday"
    },
    { 
      name: "Taylor", 
      avatar: "https://i.pinimg.com/736x/7c/8e/0e/7c8e0ec99c6bc344276d5d118d3da300.jpg",
      status: "Online",
      lastCheckin: "Just now"
    }
  ];

  const container = document.querySelector('.checkin-friends');
  container.innerHTML = '';
  
  friends.forEach(friend => {
    const friendElement = document.createElement('div');
    friendElement.className = 'checkin-friend';
    friendElement.innerHTML = `
      <img src="${friend.avatar}" alt="${friend.name}">
      <span>${friend.name}</span>
    `;
    friendElement.addEventListener('click', () => showFriendPopup(friend));
    container.appendChild(friendElement);
  });

  document.querySelector('.close-friend-popup')?.addEventListener('click', () => {
    document.querySelector('.friend-popup-container').style.display = 'none';
  });
}

function showFriendPopup(friend) {
  const popup = document.querySelector('.friend-popup-container');
  if (!popup) return;
  
  popup.querySelector('.friend-popup-avatar').src = friend.avatar;
  popup.querySelector('.friend-popup-name').textContent = friend.name;
  popup.querySelector('.friend-popup-status span').textContent = friend.status;
  popup.querySelector('.friend-popup-last-checkin span').textContent = friend.lastCheckin;
  
  popup.style.display = 'flex';
  
  popup.addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  checkThemePreference();
  initializeFriendCheckIns();

  // Set profile pictures
  const defaultProfilePic = "https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg";
  const mainpic = document.getElementById("mainpic");
  const navProfilePic = document.querySelector(".profile img");
  
  if (mainpic) mainpic.src = user.profileImage || defaultProfilePic;
  if (navProfilePic) navProfilePic.src = user.profileImage || defaultProfilePic;

  // Set username
  const userName = document.getElementById("userName");
  const userName1 = document.getElementById("userName1");
  if (userName) userName.innerHTML = `${user.username} <br><span>${user.role}</span>`;
  if (userName1) userName1.innerText = user.username;

  // Update UI based on user role
  updateUIForUserRole();

  // Initialize privacy settings
  if (localStorage.getItem('ratingsVisibility') === 'private') {
    document.getElementById('ratingsPrivate').checked = true;
    const ratingsStatus = document.getElementById("ratingsStatus");
    if (ratingsStatus) ratingsStatus.innerHTML = `Your ratings are private. <a href="#" class="edit" onclick="openModal('ratingsModal')">Edit</a>`;
  }

  if (localStorage.getItem('watchlistVisibility') === 'private') {
    document.getElementById('watchlistPrivate').checked = true;
    const watchlistStatus = document.getElementById("watchlistStatus");
    if (watchlistStatus) watchlistStatus.innerHTML = `Your Watchlist is private. <a href="#" class="edit" onclick="openModal('watchlistModal')">Edit</a>`;
  }
});


function menuToggle() {
  document.querySelector(".menu").classList.toggle("active");
}

function toggleShareDropdown() {
  document.getElementById("shareDropdown").classList.toggle("show");
}

function toggleSettingsDropdown() {
  document.getElementById("settingsDropdown").classList.toggle("show");
}

// Share functionality
document.getElementById("copyLinkBtn")?.addEventListener("click", function() {
  navigator.clipboard.writeText(window.location.href)
    .then(() => showToast("Link copied!"));
});

function shareToTwitter() {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, "_blank");
}

function shareToFacebook() {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
  if (!event.target.matches(".fa-share-alt") && !event.target.matches(".fa-cog")) {
    const shareDropdown = document.getElementById("shareDropdown");
    const settingsDropdown = document.getElementById("settingsDropdown");
    if (shareDropdown) shareDropdown.classList.remove("show");
    if (settingsDropdown) settingsDropdown.classList.remove("show");
  }
};

// Modal functions
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "flex";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

function saveRatingsVisibility() {
  const isPublic = document.getElementById("ratingsPublic")?.checked;
  localStorage.setItem('ratingsVisibility', isPublic ? 'public' : 'private');
  const statusText = isPublic ? "public" : "private";
  const ratingsStatus = document.getElementById("ratingsStatus");
  if (ratingsStatus) {
    ratingsStatus.innerHTML = `Your ratings are ${statusText}. <a href="#" class="edit" onclick="openModal('ratingsModal')">Edit</a>`;
  }
  closeModal("ratingsModal");
  showToast(`Ratings visibility set to ${statusText}`);
}

function saveWatchlistVisibility() {
  const isPublic = document.getElementById("watchlistPublic")?.checked;
  localStorage.setItem('watchlistVisibility', isPublic ? 'public' : 'private');
  const statusText = isPublic ? "public" : "private";
  const watchlistStatus = document.getElementById("watchlistStatus");
  if (watchlistStatus) {
    watchlistStatus.innerHTML = `Your Watchlist is ${statusText}. <a href="#" class="edit" onclick="openModal('watchlistModal')">Edit</a>`;
  }
  closeModal("watchlistModal");
  showToast(`Watchlist visibility set to ${statusText}`);
}

function toggleSideCard() {
  const sideCard = document.getElementById("sideCard");
  sideCard.classList.toggle("active");
  
  // Clear content when opening
  if (sideCard.classList.contains("active")) {
    document.getElementById("sideCardContent").innerHTML = `
      <div class="welcome-message">
        <i class="fas fa-cog"></i>
        <h4>Settings & Options</h4>
        <p>Select an option to configure your preferences</p>
      </div>
    `;
  }
}

function updateDarkModeElements(isDark) {
  const sections = document.querySelectorAll('.section');
  const infoBoxes = document.querySelectorAll('.info-box');
  
  sections.forEach(section => {
    if (isDark) {
      section.style.background = 'rgba(30, 30, 30, 0.7)';
      section.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    } else {
      section.style.background = 'rgba(245, 240, 240, 0.35)';
      section.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }
  });
  
  infoBoxes.forEach(box => {
    box.style.backgroundColor = isDark ? '#2d2d2d' : '#6e5c5c';
    box.style.color = isDark ? '#ffffff' : '#000000';
  });
}

// Theme options content
function showThemeOption() {
  const content = `
    <h4>Theme Settings</h4>
    <div class="theme-options">
      <label class="theme-option">
        <input type="radio" name="theme" value="light" ${!document.body.classList.contains('dark-mode') ? 'checked' : ''} onchange="setTheme('light')">
        <span>Light Mode</span>
      </label>
      <label class="theme-option">
        <input type="radio" name="theme" value="dark" ${document.body.classList.contains('dark-mode') ? 'checked' : ''} onchange="setTheme('dark')">
        <span>Dark Mode</span>
      </label>
      <label class="theme-option">
        <input type="radio" name="theme" value="system" onchange="setTheme('system')">
        <span>System Default</span>
      </label>
    </div>
    <p>Choose how CineSphere looks to you.</p>
  `;
  document.getElementById('sideCardContent').innerHTML = content;
}

// Privacy settings content
function showPrivacySettings() {
  const ratingsVisibility = localStorage.getItem('ratingsVisibility') || 'public';
  const watchlistVisibility = localStorage.getItem('watchlistVisibility') || 'public';
  
  const content = `
    <h4>Privacy Settings</h4>
    <div class="privacy-option">
      <label>
        <input type="checkbox" id="privateRatings" ${ratingsVisibility === 'private' ? 'checked' : ''} onchange="togglePrivacy('ratings', this.checked)">
        Make my ratings private
      </label>
    </div>
    <div class="privacy-option">
      <label>
        <input type="checkbox" id="privateWatchlist" ${watchlistVisibility === 'private' ? 'checked' : ''} onchange="togglePrivacy('watchlist', this.checked)">
        Make my watchlist private
      </label>
    </div>
    <p>Private content is only visible to you.</p>
  `;
  document.getElementById('sideCardContent').innerHTML = content;
}

// Account info content
function showAccountInfo() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "Demo",
    email: "demo@example.com",
    joinDate: "Apr 2025",
    role: "Member"
  };
  
  const content = `
    <h4>Account Information</h4>
    <div class="account-info-item">
      <strong>Username:</strong>
      <span>${user.username}</span>
    </div>
    <div class="account-info-item">
      <strong>Email:</strong>
      <span>${user.email}</span>
    </div>
    <div class="account-info-item">
      <strong>Member since:</strong>
      <span>Apr 2025</span>
    </div>
    <div class="account-info-item">
      <strong>Account type:</strong>
      <span>${user.role}</span>
    </div>
    <button onclick="showUpgradeOptions()" class="upgrade-btn">
      Upgrade Account
    </button>
  `;
  document.getElementById('sideCardContent').innerHTML = content;
}

// Helper functions
function setTheme(theme) {
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
  }
}

function togglePrivacy(type, isPrivate) {
  localStorage.setItem(`${type}Visibility`, isPrivate ? 'private' : 'public');
  updatePrivacyStatus();
  showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} set to ${isPrivate ? 'private' : 'public'}`);
}

function updatePrivacyStatus() {
  const ratingsStatus = document.getElementById("ratingsStatus");
  const watchlistStatus = document.getElementById("watchlistStatus");
  
  if (ratingsStatus) {
    const isPrivate = localStorage.getItem('ratingsVisibility') === 'private';
    ratingsStatus.innerHTML = `Your ratings are ${isPrivate ? 'private' : 'public'}. <a href="#" class="edit" onclick="showPrivacySettings(); toggleSideCard()">Edit</a>`;
  }
  
  if (watchlistStatus) {
    const isPrivate = localStorage.getItem('watchlistVisibility') === 'private';
    watchlistStatus.innerHTML = `Your watchlist is ${isPrivate ? 'private' : 'public'}. <a href="#" class="edit" onclick="showPrivacySettings(); toggleSideCard()">Edit</a>`;
  }
}

function showUpgradeOptions() {
  const content = `
    <h4>Upgrade Your Account</h4>
    <div class="upgrade-option premium">
      <h5>Premium Membership</h5>
      <ul>
        <li>Ad-free experience</li>
        <li>Early access to new features</li>
        <li>Exclusive content</li>
        <li>Priority support</li>
      </ul>
      <button id="premiumBtn" class="select-btn">Select Premium (₹645/month)</button>
    </div>
  `;
  document.getElementById('sideCardContent').innerHTML = content;

  document.getElementById('premiumBtn').onclick = function () {
    window.location.href = 'http://127.0.0.1:5501/UID-Project/homepage/index.html#contact';
  };
}