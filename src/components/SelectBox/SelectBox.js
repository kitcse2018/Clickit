import React, {useState} from "react";
import Axios from "axios";

const SelectBox = (props) => {
    const [dormitoryList,setdormitoryList] = useState([]);
    Axios.get("http://localhost:3001/dormitories").then((response) => {
        setdormitoryList(response.data);
    });

    const handleSelect = (e) => {
        props.setOptionValue(e.target.value);
    };

    return (

        <div className="input_area">
            <select onChange={handleSelect} id="class">
                <option value="0" >생활관 선택</option>
                {dormitoryList.map( dormitory => (
                    <option value={dormitory.dormitory_num}>{dormitory.dormitory_name}</option>
                ))}
            </select>
        </div>


    );


}
export default SelectBox;