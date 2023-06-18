import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {setGeo} from "../../redux/geo_reducer";

class Geotreking extends React.Component {






    render() {


        function getCurrentPosition(props){
            if ("geolocation" in navigator) {
                console.log(true)
                let setGeoProps = props.setGeo;
                //console.log(navigator?.geolocation)
                navigator.geolocation.getCurrentPosition(function (position) {
                    //console.log(position.coords.latitude, position.coords.longitude);
                    setGeoProps({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                });
            } else {
                console.log(false)
/*                setGeoProps({
                    latitude: 33,
                    longitude: 11,
                })*/
                //console.log(navigator.geolocation)
            }
        }

        console.log(this.props?.getLatitude)

        return <>

            <div>{this.props?.getLatitude}</div>
            <div>{this.props?.getLongitude}</div>
            <button onClick={()=>getCurrentPosition(this.props)}>Обновить геоданные</button>

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
