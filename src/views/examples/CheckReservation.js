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
import {DateRangePicker} from "react-date-range";
import DateRangePick from "../../components/DatePicker/DateRangePick";
import moment from "moment";
import Axios from "axios";
import * as config from "../../config";
import * as excel from "exceljs";
import * as XLSX from 'xlsx'

const CheckReservation = (props) => {

    const[endDate,setEndDate] = useState(new Date());
    const[startDate,setStartDate] = useState(new Date());

    let startDate2 = moment(startDate).format('YYYY-MM-DD')
    let unlockDate = moment(endDate).format('YYYY-MM-DD')

    const[studentReservationList,setStudentReservationList] = useState([]);


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
                                    onClick={async(e)=>{
                                        alert(startDate2);
                                        alert(unlockDate);
                                        await Axios.get("http://"+config.HOST.toString()+"/selectReservationStudentList",{
                                            params:{
                                                startDate: startDate2 ,
                                                endDate: unlockDate,
                                            }}).then((response)=>
                                        {
                                            setStudentReservationList(response.data);
                                            alert('정보를 가져왔습니다. Exel로 다운해주세요')
                                            alert(JSON.stringify(response.data))
                                        });
                                    }}
                                >
                                    확인
                                </Button>
                                <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <DateRangePick setStartDate={setStartDate} setEndDate={setEndDate}/>
                            <Button onClick={(e) => {

                                const ws = XLSX.utils.json_to_sheet(studentReservationList)

                                const wb = XLSX.utils.book_new();

                                XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

                                XLSX.writeFile(wb, "Test.xlsx")
                                    .then(function(){
                                        console.log("file saved")
                                    }).catch(e =>{
                                    console.log(e)
                                })

                            }}>
                                root폴더에 엑셀파일 생성
                            </Button>

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