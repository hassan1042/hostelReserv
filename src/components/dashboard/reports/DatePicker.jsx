import React from 'react'
import DatePicker from 'react-datepicker'

function DatePickerReports({startDate, setStartDate, endDate, setEndDate}) {
  return (
    <div className="mb-4">
    <label className="max-sm:text-lg block font-semibold mb-2">Select Date Range</label>
    <div className="flex gap-4 flex-wrap  max-sm:justify-center">
      {/* Start Date Picker */}
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Start Date"
        className="border p-2 rounded-md dark:bg-bgPrimaryDark"
        maxDate={endDate} // Optional: Ensures start date can't be after end date
      />
  
      {/* End Date Picker */}
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="End Date"
        className="border p-2 rounded-md dark:bg-bgPrimaryDark"
        minDate={startDate} // Ensures end date can't be before start date
      />
    </div>
  </div>
  )
}

export default DatePickerReports
