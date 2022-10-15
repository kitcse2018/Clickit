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
import { useState } from "react";
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
import "../assets/css/ReservationViewView.css";
// You must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change const "Template" name!!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const ReservationView = (props) => {
    let innerFacility_img = 'argon-react.png';
    let testImg1 = 'team-1-800x800.jpg';
    let testImg2 = 'team-2-800x800.jpg';
    let testImg3 = 'team-3-800x800.jpg';
    let testImg4 = 'team-4-800x800.jpg';
    let img_name = innerFacility_img.substring(0, innerFacility_img.indexOf('.'));

    return (
        <>
            <Header />
            {/* Page content */}
            {/* You must read here */}
            {/* Change main-container className */}
            <Container className={"reservationView-main-container"}>
                <div className={"reservation-section"}>
                    <input type={"radio"} name={"slide"} id={"slide01"}/>
                    <input type={"radio"} name={"slide"} id={"slide02"}/>
                    <input type={"radio"} name={"slide"} id={"slide03"}/>

                    <div className={"reservation-slide-wrap"}>
                        <ul className={"reservation-slide-list"}>
                            <li>
                                <a>
                                    <label className={"slide-left"}></label>
                                    <img src={require("../assets/img/innerFacility/"+testImg1)}/>
                                    <label className={"slide-right"}></label>

                                </a>
                            </li>
                            <li>
                                <a>
                                    <label className={"slide-left"}></label>
                                    <img src={require("../assets/img/innerFacility/"+testImg2)}/>
                                    <label className={"slide-right"}></label>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <label className={"slide-left"}></label>
                                    <img src={require("../assets/img/innerFacility/"+testImg3)}/>
                                    <label className={"slide-right"}></label>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <label className={"slide-left"}></label>
                                    <img src={require("../assets/img/innerFacility/"+testImg4)}/>
                                    <label className={"slide-right"}></label>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </>
    );
};

// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "Template" name      !!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default ReservationView;
