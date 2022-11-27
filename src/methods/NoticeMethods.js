import Axios from "axios";

export function noticeDelete(props){
    if(window.confirm(props.notice.notice_title+"\n\n"+"정말 삭제하시겠습니까?")){
        Axios.delete("http://localhost:3001/noticeDelete", {
            data: {
                notice_num: props.notice.notice_num,
            },
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        alert("삭제되었습니다.");
        document.location.replace("/admin/notice");
    }else{
        alert("삭제가 취소되었습니다.");
    }
}