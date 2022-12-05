
import React, {useState} from 'react'
import Axios from "axios";
import "../../assets/css/btn.css"
import {Button} from "reactstrap";
import * as config from '../../config';
const StudentSearch = (props) => {

    const [state, setState] = useState("blank");
    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value,
        });
    };

    function submitGetStudents ()  {

        Axios.get("http://"+config.HOST.toString()+"/searchStudents",{params : {
                postStudentId : state.studentId, postOptionValue : props.optionValue
            }}).then((response) => {
            console.log(response.data)
            props.setStudentList(response.data);
        });
        props.setVisibleSelect(true);
        props.setVisibleAdd(false);

    }

    return(
        <div className="SearchBox">
            <div className="icon">
                <i className="fas fa-search"></i>
            </div>
            <input placeholder="학번 입력" className="inputStudent"
                   type="number" name = "studentId"
                   onChange={handleChange}
            />
            <Button className={"basicBig-btn"}  onClick={()=>{submitGetStudents();}}>조회</Button>
        </div>
    )
}
export default StudentSearch;
