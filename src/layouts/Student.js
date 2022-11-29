import React from "react";
import {useLocation, Route, Switch, Redirect, useHistory} from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import Axios from "axios";
import Reservation from "../views/examples/Reservation";

const Student = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = (routes) => {
        if (sessionStorage.getItem("isLogin") === null) {
            alert("로그인이 필요한 서비스입니다.");
            return <Redirect to="/auth/login"/>;
        }
        return routes.map((prop, key) => {
            if (prop.layout === "/student") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (
                props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
                -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <>
            <div className="main-content" ref={mainContent}>
                <AdminNavbar
                    {...props}
                    brandText={getBrandText(props.location.pathname)} // 기숙사 이름으로 바꾸기
                />
                <Switch>
                    {getRoutes(routes[2])}
                    {/*문제 되면 여기 routes[2] routes로 바꿔주기*/}
                    <Redirect from="*" to="/student/facility"/>
                </Switch>
                <Container fluid>
                    <AdminFooter />
                </Container>
            </div>
        </>
    );
};

export default Student;
