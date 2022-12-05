import React, {useState} from "react";
import { DateRangePicker } from 'react-date-range';
import { addDays } from "date-fns"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
const DateRangePick = ({setEndDate,setStartDate}) => {

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(),7),
            key: 'selection'
        }

    ]);

return(

    <DateRangePicker
        staticRanges={[]}
        inputRanges={[]}
        onChange={item => {setState([item.selection]);setEndDate(item.selection.endDate);setStartDate(item.selection.startDate)}}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
    />

        )
}

export default DateRangePick;