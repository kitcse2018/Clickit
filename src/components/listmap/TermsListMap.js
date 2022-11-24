import React from "react";
import { useState } from "react";
import {Button} from "reactstrap";
import "../../assets/css/TermsListMap.css";
import {TermsMethods, testing, test} from "../../methods/TermsMethods.js";
import {useHistory} from "react-router-dom";

function TermsListMap(props){

    const history = useHistory();

    return (
        <>
            <li className="terms-list-li">
                <div className="terms-list-num">
                    <h1>
                        {props.terms.terms_num}
                    </h1>
                </div>
                <div className="terms-list-title">
                    {props.terms.terms_title}
                </div>
                {/*<div className="terms-list-content">*/}
                {/*    {props.terms.terms_contents}*/}
                {/*</div>*/}
                <div className="terms-list-btn">
                    <Button className="terms-list-edit" color="primary" onClick={e=>TermsMethods()}>수정</Button>
                    {/*<Button className="terms-list-delete" color="primary" onClick={e=>test(props)}>삭제</Button>*/}
                    <Button className="terms-list-delete" color="primary" onClick={()=>{history.push({
                        pathname: "/admin/termsEdit",
                        state: {
                            terms_num: props.terms.terms_num,
                            terms_title: props.terms.terms_title,
                            terms_contents: props.terms.terms_contents,
                            terms_innerFacilityNum : props.terms_innerFacilityNum,
                        }
                    })}}>삭제</Button>
                </div>
            </li>
        </>
    );
};

export default TermsListMap;