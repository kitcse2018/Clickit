import React from "react";
import {Button} from "reactstrap";
import {useHistory} from "react-router-dom";
import "../../assets/css/notice/NoticeListMap.css";
import {noticeDelete} from "../../methods/notice/NoticeMethods";

function NoticeListMap(notice){
    const history = useHistory();

    // 밑에 실행 안 되면 className 중괄호 없애기
    return (
      <>
        <li className={"notice-list-li"}>
            <div className={"notice-list-num"}>
                <h1>
                    {notice.notice_num}
                </h1>
            </div>
            <div className={"notice-list-title"}>
                {notice.notice_title}
            </div>
            {/*<div className={"notice-list-content"}>*/}
            {/*    {props.notice.notice_contents}*/}
            {/*</div>*/}
            <div className={"notice-list-btn"}>
                <Button className={"notice-list-edit"} color={"primary"} onClick={()=>{history.push({
                    pathname: "/admin/noticeEdit",
                    state: {
                        notice_num: notice.notice_num,
                        notice_title: notice.notice_title,
                        notice_contents: notice.notice_contents,
                    }
                })}}>수정</Button>
                <Button className={"notice-list-delete"} color={"danger"} onClick={()=>{noticeDelete(notice)}}>삭제</Button>
            </div>
        </li>
      </>
    );
}

export default NoticeListMap;