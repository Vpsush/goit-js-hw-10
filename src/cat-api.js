import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_EpLzqbh8m1FwM1nvu5fwtZDOYnKOUdux4wWBVsLNXpfE9odkAA85MkssjJOhQYTS';

// const BASE_URL1 = 'https://api.thecatapi.com/v1/images/search?breed_ids=';
const BASE_URL = 'https://api.thecatapi.com/v1';
// const BASE_URL2 = 'https://api.thecatapi.com/v1/images';
const MY_API =
  'live_EpLzqbh8m1FwM1nvu5fwtZDOYnKOUdux4wWBVsLNXpfE9odkAA85MkssjJOhQYTS';
// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_EpLzqbh8m1FwM1nvu5fwtZDOYnKOUdux4wWBVsLNXpfE9odkAA85MkssjJOhQYTS
fetchBreeds = () => {
  return fetch(`${BASE_URL}/breeds?api_key=${MY_API}`).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
// fetchCatByBreed = breadId => {
//   return fetch(
//     `${BASE_URL}/images/search?api_key=${MY_API}?breed_ids=${breadId}`
//   ).then(response => {
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// };

fetchCatByBreed = breadId => {
  return axios
    .get(`${BASE_URL}/images/search?api_key=${MY_API}?breed_ids=${breadId}`)
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

export { fetchBreeds, fetchCatByBreed };
