// Load user data from localStorage or create default user
const user = JSON.parse(localStorage.getItem('user')) || {
    username: 'Demo',
    password: 'admin123',
    email: 'demo@example.com',
    phone: '+1 (123) 456-7890',
    dateOfBirth: '',
    role: 'Admin',
    age: 25,
    upiID: 'demo@ybl',
    bio: '',
    language: 'English',
    profileImage: 'https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg',
    gender: '',
    movieGenre: '',
    moviePassion: 3,
};



document.addEventListener("DOMContentLoaded", () => {
    // Update username in the profile dropdown
    const usernameElement = document.getElementById('username');
    if (usernameElement) {
        usernameElement.innerHTML = `${user.username} <br><span>${user.role}</span>`;
    }
    
    // Set age-appropriate default genres in search
    setDefaultGenresBasedOnAge();
    
    // Initialize search functionality
    initSearch();
});

const watchlist = document.getElementById("watchlist");
const movieSelect = document.getElementById("movieSelect");

const moviesByGenre = {
    Disney: [
        { img: '', title:'Frozen', rating:8.5, lang:'EN', isPremium:false, link:'./MD/frozen.html', genre: 'Animation, Musical', year: 2013 },
        { img: './posters/Disney2.png', title:'Toy Story', rating:9.3, lang:'EN', isPremium:true, link:'./MD/toyStory.html', genre: 'Animation, Adventure', year: 1995 },
        { img: './posters/Disney3.png', title:'The Lion King', rating:8.1, lang:'EN', isPremium:true, link:'./MD/TlKing.html', genre: 'Animation, Drama', year: 1994 },
        { img: './posters/Disney4.png', title:'Tangled', rating:9.7, lang:'EN', isPremium:true, link:'./MD/tangled.html', genre: 'Animation, Adventure', year: 2010 },
        { img: './posters/Disney5.png', title:'Wreck It Ralph', rating:8.4, lang:'EN', isPremium:false, link:'./MD/wItRal.html', genre: 'Animation, Comedy', year: 2012 }     
    ],
    Anime: [
        { img: './posters/Anime1.png', title:'Tokyo Ghoul', rating:8.8, lang:'JP', isPremium:true, link:'./MD/tGhoul.html', genre: 'Animation, Horror', year: 2014 },
        { img: './posters/Anime2.png', title:'Mobile Suit Gundame', rating:7.75, lang:'IND', isPremium:false, link:'./MD/MSG.html', genre: 'Animation, Sci-Fi', year: 1979 },
        { img: './posters/Anime3.png', title:'Horimiya', rating:8.0, lang:'JP', isPremium:false, link:'./MD/hori.html', genre: 'Animation, Romance', year: 2021 },
        { img: './posters/Anime4.png', title:'Neon Genesis Evangelion', rating:9.6, lang:'JP', isPremium:true, link:'./MD/NeonGE.html', genre: 'Animation, Sci-Fi', year: 1995 },
        { img: './posters/Anime5.png', title:'Berserk', rating:9.9, lang:'JP', isPremium:true, link:'./MD/berserk.html', genre: 'Animation, Dark Fantasy', year: 1997 },
    ],
    Action: [
        { img: './posters/Action1.png', title:'The Batman', rating:9.5, lang:'EN', isPremium:true, link:'./MD/batman.html', genre: 'Action, Crime', year: 2022 },
        { img: './posters/Action2.png', title:'John Wick 2', rating:8.3, lang:'EN', isPremium:false, link:'./MD/JW2.html', genre: 'Action, Thriller', year: 2017 },
        { img: './posters/poster1.png', title:'Avengers Endgame', rating:9.5, lang:'EN', isPremium:true, link:'./MD/AEndG.html', genre: 'Action, Adventure', year: 2019 },
        { img: './posters/Action4.png', title:'X-Men', rating:8.7, lang:'EN', isPremium:true, link:'./MD/XMen.html', genre: 'Action, Sci-Fi', year: 2000 },
        { img: './posters/Action5.png', title:'Spider-Man', rating:7.3, lang:'EN', isPremium:false, link:'./MD/SPDM.html', genre: 'Action, Adventure', year: 2002 }
    ],
    Horror: [
        { img: './posters/Horror1.png', title:'Annabelle', rating:7.3, lang:'EN', isPremium:true, link:'./MD/Anna.html', genre: 'Horror, Mystery', year: 2014 },
        { img: './posters/Horror2.png', title:'Rings', rating:8.6, lang:'EN', isPremium:false, link:'./MD/rings.html', genre: 'Horror, Thriller', year: 2017 },
        { img: './posters/poster8.png', title:'The Conjuring', rating:9.4, lang:'EN', isPremium:true, link:'./MD/TCjuring.html', genre: 'Horror, Mystery', year: 2013 },
        { img: './posters/Horror4.png', title:'Haunting of The Bly Manor', rating:9.9, lang:'EN', isPremium:true, link:'./MD/blyManor.html', genre: 'Horror, Drama', year: 2020 },
        { img: './posters/Horror5.png', title:'The Grudge', rating:9.1, lang:'JP', isPremium:false, link:'./MD/TGrudge.html', genre: 'Horror, Supernatural', year: 2004 }
    ],
    Sitcom: [
        { img: './posters/Sitcom1.png', title:'Friends', rating:9.6, lang:'EN', isPremium:true, link:'./MD/friends.html', genre: 'Comedy, Romance', year: 1994 },
        { img: './posters/Sitcom2.png', title:'The Big Bang Theory', rating:8.7, lang:'EN', isPremium:false, link:'./MD/bbt.html', genre: 'Comedy, Romance', year: 2007 },
        { img: './posters/Sitcom3.png', title:'The Modern Family', rating:9.7, lang:'EN', isPremium:true, link:'./MD/TMF.html', genre: 'Comedy, Family', year: 2009 },
        { img: './posters/Sitcom4.png', title:'How I Met Your Mother', rating:8.8, lang:'EN', isPremium:false, link:'./MD/HIMYM.html', genre: 'Comedy, Romance', year: 2005 },
        { img: './posters/Sitcom5.png', title:'Brooklyn 99', rating:9.1, lang:'EN', isPremium:true, link:'./MD/B99.html', genre: 'Comedy, Crime', year: 2013 }
    ],
    Documentary: [
        { img: './posters/Documentary1.png', title:'Cunk On Earth', rating:7.5, lang:'EN', isPremium:true, link:'./MD/COEar.html', genre: 'Documentary, Comedy', year: 2022 },
        { img: './posters/Documentary2.png', title:'Facing Ali', rating:8.2, lang:'EN', isPremium:true, link:'./MD/FAli.html', genre: 'Documentary, Sports', year: 2009 },
        { img: './posters/Documentary3.png', title:'How To Rob A Bank', rating:9.2, lang:'EN', isPremium:false, link:'./MD/HTRAB.html', genre: 'Documentary, Crime', year: 2024 },
        { img: './posters/Documentary4.png', title:'House Of Secrets', rating:8.8, lang:'EN', isPremium:true, link:'./MD/houseOS.html', genre: 'Documentary, Crime', year: 2021 },
        { img: './posters/Documentary5.png', title:'Curry & Cyanide', rating:7.4, lang:'EN', isPremium:false, link:'./MD/cAndCya.html', genre: 'Documentary, Crime', year: 2023 }
    ]
};

