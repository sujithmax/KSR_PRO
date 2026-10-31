const clean=(v,n=600)=>String(v==null?'':v).replace(/[\u0000-\u001f\u007f]+/g,' ').replace(/\s+/g,' ').trim().slice(0,n);
const openWA=m=>window.open('https://wa.me/919000542048?text='+encodeURIComponent(m),'_blank','noopener,noreferrer');
const menu=document.querySelector('.menu'),links=document.querySelector('.links');
if(menu&&links){
  menu.addEventListener('click',()=>{const o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
}
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));
  document.querySelectorAll('[data-cat]').forEach(c=>c.style.display=(b.dataset.filter==='all'||c.dataset.cat===b.dataset.filter)?'':'none');
}));
document.querySelectorAll('[data-enquiry]').forEach(b=>b.addEventListener('click',()=>{
  const msg=`Hello KSR PRO LIGHTS, I want to enquire about ${b.dataset.enquiry} for purchase. Please share pricing and availability.`;
  openWA(msg);
}));
const f=document.querySelector('#quoteform');
if(f)f.addEventListener('submit',e=>{
  e.preventDefault();if(!f.reportValidity())return;const d=new FormData(f);
  const msg=`Hello KSR PRO LIGHTS, I would like a quotation.\nName: ${clean(d.get('name'))}\nPhone: ${clean(d.get('phone'))}\nEnquiry: ${clean(d.get('type'))}\nEvent date: ${clean(d.get('date'))||'Not specified'}\nLocation: ${clean(d.get('location'))||'Not specified'}\nRequirements: ${clean(d.get('requirements'))}\nDetails: ${clean(d.get('message'))||'None'}`;
  openWA(msg);
});
const cur=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===cur)a.classList.add('active')});
(()=>{const s=document.querySelector('.slider');if(!s)return;
const im=[...s.querySelectorAll('img')],dt=[...s.querySelectorAll('.dots i')];let k=0;
const show=n=>{k=n%im.length;im.forEach((x,i)=>x.classList.toggle('on',i===k));dt.forEach((x,i)=>x.classList.toggle('on',i===k))};
show(0);let t=setInterval(()=>show(k+1),3500);
s.addEventListener('mouseenter',()=>clearInterval(t));s.addEventListener('mouseleave',()=>t=setInterval(()=>show(k+1),3500));})();
/* button ripple */
document.addEventListener('pointerdown',e=>{
  const b=e.target.closest('.btn,.filters button,.textlink,.menu');if(!b)return;
  const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height),s=document.createElement('span');
  s.className='ripple';s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;
  b.appendChild(s);setTimeout(()=>s.remove(),650);
});
/* smooth page switching */
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href]');
  if(!a||a.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey)return;
  const u=new URL(a.href,location.href);
  if(u.origin!==location.origin||u.pathname===location.pathname||!/\.html$|\/$/.test(u.pathname))return;
  e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,230);
});
addEventListener('pageshow',()=>document.body.classList.remove('leaving'));
/* feedback -> WhatsApp */
const fb=document.querySelector('#feedbackform');
if(fb)fb.addEventListener('submit',e=>{
  e.preventDefault();if(!fb.reportValidity())return;const d=new FormData(fb);
  const msg=`Hello KSR PRO LIGHTS, I would like to share feedback.\nName: ${clean(d.get('name'))}\nRating: ${clean(d.get('rating'))}\nFeedback: ${clean(d.get('message'))}`;
  openWA(msg);
});
/* founder photo scroll */
(()=>{const sec=document.querySelector('.founder');if(!sec)return;
const f1=sec.querySelector('.f1'),f2=sec.querySelector('.f2');
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const clamp=v=>Math.min(1,Math.max(0,v)),ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const update=()=>{const r=sec.getBoundingClientRect(),total=r.height-innerHeight;
 const q=ease(clamp((clamp(-r.top/total)-.12)/.68));
 f2.style.clipPath=`inset(${(1-q)*100}% 0 0 0)`;f2.style.transform=`scale(${1.12-.12*q})`;f1.style.transform=`scale(${1+.08*q})`};
addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();})();
