import * as React from 'react';

export default function ExpiryDateDropdown({ selectedMonth, selectedYear, onMonthChange, onYearChange }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => currentYear + index);

  return (
    <div className="expiry-date">
      <label htmlFor="expiry-month" style={{fontSize: "18px", marginRight: "20px", textAlign: "right"}}>Expiry date</label>
      <select id="expiry-month" value={selectedMonth} onChange={onMonthChange}>
        <option value="">Month</option>
        <option value="January">01</option>
        <option value="February">02</option>
        <option value="March">03</option>
        <option value="April">04</option>
        <option value="May">05</option>
        <option value="June">06</option>
        <option value="July">07</option>
        <option value="August">08</option>
        <option value="September">09</option>
        <option value="October">10</option>
        <option value="November">11</option>
        <option value="December">12</option>
      </select>
      <select id='expiry-year' value={selectedYear} onChange={onYearChange}>
        <option value="">-- Year --</option>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}