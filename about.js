// Sample team data
const teamMembers = [
    {
        id: 1,
        name: "Emma Watson",
        role: "Founder & CEO",
        bio: "Emma is a passionate cinephile with a vision to create a community for movie lovers. She oversees the strategic direction of CineReview.",
        emoji: "🎥"
    },
    {
        id: 2,
        name: "Liam Chen",
        role: "Lead Developer",
        bio: "Liam is the tech genius behind CineReview's seamless platform. He ensures the website runs smoothly and is always user-friendly.",
        emoji: "💻"
    },
    {
        id: 3,
        name: "Sophia Rodriguez",
        role: "Content Manager",
        bio: "Sophia curates the movie reviews and ensures our content is engaging and insightful. She loves discovering hidden gem films.",
        emoji: "✍️"
    }
];

// DOM elements
const teamGrid = document.getElementById('teamGrid');
const loading = document.getElementById('loading');

// Initialize the website
function init() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        renderTeam(teamMembers);
    }, 1000);
}

// Show loading animation
function showLoading() {
    loading.style.display = 'block';
    teamGrid.style.display = 'none';
}

// Hide loading animation
function hideLoading() {
    loading.style.display = 'none';
    teamGrid.style.display = 'grid';
}

// Render team members to the grid
function renderTeam(teamList) {
    teamGrid.innerHTML = '';
    
    teamList.forEach((member, index) => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.style.animationDelay = `${index * 0.1}s`;
        
        teamCard.innerHTML = `
            <div class="team-emoji">${member.emoji}</div>
            <h3 class="team-name">${member.name}</h3>
            <div class="team-role">${member.role}</div>
            <p class="team-bio">${member.bio}</p>
        `;
        
        teamGrid.appendChild(teamCard);
    });
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