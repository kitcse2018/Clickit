
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
    UncontrolledTooltip, Button, Input
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Seat from "components/JDcomponents/Seat.js"
import {useLocation} from "react-router-dom";
import React, {useState} from "react";
import Axios from "axios";
import * as config from '../../config';
import "../../assets/css/mycss/FacilitySeat.css";

const FacilitySeat = (props) => {
    const location = useLocation();

    const items = location.state;

    const [adminFacilitySeatList,setAdminFacilitySeatList] = useState([]);
    Axios.get("http://"+config.HOST.toString()+"/adminfacilitySeat",{params:{
            facility_num : items.facility_num,
        }}).then((response) => {
        setAdminFacilitySeatList(response.data);
    });

    const [addFacilitySeatName,setAddFacilitySeatName] = useState("");
    const onSeatAdd = (e) => {
        setAddFacilitySeatName(e.target.value);
    }
    const [facilitySeatNum,setFacilitySeatNum] = useState("");



    let startTime = items.facility_start_time.slice(0,2);
    let endTime = items.facility_end_time.slice(0,2);

    let startMTime = items.facility_start_time.slice(3,5);
    let endMTime = items.facility_end_time.slice(3,5);
    let count = endTime - startTime;

    if(startMTime - endMTime > 0)
        count = endTime - startTime + 1;

    let addStart = items.facility_start_time.slice(0,2);

    function goBack(){
        props.history.goBack();
    }


    return (
        <>
            <Header />
            <Container className="addFacility-container facilitySeat-container">
                <div className={"facility-seat-content-body"}>
                    <div className ="facility-seat-header">
                        <h2 className={"display-2 facility-seat-header-name"}>{items.facility_name}</h2>
                        <Button onClick={()=>goBack()} color={"primary"} className={"back-button"}>완료</Button>
                    </div>
                    <div className={"facility-seat-contents"}>
                        <div className={"facility-seat-manage"}>
                            <h2>자리 추가</h2>
                            <div className={"facility-seat-add-body"}>
                                <Input type={"text"} className={"facility-seat-name-input facility-seat-name-input-css"} placeholder={"자리명"} onChange = {onSeatAdd}/>
                                <Button color="primary" className={"facility-seat-add"} onClick={async (e) =>{
                                    let data="";
                                    await Axios.get("http://"+config.HOST.toString()+"/duplicateSeatName",{params:{facility_seat_name :addFacilitySeatName , facility_num : items.facility_num,

                                        }}).then((response)=>
                                    {
                                        data = response.data;
                                    });
                                    if(data.at(0) == null){
                                        let seatNum = "";
                                        if(addFacilitySeatName == ""){
                                            alert("필수 항목을 입력해주세요");
                                        }else{
                                            await Axios.post("http://"+config.HOST.toString()+"/facilitySeatInsert",{
                                                termsData: {
                                                    facility_seat_name : addFacilitySeatName,
                                                    facility_num : items.facility_num,
                                                    facility_seat_status : "사용 가능",
                                                }
                                            }).then(response => {
                                                seatNum = response.data.insertId;
                                            })
                                            for(let i = 0; i < count-1; i++){
                                                let currentStartTime = addStart + ":" +  startMTime;
                                                let addEnd = ++addStart;
                                                let currentEndTime = addEnd + ":" + endMTime;
                                                if(i == (count-1)){
                                                    await Axios.post("http://"+config.HOST.toString()+"/facilitySeatAvailabilityInsert",{
                                                        termsData: {
                                                            facility_start_time : currentStartTime,
                                                            facility_end_time : items.facility_end_time,
                                                            facility_seat_num : seatNum,
                                                            seat_availability_status : "사용 가능",
                                                        }
                                                    }).then(e => {
                                                        console.log(e);
                                                    })
                                                }else{
                                                    await Axios.post("http://"+config.HOST.toString()+"/facilitySeatAvailabilityInsert",{
                                                        termsData: {
                                                            facility_start_time : currentStartTime,
                                                            facility_end_time : currentEndTime,
                                                            facility_seat_num : seatNum,
                                                            seat_availability_status : "사용 가능",

                                                        }
                                                    }).then(e => {
                                                        console.log(e);
                                                    })
                                                }

                                            }
                                        }
                                        window.location.replace("/admin/facilitySeat")
                                    }else {
                                        alert("중복된 자리명입니다.")
                                    }

                                }}>추가</Button>
                            </div>
                        </div>
                        <div className={"facility-seat-list"}>
                            <h2 className={"seat-list-header"}>자리 목록</h2>
                            <div className={"seat-manage-header"}>
                                <div className={"seat-manage-header-name"}>자리명</div>
                                <div className={"seat-manage-header-status"}>상태</div>
                                <div className={"seat-manage-header-save"}>저장</div>
                                <div className={"seat-manage-header-delete"}>삭제</div>
                            </div>
                            <ul className={"facility-seat-list-ul"}>
                                {adminFacilitySeatList.map(adminFacilitySeat => (
                                    <Seat adminFacilitySeat={adminFacilitySeat} adminFacility={items}/>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default FacilitySeat;