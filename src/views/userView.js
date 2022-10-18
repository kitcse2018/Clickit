

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
import "../assets/css/UserView.css";
import {useState} from "react";
import Axios from "axios";

/*const UserView = (props) => {



    return (
        <>
            <Header />
            {/!* Page content *!/}
            {/!* You must read here *!/}
            {/!* Change main-container className *!/}
            <Container className={"userView-container"}>

                <div className={"fac-box"}>
                    <div className={"fac-left"}>
                        <div className={"fac-img"}>
                            <img
                                alt="..."
                                className="fac-img-detail"
                                src={require("../assets/img/theme/vue.jpg")}
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
                            <button className={"fac-reserve-button"} >
                                <a href={"/admin/reservation"}>예약하기</a>
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
                            <button className={"fac-reserve-button"} >
                                <a href={"/admin/reservation"}>예약하기</a>
                            </button>
                        </div>
                    </div>

                </div>
            </Container>

        </>
    );
};*/
import React, {Component} from "react";

function createData(facility_num, facility_name, facility_limit_people, facility_pic) {
    return { facility_num, facility_name, facility_limit_people, facility_pic };
}

fetch("http://localhost:3001/facility", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createData),
})
    .then((res) => res.json())
    .then((json) => {
        if (json === undefined) {
            alert("오류");
        } else {
            //////////////////////////////////          여기부터보자
            for (let i = 0; i < json.length; i++) { //가져온 json파일을 길이만큼 돌린다
                this.setState({                       //list가 sate값이기 때문에 setState
                    list: this.state.list.concat(       //배열을 '이어 붙이'는것이기 때문에 concat사용
                        createData(                       //객체 만들기
                            json[i].facility_num,
                            json[i].facility_name,
                            json[i].facility_limit_people,
                            json[i].facility_pic,
                        )
                    ),
                });
            }
            //////////////////////////////////
            console.log(json);
        }
    });

class UserView extends Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
        };
    }

    render() {
        const content = this.state.list.map((list) => ( // 리스트를 하나씩 살펴본다
            //이제 표현 하고싶은데로 하면 됨
            <div key={list.number}> //현재 객체의 number
                <div className={"fac-box"}>
                    <div className={"fac-left"}>
                        <div className={"fac-img"}>
                            <img
                                alt="..."
                                className="fac-img-detail"
                                src={require(list.facility_pic)}
                            />
                        </div>
                    </div>
                    <div className={"fac-right"}>
                        <div className={"fac-name"}>
                            <h2>{list.facility_name}</h2>
                        </div>
                        <div className={"fac-content"}>
                            <ul className={"fac-content-detail"}>
                                <li className={"fac-content-detail-name"}>
                                    제한 인원 -{list.facility_limit_people}
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
                            <button className={"fac-reserve-button"} >
                                <a href={"/admin/reservation"}>예약하기</a>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        ));
        return (
            <>
                <Header />
                <Container className={"userView-container"}>
                    <div>{content}</div>
                </Container>
            </>


        );
    }
}

export default UserView;


