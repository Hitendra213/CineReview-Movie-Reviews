// Sample review data
const reviews = [
    {
        id: 1,
        movieTitle: "The Stellar Journey",
        reviewer: "John Doe",
        genre: "Sci-Fi",
        year: 2024,
        rating: 4.8,
        text: "An awe-inspiring adventure that takes you to the stars. The visuals are stunning, and the story is deeply moving. A must-watch for sci-fi fans!"
    },
    {
        id: 2,
        movieTitle: "Midnight in Paris",
        reviewer: "Jane Smith",
        genre: "Romance",
        year: 2023,
        rating: 4.5,
        text: "A beautifully crafted love story set in the magical city of Paris. The chemistry between the leads is electric!"
    },
    {
        id: 3,
        movieTitle: "The Last Samurai's Honor",
        reviewer: "Alex Brown",
        genre: "Action",
        year: 2024,
        rating: 4.7,
        text: "Action-packed and emotionally charged. The samurai's journey is both thrilling and heartfelt."
    }
];

let filteredReviews = [...reviews];

// DOM elements
const reviewsGrid = document.getElementById('reviewsGrid');
const searchInput = document.getElementById('searchInput');
const loading = document.getElementById('loading');

// Initialize the website
function init() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        renderReviews(reviews);
    }, 1000);
}

// Show loading animation
function showLoading() {
    loading.style.display = 'block';
    reviewsGrid.style.display = 'none';
}

// Hide loading animation
function hideLoading() {
    loading.style.display = 'none';
    reviewsGrid.style.display = 'grid';
}

// Render reviews to the grid
function renderReviews(reviewList) {
    reviewsGrid.innerHTML = '';
    
    reviewList.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.style.animationDelay = `${index * 0.1}s`;
        
        reviewCard.innerHTML = `
            <h3 class="review-title">${review.movieTitle}</h3>
            <div class="review-meta">
                <span>By ${review.reviewer} • ${review.genre} • ${review.year}</span>
                <div class="rating">
                    <span class="stars">${generateStars(review.rating)}</span>
                    <span>${review.rating}</span>
                </div>
            </div>
            <p class="review-text">${review.text}</p>
        `;
        
        reviewsGrid.appendChild(reviewCard);
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

// Search functionality
function searchReviews() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredReviews = [...reviews];
    } else {
        filteredReviews = reviews.filter(review => 
            review.movieTitle.toLowerCase().includes(query) ||
            review.reviewer.toLowerCase().includes(query)
        );
    }
    
    showLoading();
    setTimeout(() => {
        hideLoading();
        renderReviews(filteredReviews);
    }, 300);
}

// Newsletter subscription
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email)) {
        alert('Thank you for subscribing to our newsletter!');
        document.getElementById('newsletterEmail').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Event listeners
searchInput.addEventListener('input', searchReviews);

// Initialize the website when page loads
document.addEventListener('DOMContentLoaded', init);

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