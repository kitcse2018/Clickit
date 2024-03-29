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
import React, {useState} from "react";
import Axios from "axios";
import * as config from '../../config';
const Seat = ({adminFacilitySeat,adminFacility}) => {

    const [facilitySeatName, setFacilitySeatName] = useState(adminFacilitySeat.facility_seat_name);
    const onSeatNameChange = (e) => {
        setFacilitySeatName(e.target.value);
    }

    const [facilitySeatStatus, setFacilitySeatStatus] = useState(adminFacilitySeat.facility_seat_status);

    return (
        <>
            <div className={"seat-list"}>
                <ul className={"facility-seat-ul"}>
                    <li className={"dp1"}>
                        <input type={"text"} className={"facility-name-input"} defaultValue={adminFacilitySeat.facility_seat_name} onChange={onSeatNameChange}/>
                    </li>
                    <li className={"dp1"}>
                        <Button className={"facility-seat-status"} id={"btn"} color ="warning" onClick={(e) =>{
                            if(e.target.innerText == '사용 가능'){
                                e.target.innerText = '사용 불가';
                                setFacilitySeatStatus('사용 불가')
                            }else{
                                e.target.innerText = '사용 가능'
                                setFacilitySeatStatus('사용 가능')
                            }
                        }} >{adminFacilitySeat.facility_seat_status}</Button>
                    </li>
                    <Button color="primary" className={"facility-seat-save"} onClick={() =>{

                        if(adminFacilitySeat.facility_name ==""){
                            alert("필수 항목을 입력해주세요");
                        }else{
                            Axios.post("http://"+config.HOST.toString()+"/facilitySeatUpdate",{
                                termsData: {
                                    facility_seat_num : adminFacilitySeat.facility_seat_num,
                                    facility_seat_name : facilitySeatName,
                                    facility_seat_status : facilitySeatStatus,
                                }
                            }).then(e => {
                                console.log(e);
                            })
                        }

                    }}>저장</Button>
                    <Button color= "danger" className={"facility-seat-delete"} onClick={() =>{
                        if(window.confirm("정말 삭제하시겠습니까?")) {
                            Axios.delete("http://"+config.HOST.toString()+"/facilitySeatDelete",{
                                data: {
                                    facility_seat_num: adminFacilitySeat.facility_seat_num,
                                },
                            }).then(e => {
                                console.log(e);
                            })
                            alert("삭제 되었습니다.")
                            window.location.replace("/admin/facilitySeat")
                        }else {
                            alert("취소합니다.")
                        }


                    }}>삭제</Button>
                </ul>
            </div>
        </>
    );
};

export default Seat;
