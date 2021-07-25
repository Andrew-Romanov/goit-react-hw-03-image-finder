import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import ThreeDots from '../../utils/Loader';
import apiService from '../../utils/apiService';
import styles from './ImageGallery.module.scss';

class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };

  static defaultProps = {
    searchQuery: '',
  };

  state = {
    pictures: [],
    pageNumber: 1,
    isLoading: false,
    isModalOpen: false,
    needToScroll: false,
  };

  modalData = {
    src: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ pictures: [], pageNumber: 1 });
      this.fetchImages();
    } else if (prevState.pageNumber < this.state.pageNumber) {
      this.fetchImages();
    }

    if (this.state.needToScroll) {
      this.scrollToBottom();
      this.setState({ needToScroll: false });
    }
  }

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  fetchImages = () => {
    this.setState({ isLoading: true });

    // Оставил небольшой таймаут чтоб виден был лоадер
    setTimeout(() => {
      apiService(this.props.searchQuery, this.state.pageNumber)
        .then(response => {
          response.data.hits.length !== 0
            ? this.setState(prevState => ({
                pictures: [...prevState.pictures, ...response.data.hits],
                needToScroll: true,
              }))
            : console.log('No images found');
        })
        .catch(error => {
          console.log(error);
          this.setState({ isLoading: false });
        })
        .finally(() => this.setState({ isLoading: false }));
    }, 500);
  };

  loadMoreImages = () => {
    this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  openModal = (src, alt) => {
    this.modalData.src = src;
    this.modalData.alt = alt;
    this.toggleModal();
  };

  render() {
    const { pictures, isLoading, isModalOpen } = this.state;
    return (
      <section className={styles.ImageGalleryContainer}>
        {pictures.length !== 0 && (
          <ul className={styles.ImageGallery}>
            {pictures.map(picutre => {
              return (
                <li className={styles.ImageGalleryItem} key={picutre.id}>
                  <ImageGalleryItem
                    smallImageUrl={picutre.previewURL}
                    largeImageUrl={picutre.largeImageURL}
                    alt={picutre.tags}
                    openModal={this.openModal}
                  />
                </li>
              );
            })}
          </ul>
        )}

        {isLoading && <ThreeDots />}

        {pictures.length !== 0 && !isLoading && (
          <Button
            type="button"
            label="Load more..."
            width="140px"
            whenClicked={this.loadMoreImages}
          />
        )}

        {isModalOpen && (
          <Modal
            src={this.modalData.src}
            alt={this.modalData.alt}
            closeModal={this.toggleModal}
          />
        )}
      </section>
    );
  }
}

export default ImageGallery;
