
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
    UncontrolledTooltip, Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Seat from "components/JDcomponents/Seat.js"
import {useLocation} from "react-router-dom";
import React, {useState} from "react";
import Axios from "axios";

const FacilitySeat = (props) => {
    const location = useLocation();

    const items = location.state;

    const [adminFacilitySeatList,setAdminFacilitySeatList] = useState([]);
    Axios.get("http://localhost:3001/adminfacilitySeat",{params:{
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



    return (
        <>
            <Header />
            <Container className="addFacility-container">
                    <div className={"facility-seat-content-body"}>
                        <div className ="facility-seat-header">
                            <h2>{items.facility_name}</h2>
                        </div>
                        <h2>자리</h2>
                        <div className={"facility-seat-add-body"}>
                            <input type={"text"} className={"facility-seat-name-input"} placeholder={"자리명"} onChange = {onSeatAdd}/>
                            <Button color="primary" className={"facility-seat-add"} onClick={async (e) =>{
                                let seatNum = "";
                                if(addFacilitySeatName == ""){
                                    alert("필수 항목을 입력해주세요");
                                }else{
                                    await Axios.post("http://localhost:3001/facilitySeatInsert",{
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
                                            await Axios.post("http://localhost:3001/facilitySeatAvailabilityInsert",{
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
                                            await Axios.post("http://localhost:3001/facilitySeatAvailabilityInsert",{
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
                            }}>추가</Button>
                        </div>
                        <div className={"facility-seat-list"}>
                            <ul className={"facility-seat-list-ul"}>
                                {adminFacilitySeatList.map(adminFacilitySeat => (
                                    <Seat adminFacilitySeat={adminFacilitySeat} adminFacility={items}/>
                                ))}
                            </ul>
                        </div>
                    </div>
            </Container>
        </>
    );
};

export default FacilitySeat;