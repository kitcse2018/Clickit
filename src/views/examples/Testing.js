import Header from "../../components/Headers/Header";
import {Container} from "reactstrap";

const Testing = () =>{
    return(
        <>
            <Header/>
            <Container className={"test"}>
                <h1>Hello!</h1>
            </Container>
        </>
    )
}

export default Testing;