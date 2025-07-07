// Sample movie data
const movies = [
    {
        id: 1,
        title: "The Stellar Journey",
        year: 2024,
        rating: 4.8,
        genre: "Sci-Fi",
        description: "An epic space adventure that follows a team of explorers as they venture into the unknown depths of the galaxy, discovering new worlds and facing incredible challenges that test the limits of human courage and ingenuity.",
        poster: "🚀"
    },
    {
        id: 2,
        title: "Midnight in Paris",
        year: 2023,
        rating: 4.5,
        genre: "Romance",
        description: "A romantic tale set in the enchanting streets of Paris, where two strangers meet by chance and embark on a magical evening that changes their lives forever. A story about love, destiny, and the beauty of unexpected connections.",
        poster: "🗼"
    },
    {
        id: 3,
        title: "The Last Samurai's Honor",
        year: 2024,
        rating: 4.7,
        genre: "Action",
        description: "In feudal Japan, a legendary samurai must choose between honor and survival when faced with an impossible mission. A breathtaking tale of courage, sacrifice, and the warrior's code that will keep you on the edge of your seat.",
        poster: "⚔️"
    },
    {
        id: 4,
        title: "Digital Dreams",
        year: 2023,
        rating: 4.3,
        genre: "Thriller",
        description: "In a near-future world where reality and virtual worlds collide, a programmer discovers a dark conspiracy that threatens to blur the lines between what's real and what's digital. A mind-bending thriller that questions the nature of reality.",
        poster: "💻"
    },
    {
        id: 5,
        title: "Ocean's Mystery",
        year: 2024,
        rating: 4.6,
        genre: "Adventure",
        description: "Deep beneath the ocean's surface lies a secret that could change everything we know about our planet. Join marine biologist Dr. Sarah Chen as she leads an expedition into the deepest trenches of the Pacific Ocean.",
        poster: "🌊"
    },
    {
        id: 6,
        title: "The Time Keeper",
        year: 2023,
        rating: 4.9,
        genre: "Fantasy",
        description: "When time itself begins to unravel, a young clockmaker discovers she has the power to repair the fabric of reality. A magical journey through different eras as she races against time to save the world from temporal chaos.",
        poster: "⏰"
    }
];

let filteredMovies = [...movies];

// DOM elements
const moviesGrid = document.getElementById('moviesGrid');
const searchInput = document.getElementById('searchInput');
const movieModal = document.getElementById('movieModal');
const closeModal = document.getElementById('closeModal');
const loading = document.getElementById('loading');

// Initialize the website
function init() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        renderMovies(movies);
    }, 1000);
}

// Show loading animation
function showLoading() {
    loading.style.display = 'block';
    moviesGrid.style.display = 'none';
}

// Hide loading animation
function hideLoading() {
    loading.style.display = 'none';
    moviesGrid.style.display = 'grid';
}

// Render movies to the grid
function renderMovies(movieList) {
    moviesGrid.innerHTML = '';
    
    movieList.forEach((movie, index) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.style.animationDelay = `${index * 0.1}s`;
        
        movieCard.innerHTML = `
            <div class="movie-poster">${movie.poster}</div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="genre">${movie.genre} • ${movie.year}</span>
                    <div class="rating">
                        <span class="stars">${generateStars(movie.rating)}</span>
                        <span>${movie.rating}</span>
                    </div>
                </div>
                <p class="movie-description">${movie.description.substring(0, 120)}...</p>
            </div>
        `;
        
        movieCard.addEventListener('click', () => openModal(movie));
        moviesGrid.appendChild(movieCard);
    });
}

// Generate star rating display
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (halfStar) {
        stars += '☆';
    }
    
    return stars;
}

// Open movie modal
function openModal(movie) {
    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalRating').innerHTML = `
        <div class="rating">
            <span class="stars">${generateStars(movie.rating)}</span>
            <span>${movie.rating}/5 • ${movie.genre} • ${movie.year}</span>
        </div>
    `;
    document.getElementById('modalDescription').textContent = movie.description;
    movieModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeMovieModal() {
    movieModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('reviewText').value = '';
}

// Submit review
function submitReview() {
    const reviewText = document.getElementById('reviewText').value.trim();
    if (reviewText) {
        // Simulate review submission
        alert('Thank you for your review! Your feedback has been submitted.');
        closeMovieModal();
    } else {
        alert('Please write a review before submitting.');
    }
}

// Search functionality
function searchMovies() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredMovies = [...movies];
    } else {
        filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(query) ||
            movie.genre.toLowerCase().includes(query) ||
            movie.description.toLowerCase().includes(query)
        );
    }
    
    showLoading();
    setTimeout(() => {
        hideLoading();
        renderMovies(filteredMovies);
    }, 300);
}

// Event listeners
searchInput.addEventListener('input', searchMovies);
closeModal.addEventListener('click', closeMovieModal);

// Close modal when clicking outside
movieModal.addEventListener('click', (e) => {
    if (e.target === movieModal) {
        closeMovieModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && movieModal.style.display === 'block') {
        closeMovieModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize the website when page loads
document.addEventListener('DOMContentLoaded', init);

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        } else {
            card.style.transform = '';
        }
    });
});