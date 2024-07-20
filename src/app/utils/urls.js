export const API_URL = (type, category, page) =>
  `https://api.themoviedb.org/3/${type}/${category}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`;

export const API_DETAILS_URL = (type, movieId) =>
  `https://api.themoviedb.org/3/${type}/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US'`;

export const IMAGE_SRC = (size, posterPath) => {
  return `https://image.tmdb.org/t/p/${size}/${posterPath}`;
};
