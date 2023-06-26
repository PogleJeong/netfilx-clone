import { useQuery } from "react-query";
import { styled } from "styled-components";

import { IGetTvSeriesResult, getTvSeriesPopular } from "../api";
import { makeImagePath } from "../util";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";

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

const Slider = styled.div`
    width: 100%;
    height: 200px;
    margin: 10px;
`

const Row = styled(motion.div)`
    height: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-bottom: 20px;
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

const Overlay = styled(motion.div)`
    position: fixed;
    z-index: 4;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
`;

const DetailInfo = styled(motion.div)`
    position: fixed;
    top: 20%;
    left: 30%;
    width: 40vw;
    height: 80vh;
    border-radius: 10px;
    background-color: ${(props) => props.theme.black.lighter};
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

const offset = 6; // 한줄에 보여줄 영화개수.

function Tv() {
    const { data, isLoading } = useQuery<IGetTvSeriesResult>(["TV","Series","Popular"],getTvSeriesPopular)
    const [ index, setIndex ] = useState(0);
    const [ leaving, setLeaving ] = useState(false);
    const navigate = useNavigate();
    const tvMatch = useMatch("/tv/:id") // tvMatch 안에 여러 정보
    const toggleLeave = () => setLeaving((prev)=>!prev);
    const clickedTvShow = (id: number) => {
        navigate(`/tv/${id}`);
    }
    const onOverlayClicked = () => {
        navigate(`/tv`);
    }
    
    return(
        <Wrapper>
            <Banner bgimage={makeImagePath(data?.results[0].backdrop_path! || "")}>

            </Banner>
            <Category>Popular Tv Series</Category>
            <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeave}>
                    <Row>
                    {data?.results
                    .slice(1)
                    .slice(offset*index, offset * index + offset)
                    .map((tvShow)=>(
                        <TvShow 
                          poster={makeImagePath(tvShow.poster_path) || makeImagePath(tvShow.backdrop_path)}
                          variants={tvShowVariants}
                          initial="normal"
                          whileHover="hover"
                          transition={{type: "tween"}}
                          key={tvShow.id}
                          onClick={()=>clickedTvShow(tvShow.id)}
                          layoutId={tvShow.id+""} // layout id 는 string 만 간으
                        >
                            <TvShowTitle
                              variants={tvShowTitleVariants}  
                            >
                                <h4>{tvShow?.name}</h4>
                            </TvShowTitle>
                        </TvShow>
                    ))
                    }
                    </Row>
                </AnimatePresence>
            </Slider>
            <AnimatePresence>
                {tvMatch ?
                <>
                <Overlay onClick={onOverlayClicked}/>
                <DetailInfo layoutId={tvMatch.params.id}>

                </DetailInfo>
                </>
                :
                null
                }
            </AnimatePresence>
        </Wrapper>
    )
}

export default Tv;