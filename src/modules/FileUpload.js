import React, { useState ,useEffect} from 'react';
/*import MaterialTable from 'material-table'*/
import * as XLSX from 'xlsx'
import Student from "../components/JDcomponents/Student";
import Axios from "axios";
import * as config from "../config";

const EXTENSIONS = ['xlsx', 'xls', 'csv']
function FileUpload() {
    const [colDefs, setColDefs] = useState([])
    const [data, setData] = useState([])

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

    const ImportExcel = (e) => {
        const file = e.target.files[0]

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

        }


        if (file) {
            if (getExecution(file)) {
                reader.readAsBinaryString(file)
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
        {data.map(data => (
            Axios.post("http://"+config.HOST.toString()+"/addExelStudent",{
                termsData: {
                    student_id : data.학번,
                    dormitory : data.생활관,
                    student_password: data.비밀번호,
                }
            }).then(e => {
                console.log(e);
                alert("데이터 입력이 잘못되었거나 미입력되었습니다.")
            })
        ))}
    },[data])

    return (
        <div className="App">
            <input type="file" onChange={ImportExcel} />

        </div>
    );
}

export default FileUpload;