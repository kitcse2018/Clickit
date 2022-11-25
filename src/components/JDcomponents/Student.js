import React, {useState} from 'react';
import "../../assets/css/mycss/StudnetList.css"
function Student({ student, onRemove }) {


    const deleteById = (e)=>{
        if(window.confirm("정말 삭제하시겠습니까?")){
            onRemove(e);
            const post ={
                postStudentId : e,
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
                <button onClick={() => {deleteById(student.student_num);}}>삭제</button>
                <button id="stop" onClick={() => onRemove(student.student_num)}>정지</button>
            </div>

        </div>
    );
}

export default Student;