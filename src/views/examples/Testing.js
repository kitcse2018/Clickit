import React from "react";
import Header from "../../components/Headers/Header";
import "../../assets/css/cssTesting.css";
import "../../components/Paginations.js"
import {Container} from "reactstrap";
import Paginations from "../../components/Paginations";

const Testing = () =>{
    return(
        <>
            <Header/>
            <Container className={"test"}>
                <div className={"reservation-main"}>
                    <dic className={"reservation-main-contents"}>
                        <div className={"innerFacility-img"}>
                            {/* innerFacility-img here */}
                            <img src={require('../../assets/img/brand/argon-react.png')} alt={"img test"}/>
                            <h1>innerFacility-img</h1>
                        </div>
                        <div className={"innerFacility-seat-time-list"}>
                            <div className={"innerFacility-seat innerFacility-time"}>
                                <h1>innerFacility-seat innerFacility-time</h1>
                                <ul className={"reservation-time-select"}>
                                    reservation-time-select
                                    <li className={"reservation-seat-select"}>
                                        reservation-seat-select
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={"innerFacility-select"}>
                            <Paginations/>
                        </div>
                    </dic>
                </div>
            </Container>
        </>
    )
}

export default Testing;