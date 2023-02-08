import {downloads} from "./data.js";
import {displayCards,lazyJS,lazyCss,downloadFile,getFileInfo,handleSubmit,handleChange} from "./functions.js";
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
      contactForm = document.querySelector(".contact-form"),
      getMode = localStorage.getItem("arsentech-theme"),
      modeToggler = document.querySelector("#icon"),
      navLinks = document.querySelectorAll("#navLinks a"),
      frmSearch = document.querySelector(".search-container"),
      cancelSearchBtn = document.querySelector("#cancel-search");
if(getMode && getMode === "dark") {document.body.classList.add("dark");modeToggler.querySelector("img").src = "files/icons/dark.svg";}
lazyCss("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;700&display=swap");
lazyCss("css/dark-mode.css");lazyJS("js/firebase.js");displayCards(downloads,downloadsContainer);
window.addEventListener("scroll", ()=>window.scrollY>20?navbar.classList.add( "sticky" ):navbar.classList.remove( "sticky" ));
toggler.addEventListener("click",toggleActive);modeToggler.addEventListener("click", toggleMode);
document.getElementById("yearCount").innerHTML=new Date().getFullYear();
function toggleActive(){toggler.classList.toggle("active"); navMenu.classList.toggle("active");}
function toggleMode(){
     document.body.classList.toggle("dark");
     if(!document.body.classList.contains("dark")){modeToggler.querySelector("img").src = "files/icons/light.svg";localStorage.setItem("arsentech-theme", "light");} 
     else {modeToggler.querySelector("img").src = "files/icons/dark.svg";localStorage.setItem("arsentech-theme", "dark");}
}
function closeMenu(){toggler.classList.remove("active"); navMenu.classList.remove("active");}
const downloadBtns=document.querySelectorAll(".card-btn"),cards = document.querySelectorAll(".grid-item"),list = document.querySelectorAll(".list");
cards.forEach(card=>{const files = card.dataset.filePath,i = card.dataset.index;getFileInfo(files,i);})
list.forEach(el=>el.addEventListener("click", ()=>{
     for(let i=0; i<list.length; i++) list[i].classList.remove("active");
     el.classList.add("active");const dataFilter = el.dataset.filter;
     cards.forEach(card => {card.classList.remove("active");card.classList.add("hide");if(card.dataset.item==dataFilter||dataFilter=="all"){card.classList.remove("hide");card.classList.add("active");}});
}));
downloadBtns.forEach(el => {const filePath = el.dataset.filePath;const image = el.querySelector("img");el.addEventListener("click", ()=>downloadFile(filePath, image))});
tabHeaderBtns.forEach((tab, index)=>tab.addEventListener("click", ()=>{
     tabs.forEach(content => content.classList.remove("active"));tabHeaderBtns.forEach(tab => tab.classList.remove("active"));tabs[index].classList.add("active");tabHeaderBtns[index].classList.add("active");
}));
downloadOptions.forEach((el, index) => {
     const ids = ["download-option1", "download-option2", "download-option3", "download-option4", "download-option5"];const opt = document.querySelectorAll(ids.map(id => `#${id}`).join(", "));
     opt[index].addEventListener("change", (e) => handleChange(e, index));
     el.addEventListener("submit", (e)=> handleSubmit(e, index));
});
allStar.forEach((elem, idx)=>elem.addEventListener("click", ()=> {
     let click = 0;ratingValue.value = idx+1;
     allStar.forEach(el => {el.querySelector("img").src="files/icons/star.svg";el.classList.remove("active");});
     for (let i = 0; i < allStar.length; i++) {if(i <= idx){allStar[i].querySelector("img").src="files/icons/star-fill.svg";allStar[i].classList.add("active");} else {allStar[i].style.setProperty("--i", click);click++;}}
}));
contactForm.addEventListener("submit", (e)=> {
     e.preventDefault();let isValid = false;
     if(ratingValue.value == 0){ratingError.innerHTML = "Required";isValid = false;}else{ratingError.innerHTML = "";isValid = true;}
     if(isValid){contactForm.action = "https://formspree.io/f/mvodlpyz";contactForm.submit();e.target.reset()}
});
navLinks.forEach(link=>link.addEventListener("click", closeMenu));
frmSearch.addEventListener("submit", (e)=>{
     e.preventDefault();let searchInput = document.querySelector("#search-input").value;
     cards.forEach((el,i)=>{
          if(el.querySelector(".card-title").innerText.toLowerCase().includes(searchInput.toLowerCase())){cards[i].classList.remove("hide");cards[i].classList.add("active");} 
          else {cards[i].classList.remove("active");cards[i].classList.add("hide");}
     })
})
cancelSearchBtn.addEventListener("click", ()=>{document.querySelector("#search-input").value = "";cards.forEach((_,i)=>{cards[i].classList.remove("hide");cards[i].classList.add("active")})})