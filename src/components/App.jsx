
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import Modal from 'react-modal';
import styles from './App.module.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import LoadMoreBtn from './LoadMoreBtn';
import ErrorMessage from './ErrorMessage';

const ACCESS_KEY = '1pvk8dGjtFX83KrH5l6CySG68T9ocimDhm6rANifWrs';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function fetchImages() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${ACCESS_KEY}`
        );
        const data = await response.json();
        if (page === 1) {
          setImages(data.results);
        } else {
          setImages((prev) => [...prev, ...data.results]);
        }
      } catch (err) {
        setError('Щось пішло не так. Спробуйте ще раз.');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === '') {
      toast.error('Введіть текст для пошуку!');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={styles.app}>
      <h1>Search of Pictures</h1>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <ClipLoader color="#3b5998" size={50} />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}

      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.modal} overlayClassName={styles.overlay}>
          <img src={selectedImage?.urls.regular} alt={selectedImage?.alt_description} />
          <p>{selectedImage?.description || 'Без опису'}</p>
          <p>Автор: {selectedImage?.user.name}</p>
        </Modal>
      )}
    </div>
  );
}

export default App;





