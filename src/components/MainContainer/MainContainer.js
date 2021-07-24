import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './MainContainer.module.scss';

class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: <></>,
  };

  render() {
    return <div className={styles.MainContainer}>{this.props.children}</div>;
  }
}

export default MainContainer;
