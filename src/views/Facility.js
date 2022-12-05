import {useEffect, useState} from "react";
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
import {useMediaQuery} from "react-responsive";
import Header from "components/Headers/Header.js";
import "../assets/css/FacilityList.css";
import FacilityListMap from "components/Listmap/FacilityListMap.js";
import Axios from "axios";

const Facility = (props) => {

    const [facilityList,setFacilityList] = useState([]);
    const picList = ["오름 1동 휴게실", "오름 1동 체단실"]
    const isDeskTop = useMediaQuery({query:'(max-width:400px)'});

    useEffect(()=>{
        Axios.get("http://localhost:3001/facility" , {
            params : {
                // dormitory_num : sessionStorage.getItem("dormitoryNum"),
                dormitory_num : 1, // 수정해야 됨
            }
        }).then((response) => {
            setFacilityList(response.data);
        });
    },[]);

    return (
        <>
            <Header/>
            <div className={"facility-list-container"}>
                {facilityList.map((facility, index)=>(
                    <FacilityListMap facility={facility} pic={picList[index]} key={index}/>
                ))}
            </div>
        </>
    );
};

export default Facility;
