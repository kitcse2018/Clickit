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
import React from "react";

const ReservationSeatsListMap= (props) => {

    const [state, setState] = React.useState({
        modal: false,
    });

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
                <Modal className={"reservation-modal"} size={"sm"} isOpen={state.modal}>
                    <div className={"reservation-modal-body"}>
                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <small>Sign in with</small>
                                </div>
                                <div className="btn-wrapper text-center">
                                    <Button
                                        className="btn-neutral btn-icon"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                        <span className="btn-inner--icon">
                          <img
                              alt="..."
                              src={require("assets/img/icons/common/github.svg").default}
                          />
                        </span>
                                        <span className="btn-inner--text">Github</span>
                                    </Button>
                                    <Button
                                        className="btn-neutral btn-icon"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                        <span className="btn-inner--icon">
                          <img
                              alt="..."
                              src={require("assets/img/icons/common/google.svg").default}
                          />
                        </span>
                                        <span className="btn-inner--text">Google</span>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Or sign in with credentials</small>
                                </div>
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Email" type="email" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Password" type="password" />
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