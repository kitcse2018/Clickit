import React, {useState} from "react";
import Axios from "axios";
import SelectBox from "../../components/SelectBox/SelectBox";
import {Redirect} from "react-router-dom";


const AddStudent = (props) => {
    const[id,setId] = useState("");
    const[password,setPassword] = useState("");
    const [optionValue,setOptionValue] = useState([]);
    const onChangeId=(e) => {
        setId(e.target.value);
    };
    const onChangePassword=(e) => {
        setPassword(e.target.value);
    };

   const addStudent = async () => {
        let data = "";
        if(optionValue==0||id.at(0)==null||password.at(0) == null){
            alert("필수 항목을 입력해주세요.");}
        else{
            const student = {
                studentId : id,
                studentPwd : password,
                studentDormitory :  optionValue,
            }
           await Axios.get("http://localhost:3001/duplicateStudent",{params:{studentId : student.studentId}}).then((response)=>
            {
                 data = response.data;
            });

            if(data.at(0)==null){
            Axios.post("http://localhost:3001/addStudent",student).then((response)=>{
                 }
             )
                alert("추가되었습니다.")
            window.location.replace("/admin/Student")
            }else{
                alert("중복된 학번입니다.")
            }
        }
    }

    return (
        <div className="addStudentBox">
            <ul className="student_ul">
                <li className="dp1">
                    <SelectBox  setOptionValue={setOptionValue}></SelectBox>
                </li>

                <li className="dp1">
                    <input className="inputOrshow" type="text" name="id"
                           value={id} onChange={onChangeId} placeholder={"학번"}/>
                </li>

                <li className="dp1">
                    <input className="inputOrshow" type="text" name="password"
                           value={password}     onChange = {onChangePassword}
                           placeholder={"비밀번호"}/>
                </li>
                <li className="dp1">
                    <button onClick={addStudent}>  &nbsp; + &nbsp;</button>
                </li>
            </ul>

        </div>
    );
}
export default AddStudent;
