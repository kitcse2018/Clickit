
import React, {useState} from 'react'
import Axios from "axios";
const StudentSearch = (props) => {
    const [state, setState] = useState();
    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value,
        });
    };


    function submitGetStudents ()  {
        Axios.get("http://localhost:3001/searchStudents",{params : {
                postStudentName : state.studentName,
            }}).then((response) => {
                props.setStudentList(response.data);
        });
    }
    return(
            <div className="SeachBox">
                <div className="icon">
                    <i className="fas fa-search"></i>
                </div>
                <input placeholder="이름 입력" className="inputStudent"
                       type="text" name = "studentName"
                       onChange={handleChange}
                />
                <button  onClick={()=>{submitGetStudents()}}>조회</button>
            </div>
        )
}
export default StudentSearch;
