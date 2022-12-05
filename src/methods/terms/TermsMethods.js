import Axios from "axios";
import * as config from '../../config';
export function TermsMethods(){
    console.log("TermsMethods");
}

export function testing(){
    console.log("testing");
}

export function test(props){
    document.location.href = "/admin/termsEdit";
}

export function termsDelete(props){
    if(window.confirm(props.terms.terms_title+"\n"
        +props.terms.dormitory_name+"\n"
        +props.terms.facility_name+"\n\n"+"정말 삭제하시겠습니까?")){
        Axios.delete("http://"+config.HOST.toString()+"/termsDelete", {
            data: {
                terms_num: props.terms.terms_num,
            },
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        alert("삭제되었습니다.");
        document.location.replace("/admin/terms");
    }else{
        alert("삭제가 취소되었습니다.");
    }

}