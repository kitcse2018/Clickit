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
import React, {useCallback, useEffect, useState} from "react";
import Axios from "axios";
import ReservationModal from "../Modals/ReservationModal";
import * as config from '../../config';
const ReservationSeatsListMap= (props) => {

    const tempTerms = [{
        terms_num: 1,
        terms_title: "기본 이용 수칙",
        terms_contents: "시설을 깨끗하게 사용해주세요.",
        terms_facility_num: 1,
    }]

    const [state, setState] = useState({
        modal: false,
    });

    const [terms, setTerms] = useState([]);

    useEffect(()=>{
        Axios.get("http://"+config.HOST.toString()+"/getTermsByFacilityNum", {
            params: {
                facilityNum: props.props.facilityNum,
            }
        }).then((response) => {
            setTerms(response.data);
        })
    },[]);

    const toggleModal = () => {
        setState({
            modal: !state.modal,
        });
    };

    const onModalDisplay = useCallback(()=>{
        setState({
            modal: !state.modal,
        })
    },[state.modal]);


    return(
        <>
            <div className={"reservation-seat"}>
                <div className={"seat-name"}>
                    <h1>{props.seat.facility_seat_name}</h1>
                </div>
                {props.seat.seat_availability_status === "사용 가능" ?
                    <Button className={"reservation-btn"} type={"button"} color={"primary"}
                            onClick={()=>toggleModal()}>예약하기
                    </Button> :
                    <Button className={"reservation-btn"} type={"button"} disabled color={"secondary"}>
                        사용중
                    </Button>
                }
                <Modal className={"reservation-modal"} size={"lg"} isOpen={state.modal}>
                    <ReservationModal terms={terms.length==0?tempTerms:terms} onModalDisplay={onModalDisplay} seat={props.seat} facilityNum={props.props.facilityNum}></ReservationModal>
                    {/*{terms.length!=0?*/}
                    {/*    <ReservationModal terms={terms} onModalDisplay={onModalDisplay} seat={props.seat} facilityNum={props.props.facilityNum}></ReservationModal>*/}
                    {/*    :*/}
                    {/*    <ReservationModal {terms.length==0?tempTerms:terms} onModalDisplay={onModalDisplay} seat={props.seat} facilityNum={props.props.facilityNum}></ReservationModal>*/}
                    {/*}*/}
                </Modal>
            </div>
        </>
    )
}

export default ReservationSeatsListMap;