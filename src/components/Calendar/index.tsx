import React, { useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarContainer } from './styles';

function Calendar({ onSetDate }: any) {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(new Date());
    onSetDate(new Date());
  }, []);

  const onChange = (evt: any) => {
    setDate(evt);
    onSetDate(evt);
  };

  return (
    <CalendarContainer>
      <ReactCalendar onChange={onChange} value={date} />
    </CalendarContainer>
  );
}

export default Calendar;
