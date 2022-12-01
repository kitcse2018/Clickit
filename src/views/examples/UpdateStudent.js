import React, {useState} from "react";
import Axios from "axios";
import SelectBox from "../../components/SelectBox/SelectBox";
import {Redirect} from "react-router-dom";


const UpdateStudent = ({student,setVisibleUpdate,setVisibleSelect}) => {
    const[StudnetId,setStudnetId] = useState(student.student_id);
    const[password,setPassword] = useState(student.student_password);
    const [optionValue,setOptionValue] = useState([]);
    const studentNum = student.student_num;
    const onChangeId=(e) => {
        setStudnetId(e.target.value);
    };
    const onChangePassword=(e) => {
        setPassword(e.target.value);
    };
    const cancleUpdateStudent=()=>{
        setVisibleSelect(true);
        setVisibleUpdate(false);
    }
    const updateStudent = () => {
        if(optionValue==0||StudnetId==""||password == ""){
            alert("필수 항목을 입력해주세요.");}
        else{
            if(window.confirm(StudnetId +"님을 변경하시겠습니까?")){
            const student = {
                studentId : StudnetId,
                studentPwd : password,
                studentDormitory :  optionValue,
                studentNum : studentNum ,
            }
            Axios.post("http://localhost:3001/UpdateStudent",student).then((response)=>{
                }
            )
            alert("변경되었습니다.")
            window.location.replace("/admin/Student")
            }
            else {
                alert("취소합니다.")
            }
    }}

    return (
        <div >
            <ul >
                <li className="dp1">
                    <SelectBox  setOptionValue={setOptionValue}></SelectBox>
                </li>

                <li className="dp1">
                    <input disabled className="addInput" type="text" name="id"
                           value={StudnetId} onChange={onChangeId} />
                </li>

                <li className="dp1">
                    <input className="addInput" type="text" name="password"
                           value={password}     onChange = {onChangePassword} placeholder={"비밀번호"}
                           />
                </li>
                <li className="dp1">
                    <button onClick={updateStudent}>  수정  </button>
                </li>
                <li className="dp1">
                    <button onClick={cancleUpdateStudent}>  취소  </button>
                </li>
            </ul>

        </div>
    );
}
export default UpdateStudent;
