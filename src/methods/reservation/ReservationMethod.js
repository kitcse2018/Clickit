import Axios from "axios";
import {useState} from "react";

export function getSeatsByTimes(startTime, endTime, facilityNum){
    Axios.get('http://localhost:3001/getSeatsByTimes',{
        params: {
            startTime : startTime,
            endTime : endTime,
            facilityNum : facilityNum,
        }
    }).then((response) => {
        return response.data;
        // console.log(seatList);
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
