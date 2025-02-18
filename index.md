---
layout: page
title: About
hide_title: true
---

<div class="about-container">
  <!-- Profile Section -->
  <div class="profile-section">
    <div class="profile-layout">
      <div class="profile-info">
        <h1 class="profile-name">Fabian Lander</h1>
        <p class="profile-title">PhD Student at Max Planck Institute for Mathematics in the Sciences in Leipzig, Germany</p>
        
        <div class="social-links">
          <a href="https://github.com/SiegfriedFabian" class="social-button github">
            <i class="fab fa-github"></i>
          </a>
          <a href="www.linkedin.com/in/fabian-lander-b88286339" class="social-button linkedin">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="mailto:fabian.lander[you know what goes here]mis[dot]mpg[dot]de" class="social-button email">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
      <div class="profile-image">
        <img src="assets/images/IMG_2886.png" alt="There should be an image of myself..." />
      </div>
    </div>
  </div>

  <!-- Updated Tabs Navigation -->
  <div class="tabs">
    <button class="tab-button" data-tab="about">About</button>
    <button class="tab-button" data-tab="projects">Current Projects</button>
  </div>

  <!-- Tab Content -->
  <div id="about" class="tab-content">
    <div class="content-card">
      <p>Hello! I'm a first-year PhD student in the Geometry, Groups and Dynamics division at the Max Planck Institute for Mathematics in the Sciences in Leipzig, Germany. I work under the supervision of James Farre as part of Anna Wienhard's research group.</p>
      
      <p>My research focuses on straight line flows on half-dilation surfaces on punctured spheres. Here's a typical picture I would draw on a blackboard if someone would ask me what I work on:</p>
      
      <div class="blackboard-image">
        <img src="assets/images/IMG_6791.png" alt="Blackboard drawing of half-dilation surface" class="research-diagram"/>
      </div>
      
      <p>Before starting my PhD, I worked on polygonal symplectic billiards, where we proved several theorems about their dynamics.</p>
    </div>
  </div>

  <div id="projects" class="tab-content">
    <div class="content-card">
      <h2>Current Projects</h2>
      <!-- This section can be filled with your current projects -->
      <p>[Your current projects and ongoing research work will go here]</p>
    </div>
  </div>
</div>

<!-- Add Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<style>
/* =================
   Animation Settings
   Adjust these variables to customize all animations at once
   ================= */
:root {
  /* Color scheme */
  --accent-color: #A3A69A;          /* Main accent color - change this to update site theme */
  --accent-color-hover: #A3A69A;    /* Slightly darker version for hover states */
  --text-primary: #313131;          /* Main text color */
  --text-secondary: #666;           /* Secondary text color */
  --background-primary: #f8f9fa;    /* Light background color */
  --background-secondary: #f0f0f0;  /* Secondary background color */
  
  /* Animation timings */
  --animation-speed: 0.8s;
  --animation-style: ease-out;
  --delay-increment: 0.2s;
  
  /* UI properties */
  --card-shadow: 0 2px 4px rgba(0,0,0,0.1);
  --border-radius: 8px;
}

/* =================
   Animation Keyframes
   These define the actual animations - modify transform values to change animation style
   ================= */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* =================
   Main Container Animation
   Modify animation-duration and animation-timing-function to adjust the main container reveal
   ================= */
.about-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    opacity: 0;
    animation: fadeIn 0.8s ease-out forwards;
}

/* =================
   Profile Section Styles
   Customize the profile section's appearance and animation
   ================= */
.profile-section {
    margin-bottom: 3rem;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
    animation-delay: 0.2s;
}

.profile-layout {
    display: flex;
    align-items: center;
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.profile-info {
    text-align: left;
    flex: 1;
}

/* =================
   Profile Image Styles
   Adjust size, border, and hover effects
   ================= */
.profile-image {
    width: 200px;  /* Increased from 150px */
    height: 200px; /* Increased from 150px */
    margin: 0 auto 1rem;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid var(--accent-color);
}

.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-name {
    font-size: 2rem;
    margin: 0.5rem 0;
    color: var(--text-primary);
}

.profile-title {
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

.social-links {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
}

/* =================
   Social Button Styles
   Customize hover effects and transitions
   ================= */
.social-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-secondary);
    color: var(--text-primary);
    transition: all 0.3s ease;
}

.social-button:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
}

.tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #eee;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
    animation-delay: 0.4s;
}

.tab-button {
    padding: 0.75rem 1.5rem;
    border: none;
    background: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 1rem;
    position: relative;
    transition: color 0.3s ease;
}

.tab-button.active {
    color: var(--accent-color);
}

.tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent-color);
    transition: transform 0.3s ease;
}

.tab-content {
    display: none;
    opacity: 0;
    transition: opacity 0.15s ease-out;
}

.tab-content.active {
    display: block;
    opacity: 1;
    transition: opacity 0.15s ease-in;
}

.content-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
    animation-delay: 0.6s;
}

/* =================
   Skill Bars Section
   Customize the appearance and animation of skill bars
   ================= */
.skill-bars {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.skill-bar {
    height: 8px;
    background: #eee;
    border-radius: 4px;
    overflow: hidden;
}

/* =================
   Skill Bar Fill Animation
   Adjust the transition timing and style
   ================= */
.skill-fill {
    height: 100%;
    background: #268bd2;
    transition: width 1s ease;
}

.project-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

/* =================
   Project Card Styles
   Customize card hover effects and transitions
   ================= */
.project-card {
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.tag {
    padding: 0.25rem 0.75rem;
    background: #e9ecef;
    border-radius: 15px;
    font-size: 0.875rem;
}

@media (max-width: 900px) {
    .profile-layout {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2rem;
    }

    .profile-image {
        width: 300px;  /* Slightly smaller on mobile */
        height: 300px;
    }

    .profile-info {
        text-align: center;
    }

    .social-links {
        justify-content: center;
    }

    .profile-name {
        font-size: 2rem;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get all tab buttons and content
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Set initial active tab
  const initialTab = window.location.hash.slice(1) || 'about';
  setActiveTab(initialTab);
  
  // Add click handlers to all tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      setActiveTab(tabName);
      // Update URL hash without scrolling
      history.pushState(null, null, `#${tabName}`);
    });
  });
  
  // Handle browser back/forward
  window.addEventListener('popstate', function() {
    const tabName = window.location.hash.slice(1) || 'about';
    setActiveTab(tabName);
  });
  
  function setActiveTab(tabName) {
    // Remove active class from all tabs and buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and button
    const selectedButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(tabName);
    
    if (selectedButton && selectedContent) {
      selectedButton.classList.add('active');
      selectedContent.classList.add('active');
    }
  }
});

// Add loading class to trigger animations
document.body.classList.add('is-loading');

// Remove loading class after page is fully loaded
window.addEventListener('load', function() {
    document.body.classList.remove('is-loading');
});

// Animate skill bars on page load
document.addEventListener('DOMContentLoaded', function() {
  const skillFills = document.getElementsByClassName('skill-fill');
  for (let fill of skillFills) {
    const width = fill.style.width;
    fill.style.width = '0';
    setTimeout(() => {
      fill.style.width = width;
    }, 200);
  }
});
</script>