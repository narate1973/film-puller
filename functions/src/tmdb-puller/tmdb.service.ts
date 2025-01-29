import { CreditsResponse, MovieDb, PopularMoviesResponse } from 'moviedb-promise';

export class TmdbService {
  private movieDb: MovieDb;

  constructor() {
    this.movieDb = new MovieDb('52f478e292ed35ceb8701fdd71cb7e41');
  }

  async getPopularMovies(): Promise<PopularMoviesResponse> {
    const popularMovies = await this.movieDb.moviePopular();
    return popularMovies;
  }
  
  async getCast(movieId: number): Promise<CreditsResponse> {
    const cast = await this.movieDb.movieCredits(movieId);
    return cast;
  }
}
