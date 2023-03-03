import React from 'react';
import { useState, useEffect, useCallback } from 'react';
// import { toast } from 'react-toastify';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import fetchImages from 'shared/services/image-api';
import Modal from 'shared/Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'shared/Button/Button';

import css from './styles.css';
import Loader from 'shared/LoaderSpiner/LoaderSpiner';

export function App() {
  const [search, setSearch] = useState('');
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }

    const fetchImage = async () => {
      try {
        setLoading(true);
        const data = await fetchImages(search, page);
        setGallery(prevState => [...prevState, ...data.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [search, page]);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const showImage = useCallback((largeImageURL, tag) => {
    setShowModal(true);
    setLargeImage({ largeImageURL, tag });
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setLargeImage(null);
  };

  const searchImages = query => {
    if (query.search !== search) {
      setPage(1);
      setGallery([]);
      setSearch(query.search);
    }
    // else toast('you have already entered this query!');
  };

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      <main>
        <ImageGallery items={gallery} showImage={showImage} />
        {error && <p>{error}</p>}
        {loading && <Loader />}
        {gallery.length !== 0 && (
          <Button loadMore={loadMore}>
            <span className={css.buttonLabel}>Load more</span>
          </Button>
        )}
      </main>
      {showModal && (
        <Modal close={closeModal}>
          <ImageGalleryItem largeImage={largeImage} />
        </Modal>
      )}
    </>
  );
}

// class App extends Component {
//   state = {
//     search: '',
//     gallery: [],
//     loading: false,
//     error: null,
//     page: 1,
//     showModal: false,
//     largeImage: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { search, page } = this.state;
//     if (prevState.search !== search) {
//       this.setState({ gallery: [] });
//     }
//     if (prevState.search !== search || prevState.page !== page) {
//       this.fetchImage();
//     }
//   }
//   async fetchImage() {
//     try {
//       this.setState({ loading: true });
//       const { search, page } = this.state;
//       const data = await fetchImages(search, page);
//       this.setState(({ gallery }) => ({
//         gallery: [...gallery, ...data.hits],
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }
//   loadMore = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   searchImage = ({ search }) => {
//     this.setState({ search });
//   };

//   showImage = ({ largeImageURL, tag }) => {
//     console.log(largeImageURL);
//     this.setState({
//       showModal: true,
//       largeImage: {
//         largeImageURL,
//         tag,
//       },
//     });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false, largeImage: null });
//   };

//   render() {
//     const { gallery, error, loading, showModal, largeImage } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.searchImage} />
//         <main>
//           <ImageGallery items={gallery} showImage={this.showImage} />
//           {error && <p>{error}</p>}
//           {loading && <Loader />}
//           {gallery.length !== 0 && (
//             <Button loadMore={this.loadMore}>
//               <span className={css.buttonLabel}>Load more</span>
//             </Button>
//           )}
//         </main>
//         {showModal && (
//           <Modal close={this.closeModal}>
//             <ImageGalleryItem {...largeImage} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

export default App;

/* <Searchbar>, <ImageGallery>, <ImageGalleryItem>, <Loader>, <Button> і <Modal></Modal> */
