/*import Axios from "axios";
import {useHistory} from "react-router-dom";

function toReservation(facilityNum){
    const history = useHistory();

    Axios.get("http://localhost:3001/facilitySeatTime",{
        params:{
            facilityNum : facilityNum,
        },
    }).then((response) => {
        history.push({
            pathname : "/student/reservation",
            state : {
                facilityNum : facilityNum,
            }
        });
    });
}*/

export function timeFormat(start_time, end_time){
    const s_time = start_time.slice(0,5);
    const e_time = end_time.slice(0,5);

    return s_time + " ~ " + e_time;
}