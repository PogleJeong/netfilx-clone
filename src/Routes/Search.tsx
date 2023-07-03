import { useQuery } from "react-query";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { IGetMoviesResult, getKeywordMovies } from "../api";
import { makeImagePath } from "../util";
import { AnimatePresence, motion } from "framer-motion";
import MovieDetail from "../Components/Search/MovieDetail";

const Wrapper = styled.div`
    position: relative;
    overflow: scroll;
    h2 {
        font-size: 2em;
        font-weight: bold;
        margin: 10px 20px;
        margin-bottom: 30px;
    }
`

const Banner = styled.div<{bannerimage: string}>`
    position: relative;
    background-image: linear-gradient( rgba(0,0,0,0.5), rgba(0,0,0,0), rgba(0, 0, 0, 0.5)), url(${props=>props.bannerimage});
    background-size: cover;
    height: 500px;
    margin-bottom: 20px;
`

const ResultList = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(8, 200px);
    gap: 20px;
    max-height: 100vh;
`

const MovieInfo = styled.div<{bgimage: string}>`
    position: relative;
    background-image: url(${(props)=>props.bgimage});
    background-size: cover;
    transition: scale 0.2s;
    h2 {
        position: absolute;
        transform-origin: bottom center;
        left: 0;
        bottom: 0;
        width: 100%;
        margin: 0;
        padding: 10px;
        font-size: 1em;
        font-weight: bold;
        text-align: center;
        color: white;
        background-color: rgba(0,0,0,0.5);
        opacity: 0;
        transition: opacity 0.5s;
        
    }
    &:hover {
        h2{
            opacity: 1;
        }
    }
`

const DetailBox = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    position: absolute;
    top:0;
    right: 0;
    transform-origin: center right;
    padding: 50px 15px;
    width: 500px;
    height: 100%;
    background-color: rgb(0,0,20);
    h2 {
        font-size: 2em;
        font-weight: bold;
        text-align: center;
    }
`

const DetailPoster = styled.div<{poster: string}>`
    background-image: url(${props=>props ? props.poster : ""});
    background-size: cover;
    margin: 5% 10%;
    width: 80%;
    height: 400px;

`

const DetailInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 0% 10%;
    width: 100%;
    height: 120px;
    
    justify-items: center;
    align-items: center;
    h2 {
        font-size: 1em;
        margin: 0px;
        padding: 0px;
    }
`

const DetailOverview = styled.div`
    padding: 10%;
    font-size: 1em;
    span {
        line-height: 180%;
    }
`

const ExitBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    aspect-ratio: 2/1;
    border:none;
    border-radius: 5px;
    background-color: beige;
    font-size: 0.5em;
    color: black;
    &:hover {
        cursor: pointer;
    }
`

const detailBoxVariants = {
    start: {
        scaleX: 0,
    },
    animate: {
        scaleX: 1,
        transition: {
            duration: 1,
        }
    },
    end: {
        scaleX: 0,
    }
}

function Search() {
    // 쿼리스트링을 통해 영화정보를 가져옴.
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const searchMatch = useMatch("/search/:movieId");
    const keyword = searchParams.get("keyword");
    const { data, isLoading } = useQuery<IGetMoviesResult>(["search", "keyword"], ()=>getKeywordMovies(keyword || "")); // null 일 경우 빈문자열
    const clickMovieInfo = (movieId: number) => {
        navigate({pathname: `/search/${movieId}`, search: `?keyword=${keyword}`}); // 기존경로 + 기존쿼리스트링
    }
    const clickedMovie = searchMatch?.params.movieId && data?.results.find((movie)=> movie.id === +searchMatch?.params.movieId!);
    

    return (
        <Wrapper>
            <Banner bannerimage={makeImagePath(data?.results[0]?.backdrop_path! || "")} />
            <h2>검색어 "{keyword}" 에 대한 검색결과</h2>
            {isLoading ? 
                <h2>{keyword}에 대한 검색 진행중...</h2>
                :
                data?.results ?
                <ResultList>
                    {data?.results
                    .map((movie)=>(
                    <MovieInfo bgimage={makeImagePath(movie.backdrop_path)} onClick={()=>clickMovieInfo(movie.id)}>
                        <h2>{movie.title}</h2>
                    </MovieInfo>
                    ))}
                </ResultList>
                :
                <h2>결과가 존재하지 않습니다.</h2>
            }
            <AnimatePresence>
                {searchMatch && clickedMovie?
                <MovieDetail clickedMovie={clickedMovie} navigate={navigate} keyword={keyword || ""}/>
                :
                null
                }
            </AnimatePresence>
            
        </Wrapper>
    )
}

export default Search;