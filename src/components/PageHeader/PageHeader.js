import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './PageHeader.module.scss';

class PageHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    title: 'Where is your title?',
    children: <></>,
  };

  render() {
    return <div className={styles.PageHeader}>{this.props.title}</div>;
  }
}

export default PageHeader;
