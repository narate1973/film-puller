import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { aql, Database } from "arangojs";
import { TmdbPuller } from "./tmdb-puller/TMDBPuller";
import { TmdbService } from "./tmdb-puller/tmdb.service";
import { initializeApp } from "firebase-admin/app";

// Initialize Firebase Admin
initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const db = new Database({
  url: "http://localhost:8529",
  auth: { username: "root", password: "test123" },
});


const tmdbService = new TmdbService();
const tmdbPuller = new TmdbPuller(tmdbService);

// export const pullMovie = onSchedule("every day 00:00", async () => {
//   const popularMovies = await tmdbPuller.pullPopularMovies();
//   await db.collection("popular_movie").import(popularMovies);
// });

export const pullPopularMovies = onRequest(async (request, response) => {
  const popularMovies = await tmdbPuller.pullPopularMovies();
  try {
    await db.collection("popular_movie").import(popularMovies);
    response.send(popularMovies);
  } catch (err) {
    console.error("Database error:", err);
    response.status(500).send(`Database error: ${err}`);
  }
});

export const getPopularMovies = onRequest(async (request, response) => {
  try {
    const films = await db.query(aql`
      FOR film IN popular_movie
      RETURN film
    `);
    var filmList: any[] = [];
    for await (const film of films) {
      filmList.push(film);
    }
    response.send({
      data: filmList
    });
  } catch (err) {
    console.error("Database error:", err);
    response.status(500).send(`Database error: ${err}`);
  }
  logger.info("Hello logs!", { structuredData: true });
});
