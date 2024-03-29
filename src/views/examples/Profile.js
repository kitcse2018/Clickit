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
import "../../assets/css/mycss/Profile.css";
import Axios from "axios";
import ProfileDormitoryName from "./ProfileDormitoryName";
import ProfileReservationListMap from "../../components/Listmap/ProfileReservationListMap";
import ProfileBlacklist from "../../components/ProfileProgress/ProfileBlacklist";
import ProfileReservationPercent from "../../components/ProfileProgress/ProfileReservationPercent";
import * as config from "../../config";
import ProfileCurrentReservation from "./ProfileCurrentReservation";

const Profile = () => {

  const [dormitoryName, setDormitoryName] = useState("");
  const [myCurReservation, setMyCurReservation] = useState([]);
  const [myReservationList, setMyReservationList] = useState([]);
  const [blackDate, setBlackDate] = useState([]);

  const studentNum = sessionStorage.getItem("studentNum");

  useEffect(()=>{
    Axios.all([Axios.get("http://"+config.HOST.toString()+"/studentDormitoryName", {
      params:{
        dormitoryNum: sessionStorage.getItem("dormitoryNum"),
      }
    }), Axios.get("http://"+config.HOST.toString()+"/getMyCurReservation",{
        params:{
            studentNum: studentNum,
        }
    }), Axios.get("http://"+config.HOST.toString()+"/getMyReservationList",{
        params:{
            studentNum: studentNum,
        }
    }), Axios.get("http://"+config.HOST.toString()+"/getBlacklistEndDate",{
        params:{
            studentNum: studentNum,
        }
    })]).then(Axios.spread((res1, res2, res3, res4) => {
      setDormitoryName(res1.data[0].dormitory_name);
      setMyCurReservation(res2.data);
      setMyReservationList(res3.data);
      setBlackDate(res4.data);
    }));
  },[]);


  const clickMe = () =>{
    document.location.href = "MyStop.js";
  }

  const toResList = () =>{
    window.location.href="#res-list";
  }


  console.log("Profile myCurReservation: "+myCurReservation);
  console.log("myCurReservation length: "+myCurReservation.length);

  return (
      <>
        <UserHeader />
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
                        href={"#res-list"}
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
              <div className="percent">
                <div className={"blacklist-percent"}>
                  {blackDate.length===0?
                      <ProfileBlacklist blacklistDate={0}></ProfileBlacklist>
                      :
                      (blackDate.map((blackDate, key) => (
                          <ProfileBlacklist blacklistDate={blackDate}></ProfileBlacklist>
                      )))
                  }
                </div>
                <div>
                  {myCurReservation.map((myCurReservation, key) => (
                        <ProfileReservationPercent myCurReservation={myCurReservation}></ProfileReservationPercent>
                  ))}
                </div>
                {/*<ProfileBlacklist blacklistDate={blackDate}></ProfileBlacklist>*/}
                {/*<ProfileReservationPercent myCurReservation={myCurReservation}></ProfileReservationPercent>*/}
              </div>
              {/* 현재 예약을 ProfileReservationPercent.js 안에 넣기 */}
              <div className={"profile-current-reservation"}>
                <div>
                  {/*<ProfileCurrentReservation curRes={myCurReservation}></ProfileCurrentReservation>*/}
                </div>
              </div>
              <div className={"profile-reservation-list"} id={"res-list"}>
                <div className={"res-list-container"}>
                  {/* 현재 예약은 빼고 가져오게? query 수정해야 할 듯 */}
                  {myReservationList.map((resList, key) => {
                    return(
                        <ProfileReservationListMap resList={resList}></ProfileReservationListMap>
                    )
                  })}
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </>
  );
};

export default Profile;