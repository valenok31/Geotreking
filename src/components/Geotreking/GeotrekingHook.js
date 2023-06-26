import React, {useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {setGeo} from "../../redux/geo_reducer";
import Canvas from "../Canvas/Canvas";

function GeotrekingHook(props) {

    useEffect(() => getCurrentPosition(props), [])

    function getCurrentPosition(props) {
        if ("geolocation" in navigator) {
            let setGeoProps = props.setGeo;
            //let getGeoProps = props.getCoords;
            //console.log(navigator?.geolocation)
            navigator.geolocation.getCurrentPosition(function (position) {
                //navigator.geolocation.watchPosition(function (position) {
                //console.log(getGeoProps);
                //let equal = position.coords.latitude != props.getCoords.at(-1).latitude && position.coords.longitude != props.getCoords.at(-1).longitude;
                //console.log(equal)


                        if (props.getCoords.length === 0) {
                            //console.log(position.coords.accuracy)
                            setGeoProps({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                accuracy: position.coords.accuracy,
                            });
                        } else {
                            if (position.coords.latitude != props.getCoords.at(-1).latitude && position.coords.longitude != props.getCoords.at(-1).longitude) {
                                setGeoProps({
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    accuracy: position.coords.accuracy,
                                });
                            }
                        }

            });
        } else {
            console.log(false)
        }
    }

    /*    if(props.getCoords){
            let endPoint = props.getCoords.length - 1
        return <>
            <div>Latitude: {props?.getCoords[endPoint].latitude}</div>
            <div>Longitude: {props?.getCoords[endPoint].longitude}</div>
            <button onClick={() => getCurrentPosition(props)}>Обновить геоданные</button>
            <Canvas {...props}/>
        </>
        }*/

    if (props.getCoords.length != 0) {

        let endPoint = props.getCoords.length
        return <>
            <Canvas {...props}/>
            <div>Latitude: {props.getCoords[props.getCoords.length-1].latitude}</div>
            <div>Longitude: {props.getCoords[props.getCoords.length-1].longitude}</div>
            <button onClick={() => getCurrentPosition(props)}>Обновить геоданные</button>
        </>
    }
}

let mapStateToProps = (state) => ({
    getCoords: state.geo_reducer.coords,

});

export default compose(
    connect(mapStateToProps, {setGeo}))
(GeotrekingHook);