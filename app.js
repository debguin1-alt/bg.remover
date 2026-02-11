import { runLocalBGRemovalUltra } from "./ai/ai.js";
const fileInput=document.getElementById("fileInput");
const preview=document.getElementById("preview");
const result=document.getElementById("result");
const removeBtn=document.getElementById("removeBtn");
const bar=document.getElementById("bar");
const pngBtn=document.getElementById("pngBtn");
const jpgBtn=document.getElementById("jpgBtn");
let outputBlob;
fileInput.onchange=()=>{const f=fileInput.files[0];if(!f)return;preview.src=URL.createObjectURL(f);removeBtn.style.display="block";};
removeBtn.onclick=async()=>{const f=fileInput.files[0];if(!f)return;removeBtn.innerText="Processing...";const blob=await runLocalBGRemovalUltra(f,p=>bar.style.width=p+"%");outputBlob=blob;result.src=URL.createObjectURL(blob);pngBtn.style.display=jpgBtn.style.display="inline-block";removeBtn.innerText="Done";};
pngBtn.onclick=()=>downloadBlob(outputBlob,"transparent.png");
jpgBtn.onclick=()=>{const c=document.createElement("canvas"),i=result;c.width=i.naturalWidth;c.height=i.naturalHeight;const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(i,0,0);c.toBlob(b=>downloadBlob(b,"final.jpg"),"image/jpeg",0.95);};
function downloadBlob(b,n){const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=n;a.click();}