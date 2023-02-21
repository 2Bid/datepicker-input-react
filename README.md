# datepicker-input-react

Datepicker-input-react is a library based on create-react-library.
This library return an input field who display a calendar when the input field is clicked, and return the selected date into input field.

Features include:
- Displays days of previous and next month
- Got a home button to reset date
- Extends to 50 years before and after actual year

## Install

```bash
npm i datepicker-input-react
```

## Usage

```jsx
import React from 'react'
import DatepickerInput from 'datepicker-input-react'
import 'datepicker-input-react/dist/index.css'

export default function DatepickerInputContainer({onChange}) {
  return (
    <DatepickerInput onChange={onChange}/>
  )
}
```

## Props

```onChange``` subscribe to date change

## License

MIT © [2Bid](https://github.com/2Bid)
