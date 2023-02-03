import {ref, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
import {storage} from "./firebase.js"
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
function formatBytes(t,B=2){
     if(!+t) return"0 Bytes";
     const o=B<0?0:B,
     a=Math.floor(Math.log(t)/Math.log(1024));
     return`${parseFloat((t/Math.pow(1024,a)).toFixed(o))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}`
}
function lazyCss(e) {const t = document.createElement("link");t.href = e, t.rel = "stylesheet"; t.type = "text/css";document.getElementsByTagName("head")[0].appendChild(t);};
function lazyJS(e){const t = document.createElement("script");t.src = e;t.defer = true; t.type="module"; document.body.appendChild(t)}
function downloadFile(file){getDownloadURL(ref(storage, file)).then(url => {const link = document.createElement("a");link.href = url;link.download = "";link.click();}).catch((error) => console.error(error));}
const downloadWallpaper = (file) => getDownloadURL(ref(storage, file)).then(url => window.open(url)).catch((error) => console.error(error));
function getFileInfo(file, index){
     const fileInfoRef = ref(storage, file);
     getMetadata(fileInfoRef).then(data => {
          const sizeDisplay = document.querySelectorAll("#size"),
          dateDisplay = document.querySelectorAll("#updated");
          sizeDisplay[index].innerHTML = formatBytes(data.size);
          dateDisplay[index].innerHTML = data.updated.slice(0,10);
     }).catch((error) => console.error(error));
}
function getWallpaperInfo(f,i){const fileInfoRef = ref(storage, f);getMetadata(fileInfoRef).then(data => {const wallpaperSizeDisplay = document.querySelectorAll("#fileSize");wallpaperSizeDisplay[i].innerHTML = formatBytes(data.size);}).catch((error) => console.error(error));}
export {
     displayCards,
     lazyCss,
     lazyJS,
     downloadFile,
     downloadWallpaper,
     getFileInfo,
     getWallpaperInfo,
}