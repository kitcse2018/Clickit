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

  return (
      <>
       <LoginForm login={login} authenticated={authenticated}></LoginForm>
      </>
  );
};

export default Login;
