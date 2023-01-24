import React, {useState} from "react";
// reactstrap components
import {
    Button,
} from "reactstrap";
import "../../../assets/css/mycss/Paging.css"

import Axios from "axios";
import * as config from '../../../config';

const PagingButton = ({total,limit,page,setPage}) => {
    const numPages = Math.ceil(total / limit);
    return (
        <div className={"pagingArea"}>
        <div className="flexBox">
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                prev
            </Button>

            <h1>
                {page} / {Math.ceil(total / limit)}
            </h1>
            <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                next
            </Button>
        </div>
        </div>
    );

}

export default PagingButton;