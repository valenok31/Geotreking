import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {setGeo} from "../../redux/geo_reducer";
import Canvas from "../Canvas/Canvas";


function GeotrekingHook(props) {



    function getCurrentPosition(props) {
        if ("geolocation" in navigator) {
            let setGeoProps = props.setGeo;
            //console.log(navigator?.geolocation)
           // navigator.geolocation.getCurrentPosition(function (position) {
            navigator.geolocation.watchPosition(function (position) {
                console.log(true);
                setGeoProps({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log(false)
        }


    }


    let endPoint = props.getCoords.length - 1
    return <>
        <div>Latitude: {props.getCoords[endPoint].latitude}</div>
        <div>Longitude: {props.getCoords[endPoint].longitude}</div>
        <button onClick={() => getCurrentPosition(props)}>Обновить геоданные</button>
        <Canvas {...props}/>
    </>
}


let mapStateToProps = (state) => ({
    getLatitude: state.geo_reducer.latitude,
    getLongitude: state.geo_reducer.longitude,
    getCoords: state.geo_reducer.coords,

});

export default compose(
    connect(mapStateToProps, {setGeo}))
(GeotrekingHook);
