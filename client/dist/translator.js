(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Ajax{
  get(url, cb){
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        let res = this.responseText
        try{ res = JSON.parse(res) }catch(e){}
        return cb(res)
      }
    }
    xhttp.open("GET", url, true)
    xhttp.send()
  }
  
  post(url, data, cb){
    let xhttp = new XMLHttpRequest()
    
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){
        let res = this.responseText
        try{res = JSON.parse(res)}catch(e){}
        return cb(res)
      }
    }
    
    let form = new FormData()
    let keys = Object.keys(data)
    
    keys.forEach(key => {
      form.append(key, data[key])
    })
    
    
    xhttp.open("POST", url, true)
    xhttp.send(form)
  }
}

module.exports = function(){return new Ajax()}
},{}],2:[function(require,module,exports){
const Ajax = require("./ajax.js")()

window.translation_url = "https://translator-sunpodder.herokuapp.com"


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
},{"./ajax.js":1}]},{},[2]);
