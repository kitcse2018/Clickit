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
import "../../assets/css/Terms.css";
import Axios from "axios";
import TermsListMap from "../../components/Listmap/TermsListMap";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import redirect from "react-router-dom/es/Redirect";

const Terms = (props) => {

    // if(sessionStorage.getItem("isLogin")===null){
    //     alert("로그인이 필요한 서비스입니다.");
    //     window.location.replace("/auth/login");
    // }

    const [termsList, setTermsList] = useState([]);
    Axios.get("http://localhost:3001/terms").then((response) => {
       setTermsList(response.data);
    });

    const history = useHistory();

    return (
        <>
            <Header />
            <div className={"terms-container"}>
                <div className={"terms-contents"}>
                    <div className={"terms-top"}>
                        <Button className={"terms-create"} color={"primary"} onClick={()=>{history.push({
                            pathname : "/admin/termsEdit",
                            state : {
                                terms_num : "",
                                terms_title : "",
                                terms_contents : "",
                                terms_inner_facility_num : "",
                                inner_facility_name : "",
                            }
                        })}}>추가</Button>
                    </div>
                    <div className={"terms-list"}>
                        {termsList.map((terms)=>(
                            <TermsListMap terms={terms}/>
                        ))}
                    </div>
                    <div className={"terms-paging"}>
                        <Button className={"terms-prev"} color={"primary"}>이전</Button>
                        <Button className={"terms-next"} color={"primary"}>다음</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Terms;
