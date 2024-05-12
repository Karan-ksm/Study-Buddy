import React, { useState } from 'react';

function SessionModal({ isOpen, onClose, onAddSession }) {
    const [className, setClassName] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [buddyLimit, setBuddyLimit] = useState('');
    const [meetingLink, setMeetingLink] = useState(''); 
    const handleSubmit = (event) => {
        event.preventDefault();
        onAddSession({ className, time, date, limit: buddyLimit, meetingLink });
        onClose(); 
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create a Buddy Group</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Class Name" value={className} onChange={e => setClassName(e.target.value)} />
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                    <input type="number" placeholder="Buddy Limit" value={buddyLimit} onChange={e => setBuddyLimit(e.target.value)} />
                    <input type="text" placeholder="Meeting Link" value={meetingLink} onChange={e => setMeetingLink(e.target.value)} />
                    <button type="submit">Create</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default SessionModal;
