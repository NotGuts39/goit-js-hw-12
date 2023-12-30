import{S as h,i as c,a as f}from"./assets/vendor-56025df1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const d=new h(".gallery a",{captionsData:"alt",captionDelay:250}),p=document.getElementById("loader"),g=document.getElementById("imageGallery"),a=document.getElementById("loadMoreButton");let l=1;function u(){p.style.display="block"}function m(){p.style.display="none"}async function y(s,t=1){const n=`https://pixabay.com/api/?key=41282731-c9c58555d497b62011b46ee39&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=40`;try{return(await f.get(n)).data}catch(e){throw e}}document.getElementById("searchForm").addEventListener("submit",async function(s){s.preventDefault();const t=document.getElementById("searchInput").value.trim();if(!t){c.error({title:"Error",message:"Sorry, the text input field is empty. Please try again.",position:"topCenter"});return}try{u();const o=await y(t);if(m(),o.hits.length>0){const n=o.hits.map(e=>`
                <a href="${e.largeImageURL}" data-lightbox="image-gallery" class="image-card">
                    <img src="${e.webformatURL}" alt="${e.tags}">
                    <div class="image-details">
                        <p><strong>Likes:</strong> ${e.likes}</p>
                        <p><strong>Views:</strong> ${e.views}</p>
                        <p><strong>Comments:</strong> ${e.comments}</p>
                        <p><strong>Downloads:</strong> ${e.downloads}</p>
                    </div>
                </a>
            `).join("");g.innerHTML=n,d.refresh(),a.style.display="block",a.addEventListener("click",L)}else c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topCenter"})}catch(o){console.error("Error:",o)}});async function L(){try{a.style.display="none",u(),l++;const s=document.getElementById("searchInput").value.trim(),t=await y(s,l);if(m(),t.hits.length>0){const o=t.hits.map(e=>`
                <a href="${e.largeImageURL}" data-lightbox="image-gallery" class="image-card">
                    <img src="${e.webformatURL}" alt="${e.tags}">
                    <div class="image-details">
                        <p><strong>Likes:</strong> ${e.likes}</p>
                        <p><strong>Views:</strong> ${e.views}</p>
                        <p><strong>Comments:</strong> ${e.comments}</p>
                        <p><strong>Downloads:</strong> ${e.downloads}</p>
                    </div>
                </a>
            `).join("");g.innerHTML+=o,d.refresh();const n=document.querySelector(".image-card").getBoundingClientRect().height;window.scrollBy({top:2*n,behavior:"smooth"})}t.totalHits>l*40?a.style.display="block":(a.style.display="none",c.info({title:"End of Search Results",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}))}catch(s){console.error("Error:",s)}}
//# sourceMappingURL=commonHelpers.js.map
