/* eslint-disable prettier/prettier */
import * as React from 'react'
import { useState, Fragment } from 'react'
import CalendarModal from '../CalendarModal/CalendarModal'
import styles from './input.module.css';

export default function Input(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectDate, setSelectDate] = useState('')

  const handleDateSelect = (date) => {
    setSelectDate(date)
    props.onChange(date)
  }

  const closeCalendar = () => {
    setIsOpen(false)
  }

  return (
    <div className={styles.input__container}>
      <input
        value={selectDate}
        readOnly
        onClick={() => {
          setIsOpen(true)
        }}
      />
      {isOpen ? (
        <CalendarModal
          onSelect={handleDateSelect}
          close={closeCalendar}
          value={selectDate}
          home={props.home}
          // props library function
          onChange={(e)=>props.onChange(e)}
        />
      ) : (
        <Fragment/>
      )}
    </div>
  )
}
