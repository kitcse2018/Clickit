import React, { useCallback, useState} from "react";
import {Button, Form, Input} from "reactstrap";

import Header from "../../components/Headers/Header";
import "../../assets/css/notice/NoticeEdit.css";
import {useLocation} from "react-router-dom";
import Axios from "axios";
import * as config from '../../config';
const NoticeEdit = () => {

    const location = useLocation();

    const items = location.state;

    console.log(items);

    const [noticeTitle, setNoticeTitle] = useState(items.notice_title);
    const [noticeContents, setNoticeContents] = useState(items.notice_contents);

    const onTitleChange = useCallback(e => {
        setNoticeTitle(e.target.value);
    }, []);

    const onContentsChange = useCallback(e => {
        setNoticeContents(e.target.value);
    }, []);

    function noticeSave(){
        if(items.isNoticeEdit){
            Axios.post("http://"+config.HOST.toString()+"/updateNotice", {
                noticeData:{
                    noticeNum: items.notice_num,
                    noticeTitle: noticeTitle,
                    noticeContents: noticeContents,
                }
            }).then(r => {
                console.log(r);
            }).catch(e => {
                console.log(e);
            }).then(r => {
                console.log(r);
            })
        }else{
            Axios.post("http://"+config.HOST.toString()+"/insertNotice", {
                noticeData:{
                    noticeTitle: noticeTitle,
                    noticeContents: noticeContents,
                }
            }).then(r => {
                console.log(r);
            }).catch(e => {
                console.log(e);
            }).then(r => {
                console.log(r);
            })
        }
        document.location.replace("/admin/notice");
    }

    return (
        <>
            <Header />
            <div className={"noticeEdit-container"}>
                <div className={"noticeEdit-contents"}>
                    <div className={"noticeEdit-top"}>
                        <Button className={"noticeEdit-save"} color={"primary"} onClick={()=>noticeSave()}>??????</Button>
                    </div>
                    <div className={"noticeEdit-elements"}>
                        <div className={"noticeEdit-element-header"}>
                            <Form className="noticeEdit-element-form">
                                <Input className={"noticeEdit-element-header-input"} type={"textarea"} placeholder={"??????"} defaultValue={items.notice_title} onChange={onTitleChange}>
                                </Input>
                            </Form>
                        </div>
                        <div className={"noticeEdit-element-body"}>
                            <Form>
                                <Input className={"noticeEdit-element-body-input"}  type={"textarea"} placeholder={"??????"} rows={"10"} defaultValue={items.notice_contents} onChange={onContentsChange}>
                                </Input>
                            </Form>
                        </div>
                        <div className={"noticeEdit-element-footer"}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default NoticeEdit;