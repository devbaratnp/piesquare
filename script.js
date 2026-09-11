(() => {
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  const progress=document.querySelector('.progress span');
  const nav=document.querySelector('.nav');
  const hero=document.querySelector('.hero');
  const heroBg=document.querySelector('.hero-bg');
  const heroTitle=[...document.querySelectorAll('.hero-title span')];
  const serviceScene=document.querySelector('.services-scene');
  const serviceCards=[...document.querySelectorAll('.service-card')];
  const serviceDots=[...document.querySelectorAll('.service-index span')];
  const impact=document.querySelector('.impact');
  const impactItems=[...document.querySelectorAll('.impact-item')];
  const impactTrack=document.querySelector('.impact-track span');
  const projects=document.querySelector('.projects');
  const rail=document.querySelector('.project-rail');
  const fiber=document.querySelector('.fiber-section');
  const fiberLive=document.querySelector('.fiber-live');
  const parallax=[...document.querySelectorAll('.parallax-media')];

  function sectionProgress(el){
    const r=el.getBoundingClientRect();
    const travel=el.offsetHeight-innerHeight;
    return travel<=0?0:clamp(-r.top/travel);
  }

  function setActive(list,index){ list.forEach((el,i)=>el.classList.toggle('active',i===index)); }

  function onScroll(){
    const max=document.documentElement.scrollHeight-innerHeight;
    const p=max?scrollY/max:0;
    progress.style.width=(p*100)+'%';
    nav.classList.toggle('scrolled',scrollY>40);

    const hp=sectionProgress(hero);
    heroBg.style.transform=`scale(${1.02+hp*.09}) translateY(${hp*-18}px)`;
    heroTitle.forEach((el,i)=>{el.style.transform=`translateX(${hp*(i?34:60)}px)`;el.style.opacity=1-hp*.45;});

    const sp=sectionProgress(serviceScene);
    const sIndex=Math.min(3,Math.floor(sp*4));
    setActive(serviceCards,sIndex);setActive(serviceDots,sIndex);
    serviceScene.classList.remove('s1','s2','s3');
    if(sIndex>0)serviceScene.classList.add('s'+sIndex);

    const ip=sectionProgress(impact);
    const iIndex=Math.min(3,Math.floor(ip*4));
    setActive(impactItems,iIndex);impactTrack.style.width=(ip*100)+'%';

    const pp=sectionProgress(projects);
    if(rail){
      const maxX=Math.max(0,rail.scrollWidth-innerWidth+innerWidth*.08);
      rail.style.transform=`translate3d(${-pp*maxX}px,0,0)`;
    }

    const fp=sectionProgress(fiber);
    if(fiberLive) fiberLive.style.strokeDashoffset=(1-clamp(fp*1.45)).toFixed(3);

    parallax.forEach(el=>{
      const r=el.getBoundingClientRect();
      const mid=(r.top+r.height/2-innerHeight/2)/innerHeight;
      const img=el.querySelector('img');
      if(img)img.style.transform=`scale(1.08) translateY(${clamp(mid,-1,1)*-24}px)`;
    });
  }

  let ticking=false;
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{onScroll();ticking=false});ticking=true;}},{passive:true});
  addEventListener('resize',onScroll);onScroll();

  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.15});
  document.querySelectorAll('.reveal,.reveal-lines,.feature-copy,.project-card').forEach(el=>io.observe(el));

  // subtle pointer response
  const cursor=document.querySelector('.cursor');
  if(matchMedia('(pointer:fine)').matches){
    addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
    document.querySelectorAll('a,.project-card').forEach(el=>{
      el.addEventListener('pointerenter',()=>{cursor.style.width='34px';cursor.style.height='34px'});
      el.addEventListener('pointerleave',()=>{cursor.style.width='10px';cursor.style.height='10px'});
    });
  }
})();
