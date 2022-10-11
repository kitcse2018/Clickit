import Header from "../../components/Headers/Header";
import "../../assets/css/cssTesting.css";
import {Container} from "reactstrap";

const Testing = () =>{
    return(
        <>
            <Header/>
            <Container className={"test"}>
                <div className={"reservation-main"}>
                    <dic className={"reservation-main-contents"}>
                        <div className={"innerFacility-img"}>
                            <h1>innerFacility-img</h1>
                        </div>
                        <div className={"innerFacility-seat-time-list"}>
                            <div className={"innerFacility-seat innerFacility-time"}>
                                <h1>innerFacility-seat innerFacility-time</h1>
                            </div>
                        </div>
                        <div className={"innerFacility-select"}>
                            <h1>innerFacility-select</h1>
                        </div>
                    </dic>
                </div>
            </Container>
        </>
    )
}

export default Testing;