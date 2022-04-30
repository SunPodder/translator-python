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