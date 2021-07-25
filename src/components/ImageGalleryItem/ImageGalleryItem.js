import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';

class ImageGalleryItem extends Component {
  static propTypes = {
    smallImageUrl: PropTypes.string.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string,
    openModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    alt: 'Picture without tags',
  };

  handleClick = event => {
    this.props.openModal(event.target.dataset.largeimage, this.props.alt);
  };

  render() {
    return (
      <>
        <img
          src={this.props.smallImageUrl}
          alt={this.props.alt}
          className={styles.ImageGalleryItemImage}
          data-largeimage={this.props.largeImageUrl}
          onClick={this.handleClick}
        />
      </>
    );
  }
}

export default ImageGalleryItem;
