import { loadModel,predictMask } from "./model.js";
let ready=false;
export async function runLocalBGRemovalUltra(file,progress){
 if(!ready){await loadModel(progress);ready=true;}
 const img=await loadImage(file);progress(50);
 const mask=await predictMask(img);progress(80);
 const c=document.createElement("canvas");c.width=img.width;c.height=img.height;
 const x=c.getContext("2d");x.drawImage(img,0,0);
 const d=x.getImageData(0,0,c.width,c.height);const m=await mask.data();
 for(let i=0;i<d.data.length;i+=4)d.data[i+3]=m[i/4]*255;
 x.putImageData(d,0,0);progress(100);
 return new Promise(r=>c.toBlob(b=>r(b),"image/png",1));
}
function loadImage(f){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src=URL.createObjectURL(f);});}