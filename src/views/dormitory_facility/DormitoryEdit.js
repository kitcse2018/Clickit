
import React, {useCallback, useEffect, useState} from "react";
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
import "../../assets/css/dormitory-edit.css";
import "../../assets/css/btn.css"
import Axios from "axios";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router-dom";
import * as config from '../../config';
import ImgUploadForm from "../../components/imgUpload/ImgUploadForm";
const DormitoryEdit = (props) => {
    const location = useLocation();

    const items = location.state;

    const [imageName,setImageName] = useState("3838005.png");
    const [dormitoryName, setDormitoryName] = useState(items.dormitory_name);
    const [postImage,setPostImage] = useState("")

    useEffect(()=>{
        Axios.get("http://"+config.HOST.toString()+"/getImageDormitory",{params:
                {postDormitoryNum :items.dormitory_num}}).then((response) => {
            console.log(response.data[0].dormitory_pic)
            if(response.data[0].dormitory_pic==="") {
                setImageName("3838005.png")
            }else{
                setImageName(response.data[0].dormitory_pic)
            }
        })
    },[])


    const onNameChange = (e) => {
        setDormitoryName(e.target.value);
    }

    const [dormitoryEdit,setdormitoryEdit] = useState([]);
    Axios.get("http://"+config.HOST.toString()+"/dormitoryEdit",{params:{
            dormitory_num : items.dormitory_num,
        }}).then((response) => {
        setdormitoryEdit(response.data);
    });

    const [adminfacilityList,setadminfacilityList] = useState([]);
    Axios.get("http://"+config.HOST.toString()+"/adminfacility",{params:{
            dormitory_num : items.dormitory_num,
        }}).then((response) => {
        setadminfacilityList(response.data);
    });

    function timeFormat(start_time, end_time){
        const s_time = start_time.slice(0,5);
        const e_time = end_time.slice(0,5);

        return s_time + " ~ " + e_time;
    }


    const history = useHistory();

    return (
        <>
            <Header />
            <Container className={"dormitoryEdit-container"}>
                {/* =============== start dormitory edit content =============== */}
                <div className={"dormitory-edit-content"}>
                    <div className={"dormitory-edit-content-header"}>
                        <div className={"dormitory-name"}>
                            <h1>{items.dormitory_name}</h1>
                        </div>
                        <div className={"dormitory-img"}>
                            <img style={{ width: "90%", height: "90%"}} src={require("../../assets/img/kumoh/"+ imageName)} alt="?????? ??????"/>
                        </div>
                        {/*<Button className={"dormitory-img-edit basic-btn"} type={"button"}  size={"sm"}>????????? ??????</Button>*/}
                        <ImgUploadForm setPostImage={setPostImage}/>
                        <input type={"text"} className={"dormitory-name-input"} defaultValue={items.dormitory_name} onChange = {onNameChange}/>
                        <Button className={"dormitory-edit-save basic-btn"} type={"button"}  onClick={() =>{
                            console.log(postImage)
                            Axios.post("http://"+config.HOST.toString()+"/dormitoryUpdate",{
                                termsData: {
                                    dormitory_pic : postImage,
                                    dormitory_num: items.dormitory_num,
                                    dormitory_name : dormitoryName,
                                }
                            }).then(e => {
                                console.log(e);
                            })
                            window.location.href = "/admin/dormitoryManager";
                        }
                        } >
                            ??????
                        </Button>

                    </div>
                    <div className={"dormitory-edit-content-body"}>
                        <div>
                            <Button className={"dormitory-create-innerFacility"} type={"button"} color={"primary"} onClick={() => {history.push({
                                    pathname : "/admin/addFacility",
                                    state : {
                                        facility_num : "",
                                        facility_name : "",
                                        facility_limit_people : "",
                                        facility_pic : "",
                                        facility_start_time : "",
                                        facility_end_time : "",
                                        dormitory_num : items.dormitory_num,
                                        dormitory_name : items.dormitory_name,
                                    }
                                }
                            )}}>????????? ??????</Button>
                        </div>

                        {/*dormitoryEditList??? ?????? facility name limit time ????????????*/}
                        <div className={"dormitory-innerFacility-list"} >
                            <ul className={"dormitory-innerFacility-list-ul"}>
                                {adminfacilityList.map(adminfacility => (
                                    <li className={"dormitory-innerFacility-list-li"}>
                                        <div className="gnb_menu">
                                            <ul className="dormitory-innerFacility-li">
                                                <div className={"dormitory-innerFacility-content"}>
                                                    <li className="dormitory-innerFacility-name">
                                                        <h1>{adminfacility.facility_name}</h1>
                                                    </li>
                                                    <li className="dp1">
                                                        <h3>?????? ?????? ??????[{adminfacility.facility_limit_people}]</h3>
                                                    </li>
                                                    <li className="dp1">
                                                        <h3>?????? ?????? ?????? {timeFormat(adminfacility.facility_start_time,adminfacility.facility_end_time)}</h3>
                                                    </li>
                                                </div>

                                                <div className={"dormitory-innerFacility-button"}>
                                                    <Button color = "primary" className={"dormitory-update-innerFacility basic-btn"} type={"button"}  onClick={() => {history.push({
                                                            pathname : "/admin/addFacility",
                                                            state : {
                                                                facility_num : adminfacility.facility_num,
                                                                facility_name : adminfacility.facility_name,
                                                                facility_limit_people : adminfacility.facility_limit_people,
                                                                facility_pic : adminfacility.facility_pic,
                                                                facility_start_time : adminfacility.facility_start_time,
                                                                facility_end_time : adminfacility.facility_end_time,
                                                                dormitory_num : items.dormitory_num,
                                                                dormitory_name : items.dormitory_name
                                                            }
                                                        }

                                                    )}}> ??????</Button>

                                                    <Button color="danger" onClick={() =>{
                                                        if(window.confirm("?????? ?????????????????????????")) {
                                                            Axios.post("http://"+config.HOST.toString()+"/deleteFacility", {
                                                                termsData: {
                                                                    facility_num: adminfacility.facility_num,
                                                                }
                                                            }).then(e => {
                                                                console.log(e);
                                                            })
                                                            alert("?????? ???????????????.");
                                                            window.location.replace("/admin/dormitoryEdit");
                                                        }
                                                        else {
                                                            alert("???????????????.")
                                                        }
                                                    }
                                                    }> ??????</Button>

                                                    <Button color = "success" onClick={() => {history.push({
                                                            pathname : "/admin/facilitySeat",
                                                            state : {
                                                                facility_num : adminfacility.facility_num,
                                                                facility_name : adminfacility.facility_name,
                                                                facility_start_time : adminfacility.facility_start_time,
                                                                facility_end_time : adminfacility.facility_end_time,
                                                            }
                                                        }

                                                    )}}> ?????? ??????</Button>
                                                </div>

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