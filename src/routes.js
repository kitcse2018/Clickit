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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Third from "./views/Third";
import Template from "./views/Template";
import Facility from "./views/Facility";
import Reservation from "./views/examples/Reservation";
import DormitoryEdit from "./views/examples/DormitoryEdit";
import Login from "./views/examples/Login";
import Terms from "./views/terms/Terms";
import TermsEdit from "./views/terms/TermsEdit";
import Notice from "./views/notice/Notice";
import NoticeEdit from "./views/notice/NoticeEdit";

let routes = [
    [ // admin
      {
        path: "/Student",
        name: "Student",
        icon: "ni ni-user-run",
        component: Third,
        layout: "/admin"
      },
      {
        path: "/Template",
        name: "Template",
        icon: "ni ni-user-run",
        component: Template,
        layout: "/admin"
      },
        // 삭제해야 됨
      {
        path: "/reservation/:facility_num",
        name: "Reservation",
        icon: "ni ni-bullet-list-67 text-blue",
        component: Reservation,
        layout: "/admin"
      },
        // 삭제해야 됨
      {
        path: "/dormitoryEdit",
        name: "DormitoryEdit",
        icon: "ni ni-bullet-list-67 text-blue",
        component: DormitoryEdit,
        layout: "/admin"
      },
      {
        path: "/terms",
        name: "이용수칙",
        icon: "ni ni-bullet-list-67 text-blue",
        component: Terms,
        layout: "/admin"
      },
      {
        path: "/notice",
        name: "공지사항",
        icon: "ni ni-bullet-list-67 text-blue",
        component: Notice,
        layout: "/admin"
      }
      ], // end of admin
    [ // auth
      {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth"
      },
    ], // end of auth
    [ // student
      {
        path: "/reservation",
        name: "Reservation",
        icon: "ni ni-bullet-list-67 text-blue",
        component: Reservation,
        layout: "/student"
      },
      {
        path: "/facility",
        name: "UserView",
        icon: "ni ni-key-25 text-info",
        component: Facility,
        layout: "/student"
      },
    ], // end of student
    // every single views
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/facility",
    name: "Facility",
    icon: "ni ni-key-25 text-info",
    component: Facility,
    layout: "/student"
  },
  {
    path: "/Student",
    name: "Student",
    icon: "ni ni-user-run",
    component: Third,
    layout: "/admin"
  },
  {
    path: "/Template",
    name: "Template",
    icon: "ni ni-user-run",
    component: Template,
    layout: "/admin"
  },
  {
    path: "/reservation/:facility_num",
    name: "Reservation",
    icon: "ni ni-bullet-list-67 text-blue",
    component: Reservation,
    layout: "/student"
  },
    //login page path
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/dormitoryEdit",
    name: "DormitoryEdit",
    icon: "ni ni-bullet-list-67 text-blue",
    component: DormitoryEdit,
    layout: "/admin"
  },
  {
    path: "/terms",
    name: "이용수칙",
    icon: "ni ni-bullet-list-67 text-blue",
    component: Terms,
    layout: "/admin"
  },
  {
    path: "/termsEdit",
    name: "이용수칙 수정",
    icon: "ni ni-bullet-list-67 text-blue",
    component: TermsEdit,
    layout: "/admin"
  },
  {
    path: "/notice",
    name: "공지사항",
    icon: "ni ni-bullet-list-67 text-blue",
    component: Notice,
    layout: "/admin"
  },
  {
    path: "/noticeEdit",
    name: "공지사항 수정",
    icon: "ni ni-bullet-list-67 text-blue",
    component: NoticeEdit,
    layout: "/admin"
  }
];
export default routes;
