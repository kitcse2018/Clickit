import React, {useState} from 'react';
import "../../assets/css/mycss/StudnetList.css"
import moment from 'moment';
import Axios from "axios";
import BanButton from "./BanButton";

function Student({ student, onRemove }) {


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
                        <input className="inputOrshow" type="text" name="department" value={student.student_id} readOnly/>
                    </li>
                    <li className="dp1">
                        <input className="inputOrshow" type="text" name="department" value={student.dormitory_name} readOnly/>
                    </li>
                    <li className="dp1">
                        <input className="inputOrshow" type="text" name="department" value={student.student_password} readOnly/>
                    </li>
                </ul>
                <button onClick={() => onRemove(student.student_num) }>수정</button>
                <button onClick={() => {deleteById(student);}}>삭제</button>
                <BanButton student={student}></BanButton>
                {/*<button id = "banButton" onClick={() => {banStudent(student);}}>정지</button>*/}
            </div>

        </div>
    );
}

export default Student;