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
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = () => {
    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "200px",
                    backgroundImage:
                        "url(" + require("../../assets/img/kumoh_dormitory2.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center top"
                }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8" />
                {/* Header container */}
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col lg="7" md="10">
                            <h1 className="display-2 text-white">My Page</h1>
                            <p className="text-white mt-0 mb-5">
                                금오공대 MYPAGE입니다. You can see the progress you've made
                                with your work and manage your projects or assigned tasks
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default UserHeader;