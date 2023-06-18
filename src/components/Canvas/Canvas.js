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
        let x = (left - leftPrevious);
        let y = (top - topPrevious);
        if (x === 0 || y === 0) {
            return <div className={s.point} style={{top: top - 5 + 'px', left: left - 5 + 'px'}}></div>
        }
        let width = Math.sqrt((top - topPrevious) ** 2 + (left - leftPrevious) ** 2);
        let reg = (y > 0 ? 90 : 270);
        let rotation = reg - (Math.atan(x / y) * 180 / Math.PI);
        return <>
            <div className={s.point} style={{top: top - 5 + 'px', left: left - 5 + 'px'}}></div>
            <div className={s.track} style={{
                top: topPrevious + 'px',
                left: leftPrevious + 'px',
                width: width,
                transform: `rotate(${rotation}deg)`
            }}></div>
        </>

    });
    let lengthArr = props.getCoords.length
    let top = ((props.getCoords[lengthArr-1].latitude - props.getCoords[0].latitude) * 1000000 * 2)
    let left = ((props.getCoords[lengthArr-1].longitude - props.getCoords[0].longitude) * 1000000 * 2)
    let widthHome = Math.sqrt((0 - top) ** 2 + (0 - left) ** 2);
    let reg = (-top > 0 ? 90 : 270);
    let rotationHome = reg - (Math.atan(-left / -top) * 180 / Math.PI);

    return <>
        <div className={s.canvas}>
            {canvasArr}
            <div className={s.track} style={{
                top: top + 'px',
                left: left + 'px',
                width: widthHome,
                transform: `rotate(${rotationHome}deg)`
            }}></div>
        </div>
    </>
}