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
    const [termsLength, setTermsLength] = useState([]);

    useEffect(()=> {
        Axios.all([
            Axios.get("http://"+config.HOST.toString()+"/termsPaging", {
                params : {
                    curPage : curTermsPage,
                    limit : termsLimit,
                }
            }),
            Axios.get("http://"+config.HOST.toString()+"/countTerms"),
        ]).then(Axios.spread((response1, response2)=>{
            setTermsList(response1.data);
            setTermsLength(response2.data);
            setMaxTermsPage(Math.ceil(response2.data[0].count / termsLimit));
            console.log(response1.data);
            console.log(response2.data[0].count);
        }));
    },[]);

    const history = useHistory();

    const [curTermsPage, setCurTermsPage] = useState(1);
    const [maxTermsPage, setMaxTermsPage] = useState(1);
    const [termsLimit, setTermsLimit] = useState(10); // 한 페이지에 보여줄 게시글 수

    function prevPage(){
        setCurTermsPage(curTermsPage-1);
        Axios.get("http://"+config.HOST.toString()+"/termsPaging", {
            params : {
                curPage : curTermsPage-1,
                limit : termsLimit,
            }
        }).then((response)=>{
            setTermsList(response.data);
        });
    }

    function nextPage(){
        setCurTermsPage(curTermsPage+1);
        Axios.get("http://"+config.HOST.toString()+"/termsPaging", {
            params : {
                curPage : curTermsPage+1,
                limit : termsLimit,
            }
        }).then((response)=>{
            setTermsList(response.data);
        });
    }

    return (
        <>
            <Header />
            <div className={"terms-main"}>
                <div className={"terms-contents"}>
                    {/*<div className={"terms-contents-header"}>*/}
                    {/*    <Button className={"terms-create"} color={"primary"} onClick={()=>{history.push({*/}
                    {/*        pathname : "/admin/termsEdit",*/}
                    {/*        state : {*/}
                    {/*            terms_num : "",*/}
                    {/*            terms_title : "",*/}
                    {/*            terms_contents : "",*/}
                    {/*            terms_facility_num : "",*/}
                    {/*            dormitory_name : "",*/}
                    {/*            isTermsEdit : false,*/}
                    {/*        }*/}
                    {/*    })}}>이용수칙 추가</Button>*/}
                    {/*</div>*/}
                    <div className={"terms-board"}>
                        <div className={"terms-list"}>
                            <table width="100%" cellSpacing="0" className={"terms-table"}>
                                <thead className={"terms-thead"}>
                                <tr className={"terms-tr-title"}>
                                    <th scope="col" className={"terms-table-header-num"}><span className={"terms-tr display-4"}>번호</span></th>
                                    <th scope="col" className={"terms-table-header-dormitory"}><span className={"terms-tr display-4"}>생활관</span></th>
                                    <th scope="col" className={"terms-table-header-facility"}><span className={"terms-tr display-4"}>시설물</span></th>
                                    <th scope="col" className={"terms-table-header-title"}><span className={"terms-tr display-4"}>제목</span></th>
                                    <th scope={"col"} className={"terms-table-header-button"}><span className={"terms-tr display-4"}>수정</span></th>
                                </tr>
                                </thead>
                                <tbody className={"terms-tbody"}>
                                {termsList.map((terms, index)=>(
                                    <TermsListMap terms={terms} index={index}/>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={"terms-page"}>
                            <Button onClick={()=>prevPage()} disabled={curTermsPage === 1} color="primary">이전</Button>
                            <div className={"terms-page-num"}>{curTermsPage}/{maxTermsPage}</div>
                            <Button onClick={()=>nextPage()} disabled={curTermsPage === maxTermsPage} color="primary">다음</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Terms;
