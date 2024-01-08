import{S as E,i as u,a as v}from"./assets/vendor-56025df1.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const h=new E(".gallery a",{captionsData:"alt",captionDelay:250}),f=document.getElementById("loader"),y=document.getElementById("imageGallery"),i=document.getElementById("loadMoreButton");let l=1;function b(){f.style.display="block"}function L(){f.style.display="none"}function I(){y.innerHTML=""}async function $(n,r=1){const s=`https://pixabay.com/api/?key=41282731-c9c58555d497b62011b46ee39&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=40`;try{return(await v.get(s)).data}catch(e){throw e}}document.getElementById("searchForm").addEventListener("submit",async function(n){n.preventDefault();const r=document.getElementById("searchInput").value.trim();if(i.style.display="none",!r){u.error({title:"Error",message:"Sorry, the text input field is empty. Please try again.",position:"topCenter"});return}l=1;try{b();const{hits:o,totalHits:s}=await $(r);if(L(),I(),o.length>0){const e=o.map(({largeImageURL:t,webformatURL:a,tags:c,likes:d,views:g,comments:p,downloads:m})=>`
                <a href="${t}" data-lightbox="image-gallery" class="image-card">
                    <img src="${a}" alt="${c}">
                    <div class="image-details">
                        <p><strong>Likes:</strong> ${d}</p>
                        <p><strong>Views:</strong> ${g}</p>
                        <p><strong>Comments:</strong> ${p}</p>
                        <p><strong>Downloads:</strong> ${m}</p>
                    </div>
                </a>
            `).join("");y.insertAdjacentHTML("beforeend",e),h.refresh(),s>l*40&&o.length>=40&&(i.style.display="block",i.addEventListener("click",w))}else i.style.display="none",u.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topCenter"})}catch(o){console.error("Error:",o)}});async function w(){try{i.style.display="none",b(),l++;const n=document.getElementById("searchInput").value.trim(),{hits:r,totalHits:o}=await $(n,l);if(L(),r.length>0){const s=r.map(({largeImageURL:t,webformatURL:a,tags:c,likes:d,views:g,comments:p,downloads:m})=>`
                <a href="${t}" data-lightbox="image-gallery" class="image-card">
                    <img src="${a}" alt="${c}">
                    <div class="image-details">
                        <p><strong>Likes:</strong> ${d}</p>
                        <p><strong>Views:</strong> ${g}</p>
                        <p><strong>Comments:</strong> ${p}</p>
                        <p><strong>Downloads:</strong> ${m}</p>
                    </div>
                </a>
            `).join("");y.insertAdjacentHTML("beforeend",s),h.refresh();const e=document.querySelector(".image-card").getBoundingClientRect().height;window.scrollBy({top:4*e,behavior:"smooth"})}o>l*40&&r.length>=40?i.style.display="block":(i.style.display="none",u.info({title:"End of Search Results",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}))}catch(n){console.error("Error:",n)}}document.getElementById("searchForm").addEventListener("submit",function(){});
//# sourceMappingURL=commonHelpers.js.map
