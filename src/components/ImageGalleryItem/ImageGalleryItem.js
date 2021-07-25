import { Component } from 'react';
// import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';

class ImageGalleryItem extends Component {
  // static propTypes = {
  //   whenSubmit: PropTypes.func,
  // };

  // static defaultProps = {
  //   whenSubmit: () => {},
  // };

  // state = {
  //   userInput: '',
  // };

  // handleChange = event => {
  //   this.setState({ userInput: event.target.value });
  // };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.whenSubmit(this.state);
  //   this.formReset();
  // };

  // formReset = () => {
  //   this.setState({ userInput: '' });
  // };

  handleClick = event => {
    // console.log(event.target.dataset.largeimage);
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
          // onClick={this.props.openModal}
        />
      </>
    );
  }
}

export default ImageGalleryItem;
