// src/api/api.ts
import { createGetRequest } from "./api-client";
import { MovieSearchResult,
  MovieDetailResult,
  CreditsResponse,
  VideoListResponse,
  ReviewListResponse,
  GenreListResponse,
  MovieListResponse, } from "./types";

export const API = {
  searchMovies: createGetRequest<MovieSearchResult>("/search/movie"),
  getMovieDetail: (id: number) =>
    createGetRequest<MovieDetailResult>(`/movie/${id}`)({
      append_to_response: "videos,credits,reviews",
    }),
  getMovieCredits: (id: number) =>
    createGetRequest<CreditsResponse>(`/movie/${id}/credits`)(),
  getMovieVideos: (id: number) =>
    createGetRequest<VideoListResponse>(`/movie/${id}/videos`)(),
  getMovieReviews: (id: number, page = 1) =>
    createGetRequest<ReviewListResponse>(`/movie/${id}/reviews`)({ page }),
  getGenres: createGetRequest<GenreListResponse>("/genre/movie/list"),
  getPopularMovies: (page = 1) =>
    createGetRequest<MovieListResponse>("/movie/popular")({ page }),
  getNowPlayingMovies: (page = 1) =>
    createGetRequest<MovieListResponse>("/movie/now_playing")({ page }),
  getUpcomingMovies: (page = 1) =>
    createGetRequest<MovieListResponse>("/movie/upcoming")({ page }),
};
