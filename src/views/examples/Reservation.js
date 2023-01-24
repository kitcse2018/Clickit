import React, {useEffect, useState} from "react";
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
import {useLocation} from "react-router-dom";
import "../../assets/css/ReservationView.css";
import ReservationTimeListMap from "../../components/Listmap/ReservationTimeListMap";
import * as config from '../../config';
const Reservation = (props) => {

    let innerFacility_img = '오름 1동 휴게실.png';
    let img_name = innerFacility_img.substring(0, innerFacility_img.indexOf('.'));

    const location = useLocation();
    const items = location.state;

    const [facilityTimeList,setFacilityTimeList] = useState([]);
    const [facilitySeatList,setFacilitySeatList] = useState([]);
    const [terms, setTerms] = useState([]);

    useEffect(()=>{
        Axios.all([Axios.get("http://"+config.HOST.toString()+"/facilityTimeList", {
            params: {
                facilityNum: items.facilityNum
            }
        }), Axios.get("http://"+config.HOST.toString()+"/facilitySeatList", {
            params: {
                facilityNum: items.facilityNum
            }
        })])
            .then(Axios.spread((res1, res2) => {
                setFacilityTimeList(res1.data);
                setFacilitySeatList(res2.data);
            })).catch(err => {
            console.log(err);
        })
        // Axios.get("http://localhost:3001/facilityTimeList", {
        //     params : {
        //         facilityNum : items.facilityNum,
        //     }
        // }).then((response) => {
        //     setFacilityTimeList(response.data);
        //     console.log(response.data);
        // });
    },[]);

    return (
        <>
            <Header/>
            <div>
                <Container className={"reservation-container"}>
                    <div className={"reservation-main"}>
                        <div className={"reservation-main-contents"}>
                            <div className={"innerFacility-img"}>
                                <img src={require('../../assets/img/innerFacility/' + innerFacility_img)}/>
                            </div>
                            <div className={"innerFacility-name"}>
                                <h1 className={"display-3"}>{items.facilityName}</h1>
                            </div>
                            <hr/>
                            <div className={"innerFacility-seat-time-list"}>
                                {facilityTimeList.map((val, key) => {
                                    return (
                                        <ReservationTimeListMap props={val} facilityNum={items.facilityNum}></ReservationTimeListMap>
                                    );
                                })
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Reservation;