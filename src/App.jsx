import React from 'react';
import { Component } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import fetchImages from 'shared/services/image-api';
import Modal from 'shared/Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'shared/Button/Button';

import css from './styles.css';
import Loader from 'shared/LoaderSpiner/LoaderSpiner';
// import axios from 'axios';

// const API_KEY = '32167843-8e8cdf0804a85ffadb96a7b65';

class App extends Component {
  state = {
    search: '',
    gallery: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search) {
      this.setState({ gallery: [] });
    }
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImage();
    }
  }
  async fetchImage() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await fetchImages(search, page);
      this.setState(({ gallery }) => ({
        gallery: [...gallery, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }
  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  searchImage = ({ search }) => {
    this.setState({ search });
  };

  showImage = ({ largeImageURL, tag }) => {
    console.log(largeImageURL);
    this.setState({
      showModal: true,
      largeImage: {
        largeImageURL,
        tag,
      },
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImage: null });
  };

  render() {
    const { gallery, error, loading, showModal, largeImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchImage} />
        <main>
          <ImageGallery items={gallery} showImage={this.showImage} />
          {error && <p>{error}</p>}
          {loading && <Loader />}
          {gallery.length !== 0 && (
            <Button loadMore={this.loadMore}>
              <span className={css.buttonLabel}>Load more</span>
            </Button>
          )}
        </main>
        {showModal && (
          <Modal close={this.closeModal}>
            <ImageGalleryItem {...largeImage} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;

/* <Searchbar>, <ImageGallery>, <ImageGalleryItem>, <Loader>, <Button> і <Modal></Modal> */
