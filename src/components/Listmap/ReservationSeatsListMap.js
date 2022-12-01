import {Button} from "reactstrap";
import React from "react";


const ReservationSeatsListMap= (props) => {
    return(
        <>
            <div className={"reservation-seat"}>
                <div className={"seat-name"}>
                    <h1>{props.props.facility_seat_name}</h1>
                </div>
                <Button>reservation-request-button</Button>
            </div>
        </>
    )
}

export default ReservationSeatsListMap;