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
function lazyCss(e) {
     const t = document.createElement("link");
     t.href = e, t.rel = "stylesheet"; 
     t.type = "text/css";
     document.getElementsByTagName("head")[0].appendChild(t);
};
function lazyJS(e){
     const t = document.createElement("script");
     t.src = e;
     t.defer = true; 
     t.type="module"; 
     document.body.appendChild(t)
}
export {
     displayCards,
     formatBytes,
     lazyCss,
     lazyJS
}