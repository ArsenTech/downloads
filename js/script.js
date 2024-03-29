import {init,lazyCss,downloadFile,getFileInfo,changeWallpaper,changeSize,downloadWallpaper,changeSizeBasedOn,toggleActive,closeMenu,toggleMode, removeMode, getFileInfoURL} from "./functions.js";
const navbar = document.querySelector(".navbar"),
     toggler = document.querySelector(".menu-toggler"),modeToggler = document.querySelector("#icon"),
     navMenu = document.querySelector( ".navbar-menu" ),
     wallpaperOptions = document.querySelector("#wallpaper-opt"),sizeOptions = document.querySelector("#size-opt"),
     frmWallpaper = document.getElementById("wp-form"),btnWPDownload = document.querySelector(".btn-wp-download"),
     allStar = document.querySelectorAll(".rating .star"),
     ratingValue = document.getElementById("rating"),ratingError = document.querySelector(".ratingError"),
     contactForm = document.querySelector(".contact-form"),
     getMode = localStorage.getItem("arsentech-theme"),navLinks = document.querySelectorAll("#navLinks a"),
     frmSearch = document.querySelector(".search-container"),cancelSearchBtn = document.querySelector("#cancel-search");
let chosenImg,chosenSize,isSizeActive = false;
if(getMode && getMode === "dark") {document.body.classList.add("dark");modeToggler.querySelector("img").src = "files/icons/dark.svg";}init();
window.addEventListener("scroll", ()=>window.scrollY>20?navbar.classList.add("sticky"):navbar.classList.remove("sticky"));
toggler.addEventListener("click",()=> toggleActive(toggler,navMenu));modeToggler.addEventListener("click", ()=>toggleMode(modeToggler));
navLinks.forEach(link=>link.addEventListener("click", ()=>closeMenu(toggler,navMenu)));
document.getElementById("yearCount").innerHTML=new Date().getFullYear();
const downloadBtns=document.querySelectorAll(".card-btn"),cards = document.querySelectorAll(".grid-item"),list = document.querySelectorAll(".list");
cards.forEach(card=>{const files = card.dataset.filePath,i = card.dataset.index, url = card.dataset.url;if(!card.classList.contains('dropdown')){if(files) getFileInfo(files,i);if(url) getFileInfoURL(url,i);}})
list.forEach(el=>el.addEventListener("click", ()=>{for(let i=0; i<list.length; i++) list[i].classList.remove("active");el.classList.add("active");const dataFilter = el.dataset.filter;cards.forEach(card => {card.classList.remove("active");card.classList.add("hide");if(card.dataset.item==dataFilter||dataFilter=="all"){card.classList.remove("hide");card.classList.add("active");}});}));
downloadBtns.forEach((e=>{let t;const a=e.parentElement.querySelector(".icon");if(e.classList.contains("selection")){const n=a.querySelector("img");e.addEventListener("change",(e=>{t=e.target.value;const n=parseInt(e.target?.closest("[data-index]").dataset.index);a.disabled=!1,getFileInfo(t,n),a.setAttribute("data-file-path",e.target.value)})),a.addEventListener("click",(()=>downloadFile(t,n)))}else{const a=e.querySelector("img");t=e.dataset.filePath,e.classList.contains("icon")||e.addEventListener("click",(()=>downloadFile(t,a)))}}));
wallpaperOptions.addEventListener("change",e=>{chosenImg = changeWallpaper(e.target.value);if(e.target.value) {isSizeActive = true;sizeOptions.removeAttribute("disabled")}if(e.target.value && chosenSize)changeSizeBasedOn(chosenSize,chosenImg-1)})
sizeOptions.addEventListener("change", e=>{if(isSizeActive){changeSize(e,chosenImg-1);btnWPDownload.removeAttribute("disabled");}if(isSizeActive && e.target.value !== "") chosenSize = e.target.value;})
frmWallpaper.addEventListener("submit",e=>{e.preventDefault();const filePath = `wallpapers/coding${chosenImg-1}/${frmWallpaper.optSize.value}.png`;downloadWallpaper(filePath);})
allStar.forEach((elem, id)=>elem.addEventListener("click", ()=> {
     let click = 0;ratingValue.value = id+1;
     allStar.forEach(el => {el.querySelector("img").src="files/icons/star.svg";el.classList.remove("active");});
     for (let i = 0; i < allStar.length; i++) {if(i <= id){allStar[i].querySelector("img").src="files/icons/star-fill.svg";allStar[i].classList.add("active");} else {allStar[i].style.setProperty("--i", click);click++;}}
}));
contactForm.addEventListener("submit", e=> {
     e.preventDefault();let isValid = false;
     if(ratingValue.value == 0){ratingError.innerHTML = "Required";isValid = false;}else{ratingError.innerHTML = "";isValid = true;}
     if(isValid){contactForm.action = "https://formspree.io/f/mvodlpyz";contactForm.submit();e.target.reset()}
});
frmSearch.addEventListener("submit", e=>{
     e.preventDefault();let searchInput = document.querySelector("#search-input").value;
     cards.forEach((el,i)=>{
          if(el.querySelector(".card-title").innerText.toLowerCase().includes(searchInput.toLowerCase())){cards[i].classList.remove("hide");cards[i].classList.add("active");} else {cards[i].classList.remove("active");cards[i].classList.add("hide");}
     })
})
cancelSearchBtn.addEventListener("click", ()=>{document.querySelector("#search-input").value = "";cards.forEach((_,i)=>{cards[i].classList.remove("hide");cards[i].classList.add("active")})});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
     if(e.matches){document.body.classList.add("dark");modeToggler.querySelector("img").src = "files/icons/dark.svg";localStorage.setItem("arsentech-theme", "dark");lazyCss("css/dark-mode.css");} 
     else {document.body.classList.remove("dark");modeToggler.querySelector("img").src = "files/icons/light.svg";localStorage.setItem("arsentech-theme", "light");removeMode()}
});