import {ref, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
import {storage} from "./firebase.js";
const displayCards = (cards,cardList) =>cards.forEach((card,i)=>{
     const el = document.createElement("div");
     el.classList.add("grid-item");el.setAttribute("data-item", card.category);
     el.setAttribute("data-index", i);el.setAttribute("data-file-path", card.filePath);
     el.innerHTML = `<div class="card" style="${card.style}">
          <div class="card-content">
               <h2 class="card-title">${card.title}</h2>
               <p class="card-body">
                    Size: <span id="size"></span><br>
                    Date Modified: <span id="updated"></span>
               </p>
               <button class="card-btn" data-file-path="${card.filePath}"><img src="files/icons/download.svg" alt="download" width="30" height="30" loading="lazy">Download</button>
          </div>
     </div>`;
     cardList.appendChild(el);
})
function formatBytes(t,B=2){if(!+t)return"0 Bytes";const o=B<0?0:B,a=Math.floor(Math.log(t)/Math.log(1024));return`${parseFloat((t/Math.pow(1024,a)).toFixed(o))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}`}
function lazyCss(e) {const t=document.createElement("link");t.href=e,t.rel="stylesheet";t.type="text/css";document.getElementsByTagName("head")[0].appendChild(t);}
function lazyJS(e,m="async"){
     const t=document.createElement("script");
     t.src=e;
     if(m==="async") t.async=true;
     else t.defer = true;
     t.type="module";
     document.body.appendChild(t);
}
function downloadFile(file,icon){icon.src = 'files/icons/downloading.svg';getDownloadURL(ref(storage,file)).then(url=>{const link=document.createElement("a");link.href=url;link.download="";link.click();icon.src = 'files/icons/download-done.svg';setTimeout(()=>icon.src='files/icons/download.svg',2000);}).catch((err)=>console.error(err));}
const downloadWallpaper=(file)=>getDownloadURL(ref(storage,file)).then(url=>window.open(url)).catch((err) => console.error(err));
function getFileInfo(file,i){const fileRef=ref(storage,file);getMetadata(fileRef).then(d=>{const sizeDisplay=document.querySelectorAll("#size"),dateDisplay=document.querySelectorAll("#updated");sizeDisplay[i].innerHTML=formatBytes(d.size);dateDisplay[i].innerHTML=d.updated.slice(0,10);}).catch((err)=>console.error(err));}
function getWallpaperInfo(file){const fileInfoRef = ref(storage, file);getMetadata(fileInfoRef).then(data => {const wallpaperSizeDisplay = document.querySelector("#fileSize");wallpaperSizeDisplay.innerHTML = formatBytes(data.size);}).catch((error) => console.error(error));}
function changeWallpaper(img){const image = `files/wallpaperImg/coding${img}.webp`,preview = document.getElementById("preview-img");preview.src = image;return img;}
function changeSize(e, img){const filePath = `wallpapers/coding${img}/${e.target.value}.png`;getWallpaperInfo(filePath, img);}
function changeSizeBasedOn(size, img){const filePath = `wallpapers/coding${img}/${size}.png`;getWallpaperInfo(filePath, img);}
function toggleActive(toggler,menu){toggler.classList.toggle("active"); menu.classList.toggle("active");}
function closeMenu(toggler,menu){toggler.classList.remove("active"); menu.classList.remove("active");}
function toggleMode(toggler){document.body.classList.toggle("dark");if(!document.body.classList.contains("dark")){toggler.querySelector("img").src = "files/icons/light.svg";localStorage.setItem("arsentech-theme", "light");} else {toggler.querySelector("img").src = "files/icons/dark.svg";localStorage.setItem("arsentech-theme", "dark");}}
export {displayCards,lazyCss,lazyJS,downloadFile,downloadWallpaper,getFileInfo,getWallpaperInfo,changeSize,changeWallpaper,changeSizeBasedOn,toggleActive,closeMenu,toggleMode}