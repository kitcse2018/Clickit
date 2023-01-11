import React from "react";
import { useState } from "react";
import {Button} from "reactstrap";
import "../../assets/css/terms/TermsListMap.css";
import {TermsMethods, testing, test, termsDelete} from "../../methods/terms/TermsMethods.js";
import {useHistory} from "react-router-dom";

function TermsListMap(props){

    console.log(props);

    const history = useHistory();

    return (
        <>
            <tr className={"terms-tr-list"}>
                <td className={"terms-table-td-num"}><span className={"terms-tr"}><h2>{props.index + 1}</h2></span></td>
                {/*<td className={"terms-table-td-num"}><span className={"terms-tr display-4"}><h2>{props.terms.terms_num}</h2></span></td>*/}
                <td className={"terms-table-td-dormitory"}><span className={"terms-tr"}><h2>{props.terms.dormitory_name}</h2></span></td>
                <td className={"terms-table-td-facility"}><span className={"terms-tr"}><h2>{props.terms.facility_name}</h2></span></td>
                <td className={"terms-table-td-title"}><span className={"terms-tr"}><h2>{props.terms.terms_title}</h2></span></td>
                <td className={"terms-table-td-button"}>
                    <Button className="terms-list-edit" color="primary" onClick={()=>{history.push({
                        pathname: "/admin/termsEdit",
                        state: {
                            terms_num: props.terms.terms_num,
                            terms_title: props.terms.terms_title,
                            terms_contents: props.terms.terms_contents,
                            terms_facility_num : props.terms.terms_facility_num,
                            facility_name : props.terms.facility_name,
                            dormitory_name : props.terms.dormitory_name,
                            isTermsEdit : true,
                        }
                    })}}>수정</Button>
                    <Button className="terms-list-delete" color="danger" onClick={()=>termsDelete(props)}>삭제</Button>
                </td>
            </tr>
            {/*<li className="terms-list-li">*/}
            {/*    <div className="terms-list-num">*/}
            {/*        <h1>*/}
            {/*            {props.terms.terms_num}*/}
            {/*        </h1>*/}
            {/*    </div>*/}
            {/*    <div className="terms-list-inner-facility-location">*/}
            {/*        {props.terms.dormitory_name}*/}
            {/*    </div>*/}
            {/*    <div className="terms-list-inner-facility-name">*/}
            {/*        {props.terms.facility_name}*/}
            {/*    </div>*/}
            {/*    <div className="terms-list-title">*/}
            {/*        {props.terms.terms_title}*/}
            {/*    </div>*/}
            {/*    /!*<div className="terms-list-content">*!/*/}
            {/*    /!*    {props.terms.terms_contents}*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    <div className="terms-list-btn">*/}
            {/*        /!*<Button className="terms-list-delete" color="primary" onClick={e=>test(props)}>삭제</Button>*!/*/}
            {/*        <Button className="terms-list-edit" color="primary" onClick={()=>{history.push({*/}
            {/*            pathname: "/admin/termsEdit",*/}
            {/*            state: {*/}
            {/*                terms_num: props.terms.terms_num,*/}
            {/*                terms_title: props.terms.terms_title,*/}
            {/*                terms_contents: props.terms.terms_contents,*/}
            {/*                terms_facility_num : props.terms.terms_facility_num,*/}
            {/*                facility_name : props.terms.facility_name,*/}
            {/*                dormitory_name : props.terms.dormitory_name,*/}
            {/*                isTermsEdit : true,*/}
            {/*            }*/}
            {/*        })}}>수정</Button>*/}
            {/*        <Button className="terms-list-delete" color="danger" onClick={()=>termsDelete(props)}>삭제</Button>*/}
            {/*    </div>*/}
            {/*</li>*/}
        </>
    );
};

export default TermsListMap;