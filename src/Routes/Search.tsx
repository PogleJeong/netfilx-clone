import { useSearchParams } from "react-router-dom";

function Search() {
    // 쿼리스트링을 통해 영화정보를 가져옴.
    const [ searchParams ] = useSearchParams();
    const keyword = searchParams.get("keyword");
    return null;
}

export default Search;