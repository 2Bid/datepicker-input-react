/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import './index.css'
import Input from './components/input/Input'

import Homelogo from 'home.png'

export default class DatepickerComponent extends Component {
  render() {
    return <Input home={Homelogo}/>
  }
}
