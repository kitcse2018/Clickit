
import React, { useState } from "react";
import Axios from "axios";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import InnerFacilityReservation from "components/JDcomponents/InnerFacilityReservation.js"
// You must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change const "Template" name!!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Reservation = (props) => {

    let innerFacility_img = 'argon-react.png';
    let img_name = innerFacility_img.substring(0, innerFacility_img.indexOf('.'));
    const findFacilityNum = props.match.params.facility_num

    const [innerFacilityList,setinnerFacilityList] = useState([]);
    Axios.get("http://localhost:3001/inner_facility",{params:{
        facilityNum : findFacilityNum,
        }}).then((response) => {
        setinnerFacilityList(response.data);
    });
    return (
        <>
            <Header />
            <div>
                {innerFacilityList.map(innerFacility => (
                    <Container className={"reservation-container"}>
                        <Button color={"secondary"} outline type={"button"} size="lg" className={"innerFacility-prev"}>prev</Button>
                        <div className={"reservation-main"}>
                            <div className={"reservation-main-contents"}>
                                <div className={"innerFacility-img"}>
                                    <img src={require('../../assets/img/innerFacility/' + innerFacility_img)}/>
                                </div>
                                <div className={"innerFacility-name"}>
                                    <h1 className={"display-3"}>{innerFacility.inner_facility_name}</h1>
                                </div>
                                <hr/>
                                <div className={"innerFacility-seat-time-list"}>
                                    <ul className={"reservation-time-select"}>
                                        <li className={"reservation-seat-select"}>
                                            {/*디비에 시간 개수만큼 가져오기*/}
                                            <p className={"reservation-time-title"}>
                                                시간 {innerFacility.seat_availability_start_time}
                                                {/*시작시간 끝시간 뜨기*/}
                                                <span className={"reservation-accIcon"}/>
                                            </p>
                                            <div className={"reservation-seat"}>

                                                {/*해당 시간의 자리 개수만큼 가져오기*/}
                                                <div className={"seat-name"}>
                                                    {/*    해당 자리 이름 가져오기*/}
                                                </div>
                                                <Button>reservation-request-button</Button>
                                            </div>
                                        </li>
                                        {/*  end test li tag */}
                                    </ul>
                                </div>
                                {/*<div className={"innerFacility-select"}>*/}
                                {/*    /!* innerFacility change part *!/*/}
                                {/*    <Paginations/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <Button color={"secondary"} outline type={"button"} size="lg" className={"innerFacility-next"}>next</Button>
                    </Container>
                ))}

            </div>


        </>
    );
}




// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "Template" name      !!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default Reservation;
