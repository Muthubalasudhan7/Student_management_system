// src/components/DeleteModal.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './DeleteModal.css';

const DeleteModal = ({ show, onConfirm, onCancel }) => {
  return (
    <div className={`delete-modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
      <FontAwesomeIcon icon={faTrashAlt} className="trash-icon" size="3x" />
        <p className="bold-text">Are you sure you want to delete?</p>
        <div className="modal-buttons">
          <button onClick={onCancel} className="cancel-button">Cancel</button>
          <button onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
