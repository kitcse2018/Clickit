import {Progress} from "reactstrap";
import React from "react";

const ProfileReservationPercent = (myCurReservation) =>{

    console.log(myCurReservation.myCurReservation.length);

    return(
        <div className="progress-wrapper">
            <div className="progress-info">
                <div className="progress-label">
                    <span>내 예약 현황</span>
                </div>
                <div className="progress-percentage">
                    <span>60%</span>
                </div>
            </div>
            <Progress max="100" value="60" color="default" />
        </div>
    )
};

export default ProfileReservationPercent