
import React, { useState } from "react";
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
import "../../assets/css/dormitory-edit.css";
import Axios from "axios";

// You must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change const "Template" name!!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const DormitoryEdit = (props) => {

    //img name variable
    let img_name = "clickit.png";
    const findDormitoryValue = props.match.params.dormitory_num

    const [dormitoryEdit,setdormitoryEdit] = useState([]);
    Axios.get("http://localhost:3001/dormitoryEdit",{params:{
            dormitory_num : findDormitoryValue,
        }}).then((response) => {
        setdormitoryEdit(response.data);
    });

    const [adminfacilityList,setadminfacilityList] = useState([]);
    Axios.get("http://localhost:3001/adminfacility",{params:{
            dormitory_num : findDormitoryValue,
        }}).then((response) => {
        setadminfacilityList(response.data);
    });

    return (
        <>
            <Header />
            <Container className={"dormitoryEdit-container"}>
                <div className={"dormitory-name"}>
                    <h1>{dormitoryEdit.name}</h1>
                </div>
                {/* =============== start dormitory edit content =============== */}

                <div className={"dormitory-edit-content"}>
                    <div className={"dormitory-edit-content-header"}>
                        <div className={"dormitory-img"}>
                            {/*이미지 나중에 가져와서 변경해주기*/}
                            <img src={require('../../assets/img/dormitory/' + img_name)}/>
                        </div>
                        <Button className={"dormitory-img-edit"} type={"button"} color={"primary"} size={"sm"}>이미지 수정</Button>
                        {/*<input type={"submit"} className={"dormitory-img-edit"} value={"이미지 수정"}/>*/}
                        <input type={"text"} className={"dormitory-name-input"} placeholder={dormitoryEdit.name}/>
                        <Button className={"dormitory-name-edit"} type={"button"} color={"primary"} size={"sm"}>이름 변경</Button>
                        <Button className={"dormitory-edit-save"} type={"button"} color={"primary"}>저장</Button>
                        <Button className={"dormitory-create-innerFacility"} type={"button"} color={"primary"}>시설물 추가</Button>
                    </div>
                    <div className={"dormitory-edit-content-body"}>
                        {/*dormitoryEditList에 있는 facility name limit time 넣어주기*/}
                            <div className={"dormitory-innerFacility-list"}>
                                <ul className={"dormitory-innerFacility-list-ul"}>
                                    {adminfacilityList.map(adminfacility => (
                                        <li className={"dormitory-innerFacility-list-li"}>
                                            {/*이름 이용가능인원 이용가능시간 사진 편집버튼*/}
                                            {adminfacility.facility_name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                    </div>
                </div>
                {/* =============== end of dormitory edit content ===============  */}
            </Container>

        </>
    );
};

// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "Template" name      !!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default DormitoryEdit;
