import {downloads} from "./data.js";
import {displayCards,lazyJS,lazyCss,downloadFile,getFileInfo,changeWallpaper,changeSize,downloadWallpaper,changeSizeBasedOn,toggleActive,closeMenu,toggleMode} from "./functions.js";
const navbar = document.querySelector( ".navbar" ),
     toggler = document.querySelector( ".menu-toggler" ),
     navMenu = document.querySelector( ".navbar-menu" ),
     downloadsContainer = document.getElementById("downloadsCards"),
     wallpaperOptions = document.querySelector("#wallpaper-opt"),
     sizeOptions = document.querySelector("#size-opt"),
     frmWallpaper = document.getElementById("wp-form"),
     allStar = document.querySelectorAll(".rating .star"),
     ratingValue = document.getElementById("rating"),
     ratingError = document.querySelector(".ratingError"),
     contactForm = document.querySelector(".contact-form"),
     getMode = localStorage.getItem("arsentech-theme"),
     modeToggler = document.querySelector("#icon"),
     navLinks = document.querySelectorAll("#navLinks a"),
     frmSearch = document.querySelector(".search-container"),
     cancelSearchBtn = document.querySelector("#cancel-search");
let chosenImg,chosenSize,isSizeActive = false;
if(getMode && getMode === "dark") {document.body.classList.add("dark");modeToggler.querySelector("img").src = "files/icons/dark.svg";}
lazyCss("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;700&display=swap");
lazyCss("css/dark-mode.css");lazyJS("js/firebase.js");displayCards(downloads,downloadsContainer);
window.addEventListener("scroll", ()=>window.scrollY>20?navbar.classList.add("sticky"):navbar.classList.remove("sticky"));
toggler.addEventListener("click",()=> toggleActive(toggler,navMenu));modeToggler.addEventListener("click", ()=>toggleMode(modeToggler));
navLinks.forEach(link=>link.addEventListener("click", ()=>closeMenu(toggler,navMenu)));
document.getElementById("yearCount").innerHTML=new Date().getFullYear();
const downloadBtns=document.querySelectorAll(".card-btn"),cards = document.querySelectorAll(".grid-item"),list = document.querySelectorAll(".list");
cards.forEach(card=>{const files = card.dataset.filePath,i = card.dataset.index;getFileInfo(files,i);})
list.forEach(el=>el.addEventListener("click", ()=>{
     for(let i=0; i<list.length; i++) list[i].classList.remove("active");el.classList.add("active");const dataFilter = el.dataset.filter;
     cards.forEach(card => {card.classList.remove("active");card.classList.add("hide");if(card.dataset.item==dataFilter||dataFilter=="all"){card.classList.remove("hide");card.classList.add("active");}});
}));
downloadBtns.forEach(el => {const filePath = el.dataset.filePath;const image = el.querySelector("img");el.addEventListener("click", ()=>downloadFile(filePath, image))});
wallpaperOptions.addEventListener("change",(e)=>{chosenImg = changeWallpaper(e.target.value);if(e.target.value) {isSizeActive = true;sizeOptions.removeAttribute("disabled")}if(e.target.value && chosenSize)changeSizeBasedOn(chosenSize,chosenImg-1)})
sizeOptions.addEventListener("change", (e)=>{if(isSizeActive)changeSize(e,chosenImg-1);if(isSizeActive && e.target.value !== "") chosenSize = e.target.value;})
frmWallpaper.addEventListener("submit",(e)=>{e.preventDefault();const filePath = `wallpapers/coding${chosenImg-1}/${frmWallpaper.optSize.value}.png`;downloadWallpaper(filePath);})
allStar.forEach((elem, id)=>elem.addEventListener("click", ()=> {
     let click = 0;ratingValue.value = id+1;
     allStar.forEach(el => {el.querySelector("img").src="files/icons/star.svg";el.classList.remove("active");});
     for (let i = 0; i < allStar.length; i++) {if(i <= id){allStar[i].querySelector("img").src="files/icons/star-fill.svg";allStar[i].classList.add("active");} else {allStar[i].style.setProperty("--i", click);click++;}}
}));
contactForm.addEventListener("submit", (e)=> {
     e.preventDefault();let isValid = false;
     if(ratingValue.value == 0){ratingError.innerHTML = "Required";isValid = false;}else{ratingError.innerHTML = "";isValid = true;}
     if(isValid){contactForm.action = "https://formspree.io/f/mvodlpyz";contactForm.submit();e.target.reset()}
});
frmSearch.addEventListener("submit", (e)=>{
     e.preventDefault();let searchInput = document.querySelector("#search-input").value;
     cards.forEach((el,i)=>{
          if(el.querySelector(".card-title").innerText.toLowerCase().includes(searchInput.toLowerCase())){cards[i].classList.remove("hide");cards[i].classList.add("active");} 
          else {cards[i].classList.remove("active");cards[i].classList.add("hide");}
     })
})
cancelSearchBtn.addEventListener("click", ()=>{document.querySelector("#search-input").value = "";cards.forEach((_,i)=>{cards[i].classList.remove("hide");cards[i].classList.add("active")})});