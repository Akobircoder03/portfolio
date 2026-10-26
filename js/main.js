const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement,store={get:k=>{try{return localStorage.getItem(k)}catch{return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch{}}};
let lang=store.get('lang')||'uz',roleI=0,charI=0,del=false;
/* Theme */
root.dataset.theme=store.get('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
$('#theme').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';store.set('theme',root.dataset.theme)};
/* Language */
function setLang(l){lang=l;store.set('lang',l);root.lang=l;$('#lang').textContent=l==='uz'?'EN':'UZ';
 $$('[data-i18n]').forEach(e=>e.textContent=I18N[l][e.dataset.i18n]);
 $$('[data-i18n-ph]').forEach(e=>e.placeholder=I18N[l][e.dataset.i18nPh]);roleI=0;charI=0;del=false}
$('#lang').onclick=()=>setLang(lang==='uz'?'en':'uz');setLang(lang);
/* Typing role line */
(function type(){const w=I18N[lang].roles[roleI];charI+=del?-1:1;$('#typed').textContent=w.slice(0,charI);
 let t=del?35:80;if(!del&&charI===w.length){del=true;t=1400}else if(del&&charI===0){del=false;roleI=(roleI+1)%I18N[lang].roles.length;t=300}setTimeout(type,t)})();
/* Hidden code layer + cursor spotlight */
const code=`const akobir = {\n  role: "developer",\n  stack: ["HTML","CSS","JS","Python"],\n  learning: ["AI","Security"],\n  build(idea){ return ship(idea); }\n};\n\nfunction ship(idea){\n  design(idea);\n  code(idea);\n  test(idea);\n  return "live";\n}\n\nwhile(alive){ learn(); build(); repeat(); }\n`.repeat(4);
$$('.code-bg,.code-lit').forEach(e=>e.textContent=code);
const hero=$('#hero');hero.onpointermove=e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',e.clientX-r.left+'px');hero.style.setProperty('--my',e.clientY-r.top+'px')};
/* Scroll progress, reveal, counters */
addEventListener('scroll',()=>{$('#progress').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'},{passive:true});
const count=el=>{const n=+el.dataset.count;let i=0;const s=setInterval(()=>{i+=Math.ceil(n/40);if(i>=n){i=n;clearInterval(s)}el.textContent=i+'+'},30)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');$$('[data-count]',e.target).forEach(count);if(e.target.matches('[data-count]'))count(e.target);io.unobserve(e.target)}}),{threshold:.15});
$$('.sec h2,.skills>div,.card,.timeline li,.about>*,.contact form').forEach(e=>{e.classList.add('rv');io.observe(e)});
/* Project filter */
$$('.filters button').forEach(b=>b.onclick=()=>{$$('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
 $$('.card').forEach(c=>c.classList.toggle('hide',b.dataset.f!=='all'&&c.dataset.c!==b.dataset.f))});
/* Card tilt */
$$('.card').forEach(c=>{c.onpointermove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`};c.onpointerleave=()=>c.style.transform=''});
/* Mobile menu */
$('#burger').onclick=()=>$('#menu').classList.toggle('open');$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
/* Links from config.js (empty ones stay hidden) */
$$('[data-s]').forEach(a=>{const v=CONFIG.links[a.dataset.s];if(v){a.href=a.dataset.s==='email'?'mailto:'+v:v;a.hidden=false}});
/* Contact form -> Web3Forms -> your Gmail */
const st=$('#status');
$('#form').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target),btn=$('#form button'),T=I18N[lang];
 if(!CONFIG.web3formsKey){if(CONFIG.links.email){location.href=`mailto:${CONFIG.links.email}?subject=${encodeURIComponent('Portfolio: '+f.get('name'))}&body=${encodeURIComponent(f.get('message')+'\n\n'+f.get('email'))}`}else{st.textContent=T.fail;st.className='err'}return}
 btn.disabled=true;st.textContent=T.sending;st.className='';
 try{f.append('access_key',CONFIG.web3formsKey);f.append('subject','Portfolio: '+f.get('name'));
  const r=await fetch('https://api.web3forms.com/submit',{method:'POST',body:f}).then(r=>r.json());
  if(!r.success)throw 0;e.target.reset();st.textContent=T.ok;st.className='ok'}
 catch{st.textContent=T.fail;st.className='err'}
 btn.disabled=false};
$('#year').textContent=new Date().getFullYear();
/* v2: cursor glow, magnetic buttons, ripple */
const glow=$('.glow');addEventListener('pointermove',e=>{glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
$$('.btn').forEach(b=>{b.onpointermove=e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.35}px)`};b.onpointerleave=()=>b.style.transform=''});
$$('.btn,.filters button').forEach(b=>b.addEventListener('pointerdown',e=>{const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='ripple';s.style.left=e.clientX-r.left+'px';s.style.top=e.clientY-r.top+'px';b.appendChild(s);setTimeout(()=>s.remove(),700)}));
