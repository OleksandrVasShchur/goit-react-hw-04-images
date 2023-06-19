import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const refModalRoot = document.querySelector('#modal-w-root');
console.log(refModalRoot);

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

// const refModalRoot = document.querySelector('#modal-w-root');

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.onHandleKey);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onHandleKey);
//   }

//   onHandleKey = e => {
//     if (e.code === 'Escape') {
//       this.props.onCloseModal();
//     }
// onCloseBackdrop = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onCloseModal();
//     }
//   };//   };

//

//   render() {
//     const { describ, src } = this.props;

//     return createPortal(
//       <div className={css.Overlay} onClick={this.onCloseBackdrop}>
//         <div className={css.Modal}>
//           <img src={src} alt={describ} />
//         </div>
//       </div>,
//       refModalRoot
//     );
//   }
// }

// export default Modal;

// Modal.propTypes = {
//   src: PropTypes.string.isRequired,
//   describ: PropTypes.string.isRequired,
//   onClose: PropTypes.func,
// };
