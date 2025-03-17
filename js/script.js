const navbar = document.querySelector(".navbar"),
     toggler = document.querySelector(".menu-toggler"),
     modeToggler = document.querySelector("#icon"),
     navMenu = document.querySelector( ".navbar-menu" ),
     wallpaperOptions = document.querySelector("#wallpaper-opt"),
     sizeOptions = document.querySelector("#size-opt"),
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
list.forEach(el=>el.addEventListener("click", ()=>{for(let i=0; i<list.length; i++) list[i].classList.remove("active");el.classList.add("active");const dataFilter = el.dataset.filter;cards.forEach(card => {card.classList.remove("active");card.classList.add("hide");if(card.dataset.item==dataFilter||dataFilter=="all"){card.classList.remove("hide");card.classList.add("active");}});}));
downloadBtns.forEach((e=>{let t,a;const s=e.parentElement.querySelector(".icon");if(e.classList.contains("selection")){const n=s.querySelector("img");e.addEventListener("change",(e=>{t=e.target.value,a=e.target?.closest("[data-type]").dataset.type,s.disabled=!1,s.setAttribute("data-file-path",e.target.value)})),s.addEventListener("click",(()=>downloadFile(t,n,a)))}else{const s=e.querySelector("img");a=e.dataset.type,t=e.dataset.filePath,e.classList.contains("icon")||e.addEventListener("click",(()=>downloadFile(t,s,a)))}}));
wallpaperOptions.addEventListener("change",(e=>{chosenImg=changeWallpaper(e.target.value),e.target.value&&(isSizeActive=!0,sizeOptions.removeAttribute("disabled")),e.target.value&&chosenSize&&changeSize(chosenSize,chosenImg)}));
sizeOptions.addEventListener("change",(e=>{isSizeActive&&(changeSize(e.target.value,chosenImg),btnWPDownload.removeAttribute("disabled")),isSizeActive&&""!==e.target.value&&(chosenSize=e.target.value)}));
frmWallpaper.addEventListener("submit",e=>{e.preventDefault();const pathName = `https://raw.githubusercontent.com/ArsenTech/wallpapers/refs/heads/main/coding${chosenImg}/${frmWallpaper.optSize.value.replace("x", " x ")}.png`;window.open(pathName);})
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