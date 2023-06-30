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

            navigator.geolocation.getCurrentPosition(function (position) {
            //navigator.geolocation.watchPosition(function (position) {

                if (props.getCoords.length === 0) {
                    setGeoProps({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    });
                } else {
                    console.log('else')
                    if (position.coords.latitude != props.getCoords.at(-1).latitude && position.coords.longitude != props.getCoords.at(-1).longitude) {
                        console.log('if')
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

    if (props.getCoords.length != 0) {
        return <>
            <Canvas {...props}/>
{/*            <div>Latitude: {props.getCoords.at(-1).latitude}</div>
            <div>Longitude: {props.getCoords.at(-1).longitude}</div>*/}
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