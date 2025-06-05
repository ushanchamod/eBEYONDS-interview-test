<script setup>
const imageBaseUrl = import.meta.env.VITE_THEMOVIEDB_IMAGE_URL

defineProps({
  movie: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['remove-movie'])

const removeMovie = (movieId) => {
  emit('remove-movie', movieId)
}
</script>

<template>
  <div class="card">
    <div class="image-section">
      <img v-if="movie.poster_path" :src="`${imageBaseUrl}${movie.poster_path}`"
        :alt="movie.title || movie.original_title" class="movie-poster" />

      <div v-else class="placeholder-poster">
        <img src="../assets/icons/crash_image.webp" alt="placeholder poster" />
      </div>

      <div class="svg-icon" @click="removeMovie(movie.id)">
        <svg xmlns="http://www.w3.org/2000/svg" width="12.728" height="12.728" viewBox="0 0 12.728 12.728"
          class="icon-plus">
          <g id="Group_8592" data-name="Group 8592" transform="translate(-441.636 -1013.036)">
            <g id="Group_8586" data-name="Group 8586" transform="translate(1226.737 -260.675) rotate(45)">
              <line id="Line_133" data-name="Line 133" x2="16" transform="translate(346.5 1455.8)" fill="none"
                stroke="#fff" stroke-width="2" />
              <line id="Line_134" data-name="Line 134" x2="16" transform="translate(354.5 1447.8) rotate(90)"
                fill="none" stroke="#fff" stroke-width="2" />
            </g>
          </g>
        </svg>
      </div>
    </div>
    <div class="details-section">
      <p class="movie-name">
        {{ movie.title || movie.original_title }}
      </p>
      <p class="movie-description">
        {{
          movie.overview && movie.overview.length > 0
            ? movie.overview.length > 96
              ? movie.overview.substring(0, 96) + '...'
              : movie.overview
            : 'No description available.'
        }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.card {
  width: 100%;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: $movie-card-background;

  .image-section {
    width: 100%;
    height: fit-content;
    background-color: rgb(158, 158, 158);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    aspect-ratio: 2 / 3;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.2s ease-in-out;
    }

    .svg-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.596);
      transition:
        background-color 0.2s ease-in-out,
        scale 0.3s ease-in-out;

      .icon-plus {
        color: $font-white;
        transition: rotate 0.2s ease-in-out;
      }

      &:hover {
        background-color: $danger-color;
        scale: 1.2;

        .icon-plus {
          rotate: 90deg;
        }
      }
    }

    .placeholder-poster {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 5rem;
        height: auto;
        opacity: 0.5;
      }
    }
  }

  .details-section {
    background-color: $movie-card-background;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;

    height: fit-content;

    .movie-name {
      font-size: 1.6rem;
      color: $font-white;
      padding-bottom: 0.5rem;
      font-family: $movie-card-title-font;
      font-weight: bold;
    }

    .movie-description {
      font-family: $movie-card-description-font;
      font-size: 1.2rem;
      color: #d4d4d4;
      padding-bottom: 0.5rem;
      line-height: 1.4;
      letter-spacing: 1px;
    }
  }

  &:hover {
    .image-section img {
      transform: scale(1.02);
    }
  }
}
</style>
