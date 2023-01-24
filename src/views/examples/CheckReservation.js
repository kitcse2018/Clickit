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
import "../../assets/css/btn.css"
import Header from "components/Headers/Header.js";
import {DateRangePicker} from "react-date-range";
import DateRangePick from "../../components/DatePicker/DateRangePick";
import moment from "moment";
import Axios from "axios";
import * as config from "../../config";
import * as excel from "exceljs";
import * as XLSX from 'xlsx'
import DormitoryList from "../../components/JDcomponents/DormitoryList";

const CheckReservation = (props) => {

    const[endDate,setEndDate] = useState(new Date());
    const[startDate,setStartDate] = useState(new Date());

    let startDate2 = moment(startDate).format('YYYY-MM-DD')
    let unlockDate = moment(endDate).format('YYYY-MM-DD')

    const[studentReservationList,setStudentReservationList] = useState([]);


    return (
        <>
            <Header />
            <div className={"checkReservation-input-container"}>
            <div className="col-lg checkReservation-container">
                <div className="card mb-4">
                    <h1 className="card-header">예약자 현황 확인</h1>
                    <div className="card-body-CheckReservation">
                                <div className={"checkReservation-main"}>
                                <DateRangePick setStartDate={setStartDate} setEndDate={setEndDate}/>
                                   <div className={"CheckReservation-row"}>
                                            <Button
                                                className="checkReservation-btn"
                                                color="default"
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
                                                    });
                                                }}
                                            >
                                                확인
                                            </Button>

                                            <Button  block
                                                     className="checkReservation-btn2"
                                                     color="default"
                                                     onClick={(e) => {

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
                                                엑셀파일 생성
                                            </Button>

                                </div>
                                </div>
                                </div>

                </div>
                </div>
            </div>

        </>
    );
};

export default CheckReservation;