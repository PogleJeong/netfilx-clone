import { useEffect, useState } from "react";


// helper function 모음
/**
    API 를 통한 해당 영화의 이미지데이터 URL 생성
    arg1: image ID,
    arg2: format 없으면 "original"
    https://developer.themoviedb.org/docs/image-basics
*/
export function makeImagePath(id:string, format?: string) {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`

}

function getWindowDimensions() {
    const { innerWidth: width } = window;
    return width;
}

/** 
 * 현재 윈도우이 조정될때마다 window 의 width 를 구함.
 * react 에서는 window resize 에서 추적하는 기능이 없기에
 * event listener 를 사용.
 */
export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
    function handleResize() {
    setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
}