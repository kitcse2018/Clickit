import {Button, Card, CardBody, CardHeader, Form, Input} from "reactstrap";
import React, {useCallback, useEffect} from "react";
import Axios from "axios";

const ReservationModal = ({terms, onModalDisplay, seat}) =>{

    const [temperature, setTemperature] = React.useState(0);

    const onTempChange = useCallback(e=>{
        setTemperature(e.target.value);
    },[]);

    const hasReservation = () => {
        if(temperature.length > 10 || temperature.length <1){
            alert("올바른 온도를 입력해주세요.");
        }else{
            Axios.get('http://localhost:3001/hasReservation',{
                params: {
                    studentNum : parseInt(sessionStorage.getItem("studentNum")),
                    startTime : seat.seat_availability_start_time,
                    endTime : seat.seat_availability_end_time,
                    seatAvailabilityNum : seat.seat_availability_num,
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
        const today = new Date();

        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);

        const hour = ('0' + today.getHours()).slice(-2);
        const minute = ('0' + today.getMinutes()).slice(-2);
        const second = ('0' + today.getSeconds()).slice(-2);

        const timeString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

        Axios.post('http://localhost:3001/reservation',{
            params: {
                studentNum : parseInt(sessionStorage.getItem("studentNum")),
                startTime : seat.seat_availability_start_time,
                endTime : seat.seat_availability_end_time,
                recordTime : timeString,
                reservationStatus : "예약",
                seatAvailabilityNum : seat.seat_availability_num,
                temp : temperature,
            }
        }).then((response) => {
            console.log(response);
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
                                    onClick={()=>hasReservation()}
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