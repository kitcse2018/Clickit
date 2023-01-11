import React, { useState ,useEffect} from 'react';
/*import MaterialTable from 'material-table'*/
import * as XLSX from 'xlsx'
import Student from "../components/JDcomponents/Student";
import Axios from "axios";
import * as config from "../config";
import {Button} from "reactstrap";

const EXTENSIONS = ['xlsx', 'xls', 'csv']

function FileUpload() {
    const[file,setFile] = useState();
    const [colDefs, setColDefs] = useState([])
    const [data, setData] = useState([])
    const [fileURL,setfileURL] = React.useState("업로드할 파일 선택");
    const getExecution = (file) => {
        const parts = file.name.split('.')
        const extension = parts[parts.length - 1]
        return EXTENSIONS.includes(extension) // return boolean
    }

    const convertToJson = (headers, data) => {
        const rows = []
        data.forEach(row => {
            let rowData = {}
            row.forEach((element, index) => {
                rowData[headers[index]] = element
            })
            rows.push(rowData)

        });
        return rows
    }
    const SetFileUml = (e) => {
        if(e.target.value===""){
            setfileURL("업로드할 파일 선택");
        }else{
            setfileURL(e.target.value);
        }
        setFile(e.target.files[0]);
    }
    const ImportExcel = (e) => {

        const reader = new FileReader()
        reader.onload = (event) => {
            //parse data
            const bstr = event.target.result
            const workBook = XLSX.read(bstr, { type: "binary" })

            //get first sheet
            const workSheetName = workBook.SheetNames[0]
            const workSheet = workBook.Sheets[workSheetName]
            //convert to array
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
            // console.log(fileData)
            const headers = fileData[0]
            const heads = headers.map(head => ({ title: head, field: head }))
            setColDefs(heads)

            //removing header
            fileData.splice(0, 1)
            setData(convertToJson(headers,fileData))
            console.log(headers)
            console.log(fileData[0].length)
            console.log(fileData)
        }

        if (file) {
            if (getExecution(file)) {
                reader.readAsBinaryString(file)
                alert(fileURL)
            }
            else {
                alert("Invalid file input, Select Excel, CSV file")
            }
        } else {
            setData([])
            setColDefs([])
        }

         window.location.replace("/admin/Student")
    }

    useEffect(()=>{

        {data.map(student => (
            Axios.post("http://"+config.HOST.toString()+"/addExelStudent",{
                termsData: {
                    student_id : student.학번,
                    dormitory : student.생활관,
                    student_password: student.비밀번호,
                }
            }).then(e => {
                console.log(e);
                alert(student.학번+"데이터 입력이 잘못되었거나 미입력되었습니다.")
            })
        ))}
    },[data])


    return (
        <div className="filebox">
            <label className="upload-name" htmlFor="file" placeholder={"업로드할 파일 선택"}>{fileURL}</label>
            <Button  className={"basicBig-btn"} onClick={ImportExcel}> upload</Button>
            <input type="file" id="file" onChange={SetFileUml}/>
        </div>
        
    );
}

export default FileUpload;