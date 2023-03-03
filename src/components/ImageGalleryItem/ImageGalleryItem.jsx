import PropTypes from 'prop-types';

import css from './imageItem.module.css';

const ImageGalleryItem = ({ largeImage }) => {
  const { largeImageURL, tag } = largeImage;
  return (
    <>
      <img className={css.largeImage} src={largeImageURL} alt={tag} />
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tag: PropTypes.string,
  }),
};
