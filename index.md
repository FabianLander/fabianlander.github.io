---
layout: page
title: "Fabian Lander - Mathematics PhD Student at Max Planck Institute"
nav_title: "About"
description: "PhD Student in Geometry, Groups and Dynamics at Max Planck Institute for Mathematics. Research by Fabian Lander (GitHub: FabianLander) on straight line flows on half-dilation surfaces."
permalink: /
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
          <a href="https://github.com/FabianLander" class="social-button github" aria-label="GitHub profile of Fabian Lander">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/fabian-lander-b88286339" class="social-button linkedin" aria-label="LinkedIn profile of Fabian Lander">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="mailto:fabian.lander[you know what goes here]mis[dot]mpg[dot]de" class="social-button email" aria-label="Email Fabian Lander">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
      <div class="profile-image">
        <picture>
          <source srcset="assets/images/IMG_2886.webp" type="image/webp">
          <img 
            src="assets/images/IMG_2886.jpg" 
            alt="There should be an image of myself..." 
            width="200" 
            height="200"
            loading="eager" 
            decoding="async"
          />
        </picture>
      </div>
    </div>
  </div>

  <!-- Tabs Navigation -->
  <div class="tabs">
    <button class="tab-button" data-tab="about">About</button>
    <button class="tab-button" data-tab="projects">Current Projects</button>
  </div>

  <!-- Tab Content -->
  <div id="about" class="tab-content">
    <div class="content-card">
      <p>Hello! I'm a first-year PhD student in the Geometry, Groups and Dynamics division at the Max Planck Institute for Mathematics in the Sciences in Leipzig, Germany. I work under the supervision of James Farre as part of Anna Wienhard's research group.</p>
      
      <p>My research focuses on straight line foliations on half-dilation surfaces on punctured spheres. Here's a typical picture I would draw on a blackboard if someone would ask me what I work on:</p>
      
      <div class="blackboard-image">
        <picture>
          <source srcset="assets/images/IMG_6794.webp" type="image/webp">
          <img 
            src="assets/images/IMG_6794.jpg" 
            alt="Blackboard drawing of half-dilation surface" 
            class="research-diagram"
            width="800"
            height="600"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      
      <p>Before starting my PhD, I worked on polygonal symplectic billiards, where we proved several theorems about their dynamics.</p>
    </div>
  </div>

  <div id="projects" class="tab-content">
    <div class="content-card">
      <h2>Current Projects</h2>
      <p>[Under Construction]</p>
    </div>
  </div>
</div>

<!-- Optimized Font Awesome loading -->
<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/fontawesome.min.css" as="style">
<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/brands.min.css" as="style">
<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/solid.min.css" as="style">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/fontawesome.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/brands.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/solid.min.css">

<style>
:root {
  --accent-color: #A3A69A;
  --text-primary: #313131;
  --text-secondary: #666;
  --background-primary: #f8f9fa;
  --background-secondary: #f0f0f0;
}

@keyframes fadeIn {
  will-change: opacity, transform;
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    opacity: 0;
    animation: fadeIn 0.8s ease-out forwards;
    contain: content;
}

.profile-section {
    margin-bottom: 3rem;
    opacity: 0;
    animation: fadeIn 0.8s ease-out forwards;
    animation-delay: 0.2s;
    contain: layout style;
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

.profile-image {
    aspect-ratio: 1;
    width: 200px;
    margin: 0 auto 1rem;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid var(--accent-color);
    contain: layout paint;
}

.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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

.social-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-secondary);
    color: var(--text-primary);
    transition: transform 0.3s ease;
    will-change: transform;
}

.blackboard-image {
    max-width: 100%;
    margin: 2rem 0;
    border-radius: 8px;
    overflow: hidden;
    content-visibility: auto;
    contain: layout paint;
}

.research-diagram {
    width: 100%;
    height: auto;
    display: block;
    max-width: 800px;
    margin: 0 auto;
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
    animation: fadeIn 0.8s ease-out forwards;
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
    animation: fadeIn 0.8s ease-out forwards;
    animation-delay: 0.6s;
}

@media (max-width: 900px) {
    .profile-layout {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2rem;
    }

    .profile-image {
        width: 300px;
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
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  const initialTab = window.location.hash.slice(1) || 'about';
  setActiveTab(initialTab);
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      setActiveTab(tabName);
      history.pushState(null, null, `#${tabName}`);
    });
  });
  
  window.addEventListener('popstate', function() {
    const tabName = window.location.hash.slice(1) || 'about';
    setActiveTab(tabName);
  });
  
  function setActiveTab(tabName) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    const selectedButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(tabName);
    
    if (selectedButton && selectedContent) {
      selectedButton.classList.add('active');
      selectedContent.classList.add('active');
    }
  }
});
</script>