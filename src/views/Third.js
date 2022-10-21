import Header from "components/Headers/Header.js";
import Student from "components/JDcomponents/Student.js"
import SelectBox from "../components/SelectBox/SelectBox";
import StudentSearch from "./examples/StudentSearch";
import "../assets/css/mycss/Third.css";
import Ins from "./examples/Ins";
import React, {useState} from "react";
import Axios from 'axios'
import {Container} from "reactstrap";

// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "Template" name      !!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Third = (props) => {

    function showName(txt) {
        console.log(txt);
    }
    const [studentList,setStudentList] = useState([]);
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
                <SelectBox ></SelectBox>

              <StudentSearch setStudentList={setStudentList}></StudentSearch>
                <div>
                <button  onClick = {showName}> 학생 추가 </button>
                <button  onClick = {showName}> upload </button>
                </div>
            </div>
            <div className="studentBoard">
                {studentList.map( student => (
                    <Student student={ student } key={ student.student_num } onRemove={onRemove} />
                ))}
            </div>

           </Container>

        </>
    );
};

export default Third;
