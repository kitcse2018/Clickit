import React, {useRef, useState} from 'react';
import "../../assets/css/mycss/StudnetList.css"
import moment from 'moment';
import Axios from "axios";
import UpdateStudent from "../../views/examples/UpdateStudent";

const Student = ({ student, onRemove }) => {

    const [visibleUpdate,setVisibleUpdate] = useState(false);
    const [visibleSelect,setVisibleSelect] = useState(true);

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

            {visibleUpdate && <UpdateStudent setVisibleUpdate={setVisibleUpdate} setVisibleSelect ={setVisibleSelect} student = {student}/>}
            {visibleSelect && <div className="gnb_menu">
                <ul className="student_ul">
                    <li className="dp1">
                        <input className="inputOrshow" type="text" name="department" placeholder={student.student_id}/>
                    </li>
                    <li className="dp1">
                        <input className="inputOrshow" type="text" name="department"
                               placeholder={student.dormitory_name}/>
                    </li>
                    <li className="dp1">
                        <input className="inputOrshow" type="text" name="department"
                               placeholder={student.student_password}/>
                    </li>
                </ul>
                <button onClick={() => {
                    setVisibleUpdate(!visibleUpdate);
                    setVisibleSelect(!visibleSelect);}}>수정</button>
                <button onClick={() => {deleteById(student);}}>삭제</button>
                {
                    student.blacklist_num == null ?
                        <button className={"ban"} onClick={() => banStudent(student)}>정지</button> :
                        <button onClick={() => banClear(student)}>해제</button>
                }
            </div>
            }
        </div>
    );
}

export default Student;