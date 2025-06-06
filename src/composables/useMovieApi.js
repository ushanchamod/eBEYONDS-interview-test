export const fetchTrendingMovies = async (apiUrl, apiKey) => {
  const url = `${apiUrl}/trending/movie/day?language=en-US&api_key=${apiKey}`
  const res = await fetch(url)
  const json = await res.json()
  return json.results
}

export const searchMovies = async (apiUrl, apiKey, query) => {
  const url = `${apiUrl}/search/movie?query=${encodeURIComponent(query)}&language=en-US&api_key=${apiKey}`
  const res = await fetch(url)
  const json = await res.json()
  return json.results
}
