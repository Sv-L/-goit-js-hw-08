import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryListEl = document.querySelector('.gallery');

const createGalleryItems = galleryItems
  .map(
    galleryItem => `
    <li class='gallery__item'>
        <a class='gallery__link'
            href='${galleryItem.original}' >
                <img class='gallery__image'
                    src='${galleryItem.preview}' 
                    alt='${galleryItem.description}'
                 />
        </a>
    </li>`
  )
  .join('');

galleryListEl.insertAdjacentHTML('afterbegin', createGalleryItems);

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
