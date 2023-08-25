const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const MY_API =
  'live_EpLzqbh8m1FwM1nvu5fwtZDOYnKOUdux4wWBVsLNXpfE9odkAA85MkssjJOhQYTS';
export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key=${MY_API}`).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
export function fetchCatByBreed(breadId) {
  return fetch(
    `${BASE_URL}/images/search?breed_ids=${breadId}?api_key=${MY_API}`
  ).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
