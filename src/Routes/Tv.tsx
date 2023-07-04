import { useQuery } from "react-query";
import { styled } from "styled-components";

import { IGetTvSeriesResult, ITvSeries, getTvSeriesPopular } from "../api";
import { TvShowSeparate, makeImagePath } from "../util";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import TvDetail from "../Components/TvShows/TvDetail";
import Slider from "../Components/TvShows/Slider";

const Wrapper = styled.div`
    height: 200vh;
    background-color: black;
`

const Banner = styled.div<{bgimage?: string}>`
    height: 600px;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${props=>props.bgimage});
    background-size: cover;
`

const Category = styled.h2`
    padding: 10px;
    font-size: 32px;
    font-weight: bold;
    color: white;
`

const Overlay = styled(motion.div)`
    position: fixed;
    z-index: 4;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
`;



function Tv() {
    const { data, isLoading } = useQuery<IGetTvSeriesResult>(["TV","Series","Popular"],getTvSeriesPopular)
    const [ clickedTvShow, setClickedTvShow ] = useState<ITvSeries>();
    const navigate = useNavigate();
    const tvMatch = useMatch("/tv/:id") // tvMatch 안에 여러 정보
    const clickTvShowInfo = (id: number) => {
        navigate(`/tv/${id}`);
    }
    const onOverlayClicked = () => {
        navigate(`/tv`);
    }
    return(
        <Wrapper>
            <Banner bgimage={makeImagePath(data?.results[0].backdrop_path! || "")}>

            </Banner>
            <Category>Airing Today Tv Series</Category>
            <Slider 
              separate={TvShowSeparate.AIRING_TODAY} 
              setClickedTvShow={setClickedTvShow} 
              clickTvShowInfo={clickTvShowInfo}
            />
            <Category>On Air Tv Series</Category>
            <Slider 
              separate={TvShowSeparate.ON_AIR} 
              setClickedTvShow={setClickedTvShow} 
              clickTvShowInfo={clickTvShowInfo}
            />
            <Category>Popular Tv Series</Category>
            <Slider 
              separate={TvShowSeparate.POPULAR} 
              setClickedTvShow={setClickedTvShow} 
              clickTvShowInfo={clickTvShowInfo}
            />
            <Category>Top Rated Tv Series</Category>
            <Slider 
              separate={TvShowSeparate.TOP_RATED} 
              setClickedTvShow={setClickedTvShow} 
              clickTvShowInfo={clickTvShowInfo}
            />
            <AnimatePresence>
                {tvMatch ?
                <>
                <Overlay onClick={onOverlayClicked} />
                <TvDetail id={tvMatch.params.id || ""} clickedTvShow={clickedTvShow || null}/>
                </>
                :
                null
                }
            </AnimatePresence>
        </Wrapper>
    )
}

export default Tv;