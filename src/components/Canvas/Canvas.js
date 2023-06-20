import React, {useState} from 'react'
import s from './Canvas.module.css'

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

    function latlng2distance(lat1, long1, lat2, long2) {
        //радиус Земли
        let R = 6372795;
        //перевод коордитат в радианы
        lat1 *= Math.PI / 180;
        lat2 *= Math.PI / 180;
        long1 *= Math.PI / 180;
        long2 *= Math.PI / 180;
        //вычисление косинусов и синусов широт и разницы долгот
        let cl1 = Math.cos(lat1);
        let cl2 = Math.cos(lat2);
        let sl1 = Math.sin(lat1);
        let sl2 = Math.sin(lat2);
        let delta = long2 - long1;
        let cdelta = Math.cos(delta);
        let sdelta = Math.sin(delta);
        //вычисления длины большого круга
        let y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
        let x = sl1 * sl2 + cl1 * cl2 * cdelta;
        let ad = Math.atan2(y, x);
        let dist = Math.round(ad * R * 10) / 10; //расстояние между двумя координатами в метрах
        return dist
    }

    if (props.getCoords) {
        console.log(props.getCoords);
        let canvasArr = props.getCoords.map((point, index, arrPoints) => {
            let top = -(point.latitude - props.getCoords[0].latitude) * scale;
            let left = (point.longitude - props.getCoords[0].longitude) * scale;
            if (index === 0) {
                return <div className={s.point} style={{
                    //top: top - 5 + canvasWidth / 2 + 'px',
                    top: `calc(${top - 5}px + ${canvasHeight / 2}vh)`,
                    //left: left - 5 + canvasHeight / 2 + 'px'
                    left: `calc(${left - 5}px + ${canvasWidth / 2}vw)`,
                }}>
                </div>
            }
            let topPrevious = -(arrPoints[index - 1].latitude - props.getCoords[0].latitude) * scale;
            let leftPrevious = (arrPoints[index - 1].longitude - props.getCoords[0].longitude) * scale;
            let x = (left - leftPrevious);
            let y = (top - topPrevious);
            if (x === 0 || y === 0) {
                return <div className={s.point} style={{
                    top: `calc(${top - 5}px + ${canvasHeight / 2}vh)`,
                    left: `calc(${left - 5}px + ${canvasWidth / 2}vw)`,
                }}>
                </div>
            }
            let width = Math.sqrt((top - topPrevious) ** 2 + (left - leftPrevious) ** 2);
            let reg = (y > 0 ? 90 : 270);
            let rotation = reg - (Math.atan(x / y) * 180 / Math.PI);

            return <>
                <div className={s.point}
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
                }}>
                </div>
            </>

        });
        let lengthArr = props.getCoords.length
        let top = -((props.getCoords[lengthArr - 1].latitude - props.getCoords[0].latitude) * scale)
        let left = ((props.getCoords[lengthArr - 1].longitude - props.getCoords[0].longitude) * scale)
        let widthHome = Math.sqrt((0 - top) ** 2 + (0 - left) ** 2);
        let lat1 = props.getCoords[lengthArr - 1].latitude;
        let long1 = props.getCoords[lengthArr - 1].longitude;
        let lat2 = props.getCoords[0].latitude;
        let long2 = props.getCoords[0].longitude;
        let distance = latlng2distance(lat1, long1, lat2, long2)
        let reg = (-top > 0 ? 90 : 270);
        //let reg = 90
        let rotationHome = reg - (Math.atan(left / top) * 180 / Math.PI);

        return <>
            <button onClick={() => increase(props)}>+</button>
            {scale}
            <button onClick={() => reduce(props)}>-</button>
            <div className={s.canvas} style={{
                width: canvasWidth + 'vw',
                height: canvasHeight + 'vh',
            }}>
                {canvasArr}
                <div className={s.track} style={{
                    top: `calc(${top}px + ${canvasHeight / 2}vh)`,
                    left: `calc(${left}px + ${canvasWidth / 2}vw)`,
                    width: widthHome,
                    transform: `rotate(${rotationHome}deg)`
                }}>{distance}м
                </div>
            </div>
        </>
    }
}