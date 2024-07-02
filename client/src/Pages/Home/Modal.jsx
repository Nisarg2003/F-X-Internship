import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Modal = ({ onClose, userId, setnotes, note, fetchNotes }) => {

  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (note) {
      settitle(note.title);
      setdescription(note.description);
    } else {
      settitle('');
      setdescription('');
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formatedDate = selectedDate ? formatDate(selectedDate) : null;
    try {
      let res
      if (note) {
        res = await axios.put(`http://localhost:8080/api/v1/updateNote/${note._id}`, {
          title,
          description,
          deadline: formatedDate
        })
      } else {

        res = await axios.post("http://localhost:8080/api/v1/createNotes", {
          title,
          description,
          deadline: formatedDate,
          user: userId
        })
      }
      if (res.data.success) {
        fetchNotes();
        settitle('')
        setdescription('')
        onClose()
      } else {
        console.log("Error")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-opacity-20 bg-gray-300 backdrop-filter backdrop-blur-lg">
      <div className="relative w-auto max-w-lg mx-auto my-6">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow-lg relative flex flex-col p-5">
          {/* Close button */}
          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal content */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className='font-semibold text-2xl'>Add To-Do</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className='text-xl'>Title:</label>
                <input required value={title} type='text' onChange={(e) => settitle(e.target.value)} id="title" className="  border rounded-md p-2 w-full" placeholder="Enter title" />
              </div>
              <div className="mb-4">
                <label className='text-xl'>Description:</label>
                <textarea required value={description} id="description" onChange={(e) => setdescription(e.target.value)} className=" border rounded-md p-2 w-full h-32 resize-none" placeholder="Enter description"></textarea>
              </div>
              <div className="mb-4">
                <label className='text-xl'>Date:</label><br />
                <DatePicker
                  required
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  className="border rounded-md p-2 w-full"
                  startDate={today}
                  minDate={today}
                />
              </div>
              <button type="submit" className="flex items-center justify-center mx-auto w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md p-2">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
