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
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";

import "../../assets/css/loginView.css";

import {useState} from "react";
import { Redirect } from "react-router-dom";

const LoginForm = ({ login}) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        if(id===""||password===""){
            alert("로그인 정보를 입력해주세요.")
        }
        else{
            try {
            login({ id, password });
        } catch (e) {
            alert("Failed to login");
            setId("");
            setPassword("");
        }
        }
    };
    const password_design = "비밀번호 구성\n원스톱 이메일 앞 3자리 + 전화번호 뒷 4자리";

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">

                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">

                        </div>
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Student Number"
                                        autoComplete="new-email"
                                        onChange={({ target: { value } }) => setId(value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="new-password"
                                        onChange={({ target: { value } }) => setPassword(value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                    className="custom-control-input"
                                    id=" customCheckLogin"
                                    type="checkbox"
                                />
                                {/*<label
                                    className="custom-control-label"
                                    htmlFor=" customCheckLogin"
                                >
                                    <span className="text-muted">Remember me</span>
                                </label>*/}
                            </div>
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button" onClick={handleClick}>
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                        <div className={"password-explain"}>
                            <p>{password_design}</p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </>
    );

};

export default LoginForm;
