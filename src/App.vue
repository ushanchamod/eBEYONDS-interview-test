<script setup>
import ContactMapSection from './components/ContactMapSection.vue'
import Footer from './components/Footer.vue'
import HeroSection from './components/HeroSection.vue'
import MovieGridSection from './components/MovieGridSection.vue'
import NavSection from './components/NavSection.vue'
</script>

<template>
  <div class="app-container">
    <NavSection />
    <HeroSection />
    <MovieGridSection />
    <ContactMapSection />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  overflow-x: hidden;
}
</style>
