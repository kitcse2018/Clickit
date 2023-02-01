
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

    function enterKey() {
        if (window.event.keyCode === 13) {
           submitGetStudents();
        }
    }
    function submitGetStudents ()  {

        Axios.get("http://"+config.HOST.toString()+"/searchStudents",{params : {
                postStudentId : state.studentId, postOptionValue : props.optionValue
            }}).then((response) => {
            console.log(response.data)
            props.setStudentList(response.data);
        });
        props.setVisibleMenu(true)
        props.setPage(1)
    }
    return(
        <div className="SearchBox">
            <div className="icon">
                <i className="fas fa-search"></i>
            </div>

            <input onKeyUp={()=>{enterKey();}} placeholder="학번 입력" className="inputStudent"
                  type={"number"}  name = "studentId"  onWheel={(e) => e.target.blur()}
                   onChange={handleChange}
            />
            <Button className="basicBig-btns"  onClick={()=>{submitGetStudents();}}>조회</Button>
        </div>
    )
}
export default StudentSearch;
