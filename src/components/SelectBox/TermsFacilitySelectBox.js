import React, {useState} from "react";
import Axios from "axios";
import * as config from '../../config';
const TermsFacilitySelectBox = (props) => {
    const [termsFacilityList, setTermsFacilityList] = useState([]);
    Axios.get("http://"+config.HOST.toString()+"/facilityNumName").then((response) => {
        setTermsFacilityList(response.data);
    });

    props.setOptionValue(0);

    const handleSelect = (e) => {
        props.setOptionValue(e.target.value);
        console.log(e.target.value +"\n" + e.target.options[e.target.selectedIndex].text);
    }

    return (
        <form>
            <div className="input_area">
                <select onChange={handleSelect} id="class">
                    <option value="0">시설 선택</option>
                    {termsFacilityList.map((t) => (
                        <option value={t.facility_num}>{t.facility_name}</option>
                    ))}
                </select>
            </div>
        </form>
    );
}

export default TermsFacilitySelectBox;