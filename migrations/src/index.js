"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const arangojs_1 = require("arangojs");
const db = new arangojs_1.Database({
    url: "http://localhost:8529",
    auth: { username: "root", password: "test123" },
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create popular_movie collection if it doesn't exist
            const popularMovieCollection = "popular_movie";
            const collections = yield db.collections();
            const exists = collections.some(collection => collection.name === popularMovieCollection);
            if (!exists) {
                yield db.collection(popularMovieCollection).create();
                yield db.collection(popularMovieCollection).properties({
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
            }
            else {
                console.log(`Collection ${popularMovieCollection} already exists`);
            }
        }
        catch (err) {
            console.error("Error during migration:", err);
            process.exit(1);
        }
    });
}
main();
