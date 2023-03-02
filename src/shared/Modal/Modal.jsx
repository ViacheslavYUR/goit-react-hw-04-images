import { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import css from './modal.module.css';

const modalPortal = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ currentTarget, target, code }) => {
    if (currentTarget === target || code === 'Escape') {
      console.log(code);
      this.props.close();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalPortal
    );
  }
}

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
