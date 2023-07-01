import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {setGeo} from "../../redux/geo_reducer";
import Canvas from "../Canvas/Canvas";
import {latlng2distance} from "../accessoryFunctions/latlng2distance";

function GeotrekingHook(props) {

    const [dist, setDist] = useState(0);

    function distF(distance) {
        setDist(a => a + distance);
    }

    console.log(dist)
    //console.log(props.getCoords.at(-1).distance)

    useEffect(() => getCurrentPosition(props), [])

    function getCurrentPosition(props) {
        if ("geolocation" in navigator) {
            let setGeoProps = props.setGeo;

            navigator.geolocation.getCurrentPosition(async function (position) {
                //navigator.geolocation.watchPosition(function (position) {

                if (props.getCoords.length === 0) {

                    setGeoProps({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        distance: 0,
                    });
                } else {
                    //console.log('else')
                    if (position.coords.latitude != props.getCoords.at(-1).latitude && position.coords.longitude != props.getCoords.at(-1).longitude) {
                        //console.log('if')
                        let previousLat = props.getCoords.at(-1).latitude;
                        let previousLon = props.getCoords.at(-1).longitude;
                        let currentLat = position.coords.latitude;
                        let currentLon = position.coords.longitude;

                        let distance = latlng2distance(previousLat, previousLon, currentLat, currentLon)
                        distF(distance);
                        setGeoProps({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            distance: distance,
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
            <Canvas {...props} dist={dist}/>
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