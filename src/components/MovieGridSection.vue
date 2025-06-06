<script setup>
import { onMounted, ref, watch } from 'vue'
import MovieCard from './MovieCard.vue'
import Search from './ui/Search.vue'
import Toast from './ui/Toast.vue'
import { fetchTrendingMovies, searchMovies } from '@/composables/useMovieApi'

const themoviedbBaseUrl = import.meta.env.VITE_THEMOVIEDB_API_URL
const themoviedbApiKey = import.meta.env.VITE_THEMOVIEDB_API_KEY

const toastRef = ref()
const movieList = ref([])
const searchMovieList = ref([])
const searchValue = ref('')
const isLoading = ref(false)
const searchLoading = ref(false)
const error = ref(null)

let debounceTimeout = null
function debounce(fn, delay) {
  return function (...args) {
    if (debounceTimeout) clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

onMounted(async () => {
  isLoading.value = true
  error.value = null
  try {
    const trending = await fetchTrendingMovies(themoviedbBaseUrl, themoviedbApiKey)
    movieList.value = trending.slice(0, 3)
  } catch (err) {
    error.value = 'Failed to load trending movies.'
  } finally {
    isLoading.value = false
  }
})

const handleSearch = debounce(async (query) => {
  if (!query) {
    searchMovieList.value = []
    return
  }

  error.value = null
  try {
    searchLoading.value = true
    const results = await searchMovies(themoviedbBaseUrl, themoviedbApiKey, query)
    searchMovieList.value = results
  } catch (err) {
    error.value = 'Failed to search movies.'
  } finally {
    searchLoading.value = false
  }
}, 500)

watch(searchValue, (newVal) => {
  handleSearch(newVal)
})

const notifyUser = (message) => {
  toastRef.value?.showToast(message)
}

const addMovieToList = (movie) => {
  if (!movieList.value.some((m) => m.id === movie.id)) {
    movieList.value.push(movie)
    notifyUser(`Movie "${movie.title || movie.original_title}" added to your list!`)
  } else {
    notifyUser(`Movie "${movie.title || movie.original_title}" is already in your list!`)
  }
}

const handleRemoveMovie = (movieId) => {
  movieList.value = movieList.value.filter((movie) => movie.id !== movieId)
  notifyUser(`Movie removed from your list!`)
}
</script>

<template>
  <Toast ref="toastRef" />
  <section>
    <div class="title-section">
      <h2 class="title">Collect your favorites</h2>
      <Search
        @search="(value) => (searchValue = value)"
        :searchMovieList="searchMovieList"
        :searchLoading="searchLoading"
        @add-movie="addMovieToList"
        :loading="isLoading"
      />
    </div>

    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="!isLoading && !error" class="error">{{ error }}</div>
    <div v-else class="no-movies">
      <p>No movies found. Please search for a movie to add to your list.</p>
    </div>

    <div class="card-container">
      <MovieCard
        v-for="movie in movieList"
        :key="movie.id"
        :movie="movie"
        @remove-movie="handleRemoveMovie"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

section {
  width: 100%;
  max-width: $max-content-width;
  margin: 0 auto;
  padding: $section-top-padding $horizontal-padding $section-bottom-padding $horizontal-padding;

  .title-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    align-items: center;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 3px solid #fff;

    .title {
      color: $main-title-color;
      font-family: $main-title-font;
      font-size: $main-title-font-size;
      font-weight: $main-title-font-weight;
      width: 100%;
      text-align: left;
      white-space: nowrap;
    }

    @media (max-width: 730px) {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;

      .title {
        font-size: 1.8rem;
        text-align: center;
        white-space: normal;
      }
    }
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    width: 100%;

    .no-movies {
      grid-column: 1 / -1;
      text-align: center;
      color: $font-gray;
      font-size: 1.2rem;
      padding: 2rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    }
  }

  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: $font-gray;
    padding: 1rem;
  }

  .error {
    text-align: center;
    color: red;
    font-size: 1.1rem;
    padding: 1rem;
  }

  @media (max-width: 780px) {
    padding: $section-top-padding calc($horizontal-padding / 2) $section-bottom-padding
      calc($horizontal-padding / 2);
  }
}
</style>
