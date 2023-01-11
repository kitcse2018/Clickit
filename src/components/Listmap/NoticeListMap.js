import React from "react";
import {Button} from "reactstrap";
import {useHistory} from "react-router-dom";
import "../../assets/css/notice/NoticeListMap.css";
import {noticeDelete} from "../../methods/notice/NoticeMethods";
import {useEffect} from "react";

function NoticeListMap(notice){
    const history = useHistory();

    useEffect(()=>{
       console.log(notice);
    },[]);

    // 밑에 실행 안 되면 className 중괄호 없애기
    return (
      <>
          <tr className={"notice-tr-list"}>
              <td className={"notice-table-td-num"}><span className={"notice-tr"}><h2>{notice.index + 1}</h2></span></td>
              <td className={"notice-table-td-title"}><span className={"notice-tr"}><h2>{notice.notice.notice_title}</h2></span></td>
              <td className={"notice-table-td-writer"}><span className={"notice-tr"}><h2>오름 관리자</h2></span></td>
              <td className={"notice-table-td-date"}><span className={"notice-tr"}><h2>2023-01-01</h2></span></td>
              <td classname={"notice-table-td-button"}>
                  <Button className={"notice-list-edit"} color={"primary"} onClick={()=>{history.push({
                      pathname: "/admin/noticeEdit",
                      state: {
                          notice_num: notice.notice.notice_num,
                          notice_title: notice.notice.notice_title,
                          notice_contents: notice.notice.notice_contents,
                          isNoticeEdit: true,
                      }
                  })}}>수정</Button>
                  <Button className={"notice-list-delete"} color={"danger"} onClick={()=>{noticeDelete(notice)}}>삭제</Button>
              </td>
          </tr>

        {/*<li className={"notice-list-li"}>*/}
        {/*    <div className={"notice-list-num"}>*/}
        {/*        <h1>*/}
        {/*            {notice.notice.notice_num}*/}
        {/*        </h1>*/}
        {/*    </div>*/}
        {/*    <div className={"notice-list-title"}>*/}
        {/*        {notice.notice.notice_title}*/}
        {/*    </div>*/}
        {/*    /!*<div className={"notice-list-content"}>*!/*/}
        {/*    /!*    {props.notice.notice_contents}*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    <div className={"notice-list-btn"}>*/}
        {/*        <Button className={"notice-list-edit"} color={"primary"} onClick={()=>{history.push({*/}
        {/*            pathname: "/admin/noticeEdit",*/}
        {/*            state: {*/}
        {/*                notice_num: notice.notice.notice_num,*/}
        {/*                notice_title: notice.notice.notice_title,*/}
        {/*                notice_contents: notice.notice.notice_contents,*/}
        {/*                isNoticeEdit: true,*/}
        {/*            }*/}
        {/*        })}}>수정</Button>*/}
        {/*        <Button className={"notice-list-delete"} color={"danger"} onClick={()=>{noticeDelete(notice)}}>삭제</Button>*/}
        {/*    </div>*/}
        {/*</li>*/}
      </>
    );
}

export default NoticeListMap;