import {Button, Card, CardBody, CardHeader, Form, Input} from "reactstrap";
import React, {useCallback, useEffect} from "react";
import Axios from "axios";
import {
    getBlacklistEndDate,
    getCurrentDate,
    updateSeatAvailabilityStatusDisable
} from "../../methods/reservation/ReservationMethod";
import * as config from '../../config';
const ReservationModal = ({terms, onModalDisplay, seat, facilityNum}) =>{

    console.log("terms data set : "+terms[0]);

    const [temperature, setTemperature] = React.useState(0);

    const onTempChange = useCallback(e=>{
        setTemperature(e.target.value);
    },[]);

    const isBlacked = () =>{
        console.log("isBlacked function");
        Axios.get("http://"+config.HOST.toString()+"/isBlacked",{
            params:{
                studentNum : parseInt(sessionStorage.getItem("studentNum")),
                currentDate : getCurrentDate(),
            }
        }).then((response)=>{
            if(parseInt(response.data[0]['count(*)'])===0){
                hasReservation();
            }else{
                alert("현재 예약이 불가능합니다.\n" +
                    "사유 : 정지\n" +
                    "정지 기간은 마이페이지에서 확인 가능합니다.\n" +
                    "관련 내용은 기숙사에 문의 바랍니다.\n"
                );
            }
        })
    };

    const hasReservation = () => {
        console.log("hasReservation function");
        if(temperature.length > 10 || temperature.length < 1){
            alert("올바른 온도를 입력해주세요.");
        }else{
            Axios.get("http://"+config.HOST.toString()+"/hasReservation",{
                params: {
                    studentNum : parseInt(sessionStorage.getItem("studentNum")),
                    startTime : seat.seat_availability_start_time,
                    endTime : seat.seat_availability_end_time,
                    // seatAvailabilityNum : seat.seat_availability_num,
                }
            }).then((response) => {
                if(parseInt(response.data[0]['count(*)']) === 0){
                    reservation();
                }else{
                    alert("동일한 시간에 중복된 예약을 할 수 없습니다.");
                }
            });
        }
    }

    const reservation =()=>{
        console.log("reservation function");
        Axios.post("http://"+config.HOST.toString()+"/reservation",{
            params: {
                studentNum : parseInt(sessionStorage.getItem("studentNum")),
                startTime : seat.seat_availability_start_time,
                endTime : seat.seat_availability_end_time,
                recordTime : getCurrentDate(),
                reservationStatus : "예약",
                seatAvailabilityNum : seat.seat_availability_num,
                temp : temperature,
                facilityNum : facilityNum,
            }
        }).then((response) => {
            console.log(response);
            updateSeatAvailabilityStatusDisable(seat.seat_availability_num);
            onModalDisplay();
            alert("예약이 완료되었습니다.");
            window.location.reload();
        });
    }

    return(
        <>
            <div className={"reservation-modal-body"}>
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>체온 입력</small>
                        </div>
                        <div className="btn-wrapper text-center">
                            <Input placeholder={"예시 : 36.5"} onChange={onTempChange}></Input>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>이용 수칙 안내</small>
                        </div>
                        <Form role="form">
                            <div className="reservation-terms">
                                {terms[0].terms_contents}
                            </div>
                            <div className="terms-explain">
                                <small><br/>위의 이용 수칙을 모두 확인하였으며, 이에 동의합니다.</small>
                            </div>
                            <div className="text-center">
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={()=>isBlacked()}
                                >
                                    예약 신청
                                </Button>
                                <Button
                                    className="ml-auto"
                                    color="danger"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() =>onModalDisplay()}
                                >
                                    취소
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default React.memo(ReservationModal);