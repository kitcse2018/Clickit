import Header from "components/Headers/Header.js";
import Student from "components/JDcomponents/Student.js"
import SelectBox from "../components/SelectBox/SelectBox";
import StudentSearch from "./examples/StudentSearch";
import PagingButton from "../components/Buttons/PagingButton/PagingButton";
import "../assets/css/mycss/Third.css";
import React, {useState} from "react";
import {Button, Container} from "reactstrap";
import "../assets/css/btn.css"
import FileUpload from "../modules/FileUpload"
import StudentAddBtn from "../components/Buttons/StudentAddButton/StudentAddButton"

const StudentManagement = (props) => {
    const [studentList,setStudentList] = useState([]);
    const [optionValue,setOptionValue] = useState([]);
    const [visibleMenu,setVisibleMenu] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const onRemove = id => {
        setStudentList(studentList.filter(student => student.student_num !== id));
    };

    return (
        <>
            <Header />
            <Container className={"student-main"}>
                <h1 className={"head"}>생활관생 관리</h1>
                <div className="Search">
                    <div id={"selectBoxSize"}>
                        <SelectBox setOptionValue={setOptionValue} ></SelectBox>
                    </div>
                    <StudentSearch
                        setStudentList={setStudentList}
                        optionValue={optionValue}
                        setVisibleMenu={setVisibleMenu}
                        setPage={setPage}
                    ></StudentSearch>
                    <StudentAddBtn/>
                        <FileUpload/>
                </div>
                <div className="studentBoard">
                    {visibleMenu&&<table>
                        <tr className={"trd"}>
                            <th className={"th1"}>학번</th>
                            <th className={"th1"}>생활관</th>
                            <th className={"th1"}>비밀번호</th>
                            <th className={"th3"}>기능</th>
                        </tr>
                    </table>}

                    {studentList.slice(offset,offset+limit).map( student => (
                        <Student student={ student } key={ student.student_num} onRemove={onRemove} />
                    ))}

                </div>
                <div className={"footPaging"}>
                    {visibleMenu&&<PagingButton
                        total = {studentList.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
                    }
                </div>
            </Container>

        </>
    );
};

export default StudentManagement;