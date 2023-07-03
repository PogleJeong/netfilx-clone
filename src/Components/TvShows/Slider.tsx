import { motion } from "framer-motion";
import { useEffect } from "react";
import { styled } from "styled-components";
import { TvShowSeparate, useGetTvShowData } from "../../util";
import { useQueries, useQuery } from "react-query";
import { IGetTvSeriesResult, getAiringTodayTvSeries, getOnAirTvSeries, getPopularTvSeries, getTopRatedTvSeries } from "../../api";

const Wrapper = styled.div`
     width: 100%;
    height: 200px;
    margin: 10px;
`
const TvShow = styled(motion.div)<{poster?: string}>`
    position: relative;
    height: 100%;
    background: url(${props=>props.poster});
    background-size: cover;
    transform-origin: center center;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`

const TvShowTitle = styled(motion.div)`
    position: absolute;
    padding: 10px;
    background-color: ${props=>props.theme.black.lighter};
    bottom: 0;
    width: 100%;
    opacity: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`

const offset = 6;


function Slider(separate: TvShowSeparate) {
    const { data, isLoading } = useQuery<IGetTvSeriesResult>(["tvShow", separate], ()=>useGetTvShowData(separate));
  
    return (
        <Wrapper>

        </Wrapper>
    );
}

export default Slider;