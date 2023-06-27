import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "styled-components";

import { IGetMoviesResult, getPopularMovies } from "../../api";
import SliderBtn from "./SliderBtn.";
import { makeImagePath } from "../../util";

const Slider = styled(motion.div)`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    width: 100%;
    margin-bottom: 5px;
`;

const MovieBox = styled(motion.div)<{bgphoto: string}>`
    background-image: url(${props=>props.bgphoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    // 첫번째와 마지막은 한방향으로만 scale 이 커짐.
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const MovieTitle = styled(motion.div)`
    position: absolute;
    padding: 10px;
    background-color: ${props=>props.theme.black.lighter};
    opacity: 0;
    width: 100%;
    bottom: 0px;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

const MovieBoxVariant = {
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

const MovieTitleVariant = {
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

interface IProps {
    offset: number;
    windowWidth: number;
    onMovieBoxClicked: Function;
}

// 같은 영화가 있을 경우 애니메이션이 하나만 적용되면서 다른 카테고리의 동일 영화가 빠져나감.
const CATEGORY_CODE = "B";

function PopularMovies({offset, windowWidth, onMovieBoxClicked}:IProps) {
    const [ index, setIndex ] = useState(0);
    const [ leaving, setLeaving ] = useState(false); // 애니메이션 중복발생 방지
    const [ toRight, setToRight ] = useState(true);
    const { data, isLoading } = useQuery<IGetMoviesResult>(['movies','popular'], getPopularMovies);
    const toggleLeaving = () => setLeaving(prev => !prev);
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

    return(
        <>
        {isLoading ? 
        <h2>Popular Movies is Loading...</h2>
        :
        <>
        <SliderBtn decreaseIndex={decreaseIndex} increaseIndex={increaseIndex}  />
        <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={toRight}>
            <Slider
              custom={toRight}
              variants={sliderVariant}
              initial="start"
              animate="animate"
              exit="end"
              transition={{type: "tween", duration: 2}}
              key={index}
            >
            {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie)=>(
                <MovieBox
                  onClick={()=>onMovieBoxClicked(movie.id + CATEGORY_CODE)}
                  bgphoto={makeImagePath(movie.backdrop_path)}
                  key={movie.id}

                  variants={MovieBoxVariant}
                  initial="normal"
                  whileHover="hover"

                  layoutId={movie.id + CATEGORY_CODE}
                >
                    <MovieTitle variants={MovieTitleVariant}>
                        <h4>{movie.title}</h4>
                    </MovieTitle>

                </MovieBox>
            ))}
            </Slider>
        </AnimatePresence>
        </>
        }
        </>
    )
}

export default React.memo(PopularMovies);