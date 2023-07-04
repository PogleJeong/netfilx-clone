import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { TvShowSeparate, makeImagePath } from "../../util";
import { useQuery } from "react-query";
import { IGetTvSeriesResult, getAiringTodayTvSeries, getOnAirTvSeries, getPopularTvSeries, getTopRatedTvSeries } from "../../api";


const Wrapper = styled.div`
    position: relative;
   
    height: 200px;
    margin: 10px;
`

const RightBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 2;
    transform-origin: center left;
    left: 20px;
    top: 25%;
    height: 50%;
    aspect-ratio: 1/1;
    font-size: 2em;
`

const LeftBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 2;
    transform-origin: center right;
    right: 20px;
    top: 25%;
    height: 50%;
    aspect-ratio: 1/1;
    font-size: 2em;
`

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    height: 100%;
    margin-bottom: 5px;
`

// custom 속성을 사용하여 슬라이드 자연스러움 주기
const sliderVariant = {
    start: (toRight: number) => ({
        x: toRight ? window.innerWidth + 5 : -window.innerWidth- 5
    }),
    animate: {
        x: 0
    },
    end: (toRight: number) => ({
        x: toRight ? -window.innerWidth-5 : window.innerWidth + 5
    })
}

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

const tvShowVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -30,
        zIndex: 2,
        transition: {
            delay: 0.5,
            duration: 0.3,
            type: "tween",
        }
    }
}

const tvShowTitleVariants = {
    hover: {
        delay: 0.5,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.1,
            type: "tween",
        }
    }
}

interface ISlider {
    separate: TvShowSeparate;
    setClickedTvShow: Function;
    clickTvShowInfo: Function;
}

const offset = 6;


function Slider({separate, setClickedTvShow, clickTvShowInfo }:ISlider) {
    const { data, isLoading } = useQuery<IGetTvSeriesResult>(["tvShow", `${separate}`], async() => {
        if(separate === TvShowSeparate.AIRING_TODAY) {
            return await getAiringTodayTvSeries();
        } else if(separate === TvShowSeparate.ON_AIR) {
            return await getOnAirTvSeries(); 
        } else if (separate === TvShowSeparate.POPULAR) {
            return await getPopularTvSeries(); 
        } else if (separate === TvShowSeparate.TOP_RATED) {
            return await getTopRatedTvSeries(); 
        } else {
            return await getAiringTodayTvSeries();
        }
    });
    const [ category, setCategory ] = useState("A");
    const [ index, setIndex ] = useState(0);
    const [ leaving, setLeaving ] = useState(false);
    const [ toRight, setToRight ] = useState(true);
    const toggleLeaving = () => setLeaving((prev)=>!prev);
    const decreaseIndex = () => {
        if (data) {
            if(leaving) return;
            toggleLeaving();
            setToRight(false);
            const totalMovies = data?.results.length;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex(prev => prev === 0 ? maxIndex : prev - 1);
        }
    }
    // 각 분류에 따른 navigate 를 분류 다른 카테고리에 있더라도 같은 영화시 애니메이션 오류발생
    useEffect(()=>{
        if (separate === TvShowSeparate.AIRING_TODAY) setCategory("A");
        if (separate === TvShowSeparate.ON_AIR) setCategory("B");
        if (separate === TvShowSeparate.POPULAR) setCategory("C");
        if (separate === TvShowSeparate.TOP_RATED) setCategory("D");
    },[])
    
    const increaseIndex = () => {
        if (data) {
            if(leaving) return;
            toggleLeaving();
            setToRight(true);
            const totalMovies = data?.results.length;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex(prev => prev===maxIndex ? 0 : prev + 1);
        }
    }
   
    return (
        <Wrapper>
            <LeftBtn onClick={decreaseIndex}>LEFT</LeftBtn>
            <RightBtn onClick={increaseIndex}>RIGHT</RightBtn>
            <AnimatePresence 
              initial={false} 
              onExitComplete={toggleLeaving}
              custom={toRight}
            >
            {isLoading?
            null
            :
            <Row
              custom={toRight}
              variants={sliderVariant}
              initial="start"
              animate="animate"
              exit="end"
              key={index}
            >
            {data?.results
            .slice(offset*index, offset*index+offset)
            .map((tvShow)=>(
                <TvShow
                  poster={makeImagePath(tvShow.poster_path) || makeImagePath(tvShow.backdrop_path)}
                  variants={tvShowVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{type: "tween"}}
                  key={tvShow.id}
                  onClick={()=>{
                    setClickedTvShow(tvShow);
                    clickTvShowInfo(tvShow.id + category); // 상세정보 클릭 시 같은 영화 겹침방지
                  }}
                layoutId={tvShow.id+category} // layout id 는 string 만 간으
                >
                    <TvShowTitle variants={tvShowTitleVariants}  >
                        <h4>{tvShow?.name}</h4>
                    </TvShowTitle>
                </TvShow>
            ))}
            </Row>
            }    
            </AnimatePresence>
        </Wrapper>
    );
}

export default React.memo(Slider);