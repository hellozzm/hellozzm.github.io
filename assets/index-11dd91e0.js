var p=Object.defineProperty;var f=(o,t,e)=>t in o?p(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var a=(o,t,e)=>(f(o,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class u{constructor(t,e=!1){a(this,"domMap",{});a(this,"ctx");a(this,"isDrawing",!1);a(this,"lastX",0);a(this,"lastY",0);a(this,"penColor","red");a(this,"penWidth",5);a(this,"hasPen",!1);a(this,"url","ws://localhost:3001/colin");a(this,"ws");a(this,"isSync",!1);var r;this.domMap={canvas:document.querySelector(t)},this.isSync=e,this.domMap.canvas.width=this.domMap.canvas.offsetWidth||0,this.domMap.canvas.height=this.domMap.canvas.offsetHeight||0,this.domMap.canvas.addEventListener("mousedown",s=>{if(!this.hasPen)return;const{offsetX:i,offsetY:n}=s;this.startDrawing(i,n),this.isSync&&this.async({type:"start",option:{x:i,y:n}})}),this.domMap.canvas.addEventListener("mousemove",s=>{if(!this.hasPen||!this.isDrawing)return;const{offsetX:i,offsetY:n}=s;this.draw(i,n),this.isSync&&this.async({type:"drawing",option:{x:i,y:n}})}),this.domMap.canvas.addEventListener("mouseup",()=>{this.hasPen&&(this.stopDrawing(),this.isSync&&this.async({type:"end"}))}),this.ctx=(r=this.domMap.canvas)==null?void 0:r.getContext("2d"),this.ctx.lineJoin="round",this.ctx.lineCap="round",this.isSync&&(this.ws=new WebSocket(this.url),this.ws.onopen=()=>{console.log("连接成功")},this.ws.onmessage=async s=>{this.hasPen=!0;const{type:i,option:{x:n=0,y:h=0,penColor:l="red",penWidth:d=5}={}}=JSON.parse(await s.data.text());i&&{start:()=>{this.startDrawing(n,h)},drawing:()=>{this.draw(n,h)},end:()=>{this.stopDrawing()},setPen:()=>{this._setPen(l,d)},setEraser:()=>{this._setPen(l,d)},clear:()=>{this._clear()}}[i]()})}startDrawing(t,e){this.isDrawing=!0,this.lastX=t,this.lastY=e}draw(t,e){this.isDrawing&&(this.ctx.strokeStyle=this.penColor,this.ctx.lineWidth=this.penWidth,this.ctx.beginPath(),this.ctx.moveTo(this.lastX,this.lastY),this.ctx.lineTo(t,e),this.ctx.stroke(),this.lastX=t,this.lastY=e)}stopDrawing(){this.isDrawing=!1}_clear(){this.hasPen=!1,this.ctx.clearRect(0,0,this.domMap.canvas.width,this.domMap.canvas.height)}_setPen(t,e){this.hasPen=!0,this.penColor=t,this.penWidth=e}async(t){var e;(e=this.ws)==null||e.send(JSON.stringify(t))}setPen(t="red",e=5){this._setPen(t,e),this.async({type:"setPen",option:{penColor:t,penWidth:e}})}setEraser(t="#fff",e=30){this._setPen(t,e),this.async({type:"setEraser",option:{penColor:t,penWidth:e}})}clear(){this._clear(),this.async({type:"clear"})}}const c=new u("#canvas",!0),y=document.getElementById("clear"),m=document.getElementById("eraser"),g=document.getElementById("pen");y.onclick=()=>{c.clear()};m.onclick=()=>{c.setEraser()};g.onclick=()=>{c.setPen()};
