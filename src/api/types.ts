export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface MovieSummary {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieSearchResult {
  page: number;
  results: MovieSummary[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailResult {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  videos: VideoListResponse;
  credits: CreditsResponse;
  reviews: ReviewListResponse;
}

export interface CreditsResponse {
  id: number;
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }[];
}

export interface VideoListResponse {
  id: number;
  results: {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
    published_at: string;
  }[];
}

export interface ReviewListResponse {
  id: number;
  page: number;
  results: {
    id: string;
    author: string;
    content: string;
    created_at: string;
  }[];
  total_pages: number;
  total_results: number;
}

export interface GenreListResponse {
  genres: { id: number; name: string }[];
}

export interface MovieListResponse {
  page: number;
  results: MovieSummary[];
  total_pages: number;
  total_results: number;
}
