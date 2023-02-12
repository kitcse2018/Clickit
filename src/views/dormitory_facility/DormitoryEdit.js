import React, {useEffect, useState} from "react";
import {
    Button, Card,
    Container,
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
    const [postImage,setPostImage] = useState("");
    const [imgFile,setImgFile] = useState("");

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

    function goBack(){
        window.location.href = "/admin/dormitoryManager";
    }

    const history = useHistory();

    return (
        <>
            <Header />
            <Container className={"dormitoryEdit-container"}>
                <div className={"dormitory-edit-main"}>
                    <div className={"dormitory-edit-content-header"}>
                        <div className={"dormitory-name"}>
                            <h1>{items.dormitory_name}</h1>
                        </div>
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
                        )}}>시설물 추가</Button>
                    </div>
                    <div className={"dormitory-edit-content-body"}>
                        <div className={"dormitory-img-container"}>
                            <div className={"dormitory-img"}>
                                <img style={{ width: "90%", height: "90%"}} src={imgFile ? imgFile : require("../../assets/img/kumoh/"+ imageName)} alt="사진 없음"/>
                            </div>
                            <div className={"dormitory-manage"}>
                                <div className={"dormitory-img-edit-title"}>
                                    <h3>기숙사 사진 수정</h3>
                                </div>
                                <ImgUploadForm setPostImage={setPostImage} setImgFile={setImgFile}/>
                            </div>
                            <div className={"dormitory-name-edit"}>
                                <div className={"dormitory-name-title"}>
                                    <h3>기숙사 이름 수정</h3>
                                </div>
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
                                    저장
                                </Button>
                            </div>
                        </div>
                        <div className={"dormitory-innerFacility-list-container"} >
                            <div className={"dormitory-innerFacility-list-main"}>
                                {adminfacilityList.map(adminfacility => (
                                    <div className={"dormitory-innerFacility-list-contents"}>
                                        <div className={"dormitory-innerFacility-detail"}>
                                            <div className="dormitory-innerFacility-name">
                                                <h1>{adminfacility.facility_name}</h1>
                                            </div>
                                            <div className="dormitory-innerFacility-capacity">
                                                <h3>이용 가능 인원: {adminfacility.facility_limit_people}명</h3>
                                            </div>
                                            <div className="dormitory-innerFacility-time">
                                                <h3>이용 가능 시간 {timeFormat(adminfacility.facility_start_time,adminfacility.facility_end_time)}</h3>
                                            </div>
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

                                            )}}> 수정</Button>

                                            <Button color="danger" onClick={() =>{
                                                if(window.confirm("정말 삭제하시겠습니까?")) {
                                                    Axios.post("http://"+config.HOST.toString()+"/deleteFacility", {
                                                        termsData: {
                                                            facility_num: adminfacility.facility_num,
                                                        }
                                                    }).then(e => {
                                                        console.log(e);
                                                    })
                                                    alert("삭제 되었습니다.");
                                                    window.location.replace("/admin/dormitoryEdit");
                                                }
                                                else {
                                                    alert("취소합니다.")
                                                }
                                            }
                                            }> 삭제</Button>

                                            <Button color = "success" onClick={() => {history.push({
                                                    pathname : "/admin/facilitySeat",
                                                    state : {
                                                        facility_num : adminfacility.facility_num,
                                                        facility_name : adminfacility.facility_name,
                                                        facility_start_time : adminfacility.facility_start_time,
                                                        facility_end_time : adminfacility.facility_end_time,
                                                    }
                                                }

                                            )}}> 자리 수정</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={"dormitory-edit-footer"}>
                        <Button onClick={()=>goBack()} color={"primary"} className={"back-button"}>수정 완료</Button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default DormitoryEdit;