import React, {useState} from "react";
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

const Profile = () => {
  const clickMe = () =>{
    document.location.href = "MyStop.js";
  }
  return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
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
                  <h1>학번 - 20180000</h1>
                </div>
                <div className="h5 font-weight-300">
                  푸름 1동, 410호
                </div>
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
        </Container>
      </>
  );
};

export default Profile;