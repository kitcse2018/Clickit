
import React, {useState} from "react";
import Axios from 'axios'
import moment from "moment/moment";

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
    }

    else{
        alert("취소합니다.")
    }
}

const BanButton = ({student}) => {
    const [isBan, setIsBan] = useState("");
    Axios.get("http://localhost:3001/isBan",{params : {
            postStudentNum : student.student_num
        }}).then((response) => {
            setIsBan(response.data)
    });

    console.log(isBan)
    if(isBan==undefined){
        return  ( <button onClick={() => {banStudent(student);}}>ㅈㅈ</button>)
    }
    else{
    return (
        <button onClick={() => {banStudent(student);}}>정지</button>
    );}
};

export default BanButton;
