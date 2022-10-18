import React, {useState} from "react";
import Axios from "axios";

const SelectBox = () => {
    const [dormitoryList,setdormitoryList] = useState([]);
       Axios.get("http://localhost:3001/dormitories").then((response) => {
            setdormitoryList(response.data);
       });

    return (
        <form>
            <div className="input_area">

                <select id="class">
                    <option value="none" >생활관 선택</option>
                    {dormitoryList.map( dormitory => (
                        <option value={dormitory.iddormitory}>{dormitory.name}</option>
                    ))}
                </select>
            </div>
        </form>
    );
}
export default SelectBox;