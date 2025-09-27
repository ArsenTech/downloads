const downloadsContainer = document.getElementById("downloadsCards");
const displayCards = (cards,cardList) =>cards.forEach((card,i)=>{const el = document.createElement("div");
     const hasDropDown = card.files && !!card.files.length;
     el.className = hasDropDown ? "grid-item dropdown" : "grid-item";
     el.setAttribute("data-item", card.category);
     el.setAttribute("data-type",card.type)
     const downloadBtn = hasDropDown ? `<select name="dropdown" class="card-btn selection" aria-label="${card.title}">
          <option disabled selected class="defaultOpt">Version / Type</option>
          ${card.files.map((file=>`<option value="${file.pathName}${file.isRelease ? "-release" : ""}">${file.name}</option>`)).join('')}
     </select><button class="card-btn icon" disabled aria-label="Download"><img src="files/icons/download.svg" alt="" width="30" height="30" loading="lazy"></button>` : card.type==="external" ? `<a href="${card.pathName}" class="card-btn"><img src="files/icons/launch.svg" alt="" width="30" height="30" loading="lazy">Download</a>` : `<button class="card-btn"${card.pathName ? ` data-file-path="${card.pathName}${card.isRelease ? "-release" : ""}"` : ""} data-type="${card.type}"><img src="files/icons/download.svg" alt="" width="30" height="30" loading="lazy">Download</button>`;
     el.innerHTML = `<div class="card" style="${card.style}">
          <div class="card-content">
               <h2 class="card-title">${card.title}</h2>
               <p class="card-body">${card.description}</p>
               <div class="buttons">${downloadBtn}</div>
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
const addSelectOptions = (select,data,name) => {
     const defaultOption = document.createElement("option");
     defaultOption.disabled = true;
     defaultOption.selected = true;
     defaultOption.className = "defaultOpt";
     defaultOption.textContent = `-- Choose a ${name} --`
     select.appendChild(defaultOption);
     for(const groupName in data){
          const optgroup = document.createElement("optgroup");
          optgroup.label = groupName;
          data[groupName].forEach(opt=>{
               const option = document.createElement("option");
               option.value = opt.value;
               option.textContent = opt.text;
               optgroup.appendChild(option)
          })
          select.appendChild(optgroup)
     }
}
const removeMode = () => document.querySelector("link[href='css/dark-mode.css']").remove();
function formatBytes(t,B=2){if(!+t)return"0 Bytes";const o=B<0?0:B,a=Math.floor(Math.log(t)/Math.log(1024));return`${parseFloat((t/Math.pow(1024,a)).toFixed(o))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}`}
function lazyCss(e) {const t=document.createElement("link");t.href=e,t.rel="stylesheet";document.getElementsByTagName("head")[0].appendChild(t);}
function downloadFile(e,o,s){if("external"===s)return;const n=e.endsWith("-release"),l=e.replace("-release",""),d=document.createElement("a");d.href=n?`https://github.com/ArsenTech/downloads-files/releases/download/${l}`:`https://github.com/ArsenTech/downloads-files/raw/refs/heads/main/${l}`,d.download=l,d.click(),d.remove(),o.src="files/icons/download-done.svg",setTimeout((()=>{o.src="files/icons/download.svg"}),2e3)}
async function getWallpaperInfo(e){const t=document.querySelector("#fileSize"),n=await fetch(encodeURI(e),{method:"HEAD"}),o=parseInt(n.headers.get("Content-Length"));t.innerHTML=formatBytes(o||0)}function changeWallpaper(img){const image = `files/wallpaperImg/coding${img}.webp`,preview = document.getElementById("preview-img");preview.src = image;return img;}
function changeSize(size, img){const filePath = `https://raw.githubusercontent.com/ArsenTech/downloads/refs/heads/wallpapers/coding${img}/${size.replace("x", " x ")}.png`;getWallpaperInfo(filePath);}
function toggleActive(toggler,menu){toggler.classList.toggle("active"); menu.classList.toggle("active");}
function closeMenu(toggler,menu){toggler.classList.remove("active"); menu.classList.remove("active");}
function toggleMode(toggler){document.body.classList.toggle("dark");if(!document.body.classList.contains("dark")){toggler.querySelector("img").src = "files/icons/light.svg";localStorage.setItem("arsentech-theme", "light");removeMode()} else {toggler.querySelector("img").src = "files/icons/dark.svg";localStorage.setItem("arsentech-theme", "dark");lazyCss("css/dark-mode.css");}}
function isChristmas() {
     const today = new Date();
     const month = today.getMonth() + 1;
     const day = today.getDate();
     return (month === 12 && day >= 1) || (month === 1 && day <= 8);
}
function init(){
     lazyCss("css/dark-mode.css");
     displayCards(downloads,downloadsContainer);addFAQs();
     lazyCss("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;700&display=swap");
     addSelectOptions(document.getElementById("wallpaper-opt"),wallpapers,"Wallpaper");
     addSelectOptions(document.getElementById("size-opt"),screenResolutions,"Size");
     document.body.classList[isChristmas() ? "add" : "remove"]("christmas")
}