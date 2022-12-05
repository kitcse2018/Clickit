import Axios from "axios";
import {useState} from "react";
import * as config from '../../config';
export function getSeatsByTimes(startTime, endTime, facilityNum){
    Axios.get("http://"+config.HOST.toString()+"/getSeatsByTimes",{
        params: {
            startTime : startTime,
            endTime : endTime,
            facilityNum : facilityNum,
        }
    }).then((response) => {
        return response.data;
        // console.log(seatList);
    });
};

export function getCurrentDate(){
    const today = new Date();

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    const hour = ('0' + today.getHours()).slice(-2);
    const minute = ('0' + today.getMinutes()).slice(-2);
    const second = ('0' + today.getSeconds()).slice(-2);

    const timeString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

    return timeString;
};

export function getBlacklistEndDate(studentNum){
    Axios.get("http://"+config.HOST.toString()+"/getBlacklistEndDate",{
        params: {
            studentNum : studentNum,
        }
    }).then((response) => {
        return response.data;
    })
};

export function updateSeatAvailabilityStatus(seatAvailabilityNum){
    Axios.post("http://"+config.HOST.toString()+"/updateSeatAvailabilityStatus",{
        params: {
            seatAvailabilityNum : seatAvailabilityNum,
            seatAvailabilityStatus : "사용중",
        },
    }).then((response) => {
        console.log(response);
    });
}

/*
export function reservationAcc(){
    let accordionBtn = document.querySelectorAll('.reservation-time-title');
    let allTexts = document.querySelectorAll('.reservation-seat');
    let accIcon = document.querySelectorAll('.reservation-accIcon');

    accordionBtn.forEach(function (el){
        el.addEventListener('click', toggleAccordion)
    })

    function accordionMethod(el){
        let curTargetParent = el.currentTarget.parentElement;
        let childrenElement = curTargetParent.children;

        for(let count = 1; count<childrenElement.length; count++){
            console.log(childrenElement.item(count).innerHTML);
        }
    }

    function toggleAccordion(el){
        let targetText = el.currentTarget.nextElementSibling.classList;

        let targetAccIcon = el.currentTarget.children[0];
        let target = el.currentTarget;

        if(targetText.contains('show')){
            targetText.remove('show');
            targetAccIcon.classList.remove('anime');
            target.classList.remove('accordionTitleActive');
        }else{
            accordionBtn.forEach(function (el){
                el.classList.remove('accordionTitleActive');

                allTexts.forEach(function (el){
                    el.classList.remove('show');
                })

                accIcon.forEach(function (el){
                    el.classList.remove('anime');
                })
            })
            targetText.add('show');
            target.classList.add('accordionTitleActive');
            targetAccIcon.classList.add('anime');
        }
    }
}*/
