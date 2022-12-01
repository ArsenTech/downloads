import {ref, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
import {storage} from "./firebase.js"
import { downloads } from "./data.js";
const navbar = document.querySelector( ".navbar" ),
      toggler = document.querySelector( ".menu-toggler" ),
      navMenu = document.querySelector( ".navbar-menu" ),
      downloadsContainer = document.getElementById("downloadsCards"),
      tabs = document.querySelectorAll(".tab-card .tab-content .tab"),
      tabHeaderBtns = document.querySelectorAll(".tab-card .tab-header .tab-link"),
      downloadOptions = document.querySelectorAll(".download-options"),
      allStar = document.querySelectorAll(".rating .star"),
      ratingValue = document.getElementById("rating"),
      ratingError = document.querySelector(".ratingError"),
      contactForm = document.querySelector(".contact-form");
lazyCss("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;700&display=swap");
lazyJS("js/firebase.js")
displayCards(downloads, downloadsContainer);
window.addEventListener("scroll", () => window.scrollY > 20 ? navbar.classList.add( "sticky" ) : navbar.classList.remove( "sticky" )) ;
toggler.addEventListener("click",  () => {toggler.classList.toggle( "active" );navMenu.classList.toggle( "active" )});
document.getElementById("yearCount").innerHTML=(new Date).getFullYear();
function lazyCss(e) {const t = document.createElement("link");t.href = e, t.rel = "stylesheet", t.type = "text/css", document.getElementsByTagName("head")[0].appendChild(t)};
function lazyJS(e){const t = document.createElement("script");t.src = e, t.defer = true, t.type="module", document.body.appendChild(t)}
function downloadFile(file){
     getDownloadURL(ref(storage, file)).then(url => {
       const link = document.createElement("a");
       link.href = url;
       link.download = "";
       document.body.appendChild(link);
       link.click()
       document.body.removeChild(link)
     }).catch((error) => console.error(error));
}
const downloadWallpaper = (file) => getDownloadURL(ref(storage, file)).then(url => window.open(url)).catch((error) => console.error(error));
function formatBytes(t,B=2){if(!+t)return"0 Bytes";const o=B<0?0:B,a=Math.floor(Math.log(t)/Math.log(1024));return`${parseFloat((t/Math.pow(1024,a)).toFixed(o))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}`}
function getFileInfo(file, index){
     const fileInfoRef = ref(storage, file);
     getMetadata(fileInfoRef)
     .then(metadata => {
          const sizeDisplay = document.querySelectorAll("#size");
          const dateDisplay = document.querySelectorAll("#updated");
          sizeDisplay[index].innerHTML = formatBytes(metadata.size);
          dateDisplay[index].innerHTML = metadata.updated.slice(0,10);
     })
     .catch((error) => console.error(error));
}
function getWallpaperInfo(f,i){
     const fileInfoRef = ref(storage, f);
     getMetadata(fileInfoRef)
     .then(metadata => {
          const wallpaperSizeDisplay = document.querySelectorAll("#fileSize");
          wallpaperSizeDisplay[i].innerHTML = formatBytes(metadata.size);
     })
     .catch((error) => console.error(error));
}
function displayCards(cards, cardList){
     cardList.innerHTML = cards.map((card, index)=>{
          return `
          <div class="grid-item" data-item="${card.category}" data-index="${index}" data-file-path="${card.filePath}">
               <div class="card" style="${card.style}">
                    <div class="card-content">
                             <h2 class="card-title">${card.title}</h2>
                         <p class="card-body">
                          Size: <span id="size"></span><br>
                          Date Modified: <span id="updated"></span>
                         </p>
                         <button class="card-btn" data-file-path="${card.filePath}">Download</button>
                    </div>
               </div>
          </div>
          `
     }).join("");
};
function handleSubmit(e, i){e.preventDefault();const ids = ["download-option1", "download-option2", "download-option3", "download-option4", "download-option5"];const selected = document.querySelectorAll(ids.map(id => `#${id}`).join(", "));const filePath = `wallpapers/coding${i}/${selected[i].value}.png`;downloadWallpaper(filePath);e.target.reset();}
function handleChange(e, i){const filePath = `wallpapers/coding${i}/${e.target.value}.png`;getWallpaperInfo(filePath, i)}
const downloadBtns = document.querySelectorAll(".card-btn"),cards = document.querySelectorAll(".grid-item"),list = document.querySelectorAll(".list");
cards.forEach(card => {const files = card.dataset.filePath,i = card.dataset.index;getFileInfo(files,i)})
list.forEach(el => {
     el.addEventListener("click", ()=>{
     for(let i=0; i<list.length; i++) list[i].classList.remove("active")
     el.classList.add("active");
     const dataFilter = el.dataset.filter;
     cards.forEach(card => {
          card.classList.remove("active");card.classList.add("hide");
          if(card.dataset.item == dataFilter || dataFilter == "all") {card.classList.remove("hide");card.classList.add("active");};
          });
     });
});
downloadBtns.forEach(el => {const filePath = el.dataset.filePath;el.addEventListener("click", ()=> downloadFile(filePath))})
tabHeaderBtns.forEach((tab, index)=>{
     tab.addEventListener("click", ()=>{
          tabs.forEach(content => content.classList.remove("active"));
          tabHeaderBtns.forEach(tab => tab.classList.remove("active"));
          tabs[index].classList.add("active");
          tabHeaderBtns[index].classList.add("active");
     });
});
downloadOptions.forEach((el, index) => {const ids = ["download-option1", "download-option2", "download-option3", "download-option4", "download-option5"];const opt = document.querySelectorAll(ids.map(id => `#${id}`).join(", "));opt[index].addEventListener("change", (e) => handleChange(e, index));el.addEventListener("submit", (e)=> handleSubmit(e, index));});
allStar.forEach((elem, idx)=>{
     elem.addEventListener("click", ()=> {
          let click = 0;
          ratingValue.value = idx+1
          allStar.forEach(el => {el.querySelector("iconify-icon").setAttribute("icon", "bi:star");el.classList.remove("active");});
          for (let i = 0; i < allStar.length; i++) {
               if(i <= idx){allStar[i].querySelector("iconify-icon").setAttribute("icon", "bi:star-fill");allStar[i].classList.add("active");} 
               else {allStar[i].style.setProperty("--i", click);click++;};
          };
     });
});
contactForm.addEventListener("submit", (e)=> {
     e.preventDefault();
     let isValid = false;
     if(ratingValue.value == 0){ratingError.innerHTML = "Required";isValid = false;} 
     else{ratingError.innerHTML = "";isValid = true;};
     if(isValid){contactForm.action = "https://formspree.io/f/mvodlpyz";contactForm.submit();e.target.reset()}
});