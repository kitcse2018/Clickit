import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Form, Input} from "reactstrap";
import Axios from "axios";
import * as config from "../../config";
import "../../assets/css/NoticeModal.css";

const NoticeModal = ({notice, onModalDisplay}) =>{

    console.log(notice)

    function toStudentNoticeModal(){
        window.location.href = "/student/studentNotice";
    }

    function preventNotice(){
        sessionStorage.setItem("preventNotice", "true");
        onModalDisplay()
    }

    return(
      <>
          <div className={"facility-modal-body"}>
              <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-5">
                      <div className="text-center text-muted mb-4">
                          <small>공지사항</small>
                      </div>
                      <div className={"notice-modal-title text-center"}>
                          <h1 className={"display-4"}>
                              {notice.notice_title}
                          </h1>
                      </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form">
                          <div className="facility-notice">
                              {notice.notice_contents}
                          </div>
                          <div className="text-center">
                              <Button
                                  className="my-4"
                                  color="primary"
                                  type="button"
                                    onClick={()=>toStudentNoticeModal()}
                              >
                                  공지사항 페이지 이동
                              </Button>
                              <Button
                                  className="ml-auto"
                                  color="danger"
                                  data-dismiss="modal"
                                  type="button"
                                  onClick={() =>preventNotice()}
                              >
                                  닫기
                              </Button>
                          </div>
                      </Form>
                  </CardBody>
              </Card>
          </div>
      </>
    );
}

export default NoticeModal;