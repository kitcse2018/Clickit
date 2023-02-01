import React, {useState} from "react";
import Axios from "axios";
import {Link, useHistory} from 'react-router-dom'
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Container} from "reactstrap";
import {timeFormat} from "../../methods/facility/FacilityMethod";
import * as config from '../../config';
const FacilityListMap = (props) => {

    const history = useHistory();

    const [population, setPopulation] = useState(0);

    console.log(props.facility);

    Axios.get("http://"+config.HOST.toString()+"/facilityPopulation",{
        params: {
            facilityNum : props.facility.facility_num,
        }
    }).then((response) => {
        setPopulation(response.data[0]['count(*)']);
    });

    return (
        <>
            <Card style={{ width: "80%", marginBottom: "2rem"}} className={"fac-box"}>
                <CardBody className={"fac-card-body"}>
                    <img
                        alt="..."
                        // src={require("../../assets/img/innerFacility/" + "오름 1동 휴게실" +".png")}
                        src={props.facility.facility_pic==""||props.facility.facility_pic==null?
                            require("../../assets/img/innerFacility/" + "오름 1동 휴게실" +".png")
                            :require("../../assets/img/innerFacility/" + props.facility.facility_pic +".png")}
                        style={{ width: "40%", height: "40%"}}
                        className={"fac-img"}
                    />
                    <div className={"fac-info"}>
                        <CardTitle className={"fac-card-title"}>
                            <h1 className={"display-2"}>{props.facility.facility_name}</h1>
                        </CardTitle>
                        <CardText className={"fac-card-text"}>
                            <div className={"fac-content"}>
                                <ul className={"fac-content-detail"}>
                                    <li className={"fac-content-detail-name"}>
                                        <h2>
                                            제한 인원 - {props.facility.facility_limit_people}
                                        </h2>
                                    </li>
                                    <li className={"fac-content-detail-time"}>
                                        <h2>
                                            이용 가능 시간 - {timeFormat(props.facility.facility_start_time, props.facility.facility_end_time)}
                                        </h2>
                                    </li>
                                </ul>
                            </div>
                            <div className={"fac-status"}>
                                <h2>예약 현황 {population}/{props.facility.facility_limit_people} </h2>
                            </div>
                        </CardText>
                        <Button className={"fac-reserve-btn"} color="primary" size={"lg"} onClick={() => {
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
                </CardBody>
            </Card>
        </>
    );
}
export default FacilityListMap;