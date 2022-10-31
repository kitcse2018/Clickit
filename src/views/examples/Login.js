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
import LoginForm from "./LoginForm";

import { signIn } from '../../methods/signIn';
const Login = () => {
  const [user, setUser] = useState(null);
  const login = ({ id, password }) => setUser(signIn({ id, password }));
  const authenticated = user== null ? null : user.authenticated;
  const logout = () => setUser(null);



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
       <LoginForm login={login} authenticated={authenticated}></LoginForm>
      </>
  );
};

export default Login;
