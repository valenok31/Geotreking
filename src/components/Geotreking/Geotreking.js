import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {setGeo} from "../../redux/geo_reducer";


class Geotreking extends React.Component {

    componentDidMount() {
        if ("geolocation" in navigator) {
            console.log(true)
            //console.log(navigator?.geolocation)
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude, position.coords.longitude);
                this.props.setGeo({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            });
        } else {
            /* местоположение НЕ доступно */
            console.log(false)
            this.props.setGeo({
                latitude: 33,
                longitude: 11,
            })
            //console.log(navigator.geolocation)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude, position.coords.longitude);
            if (prevProps.getLongitude !== position.coords.longitude) {
                this.props.setGeo({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            }

        });


    }


    render() {


        return <>
            <div>{this.props?.getLatitude}</div>
            <div>{this.props?.getLongitude}</div>
        </>
    }
}

let mapStateToProps = (state) => ({
    getLatitude: state.geo_reducer.latitude,
    getLongitude: state.geo_reducer.longitude,
});

export default compose(
    connect(mapStateToProps, {setGeo}))
(Geotreking);
