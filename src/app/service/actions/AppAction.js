const API_KEY = "5bab8e18e6c0674ce8e50e8efd003e9f";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/original";
export const REQUEST_MOVIES = "request_movies";
export const RECEIVE_MOVIES = "receive_movies";
function requestMovies() {
  return { type: REQUEST_MOVIES };
}
function receiveMovies(data = []) {
  return { type: RECEIVE_MOVIES, payload: data };
}

export const fetchMovies = () => {
  const finalUrl = `${BASE_URL}/discover/movie?primary_release_year=2007&sort_by=vote_average.desc &api_key=${API_KEY}`;
  return dispatch => {
    dispatch(requestMovies());
    fetch(finalUrl)
      .then(res => res.json())
      .then(res => dispatch(receiveMovies(res.results)))
      .catch(err => console.log(err));
  };
};
