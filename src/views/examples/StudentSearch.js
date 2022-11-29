
import React, {useState} from 'react'
import Axios from "axios";
const StudentSearch = (props) => {
    const [state, setState] = useState("blank");
    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value,
        });
    };

    function submitGetStudents ()  {

        Axios.get("http://localhost:3001/searchStudents",{params : {
                postStudentId : state.studentId, postOptionValue : props.optionValue
            }}).then((response) => {
            props.setStudentList(response.data);
        });
        props.setVisibleSelect(true);
        props.setVisibleAdd(false);
    }

    return(
        <div className="SeachBox">
            <div className="icon">
                <i className="fas fa-search"></i>
            </div>
            <input placeholder="학번 입력" className="inputStudent"
                   type="number" name = "studentId"
                   onChange={handleChange}
            />
            <button  onClick={()=>{submitGetStudents()}}>조회</button>
        </div>
    )
}
export default StudentSearch;
