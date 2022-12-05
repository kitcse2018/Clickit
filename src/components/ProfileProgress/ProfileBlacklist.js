import {Progress} from "reactstrap";
import React, {useEffect} from "react";
import {getCurrentDate} from "../../methods/reservation/ReservationMethod";
import {stringToDate} from "../../methods/stringToDate";

const ProfileBlacklist = (blacklistDate) => {

    let percentage = 0;

    // useEffect(()=>{
    //     calcBlacklistDate();
    //     console.log(percentage.toString());
    // },[]);

    const calcBlacklistDate = () => {
        const curDate = new Date(getCurrentDate().split(' ')[0]);
        const blackEndDate = new Date(blacklistDate.blacklistDate.end_date.split(' ')[0]);
        const blackStartDate = new Date(blacklistDate.blacklistDate.start_date.split(' ')[0]);

        if(blackEndDate > curDate){
            const total = blackEndDate - blackStartDate;
            percentage = (curDate - blackStartDate) / total * 100;
            return percentage.toString().slice(0,5);
        }else{
            return 0;
        }
    }

    return(
        <div className="progress-wrapper">
            <div className="progress-info">
                <div className="progress-label">
                    <span>정지 여부 확인</span>
                </div>
                <div className="progress-percentage">
                    <span>{calcBlacklistDate()}%</span>
                </div>
            </div>
            <Progress max="100" value={calcBlacklistDate()} color="danger" />
        </div>
    );
};

export default ProfileBlacklist