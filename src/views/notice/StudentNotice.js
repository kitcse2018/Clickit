import {useEffect, useState} from "react";

import Header from "components/Headers/Header.js";
import "../../assets/css/notice/Notice.css";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import * as config from '../../config';
import StudentNoticeListMap from "../../components/Listmap/StudentNoticeListMap";

const StudentNotice = (props) => {
    const [noticeList, setNoticeList] = useState([]);

    Axios.get("http://"+config.HOST.toString()+"/notice").then((response) => {
        setNoticeList(response.data);
    });

    const history = useHistory();

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
                    </div>
                </div>
            </div>
            {/*<div className={"notice-container"}>*/}
            {/*    <div className={"notice-contents"}>*/}
            {/*        <div className={"notice-top"}>*/}
            {/*        </div>*/}
            {/*        <div className={"notice-list"}>*/}
            {/*            {noticeList.map((noticeList)=>(*/}
            {/*                <StudentNoticeListMap notice={noticeList}/>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default StudentNotice;
