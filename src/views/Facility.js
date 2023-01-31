import {useCallback, useEffect, useState} from "react";
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
    Col, Modal
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import "../assets/css/FacilityList.css";
import FacilityListMap from "components/Listmap/FacilityListMap.js";
import Axios from "axios";
import * as config from '../config';
import NoticeModal from "./notice/NoticeModal";
const Facility = (props) => {

    const [facilityList,setFacilityList] = useState([]);
    const picList = ["오름 1동 휴게실", "오름 1동 체단실"]
    const [state, setState] = useState({
        modal: true,
    });
    const [notice, setNotice] = useState([]);

    useEffect(()=>{
        Axios.get("http://"+config.HOST.toString()+"/facility" , {
            params : {
                dormitory_num : sessionStorage.getItem("dormitoryNum"),
                // dormitory_num : 1, // 수정해야 됨
            }
        }).then((response) => {
            setFacilityList(response.data);
        });
        getNotice().then();
        console.log(notice);
    },[]);

    async function getNotice(){
        await console.log("testing");
        await Axios.get("http://"+config.HOST.toString()+"/getLatestNotice")
            .then((response) => {
                setNotice(response.data);
            });
        await console.log("testing");
        console.log(facilityList.facility_pic==""||facilityList[0].facility_pic==null?"사진 없음":"사진 있음");
        console.log("Facility.js");
    }

    const toggleModal = () => {
        setState({
            modal: !state.modal,
        })
    };

    const onModalDisplay = useCallback(()=>{
        setState({
            modal: !state.modal,
        })
    },[state.modal]);

    return (
        <>
            <Header/>
            <div className={"facility-list-container"}>
                {facilityList.map((facility, index)=>(
                    <FacilityListMap facility={facility} key={index}/>
                ))}
            </div>
            {sessionStorage.getItem("preventNotice") === null ?
                (notice.length === 0 ? null : <Modal className={"notice-modal"} size={"lg"} isOpen={state.modal}>
                    {notice.map((notice, index)=>(
                        <NoticeModal notice = {notice} onModalDisplay={onModalDisplay}></NoticeModal>
                    ))}
                </Modal>)
                : null
            }
        </>
    );
};

export default Facility;
