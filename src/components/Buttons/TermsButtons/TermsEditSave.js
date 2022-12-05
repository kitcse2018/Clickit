import React, {useState} from 'react'
import {Button} from "reactstrap";
import redirect from "react-router-dom/es/Redirect";
import * as config from '../../../config';
const TermsEditSave = (props) => {
    const [state, setState] = useState();
    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value,
        });
    };

    const onClick = () =>{
        console.log(props);
        const post ={
            postTermsTitle : props.terms_title,
            postTermsContents : props.terms_contents,
            postTermsInnerFacilityNum : props.terms_facility_num,
        };

        fetch("http://"+config.HOST.toString()+"/termsEditSave", {
            method : "post",
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify(post),
        })
            .then((res)=>res.json())
            .then((json)=>{
                setState(
                    {
                        terms_title : json.text,
                        terms_contents : json.text,
                        terms_inner_facility_num : json.text,
                    }
                );
            });
        window.location.replace("/admin/terms");
    };
    return (
        <Button className={"terms-edit-save"} onClick={onClick}>저장</Button>
    )
}

export default TermsEditSave;