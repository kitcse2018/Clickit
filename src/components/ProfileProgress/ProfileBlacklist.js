import {Progress} from "reactstrap";
import React, {useEffect} from "react";
import {getCurrentDate} from "../../methods/reservation/ReservationMethod";

const ProfileBlacklist = (blacklistDate) => {

        console.log(blacklistDate.blacklistDate);

    // let blackPercents = 0;
    //
    // const calcBlacklistDate = () => {
    //     const curDate = getCurrentDate();
    //     const blackDate = blacklistDate.blacklistDate[0].end_date;
    //
    //     console.log(curDate);
    //     console.log(blackDate);
    //     console.log(blackDate > curDate);
    //
    //     if(blackDate > curDate){
    //         const total = blacklistDate.blacklistDate[0].end_date - blacklistDate.blacklistDate[0].start_date;
    //         const percentage = (blacklistDate.blacklistDate[0].end_date - curDate) / total * 100;
    //         console.log(parseInt(percentage));
    //         blackPercents = percentage;
    //     }else{
    //         blackPercents = blackPercents;
    //     }
    // }

    return(
        <div className="progress-wrapper">
            <div className="progress-info">
                <div className="progress-label">
                    <span>정지 여부 확인</span>
                </div>
                <div className="progress-percentage">
                    <span>100%</span>
                </div>
            </div>
            <Progress max="100" value="100" color="danger" />
        </div>
    );
};

export default ProfileBlacklist