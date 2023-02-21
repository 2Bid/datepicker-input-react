/* eslint-disable prettier/prettier */
import React from 'react'
import './index.css'
import Input from './components/input/Input'

import Homelogo from 'home.png'

export default function DatepickerComponent({onChange}) {

  return <Input home={Homelogo} onChange={onChange}
  />
}
