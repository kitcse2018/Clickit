import React, { useCallback, useState} from "react";
import {Button} from "reactstrap";

import Header from "../../components/Headers/Header";
// import css
import {useLocation} from "react-router-dom";
import Axios from "axios";

const NoticeEdit = (props) => {

    const location = useLocation();

    const items = location.state;

    const [noticeTitle, setNoticeTitle] = useState(items.notice_title);
    const [noticeContents, setNoticeContents] = useState(items.notice_contents);

    const onTitleChange = useCallback(e => {
        setNoticeTitle(e.target.value);
    }, []);

    const onContentsChange = useCallback(e => {
        setNoticeContents(e.target.value);
    }, []);

    function noticeSave(){
        Axios.post("http://localhost:3001/noticeEditSave", {
            noticeData:{
                noticeTitle: noticeTitle,
                noticeContents: noticeContents,
                noticeNum: items.notice_num,
            }
        }).then(r => {
            console.log(r);
        }).catch(e => {
            console.log(e);
        }).then(r => {
            console.log(r);
        })
        document.location.replace("/admin/notice");
    }

    return (
        <>
            <Header />

        </>
    )

}

export default NoticeEdit;