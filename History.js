import React, { useState } from 'react';
import SessionModal from './SessionModal2'; 
import './Math.css';

function formatDate(dateStr) {
  if (!dateStr) return 'Date not set';
  const date = new Date(dateStr);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function SessionBox({ group, onJoinGroup }) {
  return (
    <div className="session-box">
      <div className="session-details">
        <p>Class: {group.className || 'Class not set'}</p>
        <p>Date: {formatDate(group.date)}</p>
        <p>Time: {group.time || 'Time not set'}</p>
        <p>Buddy Limit: {group.current}/{group.limit}</p>
        <button className="add-session-button" onClick={() => onJoinGroup(group.meetingLink)}>
          Join
        </button>
      </div>
    </div>
  );
}

function History() {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCreateGroup = (group) => {
    const completeGroup = {
      ...group,
      current: 1,
      limit: group.limit || 1
    };
    setGroups([...groups, completeGroup]);
    setShowModal(false);
  };

  const handleJoinGroup = (link) => {
    alert(`Thank you for joining! Meeting Link: ${link}`);
  };

  return (
    <div className="centered-box">
      <h1>History Section - Available Buddy Groups</h1>
      {groups.map(group => (
        <div key={group.id} className="group">
          <SessionBox group={group} onJoinGroup={handleJoinGroup} />
        </div>
      ))}
      <button onClick={() => setShowModal(true)} className="add-session-button">Create Group</button>
      {showModal && (
        <SessionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAddSession={handleCreateGroup}
        />
      )}
    </div>
  );
}

export default History;
