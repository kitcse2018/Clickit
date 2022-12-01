import React, {useState} from "react";
import Axios from "axios";
import {Link, useHistory} from 'react-router-dom'
import {Button, Container} from "reactstrap";
import {timeFormat} from "../../methods/facility/FacilityMethod";

const FacilityListMap = (props) => {

    const history = useHistory();

    return (
        <div>
            <div className={"fac-box"}>
                <div className={"fac-left"}>
                    <div className={"fac-img"}>
                        <img
                            alt="..."
                            className="fac-img-detail"
                            src={require("../../assets/img/theme/react.jpg")}
                        />
                    </div>
                </div>
                <div className={"fac-right"}>
                    <div className={"fac-name"}>
                        <h2>{props.facility.facility_name}</h2>
                    </div>
                    <div className={"fac-content"}>
                        <ul className={"fac-content-detail"}>
                            <li className={"fac-content-detail-name"}>
                                제한 인원 - {props.facility.facility_limit_people}
                            </li>
                            <li className={"fac-content-detail-time"}>
                                이용 가능 시간 - {timeFormat(props.facility.facility_start_time, props.facility.facility_end_time)}
                            </li>
                        </ul>
                    </div>
                    <div className={"fac-status"}>
                        <p>예약 현황 2/4 </p>
                    </div>
                    <div className={"fac-reserve"}>
                        <Button className={"fac-reserve-btn"} color="primary" onClick={() => {
                            history.push({
                                pathname: "/student/reservation",
                                state: {
                                    facilityNum: props.facility.facility_num,
                                    // facilityImg: props.facility.facility_img,
                                    facilityName: props.facility.facility_name,
                                }
                            })
                        }}>
                            예약하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FacilityListMap;