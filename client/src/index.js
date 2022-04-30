const Ajax = require("./ajax.js")()

window.translation_url = "https://translator-sunpodder.herokuapp.com/translate"


HTMLDocument.prototype.translate = function(...arguments){
  let html = "<html>" + document.documentElement.innerHTML + "</html>", dest, src
  
  if(arguments.length == 1) dest = arguments[0]
  else if(arguments.length == 2){
    src = arguments[0]
    dest = arguments[1]
  }
  
  let data = {}
  
  data.html = html
  src ? data.src = src : 0
  dest ? data.dest = dest : 0
  
  Ajax.post(
    window.translation_url,
    data,
    function(data){
      document.documentElement.innerHTML = data
    })
}