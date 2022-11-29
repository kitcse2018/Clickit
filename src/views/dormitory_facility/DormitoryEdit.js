
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
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router-dom";

const DormitoryEdit = (props) => {
    const location = useLocation();

    const items = location.state;

    //img name variable
    let img_name = "clickit.png";
    //input text값 가져오기

    const [dormitoryName, setDormitoryName] = useState(items.dormitory_name);
    const onNameChange = (e) => {
        setDormitoryName(e.target.value);
    }

    const [dormitoryEdit,setdormitoryEdit] = useState([]);
    Axios.get("http://localhost:3001/dormitoryEdit",{params:{
            dormitory_num : items.dormitory_num,
        }}).then((response) => {
        setdormitoryEdit(response.data);
    });

    const [adminfacilityList,setadminfacilityList] = useState([]);
    Axios.get("http://localhost:3001/adminfacility",{params:{
            dormitory_num : items.dormitory_num,
        }}).then((response) => {
        setadminfacilityList(response.data);
    });


    const history = useHistory();

    return (
        <>
            <Header />
            <Container className={"dormitoryEdit-container"}>

                {/* =============== start dormitory edit content =============== */}

                <div className={"dormitory-edit-content"}>

                        {dormitoryEdit.map(dormitory => (
                            <div className={"dormitory-edit-content-header"}>
                                <div className={"dormitory-name"}>
                                    <h1>{dormitory.dormitory_name}</h1>
                                </div>
                                <div className={"dormitory-img"}>
                                    {/*이미지 나중에 가져와서 변경해주기*/}
                                    <img src={require('../../assets/img/dormitory/' + img_name)}/>
                                </div>
                                <Button className={"dormitory-img-edit"} type={"button"} color={"primary"} size={"sm"}>이미지 수정</Button>
                                {/*<input type={"submit"} className={"dormitory-img-edit"} value={"이미지 수정"}/>*/}
                                <input type={"text"} className={"dormitory-name-input"} placeholder={dormitory.dormitory_name} onChange = {onNameChange}/>
                                <Button className={"dormitory-edit-save"} type={"button"} color={"primary"} onClick={() =>{
                                        Axios.post("http://localhost:3001/dormitoryUpdate",{
                                            termsData: {dormitory_num: items.dormitory_num,
                                                    dormitory_name : dormitoryName,
                                            }
                                        }).then(e => {
                                            console.log(e);
                                        })
                                    document.location.replace( "/admin/dormitoryEdit");
                                    }
                                } >
                                    저장
                                </Button>
                                <Button className={"dormitory-create-innerFacility"} type={"button"} color={"primary"} onClick={() => {history.push({
                                        pathname : "/admin/addFacility",
                                        state : {
                                            facility_num : "",
                                            facility_name : "",
                                            facility_limit_people : "",
                                            facility_pic : "",
                                        }
                                }

                                )}}>시설물 추가</Button>
                            </div>
                        ))}
                    <div className={"dormitory-edit-content-body"}>
                        {/*dormitoryEditList에 있는 facility name limit time 넣어주기*/}
                            <div className={"dormitory-innerFacility-list"}>
                                <ul className={"dormitory-innerFacility-list-ul"}>
                                    {adminfacilityList.map(adminfacility => (
                                        <li className={"dormitory-innerFacility-list-li"}>
                                            <div className="gnb_menu">
                                                <ul className="dormitory-innerFacility-li">
                                                    {/*사진가져오기*/}
                                                    <li className="dp1">
                                                        <h1>{adminfacility.facility_name}</h1>
                                                    </li>
                                                    <li className="dp1">
                                                        <h3>이용 가능 인원[{adminfacility.facility_limit_people}]</h3>
                                                    </li>
                                                    <li className="dp1">
                                                        <h3>이용 가능 시간 00:00 ~ 23:59</h3>
                                                    </li>
                                                    <button className={"dormitory-update-innerFacility"} type={"button"} color={"primary"} onClick={() => {history.push({
                                                            pathname : "/admin/addFacility",
                                                            state : {
                                                                facility_num : adminfacility.facility_num,
                                                                facility_name : adminfacility.facility_name,
                                                                facility_limit_people : adminfacility.facility_limit_people,
                                                                facility_pic : adminfacility.facility_pic,
                                                            }
                                                        }

                                                    )}}> 수정</button>

                                                    <button onClick={() =>{
                                                        if(window.confirm("정말 삭제하시겠습니까?")) {
                                                            Axios.post("http://localhost:3001/deleteFacility", {
                                                                termsData: {
                                                                    facility_num: adminfacility.facility_num,
                                                                }
                                                            }).then(e => {
                                                                console.log(e);
                                                            })
                                                            alert("삭제 되었습니다.");
                                                            document.location.replace("/admin/dormitoryEdit");
                                                        }
                                                        else {
                                                            alert("취소합니다.")
                                                        }
                                                    }
                                                    }> 삭제</button>
                                                </ul>

                                            </div>
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

export default DormitoryEdit;