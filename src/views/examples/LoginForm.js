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
//import {useUserContext} from "../../methods/loginMethods";
//import {useHistory} from "react-router-dom";
import {useState} from "react";
import { Redirect } from "react-router-dom";

const Login = ({authenticated, login}) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        try {
            login({ id, password });
        } catch (e) {
            alert("Failed to login");
            setId("");
            setPassword("");
        }
    };


    if (authenticated) return <Redirect to="/admin/index"/>;

    const password_design = "비밀번호 구성\n원스톱 이메일 앞 3자리 + 전화번호 뒷 4자리";


    // start

    // 주석 풀 때 import 쪽도 풀기
    // const {setUser} = useUserContext();
    // const history = useHistory();
    // const [account, setAccount] = useState({
    //   id: "",
    //   password: "",
    // });
    //
    // const onChangeAccount = (e) => {
    //   setAccount({
    //     ...account,
    //     [e.target.name]: e.target.value,
    //   });
    // };
    //
    // const onSubmitAccount = async () =>{
    //   try{
    //     const user = await fetchLogin(account); // fetchLogin 이 어딨는지 모르겠음
    //
    //     setUser(user);
    //     history.replace("/");
    //   }catch (error){
    //     window.alert(error);
    //   }
    // };

    //end
    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    {/* from here */}
                    {/*<CardHeader className="bg-transparent pb-5">*/}
                    {/*  <div className="text-muted text-center mt-2 mb-3">*/}
                    {/*    <small>Sign in with</small>*/}
                    {/*  </div>*/}
                    {/*  <div className="btn-wrapper text-center">*/}
                    {/*    <Button*/}
                    {/*      className="btn-neutral btn-icon"*/}
                    {/*      color="default"*/}
                    {/*      href="#pablo"*/}
                    {/*      onClick={(e) => e.preventDefault()}*/}
                    {/*    >*/}
                    {/*      <span className="btn-inner--icon">*/}
                    {/*        <img*/}
                    {/*          alt="..."*/}
                    {/*          src={*/}
                    {/*            require("../../assets/img/icons/common/github.svg")*/}
                    {/*              .default*/}
                    {/*          }*/}
                    {/*        />*/}
                    {/*      </span>*/}
                    {/*      <span className="btn-inner--text">Github</span>*/}
                    {/*    </Button>*/}
                    {/*    <Button*/}
                    {/*      className="btn-neutral btn-icon"*/}
                    {/*      color="default"*/}
                    {/*      href="#pablo"*/}
                    {/*      onClick={(e) => e.preventDefault()}*/}
                    {/*    >*/}
                    {/*      <span className="btn-inner--icon">*/}
                    {/*        <img*/}
                    {/*          alt="..."*/}
                    {/*          src={*/}
                    {/*            require("../../assets/img/icons/common/google.svg")*/}
                    {/*              .default*/}
                    {/*          }*/}
                    {/*        />*/}
                    {/*      </span>*/}
                    {/*      <span className="btn-inner--text">Google</span>*/}
                    {/*    </Button>*/}
                    {/*  </div>*/}
                    {/*</CardHeader>*/}
                    {/* to here */}
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            {/*<small>Or sign in with credentials</small>*/}
                            {/*  here */}
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
                                <label
                                    className="custom-control-label"
                                    htmlFor=" customCheckLogin"
                                >
                                    <span className="text-muted">Remember me</span>
                                </label>
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
                <Row className="mt-3">
                    <Col xs="6">
                        <a
                            className="text-light"
                            // href="#pablo"
                            href={"#"}
                            onClick={(e) => e.preventDefault()}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <a
                            className="text-light"
                            // href="#pablo"
                            href={"#"}
                            onClick={(e) => e.preventDefault()}
                        >
                            <small>Create new account</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default Login;
