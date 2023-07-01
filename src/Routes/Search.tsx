import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult, getKeywordMovies } from "../api";

const Wrapper = styled.div`
    position: relative;
    overflow: scroll;
`

const Something = styled.div`
    position: relative;
    height: 300px;
    h2 {
        position: absolute;
        bottom: 0;
        margin: 10px 40px;
        font-size: 2em;
    }
`

const ResultList = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 20px;
    height: 200vh;
`

const MovieInfo = styled.div<{bgimage: string}>`
    background-image: url(${(props)=>props.bgimage});
    background-size: cover;
`

function Search() {
    // 쿼리스트링을 통해 영화정보를 가져옴.
    const [ searchParams ] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const { data, isLoading } = useQuery<IGetMoviesResult[]>(["search", "keyword"], ()=>getKeywordMovies(keyword || "")); // null 일 경우 빈문자열
    console.log(data);
    return (
        <Wrapper>  
            <Something>
                <h2>검색어 "{keyword}" 에 대한 검색결과</h2>
            </Something>
            <ResultList>
            {isLoading ? 
                <h2>{keyword}에 대한 검색 진행중...</h2>
                :
                null
            }
            </ResultList>
        </Wrapper>
    )
}

export default Search;