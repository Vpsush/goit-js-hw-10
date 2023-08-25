import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] = 'api-key';

const breed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const info = document.querySelector('.cat-info');

function selectByBreed(event) {
  const breedId = event.currentTarget.value;
}

let arrayBreeds = [];
fetchBreeds().then(date => {
  date.forEach(element => {
    arrayBreeds.push(element.breed);
  });
});

fetchCatByBreed().then(data => {});
