<script setup></script>

<template>
  <section class="hero-section">
    <div class="hero-image">
      <img src="../assets/images/header_image.webp" alt="backdrop" />
    </div>
    <div class="hero-content">
      <div class="center-content">
        <h1>Movie Library</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.hero-section {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  // overflow: hidden;

  .hero-image {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: bottom center;
    }
  }

  .hero-content {
    width: 100%;
    height: fit-content;
    background-color: $primary-color-background;

    .center-content {
      width: 100%;
      max-width: $max-content-width;
      margin: 0 auto;
      padding: 30px $horizontal-padding $section-bottom-padding $horizontal-padding;

      h1 {
        text-transform: uppercase;
        font-family: $main-title-font;
        font-size: calc($main-title-font-size * 1.4);
        font-weight: $main-title-font-weight;
        color: $main-title-color;
        margin-bottom: 1rem;
      }

      p {
        font-family: $subtitle-font;
        font-size: $subtitle-font-size;
        color: $subtitle-color;
        line-height: 1.5;
        font-weight: $subtitle-font-weight;
        max-width: 50ch;
        margin-bottom: 1.5rem;
      }
    }

    @media (max-width: 780px) {
      grid-template-columns: auto auto;

      .center-content {
        padding: $section-top-padding calc($horizontal-padding / 2) $section-bottom-padding
          calc($horizontal-padding / 2);
      }
    }
  }
}
</style>
