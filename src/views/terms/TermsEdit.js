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

    console.log(items.terms_num);
    console.log(items.terms_facility_num);
    console.log(items);

    const [value, setValue] = useState();
    const [termsTitle, setTermsTitle] = useState(items.terms_title);
    const [termsContents, setTermsContents] = useState(items.terms_contents);
    const [optionValue,setOptionValue] = useState(0);

    const onTitleChange = useCallback(e => {
        setTermsTitle(e.target.value);
    }, []);

    const onContentsChange = useCallback(e => {
        setTermsContents(e.target.value);
    }, []);

    const onOptionChange = useCallback(e => {
        setOptionValue(e.target.value);
    },[]);

    const getOptionValue = (optionValue) => {
        setOptionValue(optionValue);
    }

    const [termsFacilityList, setTermsFacilityList] = useState([]);
    Axios.get("http://"+config.HOST.toString()+"/facilityNumName").then((response) => {
        setTermsFacilityList(response.data);
    });

    const handleSelect = (e) => {
        setOptionValue(e.target.value);
        console.log(e.target.value +"\n" + e.target.options[e.target.selectedIndex].text);
    }

    function termsSave(){
        let termsLink = "";
        if(items.isTermsEdit){
            termsLink = "/updateTerms"
        }else{
            termsLink = "/insertTerms"
        }

        if(optionValue === 0){
            Axios.post("http://"+config.HOST.toString()+termsLink, {
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
            Axios.post("http://"+config.HOST.toString()+termsLink, {
                termsData:{
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
            {/*<Card className="shadow">*/}
            <div className={"termsEdit-container"}>
                <div className={"termsEdit-contents"}>
                    <div className={"termsEdit-top"}>
                        <Button className={"termsEdit-save"} onClick={()=>termsSave()}>저장</Button>
                    </div>
                    <div className={"termsEdit-elements"}>
                        <div className={"termsEdit-element-header"}>
                            <div className="title_name">
                                <div className="title">
                                    제목:
                                </div>
                                <Form>
                                    <Input className={"termsEdit-element-header-input"}
                                           placeholder={""} type={"textarea"} rows={"1"}
                                           onChange = {onTitleChange} defaultValue={items.terms_title}>
                                    </Input>
                                </Form>
                            </div>
                            <div className="select_facility">
                                <div className="select">
                                    선택:
                                </div>
                                <form>
                                    <div className="input_area">
                                        <select onChange={handleSelect} id="class">
                                            <option value="0">시설 선택</option>
                                            {termsFacilityList.map((t) => (
                                                <option value={t.facility_num}>{t.facility_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                                <div className="blank"></div>
                                <form>
                                    <div className="input_area">
                                        <select onChange={handleSelect} id="class">
                                            <option value="0">시설 선택</option>
                                            {termsFacilityList.map((t) => (
                                                <option value={t.facility_num}>{t.facility_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className={"termsEdit-element-body"}>
                            <div className="body_input_title">
                                <div className="body_input">
                                    내용:
                                </div>
                                <Form>
                                    <Input className={"termsEdit-element-body-input"}
                                           placeholder={""} type={"textarea"} rows={"10"}
                                           onChange = {onContentsChange} defaultValue={items.terms_contents}>
                                    </Input>
                                </Form>
                            </div>

                        </div>
                        <div className={"termsEdit-element-footer"}>

                        </div>
                    </div>
                </div>
            </div>
            {/*</Card>*/}

        </>
    );
};

export default TermsEdit;