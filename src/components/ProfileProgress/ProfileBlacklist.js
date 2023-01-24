import {Button, Progress, UncontrolledTooltip} from "reactstrap";
import React, {useEffect} from "react";
import {getCurrentDate} from "../../methods/reservation/ReservationMethod";
import {stringToDate} from "../../methods/stringToDate";

const ProfileBlacklist = (blacklistDate) => {

    console.log(blacklistDate.blacklistDate);

    let percentage = 0;

    // useEffect(()=>{
    //     calcBlacklistDate();
    //     console.log(percentage.toString());
    // },[]);

    const calcBlacklistDate = (blacklistDate) => {

        // const curDate = new Date(getCurrentDate().split(' ')[0]);
        // const blackEndDate = new Date(blacklistDate.blacklistDate.end_date.split(' ')[0]);
        // const blackStartDate = new Date(blacklistDate.blacklistDate.start_date.split(' ')[0]);
        //
        // if(blackEndDate > curDate){
        //     const total = blackEndDate - blackStartDate;
        //     percentage = (curDate - blackStartDate) / total * 100;
        //     return percentage.toString().slice(0,5);
        // }else{
        //     return 0;
        // }
    }

    return(
        <div className="progress-wrapper">
            <div className="progress-info">
                <div className="progress-label">
                    <span>정지 현황</span>
                </div>
                <div className="progress-percentage">
                    {blacklistDate.blacklistDate == 0 ?
                        <></>
                        :
                        <span>{calcBlacklistDate(blacklistDate.blacklistDate)}%</span>
                    }
                    {/*<span>{blacklistDate===0?"정지 중이 아닙니다.":calcBlacklistDate(blacklistDate)}%</span>*/}
                </div>
            </div>
            {blacklistDate.blacklistDate == 0 ?
                <div>
                <Progress max="100" value={0} color="default"/>
                    정지 목록에 등록되지 않은 이용자입니다.
                </div>
                :
                <Progress max="100" value={calcBlacklistDate(blacklistDate.blacklistDate)} color="default"/>
            }
            {/*<Progress max="100" value={blacklistDate===0?100:calcBlacklistDate(blacklistDate)} color="danger" />*/}
        </div>
    );
};

export default ProfileBlacklist