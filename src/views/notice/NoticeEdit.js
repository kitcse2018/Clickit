import React, { useCallback, useState} from "react";
import {Button, Form, Input, Container} from "reactstrap";

import Header from "../../components/Headers/Header";
import "../../assets/css/notice/NoticeEdit.css";
import {useLocation} from "react-router-dom";
import Axios from "axios";

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
        Axios.post("http://localhost:3001/noticeEditSave", {
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
        document.location.replace("/admin/notice");
    }

    return (
        <>
            <Header />
            <Container>
                <div className={"noticeEdit-container"}>
                    <div className={"noticeEdit-contents"}>
                        <div className={"noticeEdit-top"}>
                            <Button className={"noticeEdit-save"} color={"primary"} onClick={()=>noticeSave()}>저장</Button>
                        </div>
                        <div className={"noticeEdit-elements"}>
                            <div className={"noticeEdit-element-header"}>
                                <Form className="noticeEdit-element-form">
                                    <Input className={"noticeEdit-element-header-input"} type={"textarea"} placeholder={"제목"} defaultValue={items.notice_title} onChange={onTitleChange}>
                                    </Input>
                                </Form>
                            </div>
                            <div className={"noticeEdit-element-body"}>
                                <Form>
                                    <Input className={"noticeEdit-element-body-input"}  type={"textarea"} placeholder={"내용"} rows={"10"} defaultValue={items.notice_contents} onChange={onContentsChange}>
                                    </Input>
                                </Form>
                            </div>
                            <div className={"noticeEdit-element-footer"}>

                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )

}

export default NoticeEdit;