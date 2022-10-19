import Header from "components/Headers/Header.js";
import Student from "components/JDcomponents/Student.js"
import SelectBox from "../components/SelectBox/SelectBox";
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
    function showText(txt) {
        console.log(txt);
    }

    function showName(txt) {
        console.log(txt);
    }
    const [studentList,setStudentList] = useState([]);
    const onRemove = id => {
        setStudentList(studentList.filter(student => student.student_num !== id));
    };
    const getStudents = () => {
        Axios.get("http://localhost:3001/students").then((response) => {
            setStudentList(response.data);
        });
    }
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

                <div className="SeachBox">
                    <div className="icon">
                        <i className="fas fa-search"></i>
                    </div>
                    <input placeholder="학번 입력" className="inputStudent"
                           type="text"
                           onChange={e => {
                               const txt = e.target.value;
                               showText(txt);
                           }}
                    />
                    <button  onClick={getStudents}>조회</button>
                </div>
                <div>
                <button  onClick = {showName}> 학생 추가 </button>
                <button  onClick = {showName}> upload </button>
                </div>
            </div>
            <Ins></Ins>
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
