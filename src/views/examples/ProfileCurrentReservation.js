import {timeFormat} from "../../methods/facility/FacilityMethod";
import {Button} from "reactstrap";
import Axios from "axios";

const ProfileCurrentReservation = (curRes) =>{

    console.log("curRes");
    console.log(curRes.curRes[0]);

    const resStartTime = curRes.curRes[0].start_time;
    const resEndTime = curRes.curRes[0].end_time;

    const cancelReservation = () =>{
        console.log("cancel reservation");
        if(window.confirm("예약을 취소하시겠습니까?")){
            Axios.all([Axios.post('http://localhost:3001/cancelReservation',{
                params:{
                    reservationNum: curRes.curRes[0].reservation_num,
                }
            }), Axios.post('http://localhost:3001/updateSeatAvailabilityStatus',{
                params:{
                    seatAvailabilityNum: curRes.curRes[0].seat_availability_num,
                }
            })]).then(Axios.spread((response1, response2) => {
                console.log(response1);
                console.log(response2);
            })).catch((error) => {
                console.log(error);
            });
        }else{
            alert("취소되었습니다.");
        }
    }

    return(
        <li className={"res-li"}>
            <div className={"res-li-contents"}>
                <div className={"res-li-fac-name"}>
                    <span>오름 1동 휴게실</span>
                </div>
                <div className={"res-li-time"}>
                    <span>{timeFormat(resStartTime, resEndTime)}</span>
                </div>
                <div className={"res-li-seat-name"}>
                    <span>좌석 1</span>
                </div>
                <Button className={"res-cancel-btn"} color={"danger"} onClick={()=>cancelReservation()}>예약 취소</Button>
            </div>
        </li>
    )
};

export default ProfileCurrentReservation;