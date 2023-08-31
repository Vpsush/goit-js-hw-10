import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const err = document.querySelector('.error');
const info = document.querySelector('.cat-info');

loader.classList.replace('is-hidden', 'loader');
info.classList.add('is-hidden');
err.classList.add('is-hidden');

breed.addEventListener('change', selectByBreed);

function selectByBreed(event) {
  loader.classList.replace('is-hidden', 'loader');
  info.classList.add('is-hidden');
  // error.classList.add('is-hidden');
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.add('is-hidden', 'loader');
      info.classList.remove('is-hidden');
      const { url, breeds } = data[0];
      const markPictures = `<img class = "images" src="${url}" alt="${breeds[0].name}"/>`;
      const markDescription = `<img class = "images" src="${url}" alt="${breeds[0].name}"/>
      <div class = "allInfo">
      <h2 class= "title">${breeds[0].name}</h2>
      <p class="description">${breeds[0].description}</p>
      <div class = "tempContainer">
      <h3 class = "titleTemp">Temperament:</h3>
      <p class="temperament">${breeds[0].temperament}</p></div></div>`;
      info.innerHTML = markPictures;
      info.innerHTML = markDescription;
    })
    .catch(error => {
      // console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      err.classList.remove('is-hidden');
      info.classList.remove('is-hidden');
    });
}

let arrayBreeds = [];
fetchBreeds()
  .then(data => {
    breed.classList.remove('is-hidden');
    loader.classList.replace('is-hidden', 'loader');
    data.forEach(element => {
      arrayBreeds.push({ text: element.name, value: element.id });
    });

    new SlimSelect({
      select: breed,
      data: arrayBreeds,
    });
  })
  .catch(error => {
    loader.classList.add('is-hidden');
    // breed.classList.remove('is-hidden');
    err.classList.remove('is-hidden');
    // console.log(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

// function onFetchError(error) {
//   return Notify.failure(
//     'Oops! Something went wrong! Try reloading the page or select another cat breed!'
//   );
// }
