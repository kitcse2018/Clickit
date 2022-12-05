
import React, {useState} from "react";
import Axios from 'axios'
import {useHistory} from "react-router-dom";
import * as config from '../../config';
import "../../assets/css/DormitoryList.css"
import {Button} from "reactstrap";

const DormitoryList = (props) => {

    const [dormitoryList,setdormitoryList] = useState([]);
    Axios.get("http://"+config.HOST.toString()+"/dormitories",{

    }).then((response) => {
        setdormitoryList(response.data);
    });


    const history = useHistory();

    return (
        <>
            {dormitoryList.map(dormitory => (
                <div className="dormitory-list">
                    <div className="container-button">
                        <Button
                            className="button-dormitory"
                            onClick={() =>{ history.push({
                            pathname : "/admin/dormitoryEdit",
                            state: {
                                dormitory_num: dormitory.dormitory_num,
                                dormitory_name : dormitory.dormitory_name,
                                dormitory_pic : dormitory.dormitory_pic,
                            }
                        })}}>
                            {dormitory.dormitory_name}
                        </Button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DormitoryList;
