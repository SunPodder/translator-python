from flask import Flask, request, redirect
from flask_cors import CORS
from googletrans import Translator
from lxml import etree
import os

app = Flask(__name__)
CORS(app)

ignore_tags = ["html", "style", "link", "script", "meta", "head"]
translator = Translator()

@app.route("/")
def home():
  return redirect("https://github.com/SunPodder/translator-python")
  

@app.route("/translate", methods=["POST"])
def api():
  html = request.form.get("html").replace("document.translate", "//document.translate")
  root = etree.fromstring(html)
  src_lang = (request.form.get("src") or None)
  dest_lang = (request.form.get("dest") or None)
  
  
  for el in root.iter():
  #match condition
    if ((el.text is not None)
      and (el.tag not in ignore_tags)
      and (el.get("translatable") != "no")):
      
      if (src_lang and dest_lang):
        el.text = translator.translate(el.text, dest=dest_lang, src=src_lang).text
        el.tail = translator.translate(el.tail, dest=dest_lang).text
               
      elif dest_lang:
        el.text = translator.translate(el.text, dest=dest_lang).text
        el.tail = translator.translate(el.tail, dest=dest_lang).text
        
      elif src_lang:
        el.text = translator.translate(el.text, src=src_lang).text
        el.tail = translator.translate(el.tail, dest=dest_lang).text
               
      else:
        el.text = translator.translate(el.text).text
        el.tail = translator.translate(el.tail, dest=dest_lang). text
        
    translated_content = etree.tostring(root, method="html").decode("utf-8")
    translated_content = (translated_content
      .replace("<html>", "")
      .replace("</html>", ""))
    
  return translated_content
    
app.run(host="0.0.0.0", port=(int(os.environ.get("PORT") or 3000)))