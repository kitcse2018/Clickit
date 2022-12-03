import React, { useState } from "react";
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

import "../../assets/css/ReservationView.css";
import "../../methods/reservation/ReservationMethod.js";
import Axios from "axios";

const InnerFacilityReservation = () => {
    // edit innerFacility_img
    let innerFacility_img = 'argon-react.png';
    let img_name = innerFacility_img.substring(0, innerFacility_img.indexOf('.'));

    const [innerFacilityList,setinnerFacilityList] = useState([]);
    Axios.get("http://localhost:3001/inner_facility").then((response) => {
        setinnerFacilityList(response.data);
    });



    return (

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
                                    <h1 className={"display-3"}>{img_name}</h1>
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
    );
};

export default InnerFacilityReservation;
