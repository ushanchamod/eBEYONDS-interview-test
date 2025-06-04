<template>
  <footer>
    <div class="footer-content">
      <p class="copyright-section">Copyright &copy; 2022 Amadeus Hotels. All rights reserved.</p>
      <p class="photos-by-section">
        Photos by
        <a href="#" target="_blank" rel="noopener noreferrer">Felix Mooneeram</a>
        &
        <a href="#" target="_blank" rel="noopener noreferrer">Serge Kutuzov</a>
        on
        <a href="#" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

footer {
  width: 100%;
  border-top: 1px solid $footer-border-color;

  .footer-content {
    width: 100%;
    max-width: $max-content-width;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc($section-top-padding / 2) $horizontal-padding calc($section-bottom-padding / 2) $horizontal-padding;

    .copyright-section,
    .photos-by-section {
      color: $footer-text-color;
      font-family: $subtitle-font;

      a {
        color: $footer-text-color;
      }
    }

    @media (max-width: 720px) {
      background-color: $primary-color-background;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-size: 1rem;
      gap: 0.8rem;
      padding: $section-top-padding calc($horizontal-padding / 2) $section-bottom-padding calc($horizontal-padding / 2);
    }
  }
}
</style>
