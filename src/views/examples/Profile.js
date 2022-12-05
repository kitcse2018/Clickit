import React, {useEffect, useState} from "react";
import {Progress} from "reactstrap";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import "../../assets/css/mycss/profile.css";
import Axios from "axios";
import ProfileDormitoryName from "./ProfileDormitoryName";

const Profile = () => {

  const [dormitoryName, setDormitoryName] = useState("");

  useEffect(()=>{
    Axios.get('http://localhost:3001/studentDormitoryName',{
      params:{
        dormitoryNum: sessionStorage.getItem("dormitoryNum"),
      }
    }).then((response)=>{
      setDormitoryName(response.data[0].dormitory_name);
    })
  },[]);


  const clickMe = () =>{
    document.location.href = "MyStop.js";
  }
  return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7 percent-container" fluid>
          <div className="percentTop">
            <Card className="card-profile shadow">
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={()=>clickMe()}
                        size="sm"
                    >
                      정지 여부 확인
                    </Button>
                    <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                      내 예약 현황
                    </Button>
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <div className="h5 mt-4">
                  <h1 className={"display-2"}>학번 - {sessionStorage.getItem("name")}</h1>
                </div>
                <ProfileDormitoryName dormitoryName={dormitoryName}></ProfileDormitoryName>
              </div>
            </Card>
          </div>
          <div className="percent">
            <Card className="card-profile shadow">
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
            </Card>
          </div>
          <div className={"profile-reservation-list"}>
            <Card className={"shadow res-list-card"}>
              <div className={"res-list-container"}>
                <li className={"res-li"}>
                  <div className={"res-li-contents"}>
                    <div className={"res-li-fac-name"}>
                      <span>오름 1동 휴게실</span>
                    </div>
                    <div className={"res-li-time"}>
                      <span>2021-05-01 12:00 ~ 2021-05-01 13:00</span>
                    </div>
                    <div className={"res-li-seat-name"}>
                      <span>좌석 1</span>
                    </div>
                    <Button className={"res-cancel-btn"} color={"danger"}>예약 취소</Button>
                  </div>
                </li>
                <li className={"res-li"}>
                  <div className={"res-li-contents"}>
                    <div className={"res-li-fac-name"}>
                      <span>오름 1동 휴게실</span>
                    </div>
                    <div className={"res-li-time"}>
                      <span>2021-05-01 12:00 ~ 2021-05-01 13:00</span>
                    </div>
                    <div className={"res-li-seat-name"}>
                        <span>좌석 1</span>
                    </div>
                    <Button className={"res-cancel-btn"} color={"danger"}>예약 취소</Button>
                  </div>
                </li>
                <li className={"res-li"}>
                  <div className={"res-li-contents"}>
                    <div className={"res-li-fac-name"}>
                      <span>오름 1동 휴게실</span>
                    </div>
                    <div className={"res-li-time"}>
                      <span>2021-05-01 12:00 ~ 2021-05-01 13:00</span>
                    </div>
                    <div className={"res-li-seat-name"}>
                      <span>좌석 1</span>
                    </div>
                    <Button className={"res-cancel-btn"} color={"danger"}>예약 취소</Button>
                  </div>
                </li>
              </div>
            </Card>
          </div>
        </Container>
      </>
  );
};

export default Profile;