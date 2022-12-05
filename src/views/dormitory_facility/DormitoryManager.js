import Header from "components/Headers/Header.js";
import React, {useState} from "react";
import {Container} from "reactstrap";
import DormitoryList from "components/JDcomponents/DormitoryList.js";
import "../../assets/css/DormitoryList.css";

// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "ImgUploadForm" name      !!!
// !!!ex) ImgUploadForm -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const DormitoryManager = (props) => {

    return (
        <>
            <Header />
                <div className={"dormitory-input-container"}>
                    <div className="col-lg dormitory-container">
                        <div className="card mb-4">
                            <h1 className="card-header">생활관 관리</h1>
                            <div className="card-body">
                                <div className="row gy-3">
                                    <div className="dormitory-body">
                                        <div>
                                            <DormitoryList></DormitoryList>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </>
    );
};

export default DormitoryManager;
