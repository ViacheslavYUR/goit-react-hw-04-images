import React from 'react';
import PropTypes from 'prop-types';

import css from './imageItem.module.css';

const ImageGalleryItem = ({ largeImageURL, tag }) => {
  return (
    <>
      <img className={css.largeImage} src={largeImageURL} alt={tag} />
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tag: PropTypes.string,
};
