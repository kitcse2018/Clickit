import Header from "components/Headers/Header.js";
import React, {useState} from "react";
import {Container} from "reactstrap";
import DormitoryList from "components/JDcomponents/DormitoryList.js"

// you must read here
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!Change "Template" name      !!!
// !!!ex) Template -> fileName    !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const DormitoryManager = (props) => {

    return (
        <>
            <Header />
            <Container className={"third-container"}>
                <div className={"domritory-container"}>
                    <div>
                        <h2>생활관 관리</h2>
                    </div>
                    <div className={"domitory-table"}>
                        <DormitoryList></DormitoryList>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default DormitoryManager;
