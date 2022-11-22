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
import "../../assets/css/TermsEdit.css";
import TermsListMap from "../../components/listmap/TermsListMap";
import {useLocation} from "react-router-dom";

const TermsEdit = (props) => {

    const location = useLocation();

    const items = location.state;

    return (
        <>
            <Header />
            <div className={"termsEdit-container"}>
                <div className={"termsEdit-contents"}>
                    <div className={"termsEdit-top"}>
                        <Button className={"termsEdit-save"} color={"primary"}>저장</Button>
                    </div>
                    <div className={"termsEdit-elements"}>
                        <div className={"termsEdit-element-header"}>
                            <div className={"termsEdit-element-header-title"}>
                                {items.terms_title}
                            </div>
                        </div>
                        <div className={"termsEdit-element-body"}>
                            <div className={"termsEdit-element-body-contents"}>
                                {items.terms_contents}
                            </div>
                        </div>
                        <div className={"termsEdit-element-footer"}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsEdit;
