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

// You must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change const "Template" name!!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Template = (props) => {
    return (
        <>
            <Header />
            {/* Page content */}
            {/* You must read here */}
            {/* Change main-container className */}
            <div className={"main-container"}>
                <div className={"fac-box"}>
                    <div className={"fac-left"}>
                        <div className={"fac-img"}>
                            <img
                                alt="..."
                                className="fac-img-detail"
                                src={require("../assets/img/theme/vue.jpg")}
                                /*이미지는 보니깐 디비에 저장된사진의 위치 url을 보내고 여기서 가져와야할듯 */
                            />
                        </div>
                    </div>
                    <div className={"fac-right"}>
                        <div className={"fac-name"}>
                            <h2>체력 단련실</h2>
                        </div>
                        <div className={"fac-content"}>
                            <ul className={"fac-content-detail"}>
                                <li className={"fac-content-detail-name"}>
                                    제한 인원 -4
                                </li>
                                <li className={"fac-content-detail-time"}>
                                    이용 가능 시간 - 00:00 ~ 23:59
                                </li>
                            </ul>
                        </div>
                        <div className={"fac-status"}>
                            <p>예약 현황 2/4 </p>
                        </div>
                        <div className={"fac-reserve"}>
                            <button className={"fac-reserve-button"}>
                                예약하기
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"fac-box"}>
                    <div className={"fac-left"}>
                        <div className={"fac-img"}>
                            <img
                                alt="..."
                                className="fac-img-detail"
                                src={require("../assets/img/theme/vue.jpg")}
                                /*이미지는 보니깐 디비에 저장된사진의 위치 url을 보내고 여기서 가져와야할듯 */
                            />
                        </div>
                    </div>
                    <div className={"fac-right"}>
                        <div className={"fac-name"}>
                            <h2>체력 단련실</h2>
                        </div>
                        <div className={"fac-content"}>
                            <ul className={"fac-content-detail"}>
                                <li className={"fac-content-detail-name"}>
                                    제한 인원 -4
                                </li>
                                <li className={"fac-content-detail-time"}>
                                    이용 가능 시간 - 00:00 ~ 23:59
                                </li>
                            </ul>
                        </div>
                        <div className={"fac-status"}>
                            <p>예약 현황 2/4 </p>
                        </div>
                        <div className={"fac-reserve"}>
                            <button className={"fac-reserve-button"}>
                                예약하기
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "Template" name      !!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default Template;
