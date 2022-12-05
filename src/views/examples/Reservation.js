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

    // !!!!!!!!!!!! 모든 쿼리문에 변수 (?) 인지 확인하고
    // !!!!!!!!!!!! server.js 에서 값 넣어줘야 함

    // location 으로 가져올 요소 (변수 이름이 맞는 지는 모름)
    // facility_num, facility_img 주소, facility_name

    // app.get 으로 가져올 요소
    // 시작 시간부터 끝 시간까지 1시간 단위로 나눠둔 거
    // ->
    // 시설물의 자리들
    // 자리 사용 가능 여부
    // facility_seat_num
    // -> SELECT ccd.facility_seat.facility_seat_num, ccd.facility_seat.facility_seat_name, ccd.facility_seat.facility_seat_status FROM facility_seat WHERE facility_num = (?) GROUP BY facility_seat_name;
    // 위에 퀴리문으로 3개 다 가져올 수 있음

    // app.post 로 보낼 요소
    // student_num : sessionStorage
    // start_time : facility_seat_start_time 에서 가져온 값
    // end_time : facility_seat_end_time 에서 가져온 값
    // record_time : 현재 시간
    // reservation_status : [예약, 취소], 신청 당시에는 예약
    // facility_seat_num : app.get 으로 받아온 데이터

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

    console.log(facilityTimeList);
    console.log(facilitySeatList);

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
