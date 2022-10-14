import Header from "components/Headers/Header.js";
import Student from "components/JDcomponents/Student.js"
import SelectBox from "../components/SelectBox/SelectBox";
import "../assets/css/mycss/Third.css";
import {useState} from "react";
import Axios from 'axios'


const Third = (props) => {
    function showText(txt) {
        console.log(txt);
    }

    function showName(txt) {
        console.log(txt);
    }
    const [studentList,setStudentList] = useState([]);
    const onRemove = id => {
        setStudentList(studentList.filter(student => student.student_num !== id));
    };
    const getStudents = () => {
        Axios.get("http://localhost:3001/students").then((response) => {
            setStudentList(response.data);
        });
    }
    return (
        <div>
            <Header />{}
            <h1 > &nbsp; &nbsp;생활관생 관리</h1>
            <div className="Search">
                <SelectBox ></SelectBox>

                <div className="SeachBox">
                    <div className="icon">
                        <i className="fas fa-search"></i>
                    </div>
                    <input placeholder="학번 입력" className="inputStudent"
                           type="text"
                           onChange={e => {
                               const txt = e.target.value;
                               showText(txt);
                           }}
                    />
                    <button  onClick={getStudents}>조회</button>
                </div>


                <button  onClick = {showName}> upload </button>

            </div>

            <div className="studentBoard">

                {studentList.map( student => (

                        <Student student={ student } key={ student.student_num } onRemove={onRemove} />

                    ))}
            </div>


        </div>
    );
};

export default Third;
