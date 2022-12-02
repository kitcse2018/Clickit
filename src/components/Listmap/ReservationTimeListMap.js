import {Button, Collapse} from "reactstrap";
import React, {useEffect, useState} from "react";
import {timeFormat} from "../../methods/facility/FacilityMethod";
import {getSeatsByTimes} from "../../methods/reservation/ReservationMethod";
import Axios from "axios";
import ReservationSeatsListMap from "./ReservationSeatsListMap";

const ReservationTimeListMap = (props) =>{

    // 밑에처럼 해야 빠름
    useEffect(()=>{
        Axios.get('http://localhost:3001/getSeatsByTimes',{
            params: {
                startTime : props.props.seat_availability_start_time,
                endTime : props.props.seat_availability_end_time,
                facilityNum : props.facilityNum,
            }
        }).then((response) => {
            setSeatsList(response.data);
            console.log("useEffect 내부 Axios.get");
        });
    },[]);


    const [state, setState] = React.useState({
       moreInfoOpen: false,
    });

    const [seatsList,setSeatsList] = useState([]);

    const {moreInfoOpen} = state;

     const toggleMoreInfo = () => {
        setState({
            moreInfoOpen: !moreInfoOpen,
        });
        //한 박자 느림
        if(!moreInfoOpen){
            // setSeatsList(getSeatsByTimes(props.props.seat_availability_start_time,props.props.seat_availability_end_time, props.facilityNum));
            Axios.get('http://localhost:3001/getSeatsByTimes',{
                params: {
                    startTime : props.props.seat_availability_start_time,
                    endTime : props.props.seat_availability_end_time,
                    facilityNum : props.facilityNum,
                }
            }).then((response) => {
                setSeatsList((seatsList) => response.data);
                const test = response.data;
                console.log("toggleMoreInfo 내부 Axios.get");
            });
        }
    }

    return (
        <>
            <ul className={"reservation-time-select"} onClick={toggleMoreInfo}>
                <li className={"reservation-seat-select"} className={moreInfoOpen ? "opened" : "closed" }>
                    {/*디비에 시간 개수만큼 가져오기*/}
                    <h1 className={"display-3 reservation-time-title"}>
                        {timeFormat(props.props.seat_availability_start_time,props.props.seat_availability_end_time)}
                    </h1>
                    <span className={"reservation-accIcon"}/>
                    <Collapse isOpen={moreInfoOpen} className={moreInfoOpen? "opened" : "closed"}>
                        {seatsList.map((seat) => {
                            return(
                                <ReservationSeatsListMap props={seat}></ReservationSeatsListMap>
                            )
                            })
                        }
                        {/* 여기를 map 해야 됨 */}
                        {/*<div className={"reservation-seat"}>*/}
                        {/*    <h1>reservation-seat</h1>*/}
                        {/*    /!*해당 시간의 자리 개수만큼 가져오기*!/*/}
                        {/*    <div className={"seat-name"}>*/}
                        {/*        /!*    해당 자리 이름 가져오기*!/*/}
                        {/*        <h1>seat-name</h1>*/}
                        {/*    </div>*/}
                        {/*    <Button>reservation-request-button</Button>*/}
                        {/*</div>*/}
                    </Collapse>
                </li>
            </ul>
        </>
    )
    console.log(props);
};

export default ReservationTimeListMap;