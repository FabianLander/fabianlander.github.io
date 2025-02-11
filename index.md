---
layout: page
title: About
hide_title: true
---

<div class="about-container">
  <!-- Profile Section -->
  <div class="profile-section">
    <div class="profile-image">
      <img src="/path-to-your-image.jpg" alt="Your Name" />
    </div>
    <h1 class="profile-name">Your Name</h1>
    <p class="profile-title">Full Stack Developer & Creative Thinker</p>
    
    <div class="social-links">
      <a href="https://github.com/yourusername" class="social-button github">
        <i class="fab fa-github"></i>
      </a>
      <a href="https://linkedin.com/in/yourusername" class="social-button linkedin">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="mailto:your@email.com" class="social-button email">
        <i class="fas fa-envelope"></i>
      </a>
    </div>
  </div>

  <!-- Tabs Navigation -->
  <div class="tabs">
    <button class="tab-button active" onclick="openTab('about')">About</button>
    <button class="tab-button" onclick="openTab('skills')">Skills</button>
    <button class="tab-button" onclick="openTab('projects')">Projects</button>
  </div>

  <!-- Tab Content -->
  <div id="about" class="tab-content active">
    <div class="content-card">
      <h2>About Me</h2>
      <p>I'm a passionate developer with over 5 years of experience in building web applications. I love creating intuitive and performant solutions that solve real-world problems.</p>
      <p>When I'm not coding, you can find me hiking in the mountains, reading sci-fi novels, or experimenting with new technologies.</p>
    </div>
  </div>

  <div id="skills" class="tab-content">
    <div class="content-card">
      <h2>Skills & Expertise</h2>
      <div class="skill-bars">
        <div class="skill">
          <div class="skill-header">
            <span>JavaScript</span>
            <span>90%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-fill" style="width: 90%"></div>
          </div>
        </div>
        <div class="skill">
          <div class="skill-header">
            <span>Python</span>
            <span>85%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-fill" style="width: 85%"></div>
          </div>
        </div>
        <!-- Add more skills as needed -->
      </div>
    </div>
  </div>

  <div id="projects" class="tab-content">
    <div class="content-card">
      <h2>Recent Projects</h2>
      <div class="project-grid">
        <div class="project-card">
          <h3>Project Alpha</h3>
          <p>A revolutionary app that transforms ideas into reality</p>
          <div class="project-tags">
            <span class="tag">JavaScript</span>
            <span class="tag">Node.js</span>
          </div>
        </div>
        <!-- Add more project cards as needed -->
      </div>
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
  /* Base animation timings */
  --animation-speed: 0.8s;      /* Controls how long animations take to complete */
  --animation-style: ease-out;  /* Options: ease-in, ease-out, ease-in-out, linear */
  
  /* Animation delay between elements */
  --delay-increment: 0.2s;      /* Time between each element's animation */
  
  /* Main color scheme - Customize these to match your theme */
  --primary-color: #268bd2;     /* Main accent color (Lanyon blue) */
  --text-color: #313131;        /* Main text color */
  --secondary-color: #666;      /* Secondary text color */
  --background-color: #f8f9fa;  /* Light background color */
  
  /* Card and UI properties */
  --card-shadow: 0 2px 4px rgba(0,0,0,0.1);  /* Adjust shadow intensity */
  --border-radius: 8px;         /* Round corners for cards and elements */
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
    text-align: center;
    margin-bottom: 3rem;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
    animation-delay: 0.2s;
  }

  /* =================
   Profile Image Styles
   Adjust size, border, and hover effects
   ================= */
.profile-image {
    width: 150px;
    height: 150px;
    margin: 0 auto 1rem;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #268bd2;
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-name {
    font-size: 2rem;
    margin: 0.5rem 0;
    color: #313131;
  }

  .profile-title {
    color: #666;
    margin-bottom: 1rem;
  }

  .social-links {
    display: flex;
    justify-content: center;
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
    background: #f0f0f0;
    color: #313131;
    transition: all 0.3s ease;
  }

  .social-button:hover {
    background: #268bd2;
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
    color: #666;
    cursor: pointer;
    font-size: 1rem;
    position: relative;
  }

  .tab-button.active {
    color: #268bd2;
  }

  .tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #268bd2;
  }

  .tab-content {
    display: none;
  }

  .tab-content.active {
    display: block;
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

  @media (max-width: 600px) {
    .tabs {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .tab-button {
      width: 100%;
      text-align: center;
    }
  }
</style>

<script>
function openTab(tabName) {
  // Hide all tab content
  const tabContents = document.getElementsByClassName('tab-content');
  for (let content of tabContents) {
    content.classList.remove('active');
  }
  
  // Remove active class from all buttons
  const tabButtons = document.getElementsByClassName('tab-button');
  for (let button of tabButtons) {
    button.classList.remove('active');
  }
  
  // Show the selected tab content and activate the button
  document.getElementById(tabName).classList.add('active');
  event.currentTarget.classList.add('active');
}

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