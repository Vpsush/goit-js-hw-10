import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix';

axios.defaults.headers.common['x-api-key'] = 'api-key';

const breed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const info = document.querySelector('.cat-info');

breed.addEventListener('change', selectByBreed);

function selectByBreed(event) {
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      info.innerHTML = `img src="${url}" alt="${breeds[0].name}"`;
    })
    .catch(onFetchError);
}

let arrayBreeds = [];
fetchBreeds()
  .then(date => {
    date.forEach(element => {
      arrayBreeds.push({ text: element.name, value: element.id });
      return arrayBreeds;
    });

    new SlimSelect({
      select: breed,
      date: arrayBreeds,
    });
  })
  .catch(onFetchError);

function onFetchError(error) {
  return Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}
