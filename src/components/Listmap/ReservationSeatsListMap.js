import {
    Button,
    Card,
    CardBody, CardHeader,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal
} from "reactstrap";
import React, {useEffect} from "react";
import Axios from "axios";

const ReservationSeatsListMap= (props) => {

    const [state, setState] = React.useState({
        modal: false,
    });

    const [terms, setTerms] = React.useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:3001/getTermsByFacilityNum', {
            params: {
                facilityNum: props.facilityNum,
            }
        }).then((response) => {
            setTerms(response.data);
        })
    },[]);

    const toggleModal = () => {
        setState({
            modal: !state.modal,
        });
     }

    return(
        <>
            <div className={"reservation-seat"}>
                <div className={"seat-name"}>
                    <h1>{props.props.facility_seat_name}</h1>
                </div>
                <Button className={"reservation-btn"} type={"button"} color={"primary"}
                        onClick={()=>toggleModal()}>예약하기
                </Button>
                <Modal className={"reservation-modal"} size={"lg"} isOpen={state.modal}>
                    <div className={"reservation-modal-body"}>
                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <small>체온 입력</small>
                                </div>
                                <div className="btn-wrapper text-center">
                                    <Input placeholder={"예시 : 36.5"}></Input>
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>이용 수칙 안내</small>
                                </div>
                                <Form role="form">
                                    <div className="reservation-terms">
                                        {terms[0].terms_contents}
                                    </div>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="button"
                                        >
                                            Sign in
                                        </Button>
                                        <Button
                                            className="ml-auto"
                                            color="link"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() =>toggleModal()}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default ReservationSeatsListMap;