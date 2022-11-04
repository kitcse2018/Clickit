import React from 'react';
import "../../assets/css/mycss/StudnetList.css"
function Student({ student, onRemove }) {
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
                <button onClick={() => onRemove(student.student_num)}>수정</button>
                <button onClick={() => onRemove(student.student_num)}>삭제</button>
                <button id="stop" onClick={() => onRemove(student.student_num)}>정지</button>
                </div>

        </div>
    );
}

export default Student;