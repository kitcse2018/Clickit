import React, {useState} from 'react'
import {Button} from "reactstrap";
import redirect from "react-router-dom/es/Redirect";

const TermsEditSave = (props) => {
    const [state, setState] = useState();
    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value,
        });
    };

    const onClick = () =>{
        const post ={
            postTermsTitle : state.termsTitle,
            postTermsContents : state.termsContents,
        };

        fetch("http://localhost:3001/TermsEditSave", {
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
                        termsTitle : json.text,
                        termsContents : json.text,
                    }
                );
            });
        redirect("/admin/terms");
    };
    return (
        <Button className={"terms-edit-save"} onClick={onClick}>저장</Button>
    )
}

export default TermsEditSave;