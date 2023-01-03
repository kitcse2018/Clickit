import {Button} from "reactstrap";
import {timeFormat} from "../../methods/facility/FacilityMethod";
import Axios from "axios";
import * as config from "../../config";
import {useState} from "react";

const ProfileReservationListMap = (resList) =>{

    console.log(resList.resList);
    const resStartTime = resList.resList.start_time;
    const resEndTime = resList.resList.end_time;
    console.log(resList.resList.seat_availability_num);

    const [dorFacName, setDorFacName] = useState([]);

    const cancelReservation = () =>{
        console.log("cancel reservation");
        if(window.confirm("예약을 취소하시겠습니까?")){
            Axios.all([Axios.post("http://"+config.HOST.toString()+'/cancelReservation',{
                params:{
                    reservationNum: resList.resList.reservation_num,
                }
            }), Axios.post("http://"+config.HOST.toString()+'/updateSeatAvailabilityStatusAble',{
                params:{
                    seatAvailabilityNum: resList.resList.seat_availability_num,
                }
            }),Axios.get('http://'+config.HOST.toString()+'/profileMyResInfo',{
                    params:{
                        studentNum : sessionStorage.getItem("studentNum"),
                    }
                }
            )]).then(Axios.spread((response1, response2, response3) => {
                console.log(response1);
                console.log(response2);
                setDorFacName(response3);
            })).catch((error) => {
                console.log(error);
            });
            window.location.replace("/student/user-profile");
        }else{
            alert("취소되었습니다.");
        }
    }

    return(
        <>
            {resList.resList.reservation_status === "예약" ?<li className={"res-li"}>
                <div className={"res-li-contents"}>
                    <div className={"res-li-fac-name"}>
                        <span> 오름1동 - 휴게실 </span>
                        {/*{dorFacName.map((dorFacName) =>
                                <ProfileResList dorFacName = {dorFacName}></ProfileResList>
                            // <span>{dorFacName.dormitory_name} - {dorFacName.facility_name}</span>
                            )}*/}
                    </div>
                    <div className={"res-li-time"}>
                        <span>{timeFormat(resStartTime, resEndTime)}</span>
                    </div>
                    <div className={"res-li-seat-name"}>
                        <span>좌석 1</span>
                    </div>
                    <Button className={"res-cancel-btn"} color={"danger"} onClick={()=>cancelReservation()}>예약 취소</Button>
                </div>
            </li> : <></>}
        </>
    )
}

export default ProfileReservationListMap;