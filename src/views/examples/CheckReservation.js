import {useEffect, useState} from "react";
import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// reactstrap components
import {
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    Row,
    Button, Container
} from "reactstrap";
import "../../assets/css/mycss/CheckReservation.css";
import Header from "components/Headers/Header.js";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import AddStudent from "./AddStudent";
import Student from "../../components/JDcomponents/Student";


const CheckReservation = (props) => {
    return (
        <>
            <Header />

            <Container className={"third-container"}>
                <h1 > &nbsp; 예약자 현황 확인</h1>
                <div className="checkReservation-search">
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <Button
                                    block
                                    className="mb-3"
                                    color="primary"
                                    type="button"
                                    onClick={() => this.toggleModal("defaultModal")}
                                >
                                    확인
                                </Button>
                                <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                                inputProps={{
                                    placeholder: "Date Picker Here"
                                }}
                                timeFormat={false}
                            />

                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                                inputProps={{
                                    placeholder: "Date Picker Here"
                                }}
                                timeFormat={false}
                            />
                        </InputGroup>
                    </FormGroup>
                </div>
                <div className="checkReservation-body">

                </div>
            </Container>
        </>
    );
};

export default CheckReservation;