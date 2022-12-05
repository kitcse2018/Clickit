import React, {useCallback, useEffect, useState} from "react";
import {Button, Collapse, Modal} from "reactstrap";
import {useHistory} from "react-router-dom";
import "../../assets/css/notice/NoticeListMap.css";
import {noticeDelete} from "../../methods/notice/NoticeMethods";
import NoticeModal from "../../views/notice/NoticeModal";
import "../../assets/css/NoticeModal.css";

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
            <li className={"notice-list-li student-notice-list-li"} onClick={()=>toggleModal()}>
                <div className={"notice-list-num"}>
                    <h1>
                        {props.notice.notice_num}
                    </h1>
                </div>
                <div className={"notice-list-title"}>
                    {props.notice.notice_title}
                </div>
                <Modal className={"notice-modal"} size={"lg"} isOpen={state.modal}>
                    <NoticeModal notice = {notice} onModalDisplay={onModalDisplay}></NoticeModal>
                </Modal>
            </li>
        </>
    );
}

export default StudentNoticeListMap;