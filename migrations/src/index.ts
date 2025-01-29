import { Database } from "arangojs";

const db = new Database({
    url: "http://localhost:8529",
    auth: { username: "root", password: "test123" },
});

async function main() {
    try {
        // Create popular_movie collection if it doesn't exist
        const popularMovieCollection = "popular_movie";
        const collections = await db.collections();
        const exists = collections.some(collection => collection.name === popularMovieCollection);

        if (!exists) {
            await db.collection(popularMovieCollection).create();
            await db.collection(popularMovieCollection).properties({
                schema: {
                    rule: {
                        type: "object",
                        required: [
                            "adult",
                            "backdrop_path",
                            "genre_ids",
                            "id",
                            "original_language",
                            "original_title",
                            "overview",
                            "popularity",
                            "poster_path",
                            "release_date",
                            "title",
                            "video",
                            "vote_average",
                            "vote_count"
                        ],
                        properties: {
                            "adult": {
                                "type": "boolean"
                            },
                            "backdrop_path": {
                                "type": "string"
                            },
                            "genre_ids": {
                                "type": "array",
                                "items": {
                                    "type": "integer"
                                }
                            },
                            "id": {
                                "type": "integer"
                            },
                            "original_language": {
                                "type": "string"
                            },
                            "original_title": {
                                "type": "string"
                            },
                            "overview": {
                                "type": "string"
                            },
                            "popularity": {
                                "type": "number"
                            },
                            "poster_path": {
                                "type": "string"
                            },
                            "release_date": {
                                "type": "string"
                            },
                            "title": {
                                "type": "string"
                            },
                            "video": {
                                "type": "boolean"
                            },
                            "vote_average": {
                                "type": "number"
                            },
                            "vote_count": {
                                "type": "integer"
                            },
                        },
                    },
                },
            });

            console.log(`Collection ${popularMovieCollection} created successfully`);
        } else {
            console.log(`Collection ${popularMovieCollection} already exists`);
        }
    } catch (err) {
        console.error("Error during migration:", err);
        process.exit(1);
    }
}

main();
