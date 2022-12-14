import "../../assets/css/loginView.css";

import * as config from '../../config';
import LoginForm from "./LoginForm";
import {useEffect, useState} from "react";
import Axios from "axios";

const Login = () => {

  const [user, setUser] = useState([]);

  if(sessionStorage.getItem("isLogin") === "true"){
      console.log("로그인 되어있음");
      {sessionStorage.getItem("type") === "student" ?
          window.location.replace("/student/facility") : window.location.replace("/admin/Student")}
  }

  function SignIn({id, password}) {
    Axios.all([Axios.get("http://"+config.HOST.toString()+"/signInByAdmin", {
      params: {
        postAdminId: id, postAdminPassword: password
      }
    }), Axios.get("http://"+config.HOST.toString()+"/signInByStudent", {
      params: {
        postStudentId: id, postStudentPassword: password
      }
    })])
        .then(Axios.spread((res1, res2) => {
          if (res1.data == null && res2.data == null) {
            alert("Failed to login")
          } else if (res1.data[0] != null && res2.data[0] == null) {
            sessionStorage.setItem("type", "admin");
              sessionStorage.setItem("isLogin", "true");
              sessionStorage.setItem("name", res1.data[0].admin_type);

              res1.data[0].type = "admin";
            setUser(res1.data[0])
          } else if (res1.data[0] == null && res2.data[0] != null) {
              sessionStorage.setItem("studentNum", res2.data[0].student_num);
              sessionStorage.setItem("dormitoryNum", res2.data[0].dormitory);
              sessionStorage.setItem("name", res2.data[0].student_id);
            sessionStorage.setItem("type", "student");
            sessionStorage.setItem("isLogin", "true");
            res2.data[0].type = "student";
            setUser(res2.data[0])
          }
          else{
              alert("해당 정보가 없습니다.")
          }
        })).catch((err) => console.log(err))
  }

  const login = ({ id, password }) => SignIn({ id, password });
  const type = user.type;
  const logout = () => setUser(null);

  if (type==="student"){
      window.location.replace("/student/facility");
  }
  else if (type==="admin") {
        window.location.replace("/admin/Student");
   }


  return (
      <>
        <LoginForm login={login} ></LoginForm>
      </>
  );
};

export default Login;