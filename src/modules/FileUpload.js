import React, { useState ,useEffect} from 'react';
/*import MaterialTable from 'material-table'*/
import * as XLSX from 'xlsx'
import Student from "../components/JDcomponents/Student";
import Axios from "axios";
import * as config from "../config";
import {Button} from "reactstrap";

const EXTENSIONS = ['xlsx', 'xls', 'csv']

function FileUpload() {
    const [value, setValue] = useState()
    const [colDefs, setColDefs] = useState([])
    const [ExcelData, setExcelData] = useState(null)
    const [fileURL,setfileURL] = React.useState("업로드할 파일 선택");
    const getExecution = (file) => {
        const parts = file.name.split('.')
        const extension = parts[parts.length - 1]
        return EXTENSIONS.includes(extension) // return boolean
    }

    const convertToJson = (headers, data) => {
        var cnt = 1;
        const rows = []
        try{
        data.forEach(row => {
            let rowData = {}
            cnt++;
            try{
                row.forEach((element, index) => {
                    if(element==="false"){
                        alert(cnt+"번째 빈값 존재")
                        throw new Error("stop loop");
                    }
                    rowData[headers[index]] = element
                    if(rowData[headers[1]]>7 || rowData[headers[1]] < 1){
                        alert(cnt+"번째는 존재하지 않는 생활관입니다.")
                        throw new Error("stop loop");
                    }
                })
            }catch (e){
                throw new Error("stop loop");
            }

            rows.push(rowData)

        })}
        catch (e){
            window.location.replace("/admin/Student")
        };
        console.log(rows)
        return rows

    }
    const UploadFunc = async () => {

        if(ExcelData!=null){
            try{
               await Axios.delete("http://"+config.HOST.toString()+"/deleteAllStudents")
                await Axios.post("http://"+config.HOST.toString()+"/autoIncreaseInitialize")
                await Axios.post("http://"+config.HOST.toString()+"/addExelStudent",{
                    ExcelData : ExcelData}, {"Content-Type": 'application/json'}).
                then((response)=>{
                    alert(response.data)
                })
            }catch (err){
                console.log(err)
            }
        }
        else{
            alert("file not exist")
        }

        window.location.replace("/admin/Student")

    }

    const ImportExcel = (e) => {
        if(e.target.value===""){
            setfileURL("업로드할 파일 선택");
        }else{
            setfileURL(e.target.value);
        }
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.onload = (event) => {
            //parse ExcelData
            const bstr = event.target.result
            const workBook = XLSX.read(bstr, { type: "binary" })

            //get first sheet
            const workSheetName = workBook.SheetNames[0]
            const workSheet = workBook.Sheets[workSheetName]
            //convert to array
            const fileData = XLSX.utils.sheet_to_json(workSheet, {defval:'false', header: 1})
            // console.log(fileData)
            const headers = fileData[0]
            //removing header
            fileData.splice(0, 1)
            setExcelData(convertToJson(headers,fileData))
            console.log(headers)
            console.log(fileData)
        }

        if (file) {
            if (getExecution(file)) {
                reader.readAsBinaryString(file)
            }
            else {
                alert("Invalid file input, Select Excel, CSV file")
                window.location.replace("/admin/Student")
            }
        } else {
            setExcelData([])
            setColDefs([])
            window.location.replace("/admin/Student")
        }
    }

    return (
        <div className="filebox">
            <label className="upload-name" htmlFor="file" placeholder={"업로드할 파일 선택"}>{fileURL}</label>
            <Button  className={"basicBig-btn"}  onClick={UploadFunc}> upload </Button>
            <input type="file" id="file" onChange={ImportExcel}/>
        </div>
        
    );
}

export default FileUpload;