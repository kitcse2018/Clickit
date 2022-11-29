import Header from "components/Headers/Header.js";
import Student from "components/JDcomponents/Student.js"
import SelectBox from "../components/SelectBox/SelectBox";
import StudentSearch from "./examples/StudentSearch";
import AddStudent from "./examples/AddStudent"
import "../assets/css/mycss/Third.css";
import React, {useState} from "react";
import {Container} from "reactstrap";
import {   BrowserRouter, Route } from "react-router-dom";
// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "Template" name      !!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Third = (props) => {

    const [studentList,setStudentList] = useState([]);
    const [optionValue,setOptionValue] = useState([]);
    const [visible,setVisible] = useState(false);
    const [visible1,setVisible1] = useState(true);
    const onRemove = id => {
        setStudentList(studentList.filter(student => student.student_num !== id));
    };

    return (
        <>
            <Header />
            {/* Page content */}
            {/* You must read here */}
            {/* Change main-container className */}
            <Container className={"third-container"}>


                <h1 > &nbsp; 생활관생 관리</h1>
                <div className="Search">
                    <SelectBox setOptionValue={setOptionValue} ></SelectBox>
                    <StudentSearch setStudentList={setStudentList} optionValue={optionValue}></StudentSearch>
                    <div>
                        <button  onClick={()=>{
                            setVisible(!visible);
                            setVisible1(!visible1);
                        }} > 학생 추가 </button>
                        <button  > upload </button>
                    </div>
                </div>
                <div className="studentBoard">
                    {visible && <AddStudent/>}
                    {visible1&&studentList.map( student => (
                        <Student student={ student } key={ student.student_num } onRemove={onRemove}/>
                    ))}
                </div>

            </Container>

        </>
    );
};

export default Third;
