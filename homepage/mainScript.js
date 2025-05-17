// mainScript.js
// Grab DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let timeDom = document.querySelector('.carousel .time');

const user = JSON.parse(localStorage.getItem('user')) || {
    username: 'Demo',password: 'admin123', role: 'Admin', age: 25, upiID : 'demo@ybl'
};
console.log(user);
function getAgeCategory(age) {
    if (age < 13)      return 'kid';
    if (age < 40)      return 'adult';
    return               'elderly';
}

// To handle movie clicks
function findMovieById(id) {
  for (const [genre, arr] of Object.entries(moviesByGenre)) {
    const m = arr.find(x => x.id === id);
    if (m) return m;
  }
  return null;
}

function viewMovie(id) {
  const movie = findMovieById(id);
  if (!movie) return console.warn('Unknown movie:', id);

  // Freemium users can’t see Premium content anywhere
  if (user.role === 'FreemiumUser' && movie.isPremium) {
    return showUpgradeModal();
  }

  // otherwise store and navigate
  localStorage.setItem('selectedMovie', id);
  window.location.href = 'description.html';
}



const moviesByGenre = {
    Disney:       [
        { img: './posters/Disney1.png', title:'Frozen', rating:8.5, lang:'EN', isPremium:false, id:"frozen" },
        { img: './posters/Disney2.png', title:'Toy Story', rating:9.9, lang:'EN', isPremium:true, id:"toy-story" },
        { img: './posters/Disney3.png', title:'The Lion King', rating:8.1, lang:'EN', isPremium:true, id:"the-lion-king" },
        { img: './posters/Disney4.png', title:'Tangled', rating:9.9, lang:'EN', isPremium:true, id:"tangled" },
        { img: './posters/Disney5.png', title:'Wreck It Ralph', rating:8.4, lang:'EN', isPremium:false, id:"wreck-it-ralph" }     
    ],
    Anime:        [
        { img: './posters/Anime1.png', title:'Tokyo Ghoul', rating:8.8, lang:'JP', isPremium:true, id:"tokyo-ghoul" },
        { img: './posters/Anime2.png', title:'Mobile Suit Gundame', rating:7.75, lang:'IND', isPremium:false, id:"mobile-suit-gundame" },
        { img: './posters/Anime3.png', title:'Horimiya', rating:8.0, lang:'JP', isPremium:false, id:"horimiya" },
        { img: './posters/Anime4.png', title:'Neon Genesis Evangelion', rating:9.6, lang:'JP', isPremium:true, id:"neon-genesis-evangelion" },
        { img: './posters/Anime5.png', title:'Berserk', rating:9.9, lang:'JP', isPremium:true, id:"berserk" },
    ],
    Action:       [
        { img: './posters/Action1.png', title:'The Batman', rating:9.9, lang:'EN', isPremium:true,id:"the-batman"},
        { img: './posters/Action2.png', title:'John Wick 2', rating:8.3, lang:'EN', isPremium:false, id:"john-wick" },
        { img: './posters/poster1.png', title:'Avengers Endgame', rating:9.9, lang:'EN', isPremium:true, id:"avengers-endgame" },
        { img: './posters/Action4.png', title:'X-Men', rating:8.7, lang:'EN', isPremium:true, id:"x-men" },
        { img: './posters/Action5.png', title:'Spider-Man', rating:7.3, lang:'EN', isPremium:false, id:"spider-man" }
    ],
    Horror:       [
        { img: './posters/Horror1.png', title:'Annabelle', rating:7.3, lang:'EN', isPremium:true, id:"annabelle" },
        { img: './posters/Horror2.png', title:'Rings', rating:8.6, lang:'EN', isPremium:false, id:"rings" },
        { img: './posters/poster8.png', title:'The Conjuring', rating:9.4, lang:'EN', isPremium:true, id:"the-conjuring" },
        { img: './posters/Horror4.png', title:'Haunting of The Bly Manor', rating:9.9, lang:'EN', isPremium:true, id:"haunting-of-the-bly-manor" },
        { img: './posters/Horror5.png', title:'The Grudge', rating:9.1, lang:'JP', isPremium:false, id:"the-grudge" }
    ],
    Sitcom:       [
        { img: './posters/Sitcom1.png', title:'Friends', rating:9.9, lang:'EN', isPremium:true, id:"friends" },
        { img: './posters/Sitcom2.png', title:'The Big Bang Theory', rating:8.7, lang:'EN', isPremium:false, id:"the-big-bang-theory" },
        { img: './posters/Sitcom3.png', title:'The Modern Family', rating:9.7, lang:'EN', isPremium:true, id:"the-modern-family" },
        { img: './posters/Sitcom4.png', title:'How I Met Your Mother', rating:8.8, lang:'EN', isPremium:false, id:"how-i-met-your-mother" },
        { img: './posters/Sitcom5.png', title:'Brooklyn 99', rating:9.9, lang:'EN', isPremium:true, id:"brooklyn-99" }
    ],
    Documentary:  [
        { img: './posters/Documentary1.png', title:'Cunk On Earth', rating:7.5, lang:'EN', isPremium:true, id:"cunk-on-earth" },
        { img: './posters/Documentary2.png', title:'Facing Ali', rating:8.2, lang:'EN', isPremium:true, id:"facing-ali" },
        { img: './posters/Documentary3.png', title:'How To Rob A Bank', rating:9.2, lang:'EN', isPremium:false, id:"how-to-rob-a-bank" },
        { img: './posters/Documentary4.png', title:'House Of Secrets', rating:9.9, lang:'EN', isPremium:true, id:"house-of-secrets" },
        { img: './posters/Documentary5.png', title:'Curry & Cyanide', rating:7.4, lang:'EN', isPremium:false, id:"curry-and-cyanide" }
    ],
    trailerCarousel: [
        { img: './posters/poster1.png', title:'Avengers Endgame', rating:9.9, lang:'EN', isPremium:true, id:"avengers-endgame" },
        { img: './posters/poster2.png', title:'The Mandalorian', rating:7.5, lang:'EN', isPremium:true, id:"mandalorian" },
        { img: './posters/poster3.png', title:'Inception', rating:7.5, lang:'EN', isPremium:true, id:"inception" },
        { img: './posters/poster4.png', title:'Harry Potter', rating:7.5, lang:'EN', isPremium:true, id:"harry-potter" },
        { img: './posters/poster5.png', title:'The Great Gatsby', rating:7.5, lang:'EN', isPremium:true, id:"the-great-gatsby" },
    ]
};

