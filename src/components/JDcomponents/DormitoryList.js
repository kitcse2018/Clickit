
import React, {useState} from "react";
import Axios from 'axios'

const DormitoryList = (props) => {

    const [dormitoryList,setdormitoryList] = useState([]);
    Axios.get("http://localhost:3001/dormitory",{

    }).then((response) => {
        setdormitoryList(response.data);
    });

    return (
        <>
            {dormitoryList.map(dormitory => (
                <div className={"dormitory-list"}>
                    <div>{dormitory.dormitory_name}</div>
                </div>
            ))}

        </>
    );
};

export default DormitoryList;
