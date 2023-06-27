import { motion } from "framer-motion";
import { styled } from "styled-components";
import { makeImagePath } from "../../util";
import { IGetGenreList, IMovie, getGenreList } from "../../api";
import { useQuery } from "react-query";

const DetailBox = styled(motion.div)`
    position: fixed;
    overflow: scroll;
    top: 20%;
    left: 30%;
    width: 40vw;
    height: 80vh;
    border-radius: 10px;
    background-color: ${(props) => props.theme.black.lighter};
`

const DetailCover = styled.div<{imagepath: string}>`
  position: relative;
  width: 100%;
  background-image: url(${props=>props.imagepath});
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const DetailTitle = styled.h3`
  position: absolute;
  transform-origin: center left;
  background-color: rgba(0,0,0,0.3);
  width: 100%;
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 2em;
  font-weight: bold;
  bottom: 0px;
`;

const DetailInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px 400px;
  grid-template-areas: // 배치하고자하는 style 에 grid-area 를 작성
  "poster info info"            
  "poster info info"            
  "overview overview overview";
`

const InfoHeader = styled.div`
  grid-area: info;
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 30px;
  flex-direction: column;
  div {
    text-align: center;
  }
  span {
    height: 30px;
    font-size: 1em;
    text-align: center;
    margin: 0px 5px;
  }
`

const Poster = styled.div<{poster: string}>`
  grid-area: poster;
  margin: 5px;
  border: 10px solid rgba(0,0,0,0.8);
  background-image: url(${(props) => props.poster});
  background-size: cover;
`

const DetailOverview = styled.p`
  grid-area: overview;
  padding: 20px;
  
  color: ${(props) => props.theme.white.lighter};
  h4 {
    font-size: 1.3em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 25px;
  }
  span {
    line-height: 200%;
  }
`;

interface IMovieDetail {
    id: string;
    clickedMovie: IMovie | "";
}

function MovieDetail({id, clickedMovie}: IMovieDetail) {
  const { data, isLoading } = useQuery<IGetGenreList>(["movies","genre_list"],getGenreList);
  
  return(
      <DetailBox layoutId={id}>
          {clickedMovie ? 
          <>
          <DetailCover imagepath={makeImagePath(clickedMovie.backdrop_path, "w500")} >
            <DetailTitle>{clickedMovie.title}</DetailTitle>
          </DetailCover>
          <DetailInfo>
            <Poster poster={makeImagePath(clickedMovie.poster_path)}/>
            <InfoHeader>
              <span>개봉일자</span>
              <span>{clickedMovie.release_date}</span>
              <span>평점</span>
              <span>
                {"★".repeat(Math.floor(clickedMovie.vote_average/2))}
                {"☆".repeat(Math.floor((10-clickedMovie.vote_average)/2))}
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
            </InfoHeader>
            
            <DetailOverview>
              <h4>[ 줄거리 요약 ]</h4>
              <span>{clickedMovie.overview}</span>
            </DetailOverview>
          </DetailInfo>
          </>
          :
          null
          }
      </DetailBox>
  )
}

export default MovieDetail;