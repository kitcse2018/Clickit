import React, {useState} from "react";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col
} from "reactstrap";
import DateRangePicker from "./DateRangePick";
import moment from "moment/moment";
import Axios from "axios";
import {addDays} from "date-fns";

const DatePicker = ({student}) => {
    const[toggleModal,setToggleModal] = useState(false);
    const[StudentId,setStudentId] = useState(student.student_id);
    const studentNum = student.student_num;
    const[endDate,setEndDate] = useState(addDays(new Date(),7));
    const[startDate,setStartDate] = useState(new Date())
    const banStudent = ()=>{
        let startDate2 =  startDate <= new Date() ? moment(new Date()).format('YYYY-MM-DD') : moment(startDate).format('YYYY-MM-DD')
        let unlockDate = moment(endDate).format('YYYY-MM-DD')

        const banInfo = {
            postStartDate : startDate2,
            postEndDate : unlockDate,
            banStudentNum : studentNum,
        }

        if(window.confirm(StudentId +"님을\n"+startDate2+" ~ "+unlockDate+"까지 정지하시겠습니까?")){
            Axios.post("http://localhost:3001/banStudent",banInfo).then((response)=>{
                }
            )
            alert("정지되었습니다.");
            window.location.replace("/admin/Student")
        }
        else{
            alert("취소합니다.")
        }
    }

    return (
        <>
            <Button
                className="basic-btn"
                color="default"
                type="button"
                onClick={() => {setToggleModal(true);setEndDate(moment().add(7,'days').format('YYYY-MM-DD'));setStartDate(moment().format('YYYY-MM-DD'))}}
            >
                정지
            </Button>

            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={toggleModal}
                toggle={() => {setToggleModal(false);}}
            >
                <div className="text-center text-muted">
                    <span className="student-id">{StudentId} </span>
                </div>
                            <DateRangePicker setEndDate={setEndDate} setStartDate={setStartDate}></DateRangePicker>
                                    <Row className="fit-row-2">
                                        <Col>
                                            <Button
                                                className="my-4 up"
                                                color="primary"
                                                type="button"
                                                onClick={banStudent}
                                            >
                                                완료
                                            </Button>
                                        </Col>

                                        <Col>
                                            <Button
                                                className="my-4"
                                                color="primary"
                                                type="button"
                                                onClick={() =>{setToggleModal(false);}}
                                            >
                                                닫기
                                            </Button>
                                        </Col>
                                    </Row>

            </Modal>

        </>
    );

}

export default DatePicker;