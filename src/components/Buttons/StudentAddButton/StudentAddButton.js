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

const AddStudent = ({student}) => {
    const[toggleModal,setToggleModal] = useState(false);
    const [optionValue,setOptionValue] = useState([]);
    const[StudentId,setStudentId] = useState("");
    const[password,setPassword] = useState("");
    const onChangeID=(e) => {
        setStudentId(e.target.value);
    };

    const onChangePassword=(e) => {
        setPassword(e.target.value);
    };
    const addStudent = async () => {
        let data = "";
        if(optionValue==0||StudentId.at(0)==null||password.at(0) == null){
            alert("필수 항목을 입력해주세요.");}
        else{
            const student = {
                studentId : StudentId,
                studentPwd : password,
                studentDormitory :  optionValue,
            }
            await Axios.get("http://"+config.HOST.toString()+"/duplicateStudent",{params:{studentId : student.studentId}}).then((response)=>
            {
                data = response.data;
            });

            if(data.at(0)==null){
                Axios.post("http://"+config.HOST.toString()+"/addStudent",student).then((response)=>{
                    }
                )
                alert("추가되었습니다.")
                window.location.replace("/admin/Student")
            }else{
                alert("중복된 학번입니다.")
            }
        }
    }

    return (
        <>
            <Button
                className="basic-btn"
                color="default"
                type="button"
                onClick={() => setToggleModal(true)}
            >
               학생 추가
            </Button>
            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={toggleModal}
                toggle={() => {setToggleModal(false); }}
            >
                <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <SelectBox  setOptionValue={setOptionValue}
                                    ></SelectBox>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-single-02" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="ID"  onChange = {onChangeID} type="text" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Password"  onChange = {onChangePassword} type="text" />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <Row className="fit-row">
                                        <Col>
                                            <Button
                                                className="basic-btn md"
                                                color="default"
                                                type="button"
                                                onClick={addStudent}
                                            >
                                                추가
                                            </Button>
                                        </Col>

                                        <Col>
                                            <Button
                                                className="basic-btn md"
                                                color="default"
                                                type="button"
                                                onClick={() =>{setToggleModal(false);}}
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

export default AddStudent;