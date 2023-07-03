import { motion } from 'framer-motion';
import styled from 'styled-components';

import { makeImagePath } from "../../util";
import { IGetGenreList, IMovie, getGenreList } from '../../api';
import { useQuery } from 'react-query';

const DetailBox = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
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

interface IMovieDetail {
    clickedMovie: IMovie;
    navigate: Function;
    keyword: string;
}

function MovieDetail({clickedMovie, navigate, keyword}:IMovieDetail) {
    const { data, isLoading } = useQuery<IGetGenreList>(["movies","genre_list"],getGenreList);
    const backToMain = () => navigate({pathname: `/search`, search: `?keyword=${keyword}`})
    return (
        <DetailBox
          variants={detailBoxVariants}
          initial="start"
          animate="animate"
          exit="end"
        >
        
            <h2>{clickedMovie.title}</h2>
            <DetailPoster poster={makeImagePath(clickedMovie.poster_path)} />
            <DetailInfo>
            <span>개봉일자</span>
            <span>{clickedMovie.release_date}</span>
            <span>평점</span>
            <span>
                ★
                {clickedMovie.vote_average}
                ({clickedMovie.vote_count})</span>
            <span>장르</span>
            <div>
                {isLoading ?
                null
                :
                clickedMovie.genre_ids.map((id,index)=>(
                <span key={index}>{data?.genres.filter((item)=> item.id === id)[0].name}</span>
                ))
                }
            </div>
            </DetailInfo>
            <DetailOverview>
                <span>{clickedMovie.overview}</span>
            </DetailOverview>
            <ExitBtn onClick={backToMain}>확인</ExitBtn>
        
        </DetailBox>
    );
}

export default MovieDetail;