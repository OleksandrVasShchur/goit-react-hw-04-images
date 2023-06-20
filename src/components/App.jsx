import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbarl';
import { getImages } from 'GetImages/GetImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';
import Loader from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [total, setTotal] = useState(0);
 
  useEffect(() => {
    if (!query) {
      return;
    }
    receiveImages(query, page);
  }, [query, page]);

  const receiveImages = async (query, page) => {
    setIsLoading(true);

    try {
      const { hits, totalHits } = await getImages(query, page);

      if (hits.length === 0) {
        toast.error('Sorry, no images available');
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setTotal(totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onHandlSubmit = value => {

    setQuery(value);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = (largeImageURL, tags) => {
    setShowModal(true);
    setCurrentImageUrl(largeImageURL.target.src);
    setTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentImageUrl(null);
    setTags('');
  };

  const totalPages = total / images.length

  return (
    <section className={css.App}>
      <Searchbar onSubmit={onHandlSubmit} />
      {isLoading && <Loader />}
      {images.length === 0 && (
        <p className={css.message}>Please enter your search details...</p>
      )}
      {error && <p>Something went wrong </p>}

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {totalPages > 1 && !isLoading && images.length > 0 && (
        <Button onClick={onLoadMore} disabled={isLoading} />
      )}

      {showModal && (
        <Modal
          src={currentImageUrl}
          describ={tags ?? 'largePicture'}
          onCloseModal={closeModal}
        />
      )}

      <ToastContainer />
    </section>
  );
};

