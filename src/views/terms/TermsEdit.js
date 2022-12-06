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
import React, {useCallback, useState} from "react";
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
    Col, Form, Input
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import "../../assets/css/terms/TermsEdit.css";
import TermsListMap from "../../components/Listmap/TermsListMap";
import {useLocation} from "react-router-dom";
import SelectBox from "../../components/SelectBox/SelectBox";
import TermsFacilitySelectBox from "../../components/SelectBox/TermsFacilitySelectBox";
import Axios from "axios";
import * as config from '../../config';

const TermsEdit = (props) => {

    const location = useLocation();

    const items = location.state;

    console.log(items.terms_facility_num);

    const [value, setValue] = useState();
    const [termsTitle, setTermsTitle] = useState(items.terms_title);
    const [termsContents, setTermsContents] = useState(items.terms_contents);
    const [optionValue,setOptionValue] = useState([]);

    const onTitleChange = useCallback(e => {
        setTermsTitle(e.target.value);
    }, []);

    const onContentsChange = useCallback(e => {
        setTermsContents(e.target.value);
    }, []);

    function termsSave(){
        if(optionValue.valueOf()===0){
            Axios.post("http://"+config.HOST.toString()+"/termsEditSave", {
                termsData:{
                    termsNum : items.terms_num,
                    termsTitle: termsTitle,
                    termsContents: termsContents,
                    termsFacility: items.terms_facility_num,
                }
            }).then(r => {
                console.log(r);
            }).catch(e => {
                console.log(e);
            }).then(r => {
                console.log(r);
            })
        }else{
            Axios.post("http://"+config.HOST.toString()+"/termsEditSave", {
                termsData:{
                    termsNum : items.terms_num,
                    termsTitle: termsTitle,
                    termsContents: termsContents,
                    termsFacility: optionValue,
                }
            }).then(r => {
                console.log(r);
            }).catch(e => {
                console.log(e);
            }).then(r => {
                console.log(r);
            })
        }
        document.location.replace("/admin/terms");
    }

    return (
        <>
            <Header />
            <div className={"termsEdit-container"}>
                <div className={"termsEdit-contents"}>
                    <div className={"termsEdit-top"}>
                        <Button className={"termsEdit-save"} onClick={()=>termsSave()}>저장</Button>
                    </div>
                    <div className={"termsEdit-elements"}>
                        <div className={"termsEdit-element-header"}>
                            <Form>
                                <Input className={"termsEdit-element-header-input"}
                                       placeholder={""} type={"textarea"} rows={"1"}
                                       onChange = {onTitleChange} defaultValue={items.terms_title}>
                                </Input>
                            </Form>
                            <TermsFacilitySelectBox setOptionValue={setOptionValue}></TermsFacilitySelectBox>
                        </div>
                        <div className={"termsEdit-element-body"}>
                            <Form>
                                <Input className={"termsEdit-element-body-input"}
                                       placeholder={""} type={"textarea"} rows={"10"}
                                       onChange = {onContentsChange} defaultValue={items.terms_contents}>
                                </Input>
                            </Form>
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
