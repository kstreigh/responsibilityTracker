import React, { useState, useEffect } from "react";
import ReactCalendar from 'react-calendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTileClassName, getTileContent } from './CalendarTile';
import './styles/Calendar.css';


function CalendarPlan() {
  const [date, setDate] = useState(new Date());
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedOption, setSelectedOption] = useState('Never');
  const [markedDates, setMarkedDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState([]);

  useEffect(() =>{
    const fetchEntries = async () =>{
      try {
        const response = await fetch('http://localhost:3000/calendar/api/calendar');
        const data = await response.json();
        setMarkedDates(data);
      } catch (err){
        console.error(err);
      }
    };
    fetchEntries();
  }, []);

  const handleTitleChange = (event) => {
    setTitleText(event.target.value);
  };
  const handleContentChange = (event) => {
    setContentText(event.target.value);
  };
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/calendar/api/save-option', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, titleText, contentText, selectedOption }),
      });

      if (!response.ok) {
        throw new Error('Failed to save option');
      } 
      const refreshed = await fetch('http://localhost:3000/calendar/api/calendar');
      const refreshedData = await refreshed.json();
      setMarkedDates(refreshedData);

      setTitleText('');
      setContentText('');
      setSelectedOption('Never');

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCalendarClick = (clickedDate) => {
    const matched = markedDates.filter(entry => {
      const entryDate = new Date(entry.Date);
      return (
        entryDate.getFullYear() === clickedDate.getFullYear() &&
        entryDate.getMonth() === clickedDate.getMonth() &&
        entryDate.getDate() === clickedDate.getDate()
      );
    });
    setSelectedEntries(matched);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEntries([]);
  };

  return (
    <div>
      <h1>Calendar</h1>
      <ReactCalendar
        tileClassName={({date, view}) => getTileClassName(date,view, markedDates)}
        tileContent={({date,view}) => getTileContent(date,view,markedDates)}
        onClickDay={handleCalendarClick}
      />

      <h2>Set Reminder</h2>
      <p>Select a date and time:</p>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      <p>Add title of reminder:</p>
      <input
        type="text"
        id="textbox"
        value={titleText}
        onChange={handleTitleChange}
        placeholder="Type here..."
      />
      <p>Add content of reminder:</p>
      <input
        type="text"
        id="textbox"
        value={contentText}
        onChange={handleContentChange}
        placeholder="Type here..."
      />
      <p>Recurs:</p>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="Never">Never</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>

      {modalVisible && (
        <div className="modal-overlay" onClick = {closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>X</button>
            {selectedEntries.length > 0 ? (
              <ul>
                {selectedEntries.map((entry, index) => (
                  <li key={index}>
                    <strong>{entry.Title}</strong><br />
                    <span>{entry.Content}</span><br />
                    <em>Recurs: {entry.Occurence}</em>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reminders for this date.</p>
            )}

          </div>
        </div>

      )}
    </div>
  );
}

export default CalendarPlan;