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

import Header from "components/Headers/Header.js";
import "../../assets/css/notice/Notice.css";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import NoticeListMap from "../../components/Listmap/NoticeListMap";
import * as config from '../../config';
import StudentNoticeListMap from "../../components/Listmap/StudentNoticeListMap";

const StudentNotice = (props) => {

    const [noticeList, setNoticeList] = useState([]);
    Axios.get("http://"+config.HOST.toString()+"/notice").then((response) => {
        setNoticeList(response.data);
    });

    const history = useHistory();

    return (
        <>
            <Header />
            <div className={"notice-container"}>
                <div className={"notice-contents"}>
                    <div className={"notice-top"}>
                    </div>
                    <div className={"notice-list"}>
                        {noticeList.map((noticeList)=>(
                            <StudentNoticeListMap notice={noticeList}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentNotice;
