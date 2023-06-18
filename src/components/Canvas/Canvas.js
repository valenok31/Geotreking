import React from 'react'
import s from './Canvas.module.css'

export default function Canvas(props) {

    let canvasArr = props.getCoords.map((point, index, arrPoints) => {
        let top = ((point.latitude - props.getCoords[0].latitude) * 1000000 * 2)
        let left = ((point.longitude - props.getCoords[0].longitude) * 1000000 * 2)
        if (index === 0) {
            return <div className={s.point} style={{top: top - 5 + 'px', left: left - 5 + 'px'}}></div>
        }
        let topPrevious = ((arrPoints[index - 1].latitude - props.getCoords[0].latitude) * 1000000 * 2);
        let leftPrevious = ((arrPoints[index - 1].longitude - props.getCoords[0].longitude) * 1000000 * 2);
        if ((top - topPrevious) === 0 || (left - leftPrevious) === 0) {
            return <div className={s.point} style={{top: top - 5 + 'px', left: left - 5 + 'px'}}></div>
        }
        let width = Math.sqrt((top - topPrevious) ** 2 + (left - leftPrevious) ** 2)

        let rotation = ((top - topPrevious)>0 && (left - leftPrevious)>0 ? 90 : 270) - (Math.atan((leftPrevious - left) / (topPrevious - top)) * 180 / Math.PI);
         //rotation = 0;
        console.log(rotation)
        return <>
            <div className={s.point} style={{top: top - 5 + 'px', left: left - 5 + 'px'}}>{index}</div>
            <div className={s.track} style={{
                top: topPrevious + 'px',
                left: leftPrevious + 'px',
                width: width,
                transform: `rotate(${rotation}deg)`
            }}></div>
        </>

    });

    return <>
        <div className={s.canvas}>
            {canvasArr}
        </div>
    </>
}