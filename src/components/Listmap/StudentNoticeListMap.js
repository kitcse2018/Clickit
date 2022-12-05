import React, {useCallback, useEffect, useState} from "react";
import {Button, Collapse, Modal} from "reactstrap";
import {useHistory} from "react-router-dom";
import "../../assets/css/notice/NoticeListMap.css";
import {noticeDelete} from "../../methods/notice/NoticeMethods";
import NoticeModal from "../../views/notice/NoticeModal";

function StudentNoticeListMap(props){

    useEffect(()=>{
        setNotice(props.notice);
        console.log(notice);
    },[])

    const [state, setState] = useState({
        modal: false,
    });
    const [notice, setNotice] = useState([]);

    const toggleModal = () => {
        setState({
            modal: !state.modal,
        })
    };

    const onModalDisplay = useCallback(()=>{
        setState({
            modal: !state.modal,
        })
    },[state.modal]);

    return (
        <>
            <li className={"notice-list-li student-notice-list-li"}>
                <div className={"notice-list-num"}>
                    <h1>
                        {props.notice.notice_num}
                    </h1>
                </div>
                <div className={"notice-list-title"}>
                    {props.notice.notice_title}
                </div>
                {/*<div className={"notice-list-content"}>*/}
                {/*    {props.notice.notice_contents}*/}
                {/*</div>*/}
                {/*<Collapse isOpen={moreInfoOpen} className={moreInfoOpen? "opened" : "closed"}>*/}

                {/*</Collapse>*/}
            </li>
        </>
    );
}

export default StudentNoticeListMap;