
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Button,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router-dom";
import React, {useState, useEffect} from "react";
import Axios from "axios";
import * as config from '../../config';
import "../../assets/css/mycss/AddFacility.css";
import ImgUploadForm from "../../components/imgUpload/ImgUploadForm";


const AddFacility = (props) => {
    const location = useLocation();

    const items = location.state;
    const [imageName,setImageName] = useState("clickit.png");
    const [postImage,setPostImage] = useState("clickit.png");
    const [imgFile,setImgFile] = useState("");


    useEffect(()=>{
        Axios.get("http://"+config.HOST.toString()+"/getImageFacility",{params:
                {postFacilityNum :items.facility_num}}).then((response) => {
            console.log(response.data[0].facility_pic)
            console.log(items.facility_num)
            if(response.data[0].facility_pic==="") {
                setImageName("clickit.png")
            }else{
                setImageName(response.data[0].facility_pic)
            }
        })
    },[])
    const [facilityName, setFacilityName] = useState(items.facility_name);
    const onNameChange = (e) => {
        setFacilityName(e.target.value);
    }
    const [facilityLimit, setFacilityLimit] = useState(items.facility_limit_people);
    const onLimitChange = (e) => {
        setFacilityLimit(e.target.value);
    }
    const [facilityStartTime, setFacilityStartTime] = useState(items.facility_start_time);
    const onStartTimeChange = (e) => {
        setFacilityStartTime(e.target.value);
    }
    const [facilityEndTime, setFacilityEndTime] = useState(items.facility_end_time);
    const onEndTimeChange = (e) => {
        setFacilityEndTime(e.target.value);
    }
    const [lastFacilityNum, setLastFacilityNum] = useState(0);


    const [facilityEdit,setFacilityEdit] = useState([]);
    Axios.get("http://"+config.HOST.toString()+"/facilityEdit",{params:{
            facility_num : items.facility_num,
        }}).then((response) => {
        setFacilityEdit(response.data);
    });

    const [adminFacilitySeatList,setAdminFacilitySeatList] = useState([]);
    Axios.get("http://"+config.HOST.toString()+"/adminfacilitySeat",{params:{
            facility_num : items.facility_num,
        }}).then((response) => {
        setAdminFacilitySeatList(response.data);
    });

    function timeFormat(time){
        const c_time = time.slice(0,5);

        return c_time;
    }

    function insertDefaultTerms(lastFacilityNum){
        Axios.post("http://"+config.HOST.toString()+"/insertDefaultTerms",{
            termsData: {
                termsTitle: "기본 이용수칙",
                termsContents: "시설물을 이용 시 반드시 이용수칙을 준수해주시기 바랍니다.\n시설물 이용 후 정돈을 해주시기 바랍니다.",
                termsFacility: parseInt(lastFacilityNum),
            }
        }).then(e => {
            console.log(e);
        })
    }

    const history = useHistory();
    //시간 계산

    return (
        <>
            <Header />
            <Container className="addFacility-container addFacility-container">
                <div className = {"facility-add-content"}>
                    <div className={"facility-add-content-header"}>
                        <div className={"facility-name"}>
                            <h1>{items.facility_name}</h1>
                        </div>
                        <div className={"facility-edit"}>
                            <div className={"facility-edit-picture"}>
                                <div className={"dormitory-img"}>
                                    {/*이미지 나중에 가져와서 변경해주기*/}
                                    <img style={{ width: "90%", height: "90%"}} src={imgFile ? imgFile : require("../../assets/img/kumoh/"+ imageName)} alt="사진 없음"/>
                                </div>
                                <ImgUploadForm setPostImage={setPostImage} setImgFile={setImgFile}/>
                            </div>
                            <div className={"facility-edit-content"}>
                                <div>
                                    <Button className={"facility-edit-save check"} type={"button"} color={"primary"} onClick={async () =>{
                                        if(items.facility_num ==""){
                                            if(facilityName==""||facilityLimit==""||facilityStartTime==""||facilityEndTime==""){
                                                alert("필수 항목을 입력해주세요");
                                            }else {
                                                console.log("image name : " +postImage);
                                                await Axios.post("http://"+config.HOST.toString()+"/facilityInsert",{
                                                    termsData: {
                                                        facility_name : facilityName,
                                                        facility_limit_people : facilityLimit,
                                                        facility_start_time : facilityStartTime,
                                                        facility_end_time : facilityEndTime,
                                                        dormitory_num : items.dormitory_num,
                                                        facility_pic : postImage,
                                                    }
                                                }).then(e => {
                                                    console.log(e);
                                                })

                                                Axios.get("http://"+config.HOST.toString()+"/getMaxPkFromFacility")
                                                    .then((res)=>{
                                                        setLastFacilityNum(res.data[0].lastFacilityNum);
                                                        insertDefaultTerms(res.data[0].lastFacilityNum);
                                                    })
                                                history.push({
                                                        pathname : "/admin/dormitoryEdit",
                                                        state : {
                                                            dormitory_num : items.dormitory_num,
                                                            dormitory_name : items.dormitory_name
                                                        }
                                                    }
                                                )
                                            }
                                        }else{
                                            if(facilityName==""||facilityLimit==""||facilityStartTime==""||facilityEndTime==""){
                                                alert("필수 항목을 입력해주세요");
                                            }else{
                                                console.log(items.facility_num+"이미지명"+postImage);
                                                await Axios.post("http://"+config.HOST.toString()+"/facilityUpdate",{
                                                    termsData: {facility_num: items.facility_num,
                                                        facility_name : facilityName,
                                                        facility_limit_people : facilityLimit,
                                                        facility_start_time : facilityStartTime,
                                                        facility_end_time : facilityEndTime,
                                                        facility_pic : postImage,
                                                    }
                                                }).then(e => {
                                                    console.log(e);
                                                })
                                                //자리 삭제후 다시 insert
                                                if(facilityStartTime !=items.facility_start_time || facilityEndTime != items.facility_end_time){

                                                    let data = ""; //facility_seat_num 여러개 가져오기

                                                    //해당 시설물 넘버에 자리넘버 가져오기
                                                    await Axios.get("http://"+config.HOST.toString()+"/getFacilitySeatNumList",{params:{facility_num : items.facility_num},responseType : 'text'}).then((response)=>
                                                    {
                                                        data = response.data;
                                                    });
                                                    let reg = /[^,0-9]/g;
                                                    let input = data.replace(reg,"");
                                                    let dataArr = input.split(",");


                                                    for(let i = 0 ; i < dataArr.length; i++){
                                                        await Axios.delete("http://"+config.HOST.toString()+"/facilitySeatAvailabilityDelete",{
                                                            data : {
                                                                facility_seat_num : dataArr[i],
                                                            }
                                                        }).then(e => {
                                                            console.log(e);
                                                        })

                                                        //여기서 부터 하면됨
                                                        let startTime = facilityStartTime.slice(0,2);
                                                        let endTime = facilityEndTime.slice(0,2);

                                                        let startMTime = facilityStartTime.slice(3,5);
                                                        let endMTime = facilityEndTime.slice(3,5);
                                                        let count = endTime - startTime + 1;

                                                        if(startMTime - endMTime >= 0)
                                                            count = endTime - startTime;

                                                        let addStart = facilityStartTime.slice(0,2);

                                                        for(let j = 0; j < count; j++){
                                                            let currentStartTime = addStart + ":" +  startMTime;
                                                            let addEnd = ++addStart;
                                                            let currentEndTime = addEnd + ":" + startMTime;
                                                            if(j == (count-1)){
                                                                await Axios.post("http://"+config.HOST.toString()+"/facilitySeatAvailabilityInsert",{
                                                                    termsData: {
                                                                        facility_start_time : currentStartTime,
                                                                        facility_end_time : facilityEndTime,
                                                                        facility_seat_num: dataArr[i],
                                                                        seat_availability_status : "사용 가능",

                                                                    }
                                                                }).then(e => {
                                                                    console.log(e);
                                                                })
                                                            }else{
                                                                await Axios.post("http://"+config.HOST.toString()+"/facilitySeatAvailabilityInsert",{
                                                                    termsData: {
                                                                        facility_seat_num: dataArr[i],
                                                                        seat_availability_status : "사용 가능",
                                                                        facility_start_time : currentStartTime,
                                                                        facility_end_time : currentEndTime,
                                                                    }
                                                                }).then(e => {
                                                                    console.log(e);
                                                                })
                                                            }
                                                        }
                                                    }
                                                }
                                                // history.push({
                                                //         pathname : "/admin/dormitoryEdit",
                                                //         state : {
                                                //             dormitory_num : items.dormitory_num,
                                                //             dormitory_name : items.dormitory_name
                                                //         }
                                                //     }
                                                // )
                                                history.goBack();
                                            }
                                        }
                                    }
                                    } >
                                        저장
                                    </Button>
                                </div>
                                <div className={"facility-edit-content-name"}>
                                    <h3>명칭</h3>
                                    <FormGroup>
                                        <Input type={"text"} className={"facility-name-input form-control-alternative"} defaultValue={items.facility_name} onChange = {onNameChange}/>
                                    </FormGroup>
                                </div>
                                <div className={"facility-edit-content-limit"}>
                                    <h3>사용 가능 인원</h3>
                                    <FormGroup>
                                        <Input type={"text"} className={"facility-limit-input form-control-alternative"} defaultValue={items.facility_limit_people} onChange = {onLimitChange}/>
                                    </FormGroup>
                                </div>
                                <div className={"facility-edit-content-start"}>
                                    <h3>시작 시간</h3>
                                    <FormGroup>
                                        <Input type={"text"} className={"facility-start-input form-control-alternative"} placeholder={"00:00"} defaultValue = {timeFormat(items.facility_start_time)} onChange = {onStartTimeChange}/>
                                    </FormGroup>
                                </div>
                                <div className={"facility-edit-content-end"}>
                                    <h3>종료 시간</h3>
                                    <FormGroup>
                                        <Input type={"text"} className={"facility-end-input form-control-alternative"} placeholder={"00:00"} defaultValue={timeFormat(items.facility_end_time)} onChange = {onEndTimeChange}/>
                                    </FormGroup>
                                </div>
                            </div>
                            {/*사진도 같이 보내줘야함 사진 주소나 bob*/}

                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default AddFacility;