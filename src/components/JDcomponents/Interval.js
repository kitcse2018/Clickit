import React, { useState, useEffect} from "react";
import moment from "moment";
import Axios from "axios";
import { useInterval } from 'react-use';
import * as config from '../../config';
function Interval() {
    const [seconds, setSeconds] = useState(moment().format('HH:mm:ss'));

    useInterval(()=>{
        setSeconds(moment().format('HH:mm'));
    }, 58000);

    useEffect(() => {
            if(seconds==="00:00") {
                let endDate = moment().format('YYYY-MM-DD')
                Axios.post("http://"+config.HOST.toString()+"/autoBanClear",
                    {postEndDate: endDate}).then((response) => {
                })
            }
        }, [seconds])
};

export default Interval;