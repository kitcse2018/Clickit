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
  CardHeader,
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

import LoginForm from "./LoginForm";
import {useState} from "react";
import Axios from "axios";
import {Redirect} from "react-router-dom";



const Login = () => {
  const [user, setUser] = useState([]);

  function signIn({id, password}) {
    Axios.get("http://localhost:3001/signIn", {
      params: {
        postAuthId: id, postAuthPassword: password
      }
    }).then((response) => {
      if(response.data[0]==null){alert("Failed to login")}
      else setUser(response.data[0])
    });
  }

  const login = ({ id, password }) => signIn({ id, password });
  const admin_type = user == null ? null : user.admin_type;
  const logout = () => setUser(null);

  if (admin_type==="푸름관리자") return <Redirect to="/admin/index"/>;
  if (admin_type==="오름관리자") return <Redirect to="/admin/user-profile"/>;

  return (
      <>
        <LoginForm login={login} admin_type={admin_type}></LoginForm>
      </>
  );
};

export default Login;