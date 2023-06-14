import s from './App.module.css'
import {Route, Routes} from 'react-router-dom';
import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Geotreking from "./components/Geotreking/Geotreking"

class App extends React.Component {

    render() {
        return (<div className={s.app__container}>

                <div>
                    <Routes>
                        <Route path='/' element={<Geotreking/>}/>
                    </Routes>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    getSettings: state.geo_reducer.settings,
});

export default compose(
    connect(mapStateToProps, {}))
(App);
