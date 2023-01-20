import React, { useState } from 'react'
import CalendarModal from '../CalendarModal/CalendarModal'

import "./input.css"

export default function Input() {

  const [isOpen,setIsOpen] = useState(false)
  
  const [selectDate, setSelectDate] = useState("")

  const handleDateSelect = (date) => {
    setSelectDate(date)
  }

  const closeCalendar = () => {
    setIsOpen(false)
  }
  
  return (
    <div className='App'
      onClick={(e)=>{
        if(e.target.className === "App") setIsOpen(false)
      }}
    >
      <div className="input__container" >
        <input value={selectDate} onClick={()=>{setIsOpen(true)}}/>
        {isOpen ? 
          <CalendarModal onSelect={handleDateSelect} close={closeCalendar} value={selectDate}/> 
          : 
          <></>
        }
      </div>

    </div>
  )
}
