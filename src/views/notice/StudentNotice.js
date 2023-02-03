import {useEffect, useState} from "react";

import Header from "components/Headers/Header.js";
import "../../assets/css/notice/Notice.css";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import * as config from '../../config';
import StudentNoticeListMap from "../../components/Listmap/StudentNoticeListMap";
import {Button} from "reactstrap";

const StudentNotice = (props) => {
    const [noticeList, setNoticeList] = useState([]);
    const [noticeLength, setNoticeLength] = useState([]);

    useEffect(()=>{
        Axios.all([
            Axios.get("http://"+config.HOST.toString()+"/noticePaging", {
                params:{
                    curPage: curNoticePage,
                    limit: noticeLimit,
                }
            }),
            Axios.get("http://"+config.HOST.toString()+"/countNotice")
        ]).then(Axios.spread((response1, response2) => {
            setNoticeList(response1.data);
            setNoticeLength(response2.data[0]['count(*)']);
            setMaxNoticePage(Math.ceil(response2.data[0]['count(*)']/noticeLimit));
            console.log(response1.data);
            console.log(response2.data[0]['count(*)']);
        }));
    },[])

    const history = useHistory();

    // curPage
    const [curNoticePage, setCurNoticePage] = useState(1);

    // maxPage
    const [maxNoticePage, setMaxNoticePage] = useState(1);

    // limit
    const [noticeLimit, setNoticeLimit] = useState(10);

    function prevPage(){
        setCurNoticePage(curNoticePage-1);
        console.log(curNoticePage-1);
        Axios.get("http://"+config.HOST.toString()+"/noticePaging", {
            params:{
                curPage: curNoticePage-1,
                limit: noticeLimit,
            }
        }).then((response) => {
            setNoticeList(response.data);
            console.log(response.data);
        });
    }

    function nextPage(){
        setCurNoticePage(curNoticePage+1);
        console.log(curNoticePage+1);
        Axios.get("http://"+config.HOST.toString()+"/noticePaging", {
            params:{
                curPage: curNoticePage+1,
                limit: noticeLimit,
            }
        }).then((response) => {
            setNoticeList(response.data);
            console.log(response.data);
        });
    }

    return (
        <>
            <Header />
            <div className={"notice-main"}>
                <div className={"notice-contents"}>
                    <div className={"notice-board"}>
                        <div className={"notice-list"}>
                            <table width={"100%"} cellSpacing={"0"} className={"notice-table"}>
                                <thead className={"notice-thead"}>
                                <tr className={"notice-tr-title"}>
                                    <th scope={"col"} className={"notice-table-header-num"}><span className={"terms-tr display-4"}>번호</span></th>
                                    <th scope={"col"} className={"notice-table-header-title"}><span className={"terms-tr display-4"}>제목</span></th>
                                    <th scope={"col"} className={"notice-table-header-writer"}><span className={"terms-tr display-4"}>작성자</span></th>
                                    <th scope={"col"} className={"notice-table-header-date"}><span className={"terms-tr display-4"}>작성일</span></th>
                                </tr>
                                </thead>
                                <tbody className={"notice-tbody"}>
                                {noticeList.map((noticeList, index)=>(
                                    <StudentNoticeListMap notice={noticeList} index={index}/>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={"notice-page"}>
                            <Button onClick={()=>prevPage()} disabled={curNoticePage === 1} color="primary">이전</Button>
                            <div className={"notice-page-num"}>{curNoticePage}/{maxNoticePage}</div>
                            <Button onClick={()=>nextPage()} disabled={curNoticePage === maxNoticePage} color="primary">다음</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentNotice;
