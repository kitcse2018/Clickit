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
import "../../../assets/css/mycss/Modal.css"
import SelectBox from "../../SelectBox/SelectBox";
import Axios from "axios";
import * as config from '../../../config';

const Update = ({student}) => {
    const[toggleModal,setToggleModal] = useState(false);
    const[StudentId,setStudentId] = useState(student.student_id);
    const[password,setPassword] = useState(student.student_password);
    const [optionValue,setOptionValue] = useState([]);
    const studentNum = student.student_num;
    const [dormitoryName,setDormitoryName] = useState("");

    const onChangePassword=(e) => {
        setPassword(e.target.value);
    };
    const updateStudent = () => {
        if(optionValue==0||password == ""){
            alert("필수 항목을 입력해주세요.");}
        else{
            if(window.confirm("학번: "+ StudentId+"\n"+"비밀번호: "+password+"\n"+"생활관 : "+dormitoryName+"으로 변경하시겠습니까?")){
                const student = {
                    studentId : StudentId,
                    studentPwd : password,
                    studentDormitory :  optionValue,
                    studentNum : studentNum ,
                }
                Axios.post("http://"+config.HOST.toString()+"/UpdateStudent",student).then((response)=>{
                    }
                )
                alert("변경되었습니다.")
                window.location.replace("/admin/Student")
            }
            else {
                alert("취소합니다.")
            }
        }}
        return (
            <>
                        <Button
                            className="basic-btn"
                            color="default"
                            type="button"
                            onClick={() => setToggleModal(true)}
                        >
                            수정
                        </Button>
                        <Modal
                            className="modal-dialog-centered"
                            size="sm"
                            isOpen={toggleModal}
                            toggle={() => {setToggleModal(false); setPassword(student.student_password)}}
                        >
                            <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <span className="student-id" >ID : {StudentId} </span>
                                        </div>
                                        <Form role="form">
                                            <FormGroup className="mb-3">
                                                       <SelectBox  setOptionValue={setOptionValue}
                                                                  setDormitoryName={setDormitoryName}
                                                       ></SelectBox>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-lock-circle-open" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input value={password} placeholder="Password" onChange = {onChangePassword} type="text" />
                                                </InputGroup>
                                            </FormGroup>
                                            <div className="text-center">
                                                <Row className="fit-row">
                                                    <Col>
                                                        <Button
                                                            className="basic-btn md"
                                                            color="default"
                                                            type="button"
                                                            onClick={updateStudent}
                                                        >
                                                            완료
                                                        </Button>
                                                    </Col>

                                                    <Col>
                                                    <Button
                                                        className="basic-btn md"
                                                        color="default"
                                                        type="button"
                                                         onClick={() =>{setToggleModal(false);setPassword(student.student_password)}}
                                                    >
                                                        닫기
                                                    </Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Modal>

            </>
        );

}

export default Update;