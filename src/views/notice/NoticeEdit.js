import React, { useCallback, useState} from "react";
import {Card, Button, Form, Input} from "reactstrap";

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
            Axios.post("http://"+config.HOST.toString()+"/noticeUpdate", {
                noticeData:{
                    noticeNum: items.notice_num,
                    noticeTitle: noticeTitle,
                    noticeContents: noticeContents,
                    noticeWriter: items.notice_writer,
                }
            }).then(r => {
                console.log(r);
            }).catch(e => {
                console.log(e);
            }).then(r => {
                console.log(r);
            })
        }else{
            Axios.post("http://"+config.HOST.toString()+"/noticeCreate", {
                noticeData:{
                    noticeTitle: noticeTitle,
                    noticeContents: noticeContents,
                    noticeWriter: items.notice_writer,
                }
            }).then(r => {
                console.log(r);
            }).catch(e => {
                console.log(e);
            }).then(r => {
                console.log(r);
            })
            Axios.get("http://"+config.HOST.toString()+"/lastInsertId"
            ).then(r => {
                console.log("last insert id : "+r);
            })
        }
        document.location.replace("/admin/notice");
    }

    return (
        <>
            <Header />
            <Card className="shadow">
                <div className={"noticeEdit-container"}>
                    {/*<div className={"noticeEdit-contents"}>*/}
                    <div className={"noticeEdit-elements"}>
                        <div className={"noticeEdit-top"}>
                            <Button className={"noticeEdit-save"} color={"primary"} onClick={()=>noticeSave()}>저장</Button>
                        </div>
                        <div className={"noticeEdit-element-header"}>
                            <div className="Notice_title_name">
                                <div className="Notice_title">
                                    제목:
                                </div>
                                <Form className="noticeEdit-element-form">
                                    <Input className={"noticeEdit-element-header-input"}
                                           placeholder={"제목"} type={"textarea"} rows={"1"}
                                           defaultValue={items.notice_title} onChange={onTitleChange}>
                                    </Input>
                                </Form>
                            </div>
                        </div>
                        <div className={"noticeEdit-element-body"}>
                            <div className="notice_body_name">
                                <div className="Notice_body_input">
                                    내용:
                                </div>
                                <Form>
                                    <Input className={"noticeEdit-element-body-input"}
                                           type={"textarea"} placeholder={"내용"} rows={"10"}
                                           defaultValue={items.notice_contents} onChange={onContentsChange}>
                                    </Input>
                                </Form>
                            </div>
                        </div>

                        <div className={"noticeEdit-element-footer"}>

                        </div>
                    </div>
                    {/*</div>*/}
                </div>
            </Card>

        </>
    )

}

export default NoticeEdit;