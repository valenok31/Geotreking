import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {setGeo} from "../../redux/geo_reducer";
import Canvas from "../Canvas/Canvas";

function GeotrekingHook(props) {

    const [dist, setDist] = useState(0);

    function distF(distance) {
        setDist(a => a + distance);
    }

    console.log(dist)

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
                        distance: 0,
                    });
                } else {
                    console.log('else')
                    if (position.coords.latitude != props.getCoords.at(-1).latitude && position.coords.longitude != props.getCoords.at(-1).longitude) {
                        console.log('if')
                        distF(5);
                        setGeoProps({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            distance: props.getCoords.at(-1).distance,
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
            <Canvas {...props} distF={distF}/>
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