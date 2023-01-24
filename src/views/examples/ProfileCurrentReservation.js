import {timeFormat} from "../../methods/facility/FacilityMethod";
import {Button} from "reactstrap";
import Axios from "axios";

const ProfileCurrentReservation = (curRes) =>{

    console.log("curRes");
    console.log(curRes.myCurReservation);

    // const resStartTime = new Date(curRes.myCurReservation.start_time);
    // const resEndTime = new Date(curRes.myCurReservation.end_time);

    const cancelReservation = (curRes) =>{
        console.log("cancel reservation");
        if(window.confirm("예약을 취소하시겠습니까?")){
            Axios.all([Axios.post('http://localhost:3001/cancelReservation',{
                params:{
                    reservationNum: curRes.myCurReservation.reservation_num,
                }
            }), Axios.post('http://localhost:3001/updateSeatAvailabilityStatusAble',{
                params:{
                    seatAvailabilityNum: curRes.myCurReservation.seat_availability_num,
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
                    {/*<span>{timeFormat(resStartTime, resEndTime)}</span>*/}
                </div>
                <div className={"res-li-seat-name"}>
                    <span>좌석 111</span>
                </div>
                <Button className={"res-cancel-btn"} color={"danger"} onClick={()=>cancelReservation(curRes)}>예약 취소</Button>
            </div>
        </li>
    )
};

export default ProfileCurrentReservation;