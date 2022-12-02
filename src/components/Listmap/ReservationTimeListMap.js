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
        });
    },[]);


    const [moreInfoState, setMoreInfoState] = React.useState({
       moreInfoOpen: false,
    });

    const [seatsList,setSeatsList] = useState([]);

    const {moreInfoOpen} = moreInfoState;

     const toggleMoreInfo = () => {
         setMoreInfoState({
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
        console.log(props);
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
                                <ReservationSeatsListMap props={seat} facilityNum = {props.facilityNum}></ReservationSeatsListMap>
                            )
                            })
                        }
                    </Collapse>
                </li>
            </ul>
        </>
    );
};

export default ReservationTimeListMap;