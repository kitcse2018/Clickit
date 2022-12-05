import Header from "components/Headers/Header.js";
import Student from "components/JDcomponents/Student.js"
import SelectBox from "../components/SelectBox/SelectBox";
import StudentSearch from "./examples/StudentSearch";
import AddStudent from "./examples/AddStudent"
import "../assets/css/SelectBox.css";
import React, {useState} from "react";
import {Button, Container} from "reactstrap";
import "../assets/css/btn.css"
import {   BrowserRouter, Route } from "react-router-dom";
import DateRangePick from "../components/DatePicker/DateRangePick";
// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "Template" name      !!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const StudentManagement = (props) => {

    const [studentList,setStudentList] = useState([]);
    const [optionValue,setOptionValue] = useState([]);
    const [visibleAdd,setVisibleAdd] = useState(false);
    const [visibleSelect,setVisibleSelect] = useState(true);

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
                    <StudentSearch setStudentList={setStudentList} optionValue={optionValue} setVisibleSelect={setVisibleSelect} setVisibleAdd={setVisibleAdd} ></StudentSearch>
                    <div>
                        <Button  className={"basicBig-btn"} onClick={()=>{
                            setVisibleAdd(!visibleAdd);
                            setVisibleSelect(!visibleSelect);
                        }} > {visibleAdd?"추가 종료":"학생 추가"} </Button>
                        <Button className={"basicBig-btn"}  > upload </Button>
                    </div>
                </div>
                <div className="studentBoard">
                    {visibleAdd && <AddStudent/>}
                    {visibleSelect&&studentList.map( student => (
                        <Student student={ student } key={ student.student_num } onRemove={onRemove} />
                    ))}
                </div>

            </Container>

        </>
    );
};

export default StudentManagement;
