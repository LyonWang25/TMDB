import { createGetRequest } from "./api-client";
import {
  MovieSearchResult,
  MovieDetailResult,
  CreditResponse,
  VideoListResponse,
  GenreListResponse,
  MovieListResponse,
  ReviewResponse,
} from "./types";

export const API = {
  searchMovies: (query: string, page = 1) =>
  createGetRequest<MovieSearchResult>("/search/movie")({ query, page }),
  getMovieDetail: (id: number) =>
    createGetRequest<MovieDetailResult>(`/movie/${id}`)({
      append_to_response: "videos,credits,reviews",
    }),
  getMovieCredits: (id: number) =>
    createGetRequest<CreditResponse>(`/movie/${id}/credits`)(),
  getMovieVideos: (id: number) =>
    createGetRequest<VideoListResponse>(`/movie/${id}/videos`)(),
  getMovieReviews: (id: number, page = 1) =>
    createGetRequest<ReviewResponse>(`/movie/${id}/reviews`)({ page }),
  getGenres: createGetRequest<GenreListResponse>("/genre/movie/list"),
  getPopularMovies: (page = 1) =>
    createGetRequest<MovieListResponse>("/movie/popular")({ page }),
  getNowPlayingMovies: (page = 1) =>
    createGetRequest<MovieListResponse>("/movie/now_playing")({ page }),
  getUpcomingMovies: (page = 1) =>
    createGetRequest<MovieListResponse>("/movie/upcoming")({ page }),
  getTopRatedMovies: (page = 1) =>
    createGetRequest<MovieListResponse>("/movie/top_rated")({ page }),
};
