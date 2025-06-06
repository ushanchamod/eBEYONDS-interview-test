<!--
  SearchInput.vue

  A reusable movie search input component with dropdown results.

  Features:
  - Accepts a list of movie objects via `searchMovieList` prop.
  - Emits `search` event on input for real-time filtering.
  - Emits `add-movie` event when a movie is selected.
  - Auto-clears input when clicked outside the component.
  - Renders movie posters and titles in the dropdown.
  - Shows fallback image when poster is unavailable.
  - Supports styling via `styles` prop.
  - Displays loading state and no results message.
-->

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const searchInput = ref(null)
const dropdownRef = ref(null)
const props = defineProps({
  styles: {
    type: String,
    default: '',
  },
  searchMovieList: {
    type: Array,
    default: () => [],
  },
  searchLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['search', 'add-movie'])

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    if (searchInput.value) {
      searchInput.value.value = ''
      emit('search', '')
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="search-container" ref="dropdownRef">
    <div class="field" :style="styles">
      <label for="search-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22.414"
          height="22.414"
          viewBox="0 0 22.414 22.414"
        >
          <g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(1 1)">
            <path
              id="Path_17"
              data-name="Path 17"
              d="M22.278,13.389A8.889,8.889,0,1,1,13.389,4.5a8.889,8.889,0,0,1,8.889,8.889Z"
              transform="translate(-4.5 -4.5)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
            <path
              id="Path_18"
              data-name="Path 18"
              d="M29.808,29.808l-4.833-4.833"
              transform="translate(-9.808 -9.808)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </g>
        </svg>
      </label>
      <input
        type="search"
        id="search-label"
        placeholder="Search title and add to grid"
        @input="(e) => emit('search', e.target.value)"
        ref="searchInput"
        aria-label="Search movies"
      />

      <div class="search-list" v-if="searchInput?.value?.length">
        <ul v-if="searchLoading" class="loading-list">
          <li>Loading...</li>
        </ul>
        <ul v-else-if="!searchMovieList.length" class="no-results">
          <li>No results found</li>
        </ul>
        <ul v-else class="movie-list">
          <li v-for="(movie, index) in searchMovieList" :key="index">
            <img
              v-if="movie.poster_path"
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              alt="movie poster"
              class="movie-poster"
              loading="lazy"
            />
            <div v-else class="movie-poster crash-image">
              <img src="../../assets/icons/crash_image.webp" alt="placeholder poster" />
            </div>
            <span class="movie-title">{{ movie.title }}</span>
            <button
              @click.stop="emit('add-movie', movie)"
              class="btn btn-primary add-button"
              aria-label="Add to grid"
            >
              add to grid
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/assets/styles/variables.scss' as *;

.search-container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 100%;
}

.field {
  position: relative;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  align-items: center;
  border: 1px solid $font-gray;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  width: 100%;
  background-color: $secondary-color-background;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: $primary-color-foreground;
    // box-shadow: 0 0 0 2px rgba($primary-color-background, 0.2);
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex-shrink: 0;
    font-family: $subtitle-font;

    svg {
      width: 1.25rem;
      height: 1.25rem;
      transition: transform 0.2s ease;
    }

    &:hover svg {
      transform: scale(1.1);
    }
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    color: $font-white;
    font-size: 1rem;
    width: 100%;
    height: 100%;
    padding: 0.25rem 0;
    font-weight: 400;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      transition: opacity 0.2s ease;
    }

    &:focus::placeholder {
      opacity: 0.5;
    }
  }

  .search-list {
    position: absolute;
    background-color: $secondary-color-background;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    max-height: min(60vh, 500px);
    overflow-y: auto;
    border: 1px solid #646464;
    border-radius: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
    z-index: 9;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    scrollbar-width: thin;
    scrollbar-color: $primary-color-background rgba(255, 255, 255, 0.1);

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $primary-color-background;
      border-radius: 3px;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #474747;
      cursor: pointer;
      transition: all 0.2s ease;
      gap: 0.75rem;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &:last-child {
        border-bottom: none;
      }
    }

    .movie-poster {
      width: 45px;
      height: 67px;
      object-fit: cover;
      border-radius: 4px;
      flex-shrink: 0;
      background-color: rgba(255, 255, 255, 0.05);
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.03);
      }

      &.crash-image {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        background-color: rgba(255, 255, 255, 0.1);

        img {
          width: 1.5rem;
          opacity: 0.6;
        }
      }
    }

    .movie-title {
      flex: 1;
      color: $font-white;
      font-size: 0.95rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    .add-button {
      margin-left: auto;
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      background-color: $primary-color-background;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        background-color: color.mix(black, $primary-color-background, 15%);
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .loading-list,
    .no-results {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: $font-gray;
      font-size: 1rem;
      padding: 1rem;

      li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
    .loading-list {
      background-color: rgba(255, 255, 255, 0.05);
    }
    .no-results {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

/* Responsive styles */
@media (max-width: 1024px) {
  .field {
    padding: 0.65rem 0.9rem;

    .search-list {
      max-height: min(50vh, 400px);

      li {
        padding: 0.65rem 0.9rem;
        gap: 0.65rem;
      }

      .movie-poster {
        width: 40px;
        height: 60px;
      }

      .add-button {
        padding: 0.45rem 0.8rem;
        font-size: 0.8rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .field {
    padding: 0.6rem 0.8rem;
    gap: 0.8rem;

    input {
      font-size: 0.95rem;
    }

    .search-list {
      max-height: min(60vh, 400px);

      li {
        flex-wrap: wrap;
        padding: 0.6rem;
        gap: 0.6rem;
      }

      .movie-poster {
        width: 35px;
        height: 52px;
      }

      .movie-title {
        font-size: 0.9rem;
        order: 1;
        width: calc(100% - 40px);
      }

      .add-button {
        order: 2;
        margin-left: 40px;
        margin-top: 0.25rem;
        padding: 0.4rem 0.7rem;
        font-size: 0.75rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .field {
    padding: 0.5rem 0.7rem;
    gap: 0.6rem;

    input {
      font-size: 0.9rem;

      &::placeholder {
        font-size: 0.85rem;
      }
    }

    .search-list {
      max-height: min(70vh, 350px);

      li {
        padding: 0.5rem;
        gap: 0.5rem;
      }

      .movie-poster {
        width: 30px;
        height: 45px;

        &.crash-image img {
          width: 1.25rem;
        }
      }

      .movie-title {
        font-size: 0.85rem;
        width: calc(100% - 35px);
      }

      .add-button {
        margin-left: 35px;
        padding: 0.35rem 0.6rem;
        font-size: 0.7rem;
      }
    }
  }
}
</style>
