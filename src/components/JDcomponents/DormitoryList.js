
import React, {useState} from "react";
import Axios from 'axios'

const DormitoryList = (props) => {

    const [dormitoryList,setdormitoryList] = useState([]);
    Axios.get("http://localhost:3001/dormitories",{

    }).then((response) => {
        setdormitoryList(response.data);
    });

    return (
        <>
            {dormitoryList.map(dormitory => (
                <div className={"dormitory-list"}>
                    <div>
                        <button onClick={async () =>{
                            let response = await Axios.get("http://localhost:3001/dormitoryEdit",{
                                params: {dormitory_num: dormitory.dormitory_num},
                            });
                            console.log(response.data)
                        }}>
                            <a href = {'/admin/dormitoryEdit/' + dormitory.dormitory_num}>
                                {dormitory.dormitory_name}
                            </a>
                        </button>
                    </div>
                </div>
            ))}

        </>
    );
};

export default DormitoryList;
