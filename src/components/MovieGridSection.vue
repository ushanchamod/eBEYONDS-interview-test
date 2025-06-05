<script setup>
import { onMounted, ref, watch } from 'vue'
import MovieCard from './MovieCard.vue'
import Search from './ui/Search.vue'
import Toast from './ui/Toast.vue'

const themoviedbBaseUrl = import.meta.env.VITE_THEMOVIEDB_API_URL
const themoviedbApiKey = import.meta.env.VITE_THEMOVIEDB_API_KEY

const toastRef = ref()

const movieList = ref([])
const searchMovieList = ref([])
const searchValue = ref('')

onMounted(async () => {
  const url = `${themoviedbBaseUrl}/trending/movie/day?language=en-US&api_key=${themoviedbApiKey}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  const res = await fetch(url, options)
  const json = await res.json()
  movieList.value = json.results.slice(0, 3)
  console.log(movieList.value[0])

  watch(searchValue, async (newValue) => {
    if (newValue) {
      const searchUrl = `${themoviedbBaseUrl}/search/movie?query=${encodeURIComponent(newValue)}&language=en-US&api_key=${themoviedbApiKey}`
      const searchRes = await fetch(searchUrl, options)
      const searchJson = await searchRes.json()
      searchMovieList.value = searchJson.results
      console.log(searchMovieList.value)
    } else {
      searchMovieList.value = []
    }
  })
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
      <Search styles="" @search="
        (value) => {
          searchValue = value
        }
      " :searchMovieList="searchMovieList" @add-movie="addMovieToList" />
    </div>
    <div class="card-container">
      <MovieCard v-if="movieList.length > 0" v-for="movie in movieList" :key="movie.id" :movie="movie"
        @remove-movie="handleRemoveMovie" />

      <div v-else class="no-movies">
        <p>No movies found. Please search for a movie to add to your list.</p>
      </div>
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

      title {
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

  @media (max-width: 780px) {
    padding: $section-top-padding calc($horizontal-padding / 2) $section-bottom-padding calc($horizontal-padding / 2);
  }
}
</style>
