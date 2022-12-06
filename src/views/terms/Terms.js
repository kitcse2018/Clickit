import {useEffect, useState} from "react";
import {Button} from "reactstrap";

import Header from "components/Headers/Header.js";
import "../../assets/css/terms/Terms.css";
import Axios from "axios";
import TermsListMap from "../../components/Listmap/TermsListMap";
import {useHistory} from "react-router-dom";
import * as config from '../../config';
const Terms = (props) => {

    const [termsList, setTermsList] = useState([]);

    useEffect(()=> { Axios.get("http://"+config.HOST.toString()+"/terms").then((response) => {
        setTermsList(response.data);
    });
    },[]);



    const history = useHistory();

    console.log("test");

    return (
        <>
            <Header />
            <div className={"terms-container"}>
                <div className={"terms-contents"}>
                    <div className={"terms-top"}>
                        <Button className={"terms-create"} color={"primary"} onClick={()=>{history.push({
                            pathname : "/admin/termsEdit",
                            state : {
                                terms_num : "",
                                terms_title : "",
                                terms_contents : "",
                                terms_facility_num : "",
                                dormitory_name : "",
                                isTermsEdit : false,
                            }
                        })}}>이용수칙 추가</Button>
                    </div>
                    <div className={"terms-list"}>
                        {termsList.map((terms)=>(
                            <TermsListMap terms={terms}/>
                        ))}
                    </div>
                    <div className={"terms-paging"}>
                        <Button className={"terms-prev"} color={"primary"}>이전</Button>
                        <Button className={"terms-next"} color={"primary"}>다음</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Terms;
