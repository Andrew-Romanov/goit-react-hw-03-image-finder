import { Component } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import ThreeDots from '../../utils/Loader';
import apiService from '../../utils/apiService';
import styles from './ImageGallery.module.scss';

class ImageGallery extends Component {
  // static propTypes = {
  //   whenSubmit: PropTypes.func,
  // };

  // static defaultProps = {
  //   whenSubmit: () => {},
  // };

  state = {
    pictures: [],
    pageNumber: 1,
    isLoading: false,
    isModalOpen: false,
  };

  modalData = {
    src: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate');
    // console.log(this.props.searchQuery);
    // console.log(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.props.searchQuery}&page=${this.state.pageNumber}&per_page=12&key=9331698-e17fc555dd577ca52fdf34a8b`);

    // if ((prevProps.searchQuery !== this.props.searchQuery)
    //   || (prevState.pageNumber !== this.state.pageNumber)) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ pictures: [], pageNumber: 1 });
      this.fetchImages();
      // console.log('Fetch 1');
    } else if (prevState.pageNumber < this.state.pageNumber) {
      this.fetchImages();
      // console.log('Fetch 2');
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    // if (this.props.searchQuery === '') return;
  }

  fetchImages = () => {
    this.setState({ isLoading: true });

    setTimeout(() => {
      // axios
      //   .get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.props.searchQuery}&page=${this.state.pageNumber}&per_page=12&key=9331698-e17fc555dd577ca52fdf34a8b`)
      apiService(this.props.searchQuery, this.state.pageNumber)
        .then(response => {
          response.data.hits.length !== 0
            ? // ? this.setState({ pictures: response.data.hits })
              this.setState(prevState => ({
                pictures: [...prevState.pictures, ...response.data.hits],
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
