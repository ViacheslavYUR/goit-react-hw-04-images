import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '32167843-8e8cdf0804a85ffadb96a7b65',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});
const fetchImages = async (q, page = 1) => {
  const { data } = await instance.get(`/`, {
    params: {
      q,
      page,
      per_page: 12,
    },
  });
  return data;
};

export default fetchImages;
