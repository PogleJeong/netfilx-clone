import React from "react";
import styled from "styled-components";

const PrevBtn = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100px;
    height: 200px;
    z-index: 3;
    background-color: transparent;
    transform-origin: center left;
    transition: background-color 1s;
    &:hover{
        background-color: rgba(0,0,0,0.8);
        svg {
            display: inline-block;
            path {
                    stroke: white;
            }
        }
    }
`;

const NextBtn = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    width: 100px;
    height: 200px;
    z-index: 3;
    color: black;
    background-color: transparent;
    transform-origin: center right;
    transition: background-color 1s;
    &:hover{
        background-color: rgba(0,0,0,0.8);
        svg {
            display: inline-block;
            path {
                stroke: white;
            }
        }
    }
`;

const Icon = styled.svg`
    display: none;
    width: 50px;
    height: 50px;
`;

interface IBtnEvent {
    decreaseIndex: React.MouseEventHandler<HTMLDivElement>;
    increaseIndex: React.MouseEventHandler<HTMLDivElement>;
}

function SliderBtn({decreaseIndex, increaseIndex}:IBtnEvent) {
    return (
        <>
        <PrevBtn onClick={decreaseIndex}>
            <Icon
                style={{width: 30, height: 30}}
            >
                <path 
                    d="M 15 0 L 0 15 L 15 30 Z"
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                />
            </Icon>
        </PrevBtn>
        <NextBtn onClick={increaseIndex}>
            <Icon>
                <path 
                    d="M 0 0 L 15 15 L 0 30 Z"
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                />
            </Icon>
        </NextBtn>
        </>
    )
}

export default React.memo(SliderBtn);