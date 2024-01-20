import {ref, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";import {storage} from "./firebase.js";
import {answers, downloads, otherDownloads} from "./data.js";
const downloadsContainer = document.getElementById("downloadsCards");
const displayCards = (cards,cardList) =>cards.forEach((card,i)=>{const el = document.createElement("div");
     const hasDropDown = card.files && !!card.files.length;
     el.className = hasDropDown ? "grid-item dropdown" : "grid-item";
     el.setAttribute("data-item", card.category);el.setAttribute("data-index", i);
     if(card.filePath) el.setAttribute("data-file-path", card.filePath);
     const downloadBtn = hasDropDown ? `<select name="dropdown" class="card-btn selection">
          <option disabled selected class="defaultOpt">Version / Type</option>
          ${card.files.map((file=>`<option value="${file.file}" id="${file.id}">${file.name}</option>`)).join('')}
     </select><button class="card-btn icon" disabled aria-label="Download"><img src="files/icons/download.svg" alt="" width="30" height="30" loading="lazy"></button>` : `<button class="card-btn"${card.filePath ? ` data-file-path="${card.filePath}"` : ""}><img src="files/icons/download.svg" alt="" width="30" height="30" loading="lazy">Download</button>`;
     el.innerHTML = `<div class="card" style="${card.style}">
          <div class="card-content">
               <h2 class="card-title">${card.title}</h2>
               <p class="card-body">
                    Size: <span id="size"></span><br>
                    Date Modified: <span id="updated"></span>
               </p>
               <div class="buttons">${downloadBtn}</div>
          </div>
     </div>`;cardList.appendChild(el);
});
const displayOther = (cards,cardList) =>cards.forEach((card,i)=>{const el = document.createElement("div");
     el.className = "grid-item";el.setAttribute("data-item", card.category);
     el.setAttribute("data-index", i);el.setAttribute("data-url", card.filePath);
     el.setAttribute("data-fileName", card.fileName)
     el.innerHTML = `<div class="card" style="${card.style}">
          <div class="card-content">
               <h2 class="card-title">${card.title}</h2>
               <p class="card-body">Size: <span id="size2"></span><br>Date Modified: <span id="updated2"></span></p>
               <button class="card-btn" data-file-path="${card.filePath}"><img src="files/icons/download.svg" alt="" width="30" height="30" loading="lazy">Download</button>
          </div>
     </div>`;cardList.appendChild(el);
});
const addFAQs = () => answers.forEach((answer,i)=>{
     const el = document.createElement("div");
     el.className = "accordion-item";
     el.id = `q${i+1}`;el.innerHTML = `
     <a class="accordion-link" href="#q${i+1}">${answer.q} <img class="add-icon" src="files/icons/add.svg" width="25" height="25" alt="add" loading="lazy"><img class="remove-icon" src="files/icons/minus.svg" width="25" height="25" alt="remove" loading="lazy"></a>
     <div class="answer"><p>${answer.a}</p></div>`;
     document.querySelector(".accordion").append(el)
})
export const removeMode = () => document.querySelector("link[href='css/dark-mode.css']").remove();
function formatBytes(t,B=2){if(!+t)return"0 Bytes";const o=B<0?0:B,a=Math.floor(Math.log(t)/Math.log(1024));return`${parseFloat((t/Math.pow(1024,a)).toFixed(o))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}`}
export function lazyCss(e) {const t=document.createElement("link");t.href=e,t.rel="stylesheet";document.getElementsByTagName("head")[0].appendChild(t);}
function lazyJS(e){const t=document.createElement("script");t.src=e;t.type="module";document.body.appendChild(t);}
export function downloadFile(o,e){e.src="files/icons/downloading.svg",getDownloadURL(ref(storage,o)).then((o=>{const s=document.createElement("a");s.href=o,s.download="",s.click(),e.src="files/icons/download-done.svg",setTimeout((()=>e.src="files/icons/download.svg"),2e3)})).catch((o=>{e.src="files/icons/error-icon.svg",setTimeout((()=>e.src="files/icons/download.svg"),2e3)}))}
export const downloadWallpaper=file=>getDownloadURL(ref(storage,file)).then(url=>window.open(url)).catch((err) => console.error(err));
export function getFileInfo(file,i){const fileRef=ref(storage,file);getMetadata(fileRef).then(d=>{const sizeDisplay=document.querySelectorAll("#size"),dateDisplay=document.querySelectorAll("#updated");sizeDisplay[i].innerHTML=formatBytes(d.size);dateDisplay[i].innerHTML=d.updated.slice(0,10);}).catch(err=>console.error(err));}
export function getFileInfoURL(file,i){const fileRef=ref(storage,file);getMetadata(fileRef).then(d=>{const sizeDisplay=document.querySelectorAll("#size2"),dateDisplay=document.querySelectorAll("#updated2");sizeDisplay[i].innerHTML=formatBytes(d.size);dateDisplay[i].innerHTML=d.updated.slice(0,10);}).catch(err=>console.error(err));}
export function getWallpaperInfo(file){const fileInfoRef = ref(storage, file);getMetadata(fileInfoRef).then(data => {const wallpaperSizeDisplay = document.querySelector("#fileSize");wallpaperSizeDisplay.innerHTML = formatBytes(data.size);}).catch((error) => console.error(error));}
export function changeWallpaper(img){const image = `files/wallpaperImg/coding${img}.webp`,preview = document.getElementById("preview-img");preview.src = image;return img;}
export function changeSize(e, img){const filePath = `wallpapers/coding${img}/${e.target.value}.png`;getWallpaperInfo(filePath, img);}
export function changeSizeBasedOn(size, img){const filePath = `wallpapers/coding${img}/${size}.png`;getWallpaperInfo(filePath, img);}
export function toggleActive(toggler,menu){toggler.classList.toggle("active"); menu.classList.toggle("active");}
export function closeMenu(toggler,menu){toggler.classList.remove("active"); menu.classList.remove("active");}
export function toggleMode(toggler){document.body.classList.toggle("dark");if(!document.body.classList.contains("dark")){toggler.querySelector("img").src = "files/icons/light.svg";localStorage.setItem("arsentech-theme", "light");removeMode()} else {toggler.querySelector("img").src = "files/icons/dark.svg";localStorage.setItem("arsentech-theme", "dark");lazyCss("css/dark-mode.css");}}
export function init(){
     lazyCss("css/dark-mode.css");
     displayOther(otherDownloads,downloadsContainer);displayCards(downloads,downloadsContainer);
     addFAQs();lazyJS("js/firebase.js");
     lazyCss("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;700&display=swap");
}