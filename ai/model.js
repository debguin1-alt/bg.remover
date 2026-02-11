import * as tf from "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.14.0/dist/tf.min.js";
let model=null;
export async function loadModel(progress){
 if(model)return;
 model=await tf.loadGraphModel("https://cdn.jsdelivr.net/gh/xuebinqin/U-2-Net/u2netp/model.json",
 {onProgress:f=>progress(Math.round(f*100))});
}
export async function predictMask(img){
 const t=tf.browser.fromPixels(img).toFloat().div(255);
 const r=tf.image.resizeBilinear(t,[320,320]);
 const p=model.execute(r.expandDims(0))[0];
 return tf.image.resizeBilinear(p,[img.height,img.width]).squeeze();
}