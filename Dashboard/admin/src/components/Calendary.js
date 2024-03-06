import React from "react";
import { Calendar, dayjsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import './calendary.css'

const localizer = dayjsLocalizer(dayjs)

function Calendary(props){
    return(
<div className="containerCalendary">
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