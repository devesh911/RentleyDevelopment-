import {React} from 'react'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = ({setEndDate,setStartDate, startDate, endDate}) => {

  const today = new Date();
  const minSelectableDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  console.log(startDate,endDate)
  

  return (
    <div>
      <div className=" ">
                <p className=" pb-2">Select tenure</p>

                <Datepicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  minDate={minSelectableDate}

                />
    
                {/* <Datepicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  calendarContainer={MyContainer}
                  

                />
                <Datepicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  calendarContainer={MyContainer}
                  
                /> */}
                </div>
    </div>
  )
}

export default DatePicker
