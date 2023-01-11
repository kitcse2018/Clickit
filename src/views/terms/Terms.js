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

    return (
        <>
            <Header />
            <div className={"terms-main"}>
                <div className={"terms-contents"}>
                    <div className={"terms-contents-header"}>
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
                    <div className={"terms-board"}>
                        <div className={"terms-list"}>
                            <table width="100%" cellSpacing="0" className={"terms-table"}>
                                <thead className={"terms-thead"}>
                                <tr className={"terms-tr-title"}>
                                    <th scope="col" className={"terms-table-header-num"}><span className={"terms-tr display-4"}>번호</span></th>
                                    <th scope="col" className={"terms-table-header-dormitory"}><span className={"terms-tr display-4"}>생활관</span></th>
                                    <th scope="col" className={"terms-table-header-facility"}><span className={"terms-tr display-4"}>시설물</span></th>
                                    <th scope="col" className={"terms-table-header-title"}><span className={"terms-tr display-4"}>제목</span></th>
                                    <th scope={"col"} className={"terms-table-header-button"}><span className={"terms-tr display-4"}>수정 및 삭제</span></th>
                                </tr>
                                </thead>
                                <tbody className={"terms-tbody"}>
                                {termsList.map((terms, index)=>(
                                    <TermsListMap terms={terms} index={index}/>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/*<Header />
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
            </div>*/}
        </>
    );
};

export default Terms;
