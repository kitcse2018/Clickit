import Axios from "axios";
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
}