const ageMapping = {
    kid: ['Disney', 'Anime'],              // Age < 13
    teen: ['Anime', 'Action'],             // Age 13-19
    adult: ['Action', 'Horror'],           // Age 20-59
    elderly: ['Sitcom', 'Documentary']     // Age 60+
};

// Combine all movies from all genres into one array
const allMovies = [];
for (const genre in moviesByGenre) {
    allMovies.push(...moviesByGenre[genre]);
}

function getAgeCategory(age) {
    if (age < 13) return 'kid';
    if (age >= 13 && age <= 19) return 'teen';
    if (age >= 20 && age <= 59) return 'adult';
    return 'elderly';
}

function setDefaultGenresBasedOnAge() {
    const searchGenreSelect = document.getElementById('searchGenre');
    if (!searchGenreSelect) return;
    
    // Determine age group
    const ageGroup = getAgeCategory(user.age);
    const defaultGenres = ageMapping[ageGroup] || ['Action', 'Horror'];
    
    // Set default genres in search
    searchGenreSelect.value = defaultGenres[0];
    
    // Also suggest these genres in UI
    const suggestionElement = document.getElementById('ageSuggestion');
    if (suggestionElement) {
        suggestionElement.textContent = `Based on your age, we recommend: ${defaultGenres.join(' or ')}`;
    }
}


