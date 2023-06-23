import React from 'react'
import s from "../Canvas/Canvas.module.css";

export default function Track(props){
    return <>
        <div className={s.track} style={{
            top: `calc(${props.canvasHeight / 2}vh + ${props.top}px)`,
            left: `calc(${props.canvasWidth / 2}vw + ${props.left}px)`,
            width: props.width,
            transform: `rotate(${props.rotation}deg)`
        }}>{props.distance}м
        </div>
    </>
}