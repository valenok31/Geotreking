import React from "react";
import s from "../Canvas/Canvas.module.css";

export default function Point (props){
    return <>
        <div className={props.cssEndPoint} style={{
            top: `calc(${props.top - 5}px + ${props.canvasHeight / 2}vh)`,
            left: `calc(${props.left - 5}px + ${props.canvasWidth / 2}vw)`,
        }}>
        </div>
    </>
}