function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchGenre = document.getElementById('searchGenre');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchGenre && searchResults) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const genre = searchGenre.value;
            
            let filteredMovies = allMovies;
            
            // Filter by genre if not "All"
            if (genre !== 'All') {
                filteredMovies = moviesByGenre[genre] || [];
            }
            
            // Filter by search term
            if (searchTerm) {
                filteredMovies = filteredMovies.filter(movie => 
                    movie.title.toLowerCase().includes(searchTerm) ||
                    movie.genre.toLowerCase().includes(searchTerm)
                );
            }
            
            // Display results
            displaySearchResults(filteredMovies);
        });
        
        searchGenre.addEventListener('change', () => {
            searchInput.dispatchEvent(new Event('input'));
        });
    }
}

function displaySearchResults(movies) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (movies.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No movies found</div>';
        return;
    }
    
    movies.slice(0, 5).forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'search-result-item';
        movieElement.innerHTML = `
            <img src="${movie.img}" alt="${movie.title}">
            <div class="search-result-details">
                <h4>${movie.title}</h4>
                <p>${movie.genre} • ${movie.year} • Rating: ${movie.rating}</p>
            </div>
        `;
        movieElement.addEventListener('click', () => {
            renderMovie(movie);
            searchResults.innerHTML = '';
            document.getElementById('searchInput').value = '';
        });
        searchResults.appendChild(movieElement);
    });
}

// Update the initSearch function to enforce age restrictions
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchGenre = document.getElementById('searchGenre');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchGenre && searchResults) {
        // Set up genre restrictions based on age
        const ageGroup = getAgeCategory(user.age);
        const allowedGenres = ageMapping[ageGroup] || [];
        
        // Disable inappropriate genres in dropdown
        Array.from(searchGenre.options).forEach(option => {
            if (option.value !== 'All' && !allowedGenres.includes(option.value)) {
                option.disabled = true;
                option.style.display = 'none'; // Hide completely
            }
        });
        
        // Set default genre to first allowed genre
        if (allowedGenres.length > 0) {
            searchGenre.value = allowedGenres[0];
        }
        
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const genre = searchGenre.value;
            
            let filteredMovies = allMovies;
            
            // Filter by genre if not "All"
            if (genre !== 'All') {
                filteredMovies = moviesByGenre[genre] || [];
            }
            
            // Additional filter for age-appropriate content
            filteredMovies = filteredMovies.filter(movie => 
                allowedGenres.some(g => movie.genre.includes(g))
            );
            
            // Filter by search term
            if (searchTerm) {
                filteredMovies = filteredMovies.filter(movie => 
                    movie.title.toLowerCase().includes(searchTerm) ||
                    movie.genre.toLowerCase().includes(searchTerm)
                );
            }
            
            // Display results
            displaySearchResults(filteredMovies);
        });
        
        searchGenre.addEventListener('change', () => {
            searchInput.dispatchEvent(new Event('input'));
        });
    }
}

// Update the addRandomMovie function to respect age restrictions
function addRandomMovie() {
    const ageGroup = getAgeCategory(user.age);
    const allowedGenres = ageMapping[ageGroup] || [];
    
    if (allowedGenres.length === 0) {
        showToast("No age-appropriate movies available");
        return;
    }
    
    const genre = allowedGenres[Math.floor(Math.random() * allowedGenres.length)];
    const genreMovies = moviesByGenre[genre];
    const randomMovie = genreMovies[Math.floor(Math.random() * genreMovies.length)];
    
    renderMovie(randomMovie);
}



function renderMovie(movie) {
    const card = document.createElement("div");
    card.className = "movie-card";

    const starCount = Math.round(parseFloat(movie.rating) / 2); // Convert rating to 5-star scale
    const starsHTML = '<span class="stars">' + "★".repeat(starCount) + "</span>";

    card.innerHTML = `
    <img src="${movie.img}" alt="${movie.title}">
    <div class="movie-details">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-info">
            <p><strong>Rating:</strong> ${movie.rating} ${starsHTML}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Year:</strong> ${movie.year}</p>
        </div>
        <div class="movie-actions">
            <button class="btn-play" onclick="playMovie('${movie.title}')">Read</button>
            <button class="btn-remove" onclick="removeMovie(this)">Remove</button>
            <button class="btn-fav" onclick="addToFavorites('${movie.title}')">Favorite</button>
        </div>
    </div>
    `;
    watchlist.appendChild(card);
}

