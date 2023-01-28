import './calendar.css';

const CalendarView = () => (
  <div className="cal">
    <div className="cal__toolbar">toolbar</div>
    <div className="cal__monthly">some content!</div>
    <iframe
      title="ccb-calendar"
      src="https://denverchurch.ccbchurch.com/w_calendar.php"
      width="100%"
      height="700"
    ></iframe>
    {/* <CalendarPicker /> */}
  </div>
);
export default CalendarView;
