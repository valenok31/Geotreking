import React from 'react'
import s from './Canvas.module.css'

export default function Canvas(props) {

    let canvasArr = props.getCoords.map((point, index) => {
        let top = Math.round((props.getCoords[index].latitude - 53.4258) * 1000000 * 2) + 'px'
        let left = Math.round((props.getCoords[index].longitude - 83.9368) * 1000000 * 2) + 'px'
        return <div className={s.point} style={{top: top, left: left}}></div>
    });

    return <>
        <div className={s.canvas}>
            {canvasArr}
        </div>
    </>
}