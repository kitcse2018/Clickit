import React, {useState} from "react";
import Axios from "axios";

const TermsFacilitySelectBox = (props) => {
    const [termsFacilityList, setTermsFacilityList] = useState([]);
    Axios.get("http://localhost:3001/innerFacilityNumName").then((response) => {
        setTermsFacilityList(response.data);
    });

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
                        <option value={t.inner_facility_num}>{t.inner_facility_name}</option>
                    ))}
                </select>
            </div>
        </form>
    );
}

export default TermsFacilitySelectBox;