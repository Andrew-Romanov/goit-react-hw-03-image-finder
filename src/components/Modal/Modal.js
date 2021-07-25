import { Component } from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  // static propTypes = {
  //   children: PropTypes.node,
  // };

  // static defaultProps = {
  //   children: <></>,
  // };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydowm);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydowm);
  }

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeydowm = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
