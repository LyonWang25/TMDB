// utils/movie.ts
import { MovieDetailResult, MovieSummary } from "../api/types";

export function convertToMovieSummary(detail: MovieDetailResult): MovieSummary {
  return {
    id: detail.id,
    title: detail.title,
    overview: detail.overview,
    release_date: detail.release_date,
    poster_path: (detail as any).poster_path ?? null,
    backdrop_path: (detail as any).backdrop_path ?? null,
    vote_average: detail.vote_average,
    vote_count: 0, 
    genre_ids: detail.genres?.map((g) => g.id) ?? [],
    adult: detail.adult,
    addedAt: Date.now(), 
  };
}
