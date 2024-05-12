import React, { useState, useEffect } from 'react';

function SessionModal({ isOpen, onClose, onAddSession, resetFormTrigger, setResetFormTrigger }) {
  const [className, setClassName] = useState('');
  const [classDate, setClassDate] = useState('');
  const [classTime, setClassTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  useEffect(() => {
    if (resetFormTrigger) {
      setClassName('');
      setClassDate('');
      setClassTime('');
      setMeetingLink('');
      setResetFormTrigger(false);
    }
  }, [resetFormTrigger, setResetFormTrigger]);

  const handleSubmit = () => {
    onAddSession({ className, classDate, classTime, meetingLink });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add a Class</h2>
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={e => setClassName(e.target.value)}
        />
        <input
          type="date"
          value={classDate}
          onChange={e => setClassDate(e.target.value)}
        />
        <input
          type="time"
          value={classTime}
          onChange={e => setClassTime(e.target.value)}
        />
        <input
          type="url"
          placeholder="Meeting Link"
          value={meetingLink}
          onChange={e => setMeetingLink(e.target.value)}
        />
        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SessionModal;
