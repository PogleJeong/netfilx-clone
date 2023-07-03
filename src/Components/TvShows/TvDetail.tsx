import { motion } from "framer-motion";
import { styled } from "styled-components";
import { IGetGenreList, ITvSeries, getTvShowGenreList } from "../../api";
import { makeImagePath } from "../../util";
import { useQuery } from "react-query";

const DetailBox = styled(motion.div)`
    position: fixed;
    top: 10%;
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

interface ITvDetail {
    id: string;
    clickedTvShow: ITvSeries | null;
}

function TvDetail({id, clickedTvShow}:ITvDetail){
    const { data, isLoading } = useQuery<IGetGenreList>(["tvShow","genres_list"],getTvShowGenreList)

    return (
        <DetailBox layoutId={id}>
            <DetailCover imagepath={makeImagePath(clickedTvShow?.backdrop_path || "")} >
                <DetailTitle>{clickedTvShow?.name}</DetailTitle>
            </DetailCover>
            
            <DetailInfo>
                <Poster poster={makeImagePath(clickedTvShow?.poster_path || "")}/>
                <InfoHeader>
                <span>첫방영</span>
                <span>{clickedTvShow?.first_air_date}</span>
                <span>평점</span>
                <span>
                    ★
                    {clickedTvShow?.vote_average}
                    ({clickedTvShow?.vote_count})</span>
                <span>장르</span>
                <div>
                    {isLoading ?
                    null
                    :
                    clickedTvShow?.genre_ids.map((id,index)=>(
                    <span key={index}>{data?.genres.filter((item)=> item.id === id)[0].name}</span>
                    ))
                    }
                </div>
                </InfoHeader>
                <DetailOverview>
                    {clickedTvShow?.overview}
                </DetailOverview>
            </DetailInfo>
        </DetailBox>
    );
}

export default TvDetail;