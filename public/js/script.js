function lazyCss(e) {
     let t = document.createElement("link");
     t.href = e, t.rel = "stylesheet", t.type = "text/css", document.getElementsByTagName("head")[0].appendChild(t)
 }
lazyCss("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;700&display=swap")