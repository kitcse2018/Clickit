/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import "../../assets/css/mycss/AddFacility.css";


const AddFacility = (props) => {
    function deleteDiv(){
        const div=document.getElementById("my_div");
        div.remove();
    }
    function createDiv() {
        // 1. <div> element 만들기
        const newDiv = document.createElement('div');

        // 2. <div>에 들어갈 text node 만들기
        const newText = document.createTextNode('안녕하세요');

        // 3. <div>에 text node 붙이기
        newDiv.appendChild(newText);

        // 4. <body>에 1에서 만든 <div> element 붙이기
        document.body.appendChild(newDiv);
    }
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <div className="total">
                            <div className="container">
                                <CardHeader className="border-0">
                                    <h1 className="mb-0">{props.name}
                                        <button className="float-right">저장</button>
                                    </h1>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <div>
                                            <div className="topcon">
                                                <div className="conimage">
                                                    <div className="photo">

                                                    </div>
                                                </div>
                                                <div className="input">
                                                    <input className="ip1"
                                                           onChange={(e)=>{
                                                               console.log(e);
                                                           }}/>
                                                    <input className="ip1"
                                                           onChange={(e)=>{
                                                               console.log(e);
                                                           }}/>
                                                </div>
                                            </div>
                                            <div className="bigcon">
                                                <div id='my_div'>
                                                    이거 누르면 사라지는거다?
                                                </div>
                                                <input type="button"
                                                       value="deleteDiv"
                                                       onClick={()=>deleteDiv()}/>
                                                <input type="button"
                                                       value="createDiv"
                                                       onClick={()=>createDiv()}/>
                                                <div className="con">1&nbsp;
                                                    <button className="float-right">삭제</button>
                                                </div>
                                                <div className="con">2&nbsp;
                                                    <button className="float-right">삭제</button>
                                                </div>
                                                <div className="con">3&nbsp;
                                                    <button className="float-right">삭제</button>
                                                </div>
                                                <div className="con">4&nbsp;
                                                    <button className="float-right">삭제</button>
                                                </div>
                                                <div className="con">5&nbsp;
                                                    <button className="float-right">삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default AddFacility;