const ageMapping = {
    kid:     ['Disney',      'Anime'],
    adult:   ['Action',      'Horror'],
    elderly: ['Sitcom',      'Documentary']
};
  

let genresToShow = [];
  
if (user.role === 'Admin') {
    genresToShow = Object.keys(moviesByGenre).filter(g => g !== 'trailerCarousel');
}
else if (user.role === 'PremiumUser' || user.role === 'FreemiumUser') {
    genresToShow = ageMapping[getAgeCategory(user.age)] || [];
}


// Initial slide setup
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// Timer
let timeRunning = 30000;
let timeAutoNext = 30000;
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
},  timeAutoNext);


        nextDom.addEventListener('click', () => showSlider('next'));
        prevDom.addEventListener('click', () => showSlider('prev'));


        window.addEventListener('load', () => {
    
        carouselDom.classList.remove('next', 'prev');
    void carouselDom.offsetWidth; 
    carouselDom.classList.add('next');

        clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next', 'prev');
    }, timeRunning);
});

// Core slider function
function showSlider(type) {
    let SliderItems = SliderDom.querySelectorAll('.carousel .list .item');
    let ThumbItems   = document.querySelectorAll('.carousel .thumbnail .item');

    
    carouselDom.classList.remove('next', 'prev');
    void carouselDom.offsetWidth;

    if (type === 'next') {
        SliderDom.appendChild(SliderItems[0]);
        thumbnailBorderDom.appendChild(ThumbItems[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItems[SliderItems.length - 1]);
        thumbnailBorderDom.prepend(ThumbItems[ThumbItems.length - 1]);
        carouselDom.classList.add('prev');
    }

    
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next', 'prev');
    }, timeRunning);

    
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}


