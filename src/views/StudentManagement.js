import Header from "components/Headers/Header.js";
import Student from "components/JDcomponents/Student.js"
import SelectBox from "../components/SelectBox/SelectBox";
import StudentSearch from "./examples/StudentSearch";
import AddStudent from "./examples/AddStudent"
import "../assets/css/mycss/Third.css";
import React, {useState} from "react";
import {Button, Container} from "reactstrap";
import "../assets/css/btn.css"
import FileUpload from "../modules/FileUpload"

const StudentManagement = (props) => {

    const [studentList,setStudentList] = useState([]);
    const [optionValue,setOptionValue] = useState([]);
    const [visibleAdd,setVisibleAdd] = useState(false);
    const [visibleSelect,setVisibleSelect] = useState(true);
    const [visibleMenu,setVisibleMenu] = useState(false);
    const onRemove = id => {
        setStudentList(studentList.filter(student => student.student_num !== id));
    };

    return (
        <>
            <Header />
            <Container className={"third-container"}>
                <h1 > &nbsp; 생활관생 관리</h1>
                <div className="Search">
                    <div id={"selectBoxSize"}>
                        <SelectBox setOptionValue={setOptionValue} ></SelectBox>
                    </div>
                    <StudentSearch setStudentList={setStudentList} optionValue={optionValue} setVisibleSelect={setVisibleSelect} setVisibleAdd={setVisibleAdd} setVisibleMenu={setVisibleMenu}></StudentSearch>
                        <Button  className={"basicBig-btn"} onClick={()=>{
                            setVisibleAdd(!visibleAdd);
                            setVisibleSelect(!visibleSelect);
                        }} > {visibleAdd?"추가 종료":"학생 추가"} </Button>
                        <FileUpload/>
                </div>
                <div className="studentBoard">
                    {visibleMenu&&<table>
                        <tr className={"trd"}>
                            <th className={"th1"}>학번</th>
                            <th className={"th1"}>생활관</th>
                            <th className={"th1"}>비밀번호</th>
                            <th className={"th3"}>기능</th>
                        </tr>
                    </table>}

                    {visibleAdd && <AddStudent/>}
                    {visibleSelect&&studentList.map( student => (
                        <Student student={ student } key={ student.student_num} onRemove={onRemove} />
                    ))}
                </div>
            </Container>

        </>
    );
};

export default StudentManagement;