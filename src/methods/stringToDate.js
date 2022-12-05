export function stringToTime(time1, time2) {
    if(time1 > time2){
        return calcTime(time2, time1);
    }else{
        return calcTime(time1, time2);
    }
}

export function calcTime(time1, time2) {
    const time1Hour = time1.split(':')[0];
    const time1Min = time1.split(':')[1];
    const time2Hour = time2.split(':')[0];
    const time2Min = time2.split(':')[1];

    const calcHour = time2Hour - time1Hour;
    const calcMin = time2Min - time1Min;

    return calcHour * 60 + calcMin;
}