document.querySelectorAll('.itemOfBanner').forEach(item => {
    item.style.cursor = 'pointer';       
    item.addEventListener('click', () => {
      const dest = item.dataset.link;
      if (dest) window.location.href = dest;
    });
});


const container = document.getElementById('dynamicCarousels');
let removeModeGenre = null;


genresToShow.forEach(genre=>{
    
    const adminBtns = user.role==='Admin'
      ? `<button class="addBtn" data-genre="${genre}">＋</button>
         <button class="remBtn" data-genre="${genre}">－</button>`
      : ``;
  
    // build HTML
    const block = document.createElement('div');
    block.className = `trending ${genre}`;
    block.innerHTML = `
      <div class="trending-header">
        <h2>${genre} Movies</h2>
        <div class="direction">
          ${adminBtns}
          <button class="prevOf${genre} arrow">‹</button>
          <button class="nextOf${genre} arrow">›</button>
        </div>
      </div>
      <div id="formList_${genre}">
        <div id="list_${genre}">
          ${moviesByGenre[genre].map((m,i)=>`
            <div class="item" data-genre="${genre}" data-index="${i}" data-movie-id="${m.id}" style="cursor:pointer">
              <img src="${m.img}" class="avatar">
              <div class="content">
                <table width="100%" cellspacing="0">
                    <tr><td>Title</td><td>${m.title}</td></tr>
                    <tr><td>Rating</td><td>${m.rating}</td></tr>
                    <tr><td>Lang</td><td>${m.lang}</td></tr>
                    ${m.isPremium? `<tr><td colspan="2" class="nameGroup" style="color: #D84040;">Premium</td></tr>`: ``}
                </table>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.appendChild(block);
  
    
    block.querySelector(`.nextOf${genre}`).onclick = () => {
      const w = block.querySelector('.item').offsetWidth;
      block.querySelector(`#formList_${genre}`).scrollLeft += w;
    };
    block.querySelector(`.prevOf${genre}`).onclick = () => {
      const w = block.querySelector('.item').offsetWidth;
      block.querySelector(`#formList_${genre}`).scrollLeft -= w;
    };
  
    // make cards clickable
    block.querySelectorAll('.item').forEach(card=>{
      card.onclick = () => {
        const g = card.dataset.genre;
        const idx = +card.dataset.index;
        const movie = moviesByGenre[g][idx];
        if(removeModeGenre === g) {
            showDeleteModal(g, idx);
        } else {
            if (user.role === 'FreemiumUser' && movie.isPremium) {
               showUpgradeModal();
            }
            else if (movie.link) {
              window.location.href = movie.link;
            }
        }
      };
    });

    if(user.role==='Admin'){
      block.querySelector('.addBtn').onclick = e => {
        showAddModal(genre);
      };
      block.querySelector('.remBtn').onclick = e => {
        removeModeGenre = removeModeGenre===genre ? null : genre;
        if (removeModeGenre===genre) {
            block.style.backgroundColor = "#540202";
        } else {
            block.style.backgroundColor = "black";
        }
        block.classList.toggle('removing');
      };
    }
  });
  

  const modal    = document.getElementById('adminModal');
  const body     = document.getElementById('modalBody');
  const closeX   = document.getElementById('modalClose');
  closeX.onclick = ()=> modal.classList.add('hidden');
  
  function showAddModal(genre) {
    removeModeGenre = null;
    document.querySelectorAll('.trending.removing').forEach(b => b.classList.remove('removing'));
  
    body.innerHTML = `
      <h3 class="pop-out-heading add-pop">Add to ${genre}</h3>
      <label class="add-pop pop-out-label">Poster URL:<input type="text" id="m_img" required></label>
      <label class="add-pop pop-out-label">Title:<input type="text" id="m_title" required></label>
      <label class="add-pop pop-out-label">
        Rating:<input type="number" id="m_rating" min="0" max="10" step="0.1" required>
        <span id="rating-error" style="color:red; font-size:0.9em; display:none;">Rating must be between 0 and 10</span>
      </label>
      <label class="add-pop pop-out-label">Language:<input type="text" id="m_lang" required></label>
      <label class="add-pop pop-out-label">Premium?<input type="checkbox" id="m_prem" class="pop-out-checkbox"></label>
      <button id="saveMovie">Save</button>
    `;
  
    modal.classList.remove('hidden');
  
    const ratingInput = document.getElementById('m_rating');
    const ratingError = document.getElementById('rating-error');
  
    
    ratingInput.addEventListener('input', () => {
      const ratingVal = parseFloat(ratingInput.value);
      if (isNaN(ratingVal) || ratingVal < 0 || ratingVal > 10) {
        ratingError.style.display = 'inline';
        ratingInput.style.borderColor = 'red';
      } else {
        ratingError.style.display = 'none';
        ratingInput.style.borderColor = '';
      }
    });
  
    document.getElementById('saveMovie').onclick = () => {
      const img = document.getElementById('m_img').value.trim();
      const title = document.getElementById('m_title').value.trim();
      const ratingVal = parseFloat(ratingInput.value);
      const lang = document.getElementById('m_lang').value.trim();
      const prem = document.getElementById('m_prem').checked;
  
      if (!img || !title || !lang || isNaN(ratingVal)) {
        alert('All fields required.');
        return;
      }
  
      if (ratingVal < 0 || ratingVal > 10) {
        ratingError.style.display = 'inline';
        ratingInput.style.borderColor = 'red';
        return;
      }
  
      const arr = moviesByGenre[genre];
      arr.push({ img, title, rating: ratingVal, lang, isPremium: prem, link: '' });
  
      const listDiv = document.getElementById(`list_${genre}`);
      const idx = arr.length - 1;
      const card = document.createElement('div');
      card.className = 'item';
      card.dataset.genre = genre;
      card.dataset.index = idx;
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <img src="${img}" class="avatar">
        <div class="content">
          <table width="100%" cellspacing="0">
            <tr><td>Title</td><td>${title}</td></tr>
            <tr><td>Rating</td><td>${ratingVal}</td></tr>
            <tr><td>Lang</td><td>${lang}</td></tr>
            ${prem ? `<tr><td colspan="2" class="nameGroup" style="color:#D84040">Premium</td></tr>` : ''}
          </table>
        </div>
      `;
  
      bindCardClick(card, genre, idx);
      listDiv.appendChild(card);
      modal.classList.add('hidden');
    };
  }
  


  function showDeleteModal(genre, idx) {
    const movie   = moviesByGenre[genre][idx];
    const block   = document.querySelector(`.trending.${genre}`);
    const remBtn  = block.querySelector('.remBtn');
    const listDiv = document.getElementById(`list_${genre}`);
  
  
    body.innerHTML = `
      <h3>Delete "${movie.title}" from ${genre}?</h3>
      <button id="confirmDelete">Yes</button>
      <button id="cancelDelete">No</button>
    `;
    modal.classList.remove('hidden');
  
  
    document.getElementById('confirmDelete').onclick = () => {
    
      moviesByGenre[genre].splice(idx, 1);
      listDiv.children[idx].remove();
  
      //RE-INDEX & RE-BIND all remaining cards
      Array.from(listDiv.children).forEach((card, newIndex) => {
        card.dataset.index = newIndex;
        bindCardClick(card, genre, newIndex);
      });

      modal.classList.add('hidden');
    };
  
  
    document.getElementById('cancelDelete').onclick = () => {
      modal.classList.add('hidden');
    };
  }
  


function showUpgradeModal() {

    removeModeGenre = null;
    document.querySelectorAll('.trending.removing')
            .forEach(b=>b.classList.remove('removing'));
  
    // build the message
    body.innerHTML = `
      <h3>Premium Content Locked</h3>
      <p>Sorry, it looks like you don’t have access to our best content.</p>
      <p>You can upgrade to Premium at any time !</p>
      <label>
        <button id="goPremiumBtn">Go Premium</button>
        <button id="cancelUpgrade" style="margin-left:8px;">Maybe Later</button>
      </label>

    `;

    modal.classList.remove('hidden');
  
    document.getElementById('goPremiumBtn').onclick = () => {
      window.location.href = './payment.html';
    };
    document.getElementById('cancelUpgrade').onclick = () => {
      modal.classList.add('hidden');
    };
  }
  

  // navbar
// … your existing code above …

// 2) helper to flatten all movies into one array
const allMovies = Object.entries(moviesByGenre).flatMap(([genre, arr]) =>
  arr.map(m => ({ ...m, genre }))
);

const siteSearch = document.getElementById('siteSearch');
const dropdown   = document.getElementById('searchDropdown');

siteSearch.addEventListener('input', () => {
  const q = siteSearch.value.trim().toLowerCase();
  if (!q) {
    dropdown.classList.add('hidden');
    return;
  }

  const matches = allMovies
    .filter(m =>
      genresToShow.includes(m.genre) &&
      (m.title + ' ' + m.genre + ' ' + (m.cast||[]).join(' '))
        .toLowerCase()
        .includes(q)
    )
    .slice(0, 10);

  dropdown.innerHTML = matches.map(m => `
    <li data-link="${m.id}">
      <img src="${m.img}" alt="${m.title}">
      <span class="title">${m.title}</span>
    </li>
  `).join('');

  dropdown.classList.toggle('hidden', matches.length === 0);
});

dropdown.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  const movieId = li.dataset.link;
  viewMovie(movieId);
});

// close if you click _anywhere_ outside
document.addEventListener('click', e => {
  if (!siteSearch.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
    siteSearch.value = '';
  }
});



function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}     

function bindCardClick(card, genre, idx) {
    card.onclick = () => {
      const movie = moviesByGenre[genre][idx];
      if (removeModeGenre === genre) {
        // use the styled modal
        showDeleteModal(genre, idx);
      } else if (movie.link) {
        if (user.role === 'FreemiumUser' && movie.isPremium) {
            showUpgradeModal();
        }
        else if (movie.link) {
           window.location.href = movie.link;
        }
      }
    };
  }


const actionDiv   = document.getElementById('profileAction');
const btnProfile  = document.getElementById('profileBtn');
const menuProfile = document.getElementById('profileMenu');


btnProfile.addEventListener('click', e => {
  e.stopPropagation();              // don’t let the document‐click listener fire
  menuProfile.classList.toggle('active');
});


document.addEventListener('click', e => {
  if (!actionDiv.contains(e.target)) {
    menuProfile.classList.remove('active');
  }

  if (!siteSearch.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
    siteSearch.value = '';
  }
});

// GLOBAL click handler for any movie card
document.body.addEventListener('click', e => {
  const card = e.target.closest('[data-movie-id]');
  if (!card) return;

  // If we are in remove-mode for this genre, do NOT navigate
  const trendingBlock = card.closest('.trending');
  if (removeModeGenre && trendingBlock && trendingBlock.classList.contains(removeModeGenre)) {
    // Let the card.onclick handler (showDeleteModal) run, but skip navigation.
    return;
  }

  // Otherwise, safe to view the movie
  viewMovie(card.dataset.movieId);
});

document.addEventListener('DOMContentLoaded', function () {
    // Simulating user object; replace this with your actual user data
    
    // Set username and role dynamically
    const usernameElement = document.getElementById('nav-username');
    const roleElement = document.getElementById('nav-role');

    if (usernameElement && roleElement) {
        usernameElement.firstChild.textContent = user.username + ' ';
        roleElement.textContent = user.role.replace(/([a-z])([A-Z])/g, '$1 $2');
    }
});
function showHamMenu() {
  document.querySelector('.Hammenu').classList.add('show');
}

function hideHamMenu() {
  document.querySelector('.Hammenu').classList.remove('show');
}

localStorage.setItem('user',JSON.stringify(user));
localStorage.setItem('genresToShow', JSON.stringify(genresToShow));
localStorage.setItem('moviesByGenre', JSON.stringify(moviesByGenre));
