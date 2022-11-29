
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip, Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import "../../assets/css/mycss/AddFacility.css";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router-dom";
import React, {useState} from "react";
import Axios from "axios";

const AddFacility = (props) => {
    const location = useLocation();

    const items = location.state;

    let img_name = "clickit.png";

    const [facilityName, setfacilityName] = useState(items.facility_name);
    const onNameChange = (e) => {
        setfacilityName(e.target.value);
    }
    const [facilityLimit, setfacilityLimit] = useState(items.facility_limit_people);
    const onLimitChange = (e) => {
        setfacilityLimit(e.target.value);
    }

    const [facilityEdit,setfacilityEdit] = useState([]);
    Axios.get("http://localhost:3001/facilityEdit",{params:{
            facility_num : items.facility_num,
        }}).then((response) => {
        setfacilityEdit(response.data);
    });

    const [adminfacilitySeatList,setadminfacilitySeatList] = useState([]);
    Axios.get("http://localhost:3001/adminfacilitySeat",{params:{
            facility_num : items.facility_num,
        }}).then((response) => {
        setadminfacilitySeatList(response.data);
    });

    const history = useHistory();


    return (
        <>
            <Header />
            <Container className="addFacility-container">
                <div className = {"facility-add-content"}>
                    {facilityEdit.map(facility => (
                        <div className={"facility-add-content-header"}>
                            <div className={"dormitory-name"}>
                                <h1>{facility.facility_name}</h1>
                            </div>
                            <div className={"facility-edit"}>
                                <div classNAme={"facility-edit-picture"}>
                                    <div className={"dormitory-img"}>
                                        {/*이미지 나중에 가져와서 변경해주기*/}
                                        <img src={require('../../assets/img/dormitory/' + img_name)}/>
                                    </div>
                                    <Button className={"dormitory-img-edit"} type={"button"} color={"primary"} size={"sm"}>이미지 수정</Button>
                                    {/*<input type={"submit"} className={"dormitory-img-edit"} value={"이미지 수정"}/>*/}
                                </div>
                                <div className={"facility-edit-content"}>
                                    <div className={"facility-edit-content-name"}>
                                        <h3>명칭</h3>
                                        <input type={"text"} className={"facility-name-input"} placeholder={facility.facility_name} onChange = {onNameChange}/>
                                    </div>
                                    <div className={"facility-edit-content-limit"}>
                                        <h3>사용 가능 인원</h3>
                                        <input type={"text"} className={"facility-limit-input"} placeholder={facility.facility_limit_people} onChange = {onLimitChange}/>
                                    </div>
                                </div>
                                {/*사진도 같이 보내줘야함 사진 주소나 bob*/}
                                <Button className={"facility-edit-save"} type={"button"} color={"primary"} onClick={() =>{
                                    Axios.post("http://localhost:3001/facilityUpdate",{
                                        termsData: {facility_num: items.facility_num,
                                            facility_name : facilityName,
                                            facility_limit_people : facilityLimit,
                                        }
                                    }).then(e => {
                                        console.log(e);
                                    })
                                    document.location.replace( "/admin/addFacility");
                                }
                                } >
                                    저장
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default AddFacility;