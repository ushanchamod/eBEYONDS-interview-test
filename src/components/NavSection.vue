<script>
export default {
  mounted() {
    // Mobile menu toggle functionality
    const mobileNav = document.querySelector('.mobile-nav')
    const hamburger = mobileNav.querySelector('.hamburger')
    const overlay = mobileNav.querySelector('.mobile-overlay')
    const mobileMenu = mobileNav.querySelector('.mobile-menu')
    const menuLinks = mobileMenu.querySelectorAll('a')

    // Toggle menu when hamburger clicked
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active')
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true'
      hamburger.setAttribute('aria-expanded', !isExpanded)
    })

    // Close menu when overlay is clicked
    overlay.addEventListener('click', () => {
      mobileNav.classList.remove('active')
      hamburger.setAttribute('aria-expanded', 'false')
    })

    // Close menu when clicking on links
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active')
        hamburger.setAttribute('aria-expanded', 'false')
      })
    })

    // Close menu when clicking add button
    const addButton = mobileMenu.querySelector('.mobile-add-button')
    if (addButton) {
      addButton.addEventListener('click', () => {
        mobileNav.classList.remove('active')
        hamburger.setAttribute('aria-expanded', 'false')
      })
    }
  },
}
</script>

<template>
  <div class="nav-section">
    <!-- Desktop Navigation -->
    <nav class="desktop-nav" aria-label="Main navigation">
      <div class="logo-section">
        <img src="@/assets/logos/logo_white.svg" alt="Company Logo" class="logo" />
      </div>

      <div class="nav-link-section">
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#service">Our Service</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#library">Movie Library</a></li>
          <li><a href="#location-and-contact">Location & Contact</a></li>
          <!-- <li class="nav-button"><button aria-label="Add New">+</button></li> -->
        </ul>
      </div>
    </nav>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav" aria-label="Mobile navigation">
      <div class="mobile-header">
        <div class="logo-section">
          <img src="@/assets/logos/logo_white.svg" alt="Company Logo" class="logo" />
        </div>
        <button class="hamburger" aria-label="Menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Overlay that appears when menu is open -->
      <div class="mobile-overlay"></div>

      <!-- Side menu -->
      <div class="mobile-menu">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#service">Our Service</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#library">Movie Library</a></li>
          <li><a href="#location-and-contact">Location & Contact</a></li>
        </ul>
        <!-- <button class="mobile-add-button" aria-label="Add New">+</button> -->
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.nav-section {
  width: 100%;
  background: rgba(0, 0, 0, 0.767);
  backdrop-filter: blur(10px);
  position: fixed;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  z-index: 10;
}

// Desktop Styles
.desktop-nav {
  width: 100%;
  max-width: $max-content-width;
  margin: 0 auto;
  padding: 10px 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo-section {
    width: 15rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .logo {
      width: 100%;
      height: auto;
    }
  }

  .nav-link-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    gap: 1.25rem;

    .nav-links {
      display: flex;
      gap: 1.25rem;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        justify-content: center;

        a {
          font-family: $subtitle-font;
          text-transform: uppercase;
          text-decoration: none;
          color: $font-white;
          font-weight: 300;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border-bottom: 2px solid transparent;

          &:hover {
            color: $font-white;
            border-bottom: 2px solid $font-white;
          }
        }
      }
    }
  }
}

// Mobile Styles
.mobile-nav {
  display: none;
  width: 100%;

  .mobile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 1.25rem;

    .logo-section {
      width: 10rem;

      .logo {
        width: 100%;
        height: auto;
      }
    }

    .hamburger {
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 21px;
      width: 30px;
      padding: 0;
      z-index: 12;
      position: relative;

      span {
        display: block;
        height: 3px;
        width: 100%;
        background: white;
        transition: all 0.3s ease;
      }
    }
  }

  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    z-index: 11;
    transition: right 0.3s ease;
    padding-top: 70px;
    overflow-y: auto;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 1rem 1.25rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        a {
          color: $font-white;
          text-decoration: none;
          text-transform: uppercase;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 1rem;
          display: block;
          width: 100%;

          &:hover {
            color: $primary-color-foreground;
          }
        }
      }
    }

    .mobile-add-button {
      margin: 1.5rem;
      font-size: 1.25rem;
      background: $primary-color-foreground;
      color: $primary-color-foreground;
      border: none;
      border-radius: 0.25rem;
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      display: block;
    }
  }

  &.active {
    .hamburger span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }

    .hamburger span:nth-child(2) {
      opacity: 0;
    }

    .hamburger span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }

    .mobile-overlay {
      opacity: 1;
      visibility: visible;
    }

    .mobile-menu {
      right: 0;
    }
  }
}

@media (max-width: 1000px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
  }
}
</style>
