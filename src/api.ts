import axios from "axios";

const API_KEY = "d2b9817f48c3f041b5525978824be481";
const BASE_URL = "https://api.themoviedb.org/3";

// Movie 
export interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
};

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
};

interface IGenreList {
    id: number;
    name: string;
}

export interface IGetGenreList {
    genres: IGenreList[]
}

export async function getNowPlayingMovies() {
    const LANGUAGE = "ko";
    const page = 1;
    const response = await axios.get(`${BASE_URL}/movie/now_playing?language=${LANGUAGE}&page=${page ?? 1}&api_key=${API_KEY}`);
    return response.data;
};

export const getPopularMovies = async () => {
    const LANGUAGE = "ko";
    const page = 1;
    const reponse = await axios.get(`${BASE_URL}/movie/popular?language=${LANGUAGE}&page=${page ?? 1}&api_key=${API_KEY}`);
    return reponse.data;
}

export const getTopRatedMovies = async () => {
    const LANGUAGE = "ko";
    const page = 1;
    const reponse = await axios.get(`${BASE_URL}/movie/top_rated?language=${LANGUAGE}&page=${page ?? 1}&api_key=${API_KEY}`);
    return reponse.data;
}

export const getUpcomingMovies = async () => {
    const LANGUAGE = "ko";
    const page = 1;
    const reponse = await axios.get(`${BASE_URL}/movie/upcoming?language=${LANGUAGE}&page=${page ?? 1}&api_key=${API_KEY}`);
    return reponse.data;
}

export const getGenreList =async () => {
    const LANGUAGE ="ko";
    const response = await axios.get(`${BASE_URL}/genre/movie/list?language=${LANGUAGE}&api_key=${API_KEY}`);
    return response.data;
}
// Tv Series

interface ITvSeries {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vate_average: number;
    vote_count: number;
};

export interface IGetTvSeriesResult {
    page: number;
    results: ITvSeries[];
    total_pages: number;
    total_results: number;
}

export async function getTvSeriesPopular() {
    const adult = true;
    const LANGUAGE = "ko";
    const page = 1;
    const SORT_BY = "popularity.desc";
    const reponse = await axios.get(`${BASE_URL}/discover/tv?include_adult=${adult}&language=${LANGUAGE}&page=${page}&sort_by=${SORT_BY}&api_key=${API_KEY}`);
    return reponse.data;
}