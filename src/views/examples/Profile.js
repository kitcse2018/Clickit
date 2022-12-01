/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
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
import React from 'react'
import "../../assets/css/mycss/Profile.css"
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
//(정지 여부, 현재 예약 현황 등)


// function Home(){
//   return(
//       <Link to="/Next">
//         <h1>이...이게 뭐노!</h1>
//       </Link>
//   )
// }
// function Next(){
//   return(
//       <div>
//         <h1>뭐긴 뭐야!</h1>
//       </div>
//   )
// }

// function App(){
//     return(
//         <Router>
//             <div>
//                 <Switch>
//                     {/*asdf*/}
//                     <Route path="/Next">
//                         <Next/>
//                     </Route>
//                     {/*asdf*/}
//                     <Route path="/">
//                         <Profile/>
//                     </Route>
//                 </Switch>
//             </div>
//         </Router>
//     )
// }

const Profile = () => {
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <Button
                          className="mr-4"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
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
                  <h3>
                    김금오
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    푸름 1동, 410호
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    학번 - 20180000
                  </div>
                </div>
                <div className="body">
                  1
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
