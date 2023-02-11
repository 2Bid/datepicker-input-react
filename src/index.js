/* eslint-disable prettier/prettier */
import React from 'react'
import './index.css'
import Input from './components/input/Input'

import Homelogo from 'home.png'

// export default class DatepickerComponent extends Component {
//   render() {
//     return <Input onChange={this.props.onChange} home={Homelogo}/>
//   }
// }

export default function DatepickerComponent(props) {
  return <Input onChange={props.onChange} home={Homelogo}/>
}
