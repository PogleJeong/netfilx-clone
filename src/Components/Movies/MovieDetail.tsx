import { motion } from "framer-motion";
import { ReactEventHandler } from "react";
import { styled } from "styled-components";
import { makeImagePath } from "../../util";
import { IMovie } from "../../api";

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

interface IMovieDetail {
    id: string;
    clickedMovie: IMovie;
}

function MovieDetail({id, clickedMovie }: IMovieDetail) {
    return(
        <DetailBox layoutId={id}>
            {clickedMovie ? 
            <>
            <DetailCover imagepath={makeImagePath(clickedMovie.backdrop_path, "w500")} />
            <DetailTitle>{clickedMovie.title}</DetailTitle>
            <DetailOverview>{clickedMovie.overview}</DetailOverview>
            </>
            :
            null
            }
        </DetailBox>
    )
}

export default MovieDetail;