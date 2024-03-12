import React from "react";
import { Calendar, dayjsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import {assignTask} from '../../Redux/Actions/actions'
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
//


const localizer = dayjsLocalizer(dayjs)

function Calendary(){

    const dispatch = useDispatch()
    const assing = useSelector(state=>state.assing)
    console.log("data asssing",assing)

   // handelAssignTasl=()

    return(
<div className="container">
    <Calendar
     localizer={localizer}
   
     startAccessor="start"
     endAccessor="end"
    style={{height:500, width:"auto"}}>

    </Calendar>
   
</div>
    )
}

export default Calendary;