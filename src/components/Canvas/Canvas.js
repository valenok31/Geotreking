import React, {useState} from 'react'
import s from './Canvas.module.css'
import {latlng2distance} from "../accessoryFunctions/latlng2distance";
import Point from "../Point/Point";
import Track from "../Track/Track";

export default function Canvas(props) {
    let canvasWidth = 100;
    let canvasHeight = 100;

    const [scale, setScale] = useState(1000_000);


    function increase() {
        setScale(a => a * 2);
    }

    function reduce() {
        setScale(a => a / 2);
    }


    //if (props.getCoords.length!=0) {
    if (true) {
        //console.log(props.getCoords);
        let canvasArr = props.getCoords.map((point, index, arrPoints) => {
            let retee = arrPoints
                .map(b => b.distance)
                .reduce((a, b) => a + b);

            console.log(retee);


            let cssEndPoint = s.point;
            let startLat = arrPoints[0].latitude;
            let startLon = arrPoints[0].longitude;
            let currentLat = point.latitude;
            let currentLon = point.longitude;
            let endLat = arrPoints.at(-1).latitude;
            let endLon = arrPoints.at(-1).longitude;

            let top = -(currentLat - startLat) * scale;
            let left = (currentLon - startLon) * scale;

            if (index === 0) {
                cssEndPoint = s.startPoint;
                return <Point top={top} left={left} canvasHeight={canvasHeight} canvasWidth={canvasWidth}
                              cssEndPoint={cssEndPoint}/>
            }

            let previousLat = arrPoints[index - 1].latitude;
            let previousLon = arrPoints[index - 1].longitude;
            let topPrevious = -(previousLat - startLat) * scale;
            let leftPrevious = (previousLon - startLon) * scale;
            let x = (left - leftPrevious);
            let y = (top - topPrevious);

            if (x === 0 || y === 0) {
                return <Point top={top} left={left} canvasHeight={canvasHeight} canvasWidth={canvasWidth}
                              cssEndPoint={cssEndPoint}/>
            }

            let distance = latlng2distance(previousLat, previousLon, currentLat, currentLon)
            let width = Math.sqrt((top - topPrevious) ** 2 + (left - leftPrevious) ** 2);
            let reg = (y > 0 ? 90 : 270);
            let rotation = reg - (Math.atan(x / y) * 180 / Math.PI);
            let endTrack = <></>


            if (index === arrPoints.length - 1) {
                cssEndPoint = s.endPoint;

                let topH = -((endLat - startLat) * scale)
                let leftH = ((endLon - startLon) * scale)
                let widthHome = Math.sqrt(topH ** 2 + leftH ** 2);
                let regH = (-topH > 0 ? 90 : 270);
                let rotationHome = regH - (Math.atan(leftH / topH) * 180 / Math.PI);
                let accuracy = props.getCoords.at(-1).accuracy;

                endTrack = <>
                    {/*                    <Track top={topH} left={leftH}
                           canvasHeight={canvasHeight} canvasWidth={canvasWidth}
                           width={widthHome} rotation={rotationHome}
                           distance={distance}/>*/}
                    <div className={s.accuracy} style={{
                        top: `calc(${top - 2 - accuracy * scale * 10 / 2000000}px + ${canvasHeight / 2}vh)`,
                        left: `calc(${left - 2 - accuracy * scale * 10 / 2000000}px + ${canvasWidth / 2}vw)`,
                        width: `${accuracy * scale * 10 / 1000000}px`,
                        height: `${accuracy * scale * 10 / 1000000}px`,
                    }}>

                    </div>
                </>
            }
            return <>
                <Point top={top} left={left} canvasHeight={canvasHeight} canvasWidth={canvasWidth}
                       cssEndPoint={cssEndPoint}/>
                <Track top={topPrevious} left={leftPrevious}
                       canvasHeight={canvasHeight} canvasWidth={canvasWidth}
                       width={width} rotation={rotation}
                       distance={distance}/>
                {endTrack}
            </>
        });

        return <>
            <button onClick={() => increase(props)}>+</button>
            {scale}
            <button onClick={() => reduce(props)}>-</button>
            <div>{props.dist}</div>
            <div>Latitude: {props.getCoords.at(-1).latitude}</div>
            <div>Longitude: {props.getCoords.at(-1).longitude}</div>
            <div className={s.canvas} style={{
                width: canvasWidth + 'vw',
                height: canvasHeight + 'vh',
            }}>
                {canvasArr}
                {/*                <div className={s.track} style={{
                    top: `90vh`,
                    left: `calc(50vw - 250px)`,
                    width: 500,
                }}>{latlng2distance(0, 0, 0, 500 / scale)}м
                </div>*/}
                <Track top='0' left='-250'
                       canvasHeight='180' canvasWidth='100'
                       width='500px' rotation='0'
                       distance={latlng2distance(0, 0, 0, 300 / scale)}/>
            </div>
        </>
    }
}