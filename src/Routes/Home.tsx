import { useQuery } from "react-query";
import { styled } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { useMatch, useNavigate } from "react-router-dom";

import NowplayingMovies from "../Components/Movies/Nowplaying";
import PopularMovies from "../Components/Movies/Popular";
import TopRatedMovies from "../Components/Movies/TopRated";
import UpcomingMovies from "../Components/Movies/Upcoming";

import { IGetMoviesResult, getNowPlayingMovies } from "../api";
import { makeImagePath, useWindowDimensions } from "../util";

import prevIcon from "../Image/prev.png";
import nextIcon from "../Image/next.png";
import MovieDetail from "../Components/Movies/MovieDetail";

const Wrapper = styled.div`
    background-color: black;
    height: 200vh;
`

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Banner = styled.div<{bgphoto: string}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 60px;
    background-image: linear-gradient( rgba(0, 0, 0, 1),rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.bgphoto});
    background-size: cover;
`

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`

const Overview = styled.p`
    font-size: 36px;
    width: 50%;
    margin-bottom: 30px;
`

const BtnBar = styled.div`
    display: flex;
    
    padding: 0px, 15px;
`

const PlayIcon = styled.svg`
    width: 20%;
    aspect-ratio: 1/1;
    fill: black;
    
`

const PlayBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8%;
    border-radius: 20px;
    aspect-ratio: 2/1;
    background-color: rgba(255,255,255,1);
    transition: background-color 0.5s;
    color: black;
    font-weight: bold;
    &:hover {
        background-color: rgba(255,255,255,0.7);
    }
`

const ShowBtn = styled.button`
    width: 10%;
    aspect-ratio: 2/1;
    border-style: none;
    border-radius: 20px;
    margin: 0 1%;

    color: white;
    font-weight: bold;
    background-color: rgba(255,255,255,0.5);
    transition: background-color 0.5s;
    &:hover {
        background-color: rgba(255,255,255,0.3);
    }
`

const Category = styled.h4`
    font-size: 30px;
    font-weight: bold;
    color: ${props=>props.theme.white.lighter};
    margin: 10px 0px;
`

const Slider = styled(motion.div)`
    position: relative;
    height: 200px;
`

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
`

const DetailBox = styled(motion.div)`
    position: fixed;
    top: 20%;
    left: 30%;
    width: 40vw;
    height: 80vh;
    border-radius: 10px;
    background-color: ${(props) => props.theme.black.lighter};
`

const DetailCover = styled.div<{imagepath: string}>`
  width: 100%;
  background-image: url(${props=>props.imagepath});
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const DetailTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const DetailOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth + 10, // 화면의 끝에서부터
    },
    visible: {
        x: 0, // 화면의 맨앞까지 이동
    },
    exit: {
        x: -window.outerWidth - 10, // 사라질때는 화면너비의 앞위치까지 이동
    }
}

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -30,
        transition: {
            delay: 0.5,
            duration: 0.3,
            type: "tween"
        }
    }
}

const infoVariants = {
    hover: {
        delay: 0.5,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.1,
            type: "tween"
        }
    }
}

const offset = 6;

function Home() {
    const navigate = useNavigate(); // URL 변경가능
    const bigMovieMatch = useMatch("/movies/:movieId");
    const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getNowPlayingMovies);
    const windowWidth = useWindowDimensions();

    const onMovieBoxClicked = (movieId:string) => {
        navigate(`/movies/${movieId}`);
    }
    const onOverlayClicked = () => {
        navigate("/");
    }

    const clickedMovie = // 상세보기를 눌렀을때 해당 id 의 url 에 있고, 해당 영화의 상세정보를 볼 수 있도록함
    bigMovieMatch?.params.movieId &&
    nowPlayingData?.results.find((movie) => String(movie.id) === String(bigMovieMatch.params.movieId).slice(0,-1));

    return(
        <Wrapper>
        {nowPlayingLoading ? 
            <Loader> Loading...</Loader>
        :
            <>
            <Banner bgphoto={makeImagePath(nowPlayingData?.results[0].backdrop_path || "")}>
                <Title>{nowPlayingData?.results[0].title}</Title>
                <Overview>{nowPlayingData?.results[0].overview}</Overview>
                <BtnBar>
                    <PlayBtn>
                        <PlayIcon
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0 0 L 15 10 L 0 20 V 20 Z" />
                        </PlayIcon>
                        
                        플레이
                    </PlayBtn>
                    <ShowBtn>상세정보</ShowBtn>
                </BtnBar>
            </Banner>
            <Category>Now playing</Category>
            <Slider>
                <NowplayingMovies offset={offset} windowWidth={windowWidth} onMovieBoxClicked={onMovieBoxClicked} />
            </Slider>
            <Category>Popular</Category>
            <Slider>
                <PopularMovies offset={offset} windowWidth={windowWidth} onMovieBoxClicked={onMovieBoxClicked} />
            </Slider>
            <Category>Top Rated</Category>
            <Slider>
                <TopRatedMovies offset={offset} windowWidth={windowWidth} onMovieBoxClicked={onMovieBoxClicked} />
            </Slider>
            <Category>Upcoming</Category>
            <Slider>
                <UpcomingMovies offset={offset} windowWidth={windowWidth} onMovieBoxClicked={onMovieBoxClicked} />
            </Slider>
            <AnimatePresence>
            {bigMovieMatch ? 
                <>
                <Overlay onClick={onOverlayClicked}/>
                <MovieDetail id={bigMovieMatch.params.movieId || ""} clickedMovie={clickedMovie || ""}/>
                </>
                :
                null
            }
            </AnimatePresence>
            </>
        }
        </Wrapper>
    )
}

export default Home;