function addToFavorites(movieTitle) {
    const movie = allMovies.find(m => m.title === movieTitle);
    if (!movie) return;
    
    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if movie is already in favorites
    if (!favorites.some(fav => fav.title === movieTitle)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showToast(`${movieTitle} added to favorites!`);
    } else {
        showToast(`${movieTitle} is already in your favorites!`);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function addMovie() {
    // Get age-appropriate random movie
    const ageGroup = getAgeCategory(user.age);
    const suggestedGenres = ageMapping[ageGroup] || ['Action', 'Horror'];
    const genre = suggestedGenres[Math.floor(Math.random() * suggestedGenres.length)];
    const genreMovies = moviesByGenre[genre];
    const randomMovie = genreMovies[Math.floor(Math.random() * genreMovies.length)];
    
    renderMovie(randomMovie);
}

function addSelectedMovie() {
    const selectedTitle = movieSelect.value;
    if (!selectedTitle) return;
    const movie = allMovies.find((m) => m.title === selectedTitle);
    if (movie) renderMovie(movie);
}

function removeMovie(btn) {
    const card = btn.closest(".movie-card");
    card.remove();
}

function playMovie(title) {
    const movie = allMovies.find(m => m.title === title);
    if (movie && movie.link) {
        window.location.href = movie.link;
    } else {
        alert(`Reading: ${title}`);
    }
}

function menuToggle() {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active');
}



// Debounce function to limit how often search executes
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchGenre = document.getElementById('searchGenre');
    const searchResults = document.getElementById('searchResults');
    const searchContainer = document.querySelector('.search-container');

    if (!searchInput || !searchGenre || !searchResults) return;

    // Set up genre restrictions based on age
    const ageGroup = getAgeCategory(user.age);
    const allowedGenres = ageMapping[ageGroup] || [];
    
    // Disable inappropriate genres
    Array.from(searchGenre.options).forEach(option => {
        if (option.value !== 'All' && !allowedGenres.includes(option.value)) {
            option.disabled = true;
            option.style.display = 'none';
        }
    });

    // Set default genre
    if (allowedGenres.length > 0) {
        searchGenre.value = allowedGenres[0];
    }

    // Handle search with debounce (300ms delay)
    const handleSearch = debounce(() => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const genre = searchGenre.value;
        
        // Show results only if there's a search term
        if (searchTerm.length < 1) {
            searchResults.classList.remove('active');
            return;
        }

        let filteredMovies = allMovies;
        
        // Filter by genre if not "All"
        if (genre !== 'All') {
            filteredMovies = moviesByGenre[genre] || [];
        }
        
        // Filter by search term (show results even with 1-2 letters)
        filteredMovies = filteredMovies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.genre.toLowerCase().includes(searchTerm)
        );

        displaySearchResults(filteredMovies);
    }, 300);

    // Event listeners
    searchInput.addEventListener('input', handleSearch);
    searchGenre.addEventListener('change', handleSearch);
    
    // Show results when input is focused
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length > 0) {
            handleSearch();
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

function displaySearchResults(movies) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (movies.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No movies found</div>';
        searchResults.classList.add('active');
        return;
    }
    
    // Show up to 8 results
    movies.slice(0, 8).forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'search-result-item';
        movieElement.innerHTML = `
            <img src="${movie.img}" alt="${movie.title}" onerror="this.src='./img/placeholder.jpg'">
            <div class="search-result-details">
                <h4>${movie.title}</h4>
                <p>${movie.genre} • ${movie.year} • Rating: ${movie.rating}</p>
            </div>
        `;
        movieElement.addEventListener('click', () => {
            renderMovie(movie);
            searchResults.classList.remove('active');
            document.getElementById('searchInput').value = '';
        });
        searchResults.appendChild(movieElement);
    });
    
    searchResults.classList.add('active');
}
