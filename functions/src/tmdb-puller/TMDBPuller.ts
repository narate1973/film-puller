import { TmdbService } from "./tmdb.service";
import { PopularMovie } from "./arango-data-object/popular-movie.object";
import { parseDate } from "../utils";

export class TmdbPuller {
    constructor(private readonly tmdbService: TmdbService) { }

    async pullPopularMovies(): Promise<PopularMovie[]> {
        const popularMovies = await this.tmdbService.getPopularMovies();
        const popularMovieDTO: PopularMovie[] = popularMovies.results?.map((movie) => ({
            _key: movie.id?.toString() ?? null,
            adult: movie.adult ?? false,
            backdrop_path: movie.backdrop_path ?? "",
            genre_ids: movie.genre_ids ?? [],
            id: movie.id ?? 0,
            original_language: movie.original_language ?? "",
            original_title: movie.original_title ?? "",
            overview: movie.overview ?? "",
            popularity: movie.popularity ?? 0,
            poster_path: movie.poster_path ?? "",
            release_date: parseDate(movie.release_date) ?? new Date(),
            title: movie.title ?? "",
            video: movie.video ?? false,
            vote_average: movie.vote_average ?? 0,
            vote_count: movie.vote_count ?? 0,
        })) ?? [];
        return popularMovieDTO;
    }
}   