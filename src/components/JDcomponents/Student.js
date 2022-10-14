import React from 'react';

function Student({ student, onRemove }) {
    return (
        <div className="studentList">
            <div >
                <input className="inputOrshow" type="text" name="department" value={student.student_id} readOnly/>
            </div>
            <div >
                <input className="inputOrshow" type="text" name="department" value={student.student_name} readOnly/>
            </div>
            <div >
                <input className="inputOrshow" type="text" name="department" value= {student.student_password} readOnly/>
            </div>
            <div >
                <input className="inputOrshow" type="text" name="department" value= {student.dormitory} readOnly/>
            </div>
            <button onClick={() => onRemove(student.student_num)}>삭제</button>
        </div>
    );
}

export default Student;