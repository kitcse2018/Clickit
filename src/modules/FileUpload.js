import React, { useState ,useEffect} from 'react';
/*import MaterialTable from 'material-table'*/
import * as XLSX from 'xlsx'
import Student from "../components/JDcomponents/Student";
import Axios from "axios";
import * as config from "../config";
import {Button} from "reactstrap";

const EXTENSIONS = ['xlsx', 'xls', 'csv']

function FileUpload() {

    const [colDefs, setColDefs] = useState([])
    const [ExcelData, setExcelData] = useState(null)
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
        console.log(rows)
        return rows

    }
    const UploadFunc = async () => {
        if(ExcelData!=null){
            try{
               await Axios.delete("http://"+config.HOST.toString()+"/deleteAllStudents")
                await Axios.post("http://"+config.HOST.toString()+"/autoIncreaseInitialize").then(
                            await Axios.post("http://"+config.HOST.toString()+"/addExelStudent",{
                              ExcelData : ExcelData
                            }, {"Content-Type": 'application/json'}).then(e => {
                                console.log(e);
                            })
                )
            }catch (err){
                console.log(err)
            }finally {
                console.log("abs")
                window.location.replace("/admin/Student")
            }
        }
        else{
            alert("file not exist")
        }

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
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
            // console.log(fileData)
            const headers = fileData[0]
            const heads = headers.map(head => ({ title: head, field: head }))
            setColDefs(heads)

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