import {Progress} from "reactstrap";
import React from "react";
import {getCurrentDate} from "../../methods/reservation/ReservationMethod";
import {stringToTime} from "../../methods/stringToDate";

const ProfileReservationPercent = (myCurReservation) =>{

    let percentage = 0;

    const calcReservationPercent = () => {

        console.log("myCurReservation: "+myCurReservation);

        /*const curDate = getCurrentDate().split(' ')[1];
        const startTime = (myCurReservation.myCurReservation.start_time);
        const endTime = (myCurReservation.myCurReservation.end_time);
        // const total = endTime - startTime;
        const total = stringToTime(endTime,startTime);
        // percentage = (curDate - startTime) / total * 100;
        percentage = stringToTime(curDate,startTime) / total * 100;
        return percentage.toString().slice(0,5);*/
    }

    return(
        <div className="progress-wrapper">
            <div className="progress-info">
                <div className="progress-label">
                    <span>내 예약 현황</span>
                </div>
                <div className="progress-percentage">
                    <span>{calcReservationPercent()}%</span>
                </div>
            </div>
            <Progress max="100" value={calcReservationPercent()} color="default" />
        </div>
    )
};

export default ProfileReservationPercent