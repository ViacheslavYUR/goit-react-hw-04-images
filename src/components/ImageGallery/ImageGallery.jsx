import React from 'react';
import PropTypes from 'prop-types';

import css from './image-gallery.module.css';

const ImageGallery = ({ items, showImage }) => {
  const element = items.map(({ id, webformatURL, largeImageURL, tag }) => {
    return (
      <li
        onClick={() => {
          showImage({ largeImageURL, tag });
        }}
        className={css.item}
        key={id}
      >
        <img className={css.item__img} src={webformatURL} alt={tag} />
      </li>
    );
  });

  return <ul className={css.gallery}>{element}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  showImage: PropTypes.func,
};
