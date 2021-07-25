import { Component } from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    width: PropTypes.string,
    whenClicked: PropTypes.func,
  };

  static defaultProps = {
    type: 'button',
    label: 'Button',
    width: '80px',
    whenClicked: () => {
      alert('Button clicked');
    },
  };

  render() {
    return (
      <button
        className={styles.Button}
        type={this.props.type}
        style={{ width: this.props.width }}
        onClick={() => this.props.whenClicked(this.props.label)}
      >
        {this.props.label}
      </button>
    );
  }
}

export default Button;
