import React, {useEffect, useState} from "react";
import Axios from "axios";
import * as config from '../../config';
const SelectBox = (props) => {
    const [dormitoryList,setdormitoryList] = useState([]);
    useEffect(()=> { Axios.get("http://"+config.HOST.toString()+"/dormitories")
        .then((response) => {
        setdormitoryList(response.data);
    });
    },[]);

    const handleSelect = (e) => {
        props.setOptionValue(e.target.value);
        let index = e.target.selectedIndex
        props.setDormitoryName(e.target[index].text)
    };

    return (


            <select onChange={handleSelect}  class="select">
                <option key = "{dormitory}" value="0" >생활관 선택</option>
                {dormitoryList.map( dormitory => (
                    <option key={dormitory.dormitory_num} value={dormitory.dormitory_num} name={dormitory.dormitory_name} >{dormitory.dormitory_name}</option>
                ))}
            </select>



    );


}
export default SelectBox;