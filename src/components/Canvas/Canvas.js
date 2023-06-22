import React, {useState} from 'react'
import s from './Canvas.module.css'
import {latlng2distance} from "../accessoryFunctions/latlng2distance";

export default function Canvas(props) {
    let canvasWidth = 100;
    let canvasHeight = 100;

    const [scale, setScale] = useState(1000_000);
    const [dist, setDist] = useState(0);

    function increase() {
        setScale(a => a * 2);
    }

    function reduce() {
        setScale(a => a / 2);
    }

    function distF(distance) {
        setDist(a => a + distance);
    }

    if (props.getCoords) {
        let startLat = props.getCoords[0].latitude;
        let startLon = props.getCoords[0].longitude;

        console.log(props.getCoords);
        let canvasArr = props.getCoords.map((point, index, arrPoints) => {
            let top = -(point.latitude - startLat) * scale;
            let left = (point.longitude - startLon) * scale;

            if (index === 0) {
                return <div className={s.point} style={{
                    top: `calc(${top - 5}px + ${canvasHeight / 2}vh)`,
                    left: `calc(${left - 5}px + ${canvasWidth / 2}vw)`,
                }}>
                </div>
            }
            let topPrevious = -(arrPoints[index - 1].latitude - startLat) * scale;
            let leftPrevious = (arrPoints[index - 1].longitude - startLon) * scale;
            let x = (left - leftPrevious);
            let y = (top - topPrevious);

            if (x === 0 || y === 0) {
                return <div className={s.point} style={{
                    top: `calc(${top - 5}px + ${canvasHeight / 2}vh)`,
                    left: `calc(${left - 5}px + ${canvasWidth / 2}vw)`,
                }}>
                </div>
            }
            let lat1 = arrPoints[index - 1].latitude;
            let long1 = arrPoints[index - 1].longitude;
            let lat2 = point.latitude;
            let long2 = point.longitude;
            let distance = latlng2distance(lat1, long1, lat2, long2)
           // distF(distance);
            let width = Math.sqrt((top - topPrevious) ** 2 + (left - leftPrevious) ** 2);
            let reg = (y > 0 ? 90 : 270);
            let rotation = reg - (Math.atan(x / y) * 180 / Math.PI);
            let endTrack = <></>
            let cssEndPoint = s.point;

            if (index === arrPoints.length - 1) {
                cssEndPoint = s.endPoint;

                let topH = -((props.getCoords.at(-1).latitude - startLat) * scale)
                let leftH = ((props.getCoords.at(-1).longitude - startLon) * scale)
                let widthHome = Math.sqrt(topH ** 2 + leftH ** 2);
                let regH = (-topH > 0 ? 90 : 270);
                let rotationHome = regH - (Math.atan(leftH / topH) * 180 / Math.PI);
                let accuracy = props.getCoords.at(-1).accuracy;

                endTrack = <><div className={s.track} style={{
                    top: `calc(${topH}px + ${canvasHeight / 2}vh)`,
                    left: `calc(${leftH}px + ${canvasWidth / 2}vw)`,
                    width: widthHome,
                    transform: `rotate(${rotationHome}deg)`,
                    //!!!!!!!!!!
                    display: 'none', // !!!!!!!!
                }}>{distance}м
                </div>
                    <div className={s.accuracy} style={{
                        top: `calc(${top -2- accuracy*scale*10/2000000}px + ${canvasHeight / 2}vh)`,
                        left: `calc(${left -2- accuracy*scale*10/2000000}px + ${canvasWidth / 2}vw)`,
                        width: `${accuracy*scale*10/1000000}px`,
                        height: `${accuracy*scale*10/1000000}px`,
                    }}>

                    </div>
                    </>
            }


            return <>
                <div className={cssEndPoint}
                     style={{
                         top: `calc(${top - 5}px + ${canvasHeight / 2}vh)`,
                         left: `calc(${left - 5}px + ${canvasWidth / 2}vw)`,
                     }}>
                </div>
                <div className={s.track} style={{
                    top: `calc(${canvasHeight / 2}vh + ${topPrevious}px)`,
                    left: `calc(${canvasWidth / 2}vw + ${leftPrevious}px)`,
                    width: width,
                    transform: `rotate(${rotation}deg)`
                }}>{distance}м
                </div>
                {endTrack}
            </>
        });

        return <>
            <button onClick={() => increase(props)}>+</button>
            {scale}
            <button onClick={() => reduce(props)}>-</button>
            {dist}
            <div className={s.canvas} style={{
                width: canvasWidth + 'vw',
                height: canvasHeight + 'vh',
            }}>
                {canvasArr}
                <div className={s.track} style={{
                    top: `90vh`,
                    left: `calc(50vw - 250px)`,
                    width: 500,
                }}>{latlng2distance(0, 0, 0, 500/scale)}м
                </div>
            </div>
        </>
    }
}