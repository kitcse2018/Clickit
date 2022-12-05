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
import {addDays} from "date-fns";
import moment from "moment";
import Axios from "axios";
import * as config from "../../config";
import * as excel from "exceljs";


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
                                    onClick={(e)=>{
                                        alert(startDate2);
                                        Axios.get("http://"+config.HOST.toString()+"/selectReservationStudentList",{
                                            termsData:{startDate: startDate2 , endDate: unlockDate,
                                            }}).then((response)=>
                                        {
                                            setStudentReservationList(response.data);
                                            alert('정보를 가져왔습니다. Exel로 다운해주세요')
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
                                const jsonResults = JSON.parse(JSON.stringify(studentReservationList))
                                let workbook = new excel.Workbook()
                                let worksheet = workbook.addWorksheet("Reservations")
                                worksheet.columns = [
                                    { header: "학번", key: jsonResults.student_id },
                                    { header: "시작 시간", key: jsonResults.start_time },
                                    { header: "종료 시간", key: jsonResults.end_time },
                                    { header: "예약한 시간", key: jsonResults.record_time },
                                    { header: "예약 상태", key: jsonResults.reservation_status },
                                    { header: "자리 이름", key: jsonResults.faciltiy_seat_name },
                                    { header: "시설물 이름", key: jsonResults.facility_name},
                                    { header: "체온", key: jsonResults.student_temperature},
                                ]
                                worksheet.addRows(jsonResults)

                                workbook.xlsx.writeFile("예약 리스트.xlsx")
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