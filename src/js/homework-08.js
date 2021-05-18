//  1. Імпортуємо  масив об/єктів з gallery-items.js
//  2. Створюємо об/єкт зі змінними з розмітки - refs
//  3. Створюємо саму функцію по створенні розмітки за допомогою шаблонних строк
//  4. Добавити створену розмітку в список
//  5. Повісити слухачів подій на відкриття картинки і на закриття модалки
//  6. Створити змінну для об/єкту-списку необхідних функцій
//  7. Написати функції для виконання потрібних дій

import galleryItemsObj from '../gallery-items.js';

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
}

const markupGalleryList = makeMarkup(galleryItemsObj);
refs.galleryList.insertAdjacentHTML('beforeend', markupGalleryList);

const actionWithGallery = {
    makeMarkup,
    onImageOpenBig,
    onCloseLightbox,
    onEscButtonPress,
    getArrayOfImageHref,
    onArrowButtonPress,
}

refs.galleryList.addEventListener('click', onImageOpenBig)
refs.lightbox.addEventListener('click', onCloseLightbox)


function makeMarkup(array) {
    const markup = array.map(({ original, preview, description }) => {
        return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li> 
  `}).join('')
    return markup;
};
 
function onImageOpenBig(evt) {
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    };

    evt.preventDefault();
    window.addEventListener('keydown', onEscButtonPress)
    window.addEventListener('keydown', onArrowButtonPress)
    refs.lightbox.classList.add('is-open');
    refs.lightboxImage.src = evt.target.dataset.source;
};

function onCloseLightbox(evt) {
    if (evt.target.dataset.action === "close-lightbox" || evt.target.classList.value === "lightbox__overlay" || evt.code === 'Escape') {
        refs.lightbox.classList.remove('is-open');
        refs.lightboxImage.src = "";
        window.removeEventListener('keydown', onEscButtonPress)
        window.removeEventListener('keydown', onArrowButtonPress)
    }
}

function onEscButtonPress(evt) {
    if (evt.code === 'Escape') {
        refs.lightbox.classList.remove('is-open');
        refs.lightboxImage.src = "";
        window.removeEventListener('keydown', onEscButtonPress)
        window.removeEventListener('keydown', onArrowButtonPress)
    }
}

function getArrayOfImageHref(arr) {
    const arrayOfImgHref = arr.map(a => a.original);
    return arrayOfImgHref;
}

function onArrowButtonPress(evt) {
    const arrayOfHref = getArrayOfImageHref(galleryItemsObj);
    let indexInArray = arrayOfHref.indexOf(refs.lightboxImage.src);
    
    if (evt.code === 'ArrowLeft' && indexInArray === 0) {
        refs.lightboxImage.src = arrayOfHref[arrayOfHref.length - 1];
    }
    else if (evt.code === 'ArrowRight' && indexInArray === arrayOfHref.length - 1) {
        refs.lightboxImage.src = arrayOfHref[0];
    }
    else if (evt.code === 'ArrowRight' || evt.code === 'ArrowLeft') {

        evt.code === 'ArrowLeft'
            ? refs.lightboxImage.src = arrayOfHref[indexInArray - 1]
            : refs.lightboxImage.src = arrayOfHref[indexInArray + 1];
    }
    }