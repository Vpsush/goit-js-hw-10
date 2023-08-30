import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

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
      // const markPictures = `<img class = images img src="${breed.url}" alt="${breed.id}"/>`;
      // const markDescription = `<h2 class= title>${breed.breeds[0].name}</h2><p class=description>${breed.breeds[0].description}</p><img class = images img src="${url}" alt="${breeds[0].name}"/>`;
      info.insertAdjacentHTML(
        'beforebegin',
        `<img class = images img src="${url}" alt="${breeds[0].name}"/>`
      );
      info.insertAdjacentHTML(
        'beforebegin',
        `<h2 class= title>${breed.breeds[0].name}</h2><p class=description>${breed.breeds[0].description}</p><img class = images img src="${url}" alt="${breeds[0].name}"/>`
      );
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

let arrayBreeds = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrayBreeds.push({ text: element.name, value: element.id });
    });

    new SlimSelect({
      select: breed,
      data: arrayBreeds,
    });
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

// function onFetchError(error) {
//   return Notify.failure(
//     'Oops! Something went wrong! Try reloading the page or select another cat breed!'
//   );
// }
