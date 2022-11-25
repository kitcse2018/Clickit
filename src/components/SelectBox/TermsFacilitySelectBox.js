import React, {useState} from "react";
import Axios from "axios";

const TermsFacilitySelectBox = (props) => {
    const [termsFacilityList, setTermsFacilityList] = useState([]);
    Axios.get("http://localhost:3001/TermsFacilityList").then((response) => {
        setTermsFacilityList(response.data);
    });

    const handleSelect = (e) => {
        props.setOptionValue(e.target.value);
    }

    return (
        <form>
            <div className="input_area">
                <select onChange={handleSelect} id="class">
                    <option value="0">시설 선택</option>
                    {termsFacilityList.map(termsFacility => (
                        <option value={termsFacility.terms_inner_facility_num}>{termsFacility.terms_inner_facility_name}</option>
                    ))}
                </select>
            </div>
        </form>
    );
}

export default TermsFacilitySelectBox;