import React from 'react'

import DatepickerComponent from 'datepicker-input-react'

const App = () => {
  const onChange = (e) => {
    console.log(e)
  }

  return <DatepickerComponent onChange={(e)=>onChange(e)}/>
}
export default App
