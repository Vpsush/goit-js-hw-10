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
  // const markPictures = `img class = catPictures img src="${breed.url}" alt="${breed.id}" width = "400"`;
  // const markDescription = `class = catDescription-title <h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
  // <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
  // <p class="cat-info-desc-temp"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
  // info.innerHTML('beforeend', markPictures);
  // info.innerHTML('beforeend', markDescription);
  fetchCatByBreed(breedId)
    .then(data => {
      const { BASE_URL, breedId } = data[0];
      info.innerHTML(
        'beforeend',
        `class = images img src="${BASE_URL}" alt="${breedId}"`
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
