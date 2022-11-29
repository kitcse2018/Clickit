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
    const [visibleAdd,setVisibleAdd] = useState(false);
    const [visibleSelect,setVisibleSelect] = useState(true);
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
                    <StudentSearch setStudentList={setStudentList} optionValue={optionValue} setVisibleSelect={setVisibleSelect} setVisibleAdd={setVisibleAdd} ></StudentSearch>
                    <div>
                        <button  onClick={()=>{
                            setVisibleAdd(!visibleAdd);
                            setVisibleSelect(!visibleSelect);
                        }} > {visibleAdd?"추가 종료":"학생 추가"} </button>
                        <button  > upload </button>
                    </div>
                </div>
                <div className="studentBoard">
                    {visibleAdd && <AddStudent/>}
                    {visibleSelect&&studentList.map( student => (
                        <Student student={ student } key={ student.student_num } onRemove={onRemove}/>
                    ))}
                </div>

            </Container>

        </>
    );
};

export default Third;
