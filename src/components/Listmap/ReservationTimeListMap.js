import {Button, Collapse} from "reactstrap";
import React, {useEffect, useState} from "react";
import {timeFormat} from "../../methods/facility/FacilityMethod";
import {getSeatsByTimes} from "../../methods/reservation/ReservationMethod";
import Axios from "axios";
import ReservationSeatsListMap from "./ReservationSeatsListMap";
import * as config from '../../config';
const ReservationTimeListMap = (props) =>{

    let [timeActivate, setTimeActivate] = useState(false);

    const calCurTime =() =>{
        let curTime = new Date();
        let curHour = curTime.getHours();
        let curMinute = curTime.getMinutes();
        let curSecond = curTime.getSeconds();
        let curTimeStr = curHour + ":" + curMinute + ":" + curSecond;
        if(curHour < props.props.seat_availability_end_time.slice(0,2)){
            setTimeActivate(true);
        }else{
            setTimeActivate(false);
        }
    }

    const doNothing = () => {
        //nothing
    }


    // 밑에처럼 해야 빠름
    useEffect(()=>{
        // Axios.all([Axios.get('http://localhost:3001/getSeatsByTimes',{
        //     params: {
        //         startTime : props.props.seat_availability_start_time,
        //         endTime : props.props.seat_availability_end_time,
        //         facilityNum : props.facilityNum,
        //     }
        // }), Axios.get('http://localhost:3001/getSeatsByTimes',{
        //     params: {
        //         facilityNum: props.facilityNum,
        //     }
        // }), ]).then(Axios.spread((response1, response2) => {
        //     setSeatsList(response1.data);
        //     setTerms(response2.data);
        // })).catch((error) => {
        //     console.log(error);
        // });
        calCurTime();

        Axios.get("http://"+config.HOST.toString()+"/getSeatsByTimes",{
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
    const [terms, setTerms] = useState([]);

    const {moreInfoOpen} = moreInfoState;

     const toggleMoreInfo = () => {
         setMoreInfoState({
            moreInfoOpen: !moreInfoOpen,
        });
        //한 박자 느림
        if(!moreInfoOpen){
            // setSeatsList(getSeatsByTimes(props.props.seat_availability_start_time,props.props.seat_availability_end_time, props.facilityNum));
            Axios.get("http://"+config.HOST.toString()+"/getSeatsByTimes",{
                params: {
                    startTime : props.props.seat_availability_start_time,
                    endTime : props.props.seat_availability_end_time,
                    facilityNum : props.facilityNum,
                }
            }).then((response) => {
                setSeatsList((seatsList) => response.data);
            });
        }
    }

    return (
        <>
            <ul className={timeActivate?"reservation-time-select":"reservation-time-select disabled"} onClick={timeActivate?(e)=>{toggleMoreInfo();} : doNothing}>
                <li className={"reservation-seat-select"} className={moreInfoOpen ? "opened" : "closed" }>
                    {/*디비에 시간 개수만큼 가져오기*/}
                    <h1 className={"display-3 reservation-time-title"}>
                        {timeActivate?
                            timeFormat(props.props.seat_availability_start_time,props.props.seat_availability_end_time):
                            <s>
                                {timeFormat(props.props.seat_availability_start_time,props.props.seat_availability_end_time)}
                            </s>
                        }
                    </h1>
                    <span className={"reservation-accIcon"}/>
                    <Collapse isOpen={moreInfoOpen} className={moreInfoOpen? "opened" : "closed"}>
                        {seatsList.map((seat) => {
                            return(
                                // <ReservationSeatsListMap props={seat} facilityNum = {props.facilityNum}></ReservationSeatsListMap>
                                <ReservationSeatsListMap seat={seat} props = {props}></ReservationSeatsListMap>
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