import {Progress} from "reactstrap";
import React from "react";

const ProfileBlacklist = (blacklistDate) => {

    console.log("blacklistDate Testing");
    console.log(blacklistDate.blacklistDate.length);
    console.log(blacklistDate.blacklistDate);

    let percentage;

    const calcBlacklistDate = () => {
        blacklistDate.blacklistDate.blacklistDate.length === 0 ?
            percentage = 0
            : percentage = 1; //false 일 때 부분 날짜 차이 계산으로 바꿔야 됨
    }

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