import React from 'react';
import styles from './modal.module.scss'
const CustomModal = ({ isVisible, onClose, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>
        {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
