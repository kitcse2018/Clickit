/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
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
import "../../assets/css/ReservationView.css";
import Paginations from "../../components/Paginations";

// You must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change const "Template" name!!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Reservation = (props) => {
    // edit innerFacility_img
    let innerFacility_img = 'argon-react.png';
    let img_name = innerFacility_img.substring(0, innerFacility_img.indexOf('.'));

    return (
        <>
            <Header />
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
                            {/* innerFacility time & seat list container part */}
                            {/* innerFacility time list part */}
                            <ul className={"reservation-time-select"}>
                                <h3>reservation-time-select</h3>
                                {/* innerFacility seat list part */}
                                <li className={"reservation-seat-select"}>
                                    <h3>reservation-seat-select</h3>
                                    <Button>reservation-request-button</Button>
                                </li>
                            </ul>
                            <ul className={"reservation-time-select"}>
                                <h3>reservation-time-select</h3>
                            </ul>
                            <ul className={"reservation-time-select"}>
                                <h3>reservation-time-select</h3>
                            </ul>
                            {/* testing ul tag */}
                            <ul className={"reservation-time-select"}>
                                <h3>reservation-time-select</h3>
                            </ul>
                            <ul className={"reservation-time-select"}>
                                <h3>reservation-time-select</h3>
                            </ul>
                            <ul className={"reservation-time-select"}>
                                <h3>reservation-time-select</h3>
                            </ul>
                            <ul className={"reservation-time-select"}>
                                <h3>reservation-time-select</h3>
                            </ul>
                            <ul className={"reservation-time-select"}>
                                <h3>reservation-time-select</h3>
                            </ul>
                            {/* testing ul tag */}
                        </div>
                        {/*<div className={"innerFacility-select"}>*/}
                        {/*    /!* innerFacility change part *!/*/}
                        {/*    <Paginations/>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <Button color={"secondary"} outline type={"button"} size="lg" className={"innerFacility-next"}>next</Button>
            </Container>
        </>
    );
};

// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "Template" name      !!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default Reservation;
