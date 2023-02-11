/* eslint-disable prettier/prettier */
import * as React from 'react'
import { useState, useEffect, Fragment } from 'react'

import {
  getAllMonth,
  getArrayDaysMonth,
  getCurrentDay,
  getCurrentIndexMonth,
  getCurrentYear,
  getFirstDayMonth,
  getLastDayMonth,
  getNumberDaysMonth
} from '../../services/getDate'

import styles from './calendarModal.module.css';

export default function CalendarModal(props) {
  //
  // STATE
  //

  const day = getCurrentDay()
  const year = getCurrentYear()
  const [currentYear, setCurrentYear] = useState(year)

  const allMonth = getAllMonth()
  const currentIndexMonth = getCurrentIndexMonth() + 1
  const [indexMonth, setIndexMonth] = useState(currentIndexMonth)

  const currentDay = day + '-' + indexMonth
  const [selectedDay, setSelectedDay] = useState(
    props.value.length
      ? props.value
      : day + '/' + indexMonth + '/' + currentYear
  )

  const [allDaysMonth, setAllDaysMonth] = useState([])
  const allDays = getNumberDaysMonth(currentYear, indexMonth)
  const [currentAllDays, setCurrentAllDays] = useState(allDays)

  const firstDayMonth = getFirstDayMonth(currentYear, indexMonth).getDay()
  const lastDayMonth = getLastDayMonth(currentYear, indexMonth).getDay()
  const [dayFirstDayMonth, setDayFirstDayMonth] = useState(firstDayMonth)
  const [dayLastDayMonth, setDayLastDayMonth] = useState(lastDayMonth)

  // MOIS PRECEDENT ET SUIVANT
  const allPrevDays = getNumberDaysMonth(currentYear, indexMonth)
  const [nextDaysMonth, setNextDaysMonth] = useState(7 - dayLastDayMonth - 1)
  const [arrayNextDays, setArrayNextDays] = useState([])

  // verifie que les données soit bien recupérés
  const [loadLastDay, setloadLastDay] = useState(0)
  const [loadNextDays, setLoadNextDays] = useState(0)

  // Select années
  const [allYears, setAllYears] = useState([])
  const firstYearSelectable = year - 50
  const lastYearSelectable = year + 50

  //
  // FONCTIONS & USEEFFECT
  //

  // update select years
  useEffect(() => {
    for (let i = firstYearSelectable; i < lastYearSelectable; i++) {
      setAllYears([...allYears, allYears.push(i)])
    }
  }, [])

  useEffect(() => {
    setArrayNextDays([])
    setCurrentAllDays(getNumberDaysMonth(currentYear, indexMonth))
    setDayFirstDayMonth(getFirstDayMonth(currentYear, indexMonth).getDay())
    setDayLastDayMonth(getLastDayMonth(currentYear, indexMonth).getDay())
    setloadLastDay(!loadLastDay)
    setAllDaysMonth(getArrayDaysMonth(currentYear, indexMonth))
  }, [indexMonth, currentYear])

  // update array day of the next month
  useEffect(() => {
    if (loadNextDays !== 0) {
      for (let i = 1; i < nextDaysMonth + 1; i++) {
        setArrayNextDays([...arrayNextDays, arrayNextDays.push(i)])
      }
    }
  }, [nextDaysMonth, loadNextDays])

  useEffect(() => {
    if (loadLastDay !== 0) {
      setNextDaysMonth(7 - dayLastDayMonth - 1)
      setLoadNextDays(!loadNextDays)
    }
  }, [dayLastDayMonth, loadLastDay])

  function goToPrevMonth() {
    if (indexMonth === 1) {
      setCurrentYear(currentYear - 1)
      setIndexMonth(12)
    } else setIndexMonth(indexMonth - 1)
  }

  function goToNextMonth() {
    if (indexMonth === 12) {
      setCurrentYear(currentYear + 1)
      setIndexMonth(1)
    } else setIndexMonth(indexMonth + 1)
  }

  function goToSelectMonth(e) {
    const stringNumber = e.target[e.target.selectedIndex].attributes[0].value
    const newIndexMonth = parseInt(stringNumber) + 1
    setIndexMonth(newIndexMonth)
  }

  function goToSelectYear(e) {
    const stringNumber = e.target[e.target.selectedIndex].attributes[0].value
    const newYear = parseInt(stringNumber)
    setCurrentYear(newYear)
  }

  function resetDate() {
    setCurrentYear(year)
    setIndexMonth(currentIndexMonth)
    setSelectedDay(day + '/' + currentIndexMonth + '/' + year)
  }

  function concatSelectedDay(day, month, year) {
    setSelectedDay(day + '/' + month + '/' + year)
  }

  function selectDate(e, day, indexMonth, currentYear) {
    concatSelectedDay(day, indexMonth, currentYear)
    props.onSelect(day + '/' + indexMonth + '/' + currentYear)
    props.close()
  }

  return (
    <div className={styles.calendarModal}>
      <div className={styles.calendarModal__nav}>
        <span
          className={`${styles.calendarModal__navNav} ${styles.calendarModal__navPrev}`}
          onClick={(e) => goToPrevMonth(e)}
        />

        <div className={styles.calendarModal__navReset} onClick={() => resetDate()}>
          <img src={props.home} alt='bouton de reinitialisation du calendrier' />
        </div>

        <select
          className={styles.calendarModal__navMonth}
          onChange={(e) => goToSelectMonth(e)}
          value={allMonth[indexMonth - 1]}
        >
          {allMonth.map((month, index) => {
            return (
              <option
                key={index}
                data-index={index}
                value={month}
              >
                {month}
              </option>
            )
          })}
        </select>

        <select
          className={styles.calendarModal__navYear}
          onChange={(e) => goToSelectYear(e)}
          value={currentYear}
        >
          {allYears.map((year, index) => {
            return (
              <option key={index} value={year}>
                {year}
              </option>
            )
          })}
        </select>

        <span
          className={`${styles.calendarModal__navNav} ${styles.calendarModal__navNext}`}
          onClick={() => goToNextMonth()}
        />
      </div>

      <table className={styles.calendarModal__table}>
        <thead className={styles.calendarModal__tableHead}>
          <tr>
            <th className={styles.calendarModal__dayHead} data-day='Sun'>
              Sun
            </th>
            <th className={styles.calendarModal__dayHead} data-day='Mon'>
              Mon
            </th>
            <th className={styles.calendarModal__dayHead} data-day='Tue'>
              Tue
            </th>
            <th className={styles.calendarModal__dayHead} data-day='Wed'>
              Wed
            </th>
            <th className={styles.calendarModal__dayHead} data-day='Thu'>
              Thu
            </th>
            <th className={styles.calendarModal__dayHead} data-day='Fri'>
              Fri
            </th>
            <th className={styles.calendarModal__dayHead} data-day='Sat'>
              Sat
            </th>
          </tr>
        </thead>

        <tbody className={styles.calendarModal__tableBody}>
          <tr className={styles.calendarModal__week}>
            {allDaysMonth.slice(0, dayFirstDayMonth).map((day, index) => {
              return (
                <td
                  key={index}
                  className={`
                  ${styles.calendarModal__dayPrev}
                  ${styles.calendarModal__day}
                  ${
                    allPrevDays -
                      dayFirstDayMonth +
                      index +
                      1 +
                      '/' +
                      (indexMonth - 1) +
                      '/' +
                      currentYear ===
                    selectedDay
                      ? styles.selected
                      : ''
                  }
                `}
                  data-month={indexMonth - 1}
                  onClick={(e) => {
                    selectDate(
                      e,
                      allPrevDays - dayFirstDayMonth + index + 1,
                      indexMonth - 1,
                      currentYear
                    )
                  }}
                >
                  {allPrevDays - dayFirstDayMonth + index + 1}
                </td>
              )
            })}
            {allDaysMonth.slice(dayFirstDayMonth, 7).map((day, index) => {
              return (
                <td
                  key={index}
                  className={`
                  ${styles.calendarModal__day}
                  ${allDaysMonth[index]}
                  ${
                    allDaysMonth[index] +
                      '/' +
                      indexMonth +
                      '/' +
                      currentYear ===
                    selectedDay
                      ?  styles.selected
                      : ''
                  }
                  ${
                    allDaysMonth[index] + '-' + indexMonth === currentDay
                      ? styles.active
                      : ''
                  }
                `}
                  data-month={indexMonth}
                  onClick={(e) => {
                    selectDate(e, allDaysMonth[index], indexMonth, currentYear)
                  }}
                >
                  {allDaysMonth[index]}
                </td>
              )
            })}
          </tr>
          <tr className={styles.calendarModal__week}>
            {allDaysMonth
              .slice(7 - dayFirstDayMonth, 14 - dayFirstDayMonth)
              .map((day, index) => {
                return (
                  <td
                    key={index}
                    className={`
                      ${styles.calendarModal__day}
                      ${day}
                      ${
                        day + '/' + indexMonth + '/' + currentYear === selectedDay
                          ? styles.selected
                          : ''
                      }
                      ${day + '-' + indexMonth === currentDay ? styles.active : ''}
                    `}
                    data-month={indexMonth}
                    onClick={(e) => {
                      selectDate(e, day, indexMonth, currentYear)
                    }}
                  >
                    {day}
                  </td>
                )
              })}
          </tr>
          <tr className={styles.calendarModal__week}>
            {allDaysMonth
              .slice(14 - dayFirstDayMonth, 21 - dayFirstDayMonth)
              .map((day, index) => {
                return (
                  <td
                    key={index}
                    className={`
                      ${styles.calendarModal__day}
                      ${day}
                      ${
                        day + '/' + indexMonth + '/' + currentYear === selectedDay
                          ? styles.selected
                          : ''
                      }
                      ${day + '-' + indexMonth === currentDay ? styles.active : ''}
                    `}
                    data-month={indexMonth}
                    onClick={(e) => {
                      selectDate(e, day, indexMonth, currentYear)
                    }}
                  >
                    {day}
                  </td>
                )
              })}
          </tr>
          <tr className={styles.calendarModal__week}>
            {allDaysMonth
              .slice(21 - dayFirstDayMonth, 28 - dayFirstDayMonth)
              .map((day, index) => {
                return (
                  <td
                    key={index}
                    className={`
                      ${styles.calendarModal__day}
                      ${day}
                      ${
                        day + '/' + indexMonth + '/' + currentYear === selectedDay
                          ? styles.selected
                          : ''
                      }
                      ${day + '-' + indexMonth === currentDay ? styles.active : ''}
                    `}
                    data-month={indexMonth}
                    onClick={(e) => {
                      selectDate(e, day, indexMonth, currentYear)
                    }}
                  >
                    {day}
                  </td>
                )
              })}
          </tr>
          <tr className={styles.calendarModal__week}>
            {allDaysMonth
              .slice(28 - dayFirstDayMonth, 28 - dayFirstDayMonth + 7)
              .map((day, index) => {
                return (
                  <td
                    key={index}
                    className={`
                      ${styles.calendarModal__day}
                      ${day}
                      ${
                        day + '/' + indexMonth + '/' + currentYear === selectedDay
                          ? styles.selected
                          : ''
                      }
                      ${day + '-' + indexMonth === currentDay ? styles.active: ''}
                    `}
                    data-month={indexMonth}
                    onClick={(e) => {
                      selectDate(e, day, indexMonth, currentYear)
                    }}
                  >
                    {day}
                  </td>
                )
              })}
            {
              // verifie si la la rangé est composé uniquement de jour du mois actuel
              allDaysMonth.slice(
                28 - dayFirstDayMonth,
                28 - dayFirstDayMonth + 7
              ).length === 7 ? (
                <Fragment/>
              ) : (
                arrayNextDays.map((day, index) => {
                  return (
                    <td
                      key={index}
                      className={`
                        ${styles.calendarModal__dayNext}
                        ${styles.calendarModal__day}
                        ${index + 1}
                        ${
                          index + 1 + '/' + (indexMonth + 1) + '/' + currentYear ===
                          selectedDay
                            ? styles.selected
                            : ''
                        }
                      `}
                      data-month={indexMonth + 1}
                      onClick={(e) => {
                        selectDate(e, index + 1, indexMonth + 1, currentYear)
                      }}
                    >
                      {index + 1}
                    </td>
                  )
                })
              )
            }
          </tr>
          {
            // verifie si la somme des :
            // nombre total des jours du mois + jour du mois précédent affiché + jour du mois d'apres inferieur, est supérieur a 35
            currentAllDays + dayFirstDayMonth + (7 - dayLastDayMonth - 1) >
            35 ? (
              <tr className={styles.calendarModal__week}>
                {allDaysMonth
                  .slice(28 - dayFirstDayMonth + 7)
                  .map((day, index) => {
                    return (
                      <td
                        key={index}
                        className={`
                          ${styles.calendarModal__day}
                          ${day}
                          ${
                            day + '/' + indexMonth + '/' + currentYear === selectedDay
                              ? styles.selected
                              : ''
                          } 
                          ${day + '-' + indexMonth === currentDay ? styles.active : ''}
                        `}
                        data-month={indexMonth}
                        onClick={(e) => {
                          selectDate(e, day, indexMonth, currentYear)
                        }}
                      >
                        {day}
                      </td>
                    )
                  })}
                {arrayNextDays.map((day, index) => {
                  return (
                    <td
                      key={index}
                      className={`
                        ${styles.calendarModal__dayNext}
                        ${styles.calendarModal__day}
                        ${index + 1} 
                        ${
                          index + 1 + '/' + (indexMonth + 1) + '/' + currentYear ===
                          selectedDay
                            ? styles.selected
                            : ''
                        }
                      `}
                      data-month={indexMonth + 1}
                      onClick={(e) => {
                        selectDate(e, index + 1, indexMonth + 1, currentYear)
                      }}
                    >
                      {index + 1}
                    </td>
                  )
                })}
              </tr>
            ) : (
              <Fragment/>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
