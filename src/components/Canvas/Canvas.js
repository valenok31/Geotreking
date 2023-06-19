import React from 'react'
import s from './Canvas.module.css'
import {logDOM} from "@testing-library/react";

export default function Canvas(props) {
let scale = 10000 * 2;

    function latlng2distance(lat1, long1, lat2, long2) {
        //радиус Земли
        var R = 6372795;
        //перевод коордитат в радианы
        lat1 *= Math.PI / 180;
        lat2 *= Math.PI / 180;
        long1 *= Math.PI / 180;
        long2 *= Math.PI / 180;
        //вычисление косинусов и синусов широт и разницы долгот
        var cl1 = Math.cos(lat1);
        var cl2 = Math.cos(lat2);
        var sl1 = Math.sin(lat1);
        var sl2 = Math.sin(lat2);
        var delta = long2 - long1;
        var cdelta = Math.cos(delta);
        var sdelta = Math.sin(delta);
        //вычисления длины большого круга
        var y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
        var x = sl1 * sl2 + cl1 * cl2 * cdelta;
        var ad = Math.atan2(y, x);
        var dist = Math.round(ad * R); //расстояние между двумя координатами в метрах
        return dist
    }

    if (props.getCoords) {
        console.log( props.getCoords);
        let canvasArr = props.getCoords.map((point, index, arrPoints) => {
            let top = (0 + (point.latitude - props.getCoords[0].latitude) * scale)
            let left = (0 + (point.longitude - props.getCoords[0].longitude) * scale)
            if (index === 0) {
                return <div className={s.point} style={{top: top - 5+250 + 'px', left: left - 5+250 + 'px'}}></div>
            }
            let topPrevious = (0+(arrPoints[index - 1].latitude - props.getCoords[0].latitude) * scale);
            let leftPrevious = (0+(arrPoints[index - 1].longitude - props.getCoords[0].longitude) * scale);
            let x = (left - leftPrevious);
            let y = (top - topPrevious);
            if (x === 0 || y === 0) {
                return <div className={s.point} style={{top: top - 5+250 + 'px', left: left - 5+250 + 'px'}}></div>
            }
            let width = Math.sqrt((top - topPrevious) ** 2 + (left - leftPrevious) ** 2);
            let lat1=point.latitude;
            let long1=point.longitude;
            let lat2=arrPoints[index - 1].latitude;
            let long2=arrPoints[index - 1].longitude;
            let distance = latlng2distance(lat1, long1, lat2, long2)
            let reg = (y > 0 ? 90 : 270);
            let rotation = reg - (Math.atan(x / y) * 180 / Math.PI);
            return <>
                <div className={s.point} style={{top: top - 5+250 + 'px', left: left - 5+250 + 'px'}}></div>
                <div className={s.track} style={{
                    top: topPrevious+250 + 'px',
                    left: leftPrevious+250 + 'px',
                    width: width,
                    transform: `rotate(${rotation}deg)`
                }}></div>
            </>

        });
        let lengthArr = props.getCoords.length
        let top = ((props.getCoords[lengthArr - 1].latitude - props.getCoords[0].latitude) * scale)
        let left = ((props.getCoords[lengthArr - 1].longitude - props.getCoords[0].longitude) * scale)
        let widthHome = Math.sqrt((0 - top) ** 2 + (0 - left) ** 2);
        let lat1=props.getCoords[lengthArr - 1].latitude;
        let long1=props.getCoords[lengthArr - 1].longitude;
        let lat2=props.getCoords[0].latitude;
        let long2=props.getCoords[0].longitude;
        let distance = latlng2distance(lat1, long1, lat2, long2)
        let reg = (-top > 0 ? 90 : 270);
        //let reg = 90
        let rotationHome = reg - (Math.atan(left / top) * 180 / Math.PI);

        return <>
            <div className={s.canvas}>
                {canvasArr}
                <div className={s.track} style={{
                    top: top+250 + 'px',
                    left: left+250 + 'px',
                    width: widthHome,
                    transform: `rotate(${rotationHome}deg)`
                }}>{distance}м</div>
            </div>
        </>
    }
}