import React, {useRef, useState} from 'react';
import "../../assets/css/mycss/StudnetList.css"
import moment from 'moment';
import Axios from "axios";
import "../../assets/css/btn.css"

import {Button} from "reactstrap";
import StudentUpdateBtn from "../Buttons/StudentUpdateButton/StudentUpdateBtn";


const Student = ({ student, onRemove }) => {

    const banStudent = (e)=>{
        const startDate = moment().format('YYYY-MM-DD')
        const endDate = moment().add(7,'days').format('YYYY-MM-DD')

        const banInfo = {
            postStartDate : startDate,
            postEndDate : endDate,
            banStudentNum : e.student_num,
        }

        if(window.confirm(e.student_id +"님을 정지하시겠습니까?")){
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
    const banClear = (e)=>{

        if(window.confirm(e.student_id +"님을 해제하시겠습니까?")){
            Axios.post("http://localhost:3001/banClear", {banStudentNum : e.blacklist_num}).then((response)=>{

                }
            )

            alert("해제되었습니다.");
            window.location.replace("/admin/Student")
        }
        else{
            alert("취소합니다.")
        }
    }
    const deleteById = (e)=>{
        if(window.confirm(e.student_id +"님을 삭제하시겠습니까?")){
            onRemove(e);
            const post ={
                postStudentNum : e.student_num,
            };

            fetch("http://localhost:3001/deleteStudent", {
                method : "post",
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(post),
            })
                .then((res)=>res.json());
            alert("삭제되었습니다.");
            window.location.replace("/admin/Student")
        }

        else{
            alert("취소합니다.")
        }
    };


    return (
        <div className="studentList">
            <div className="gnb_menu">
                <ul className="student_ul">
                    <li className="dp1">
                        <input  className="inputOrshow" type="text" name="department" placeholder={student.student_id} readOnly/>
                    </li>
                    <li className="dp1">
                        <input className="inputOrshow" type="text" name="department"
                               placeholder={student.dormitory_name} readOnly/>
                    </li>
                    <li className="dp1">
                        <input className="inputOrshow" type="text" name="department"
                               placeholder={student.student_password} readOnly/>
                    </li>
                </ul>
                <div className="UDSbutton">
                <StudentUpdateBtn student={student}/>
                <Button className="delete-btn" onClick={() => {deleteById(student);}}>삭제</Button>
                {
                    student.blacklist_num == null ?
                        <Button className={"ban-btn"} onClick={() => banStudent(student)}>정지</Button> :
                        <Button className={"clear-btn"} onClick={() => banClear(student)}>해제</Button>
                }
                </div>
            </div>
        </div>
    );
}

export default Student;