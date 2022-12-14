import React, {useRef, useState} from 'react';
import "../../assets/css/mycss/StudnetList.css"
import moment from 'moment';
import Axios from "axios";
import "../../assets/css/btn.css"

import {Button} from "reactstrap";
import StudentUpdateBtn from "../Buttons/StudentUpdateButton/StudentUpdateBtn";
import Datepicker from "../DatePicker/DatePicker";
import * as config from '../../config';

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
            Axios.post("http://"+config.HOST.toString()+"/banStudent",banInfo).then((response)=>{
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
            Axios.post("http://"+config.HOST.toString()+"/banClear", {banStudentNum : e.blacklist_num}).then((response)=>{
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

            fetch("http://"+config.HOST.toString()+"/deleteStudent", {
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


                <table >
                    <tr className="tr2">
                        <th className="th2">{student.student_id}</th>
                        <th className="th2">{student.dormitory_name}</th>
                        <th className="th2">{student.student_password}</th>
                        <th className="th4">
                            <StudentUpdateBtn student={student}/>
                            <Button className="delete-btn" onClick={() => {deleteById(student);}}>삭제</Button>
                            {
                                student.blacklist_num == null ?
                                    <Datepicker student={student}/>:
                                    <Button className={"clear-btn"} onClick={() => banClear(student)}>해제</Button>
                            }
                        </th>
                    </tr>
                    </table>

    );
}

export default Student;