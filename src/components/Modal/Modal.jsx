import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const refModalRoot = document.querySelector('#modal-w-root');

const Modal = ({ src, describ, onCloseModal }) => {
  
  useEffect(() => {
    window.addEventListener('keydown', onHandleKey);

    return () => {
      window.removeEventListener('keydown', onHandleKey);
    };
  });

  const onHandleKey = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const onCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={onCloseBackdrop}>
      <div className={css.Modal}>
        <img src={src} alt={describ} />
      </div>
    </div>,
    refModalRoot
  );
};

export default Modal;

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  describ: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

