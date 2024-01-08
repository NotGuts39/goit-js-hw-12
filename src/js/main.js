import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";


const simpleLightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250,
                });

const loader = document.getElementById('loader');
const imageGallery = document.getElementById('imageGallery');
const loadMoreButton = document.getElementById('loadMoreButton');
let currentPage = 1;
let isNewSearch = false;



function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function clearGallery() {
        imageGallery.innerHTML = '';
}
    




async function searchImages(searchInput, page = 1) {
    const apiKey = '41282731-c9c58555d497b62011b46ee39';
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
    


    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
}

document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.trim();
loadMoreButton.style.display = 'none';
    

    if (!searchInput) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry, the text input field is empty. Please try again.',
            position: 'topCenter',
        });
        return;
    }

    

     currentPage = 1;

    try {
        showLoader();
        const { hits, totalHits } = await searchImages(searchInput);

        hideLoader();
        clearGallery()
        

        if (hits.length > 0) {
            const imageCardsHTML = hits.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => `
                <a href="${largeImageURL}" data-lightbox="image-gallery" class="image-card">
                    <img src="${webformatURL}" alt="${tags}">
                    <div class="image-details">
                        <p><strong>Likes:</strong> ${likes}</p>
                        <p><strong>Views:</strong> ${views}</p>
                        <p><strong>Comments:</strong> ${comments}</p>
                        <p><strong>Downloads:</strong> ${downloads}</p>
                    </div>
                </a>
            `).join('');

            imageGallery.insertAdjacentHTML('beforeend', imageCardsHTML);
            simpleLightbox.refresh();
            
           
            if(totalHits > currentPage * 40 && hits.length >= 40)
{
            loadMoreButton.style.display = 'block';
            loadMoreButton.addEventListener('click', loadMoreImages);  }
            
        }
        
        else {
            loadMoreButton.style.display = 'none';

            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again.',
                position: 'topCenter',
            });
            
        }
    }
        catch (error) {
        console.error('Error:', error);
    }

        
}  );

async function loadMoreImages() {
    try {

        loadMoreButton.style.display = 'none';
        showLoader();
        currentPage++;
        const searchInput = document.getElementById('searchInput').value.trim();
        const { hits, totalHits } = await searchImages(searchInput, currentPage);

        hideLoader();

        if (hits.length > 0) {
            const imageCardsHTML = hits.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => `
                <a href="${largeImageURL}" data-lightbox="image-gallery" class="image-card">
                    <img src="${webformatURL}" alt="${tags}">
                    <div class="image-details">
                        <p><strong>Likes:</strong> ${likes}</p>
                        <p><strong>Views:</strong> ${views}</p>
                        <p><strong>Comments:</strong> ${comments}</p>
                        <p><strong>Downloads:</strong> ${downloads}</p>
                    </div>
                </a>
            `).join('');

            
            imageGallery.insertAdjacentHTML('beforeend', imageCardsHTML);
            simpleLightbox.refresh();

             const cardHeight = document.querySelector('.image-card').getBoundingClientRect().height;
            
             window.scrollBy({
                top: 4 * cardHeight,
                behavior: 'smooth'
            });
        }

         if (totalHits > currentPage * 40 && hits.length >= 40) {
                
            loadMoreButton.style.display = 'block';
         }
          else {
               
             loadMoreButton.style.display = 'none';
             
                iziToast.info({
                    title: 'End of Search Results',
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topCenter',
                });
            }
    }
    
    catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('searchForm').addEventListener('submit', function () {
    isNewSearch = true;
});