const B=window.AP_BUILDINGS||[], ROOT=window.AP_ROOT||'', IMG=p=>p?ROOT+'/assets/img/'+p:'', LINK=p=>p?(/^https?:/.test(p)?p:ROOT+'/'+p):'', RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches, $=id=>document.getElementById(id);
const card=$('card'), main=$('main');
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function open(b){
  card.innerHTML=`<button class="x" aria-label="Close card">×</button><h2>${esc(b.name)}</h2><small>${esc(b.story)}</small>
  <p>${esc(b.summary)}</p>${b.sketch?`<img class="main" id="mainImg" src="${IMG(b.sketch)}" alt="Sketch of ${esc(b.name)}">`:''}
  ${b.thumbs.length>1?`<div class="thumbs">${b.thumbs.map(t=>`<img src="${IMG(t)}" alt="" data-src="${IMG(t)}">`).join('')}</div>`:''}
  ${b.video?`<a class="btn p" href="${LINK(b.video)}" target="_blank" rel="noopener">Watch the episode</a>`:''}
  ${b.post?`<a class="btn s" href="${LINK(b.post)}" target="_blank" rel="noopener">Read the write-up</a>`:''}`;
  card.classList.add('open');main.classList.add('has-card');
  card.querySelector('.x').onclick=closeCard;
  card.querySelectorAll('.thumbs img').forEach(i=>i.onclick=()=>$('mainImg').src=i.dataset.src);
  card.querySelector('.x').focus();
}
const regions=[...new Set(B.map(b=>b.region||'Other'))];
$('list').innerHTML=regions.map(r=>`<div class="rh">${esc(r)}</div>`+B.filter(b=>(b.region||'Other')===r).map(b=>`<button class="item" data-id="${b.id}">${b.sketch?`<img src="${IMG(b.sketch)}" alt="">`:`<span class="item-ph"></span>`}<span><b>${esc(b.name)}</b><br><small>${esc(b.story)}</small><br>${esc(b.summary)}</span></button>`).join('')).join('');
$('list').querySelectorAll('.item').forEach(e=>e.onclick=()=>{const b=B.find(x=>x.id===e.dataset.id);view(false);open(b);goTo(b)});
let map=null;
function goTo(b){if(map)map.flyTo({center:[b.lng,b.lat],zoom:17,duration:RM?0:900})}
function fitTo(list){
  if(!map)return;
  if(list.length===1)return goTo(list[0]);
  const bd=new maplibregl.LngLatBounds();list.forEach(x=>bd.extend([x.lng,x.lat]));
  map.fitBounds(bd,{padding:{top:60,bottom:60,left:60,right:60},maxZoom:16.5,duration:RM?0:900});
}
const chips=['All',...regions];
$('regions').innerHTML=chips.map((r,i)=>`<button aria-pressed="${i===0}" data-r="${esc(r)}">${esc(r)}</button>`).join('');
$('regions').querySelectorAll('button').forEach(btn=>btn.onclick=()=>{
  $('regions').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===btn));
  view(false);closeCard();
  fitTo(btn.dataset.r==='All'?B:B.filter(x=>(x.region||'Other')===btn.dataset.r));
});
function view(l){main.classList.toggle('list',l);$('bList').setAttribute('aria-pressed',l);$('bMap').setAttribute('aria-pressed',!l)}
$('bMap').onclick=()=>view(false);$('bList').onclick=()=>view(true);
function closeCard(){card.classList.remove('open');main.classList.remove('has-card')}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCard()});
const COLORS={video:['#f88379','#c4493e'],site:['#fbd0cb','#c4493e'],project:['#1a1a1a','#1a1a1a']};
try{
  map=new maplibregl.Map({container:'map',style:'https://tiles.openfreemap.org/styles/positron',center:[-87.6305,41.8788],zoom:14.6,attributionControl:{compact:true}});
  map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-left');
  const pins={}, outlined={};
  B.forEach(b=>{
    const el=document.createElement('button');el.className='pin '+b.kind;el.setAttribute('aria-label',b.name);
    el.onclick=()=>open(b);
    new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat([b.lng,b.lat]).addTo(map);
    pins[b.id]=el;
  });
  // Show all buildings on first view (Evanston is far north of the Loop).
  const bounds=new maplibregl.LngLatBounds();B.forEach(b=>bounds.extend([b.lng,b.lat]));
  map.fitBounds(bounds,{padding:{top:60,bottom:60,left:60,right:60},maxZoom:14.6,duration:0});

  // Pick the map's own building shape for a point: prefer the polygon that contains it,
  // then stitch back together pieces that were cut apart at map-tile edges.
  const TE=360/Math.pow(2,14);
  function onTileEdge(lng,lat){
    const x=(lng+180)/TE, fx=Math.abs(x-Math.round(x));
    const r=lat*Math.PI/180, y=(1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2*Math.pow(2,14), fy=Math.abs(y-Math.round(y));
    return fx<1e-3||fy<1e-3;
  }
  function inRing(pt,ring){let c=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>pt[1])!==(b[1]>pt[1])&&pt[0]<(b[0]-a[0])*(pt[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
  function touches(p,q){
    for(const a of p[0])for(const b of q[0])
      if(Math.abs(a[0]-b[0])<1.5e-5&&Math.abs(a[1]-b[1])<1.5e-5&&onTileEdge(a[0],a[1]))return true;
    return false;
  }
  function pickBuilding(b){
    const pt=map.project([b.lng,b.lat]),R=60;
    const feats=map.queryRenderedFeatures([[pt.x-R,pt.y-R],[pt.x+R,pt.y+R]]).filter(f=>f.sourceLayer==='building'&&f.geometry&&/Polygon/.test(f.geometry.type));
    const polys=[];feats.forEach(f=>{const g=f.geometry;(g.type==='Polygon'?[g.coordinates]:g.coordinates).forEach(c=>polys.push(c))});
    let best=null,bs=1e9;
    polys.forEach(p=>{
      let sc;
      if(inRing([b.lng,b.lat],p[0]))sc=0;
      else{sc=1e9;p[0].forEach(v=>{const q=map.project(v);sc=Math.min(sc,Math.hypot(q.x-pt.x,q.y-pt.y))})}
      if(sc<bs){bs=sc;best=p}
    });
    if(!best||bs>40)return null;
    const set=[best];let grew=true;
    while(grew){grew=false;polys.forEach(p=>{if(!set.includes(p)&&set.some(q=>touches(p,q))){set.push(p);grew=true}})}
    return {type:'MultiPolygon',coordinates:set};
  }

  function addOutline(b,geom){
    const id='o-'+b.id,[fill,line]=COLORS[b.kind]||COLORS.video;
    map.addSource(id,{type:'geojson',data:{type:'Feature',geometry:geom}});
    map.addLayer({id:id+'-f',type:'fill',source:id,paint:{'fill-color':fill,'fill-opacity':0.9}});
    map.addLayer({id:id+'-l',type:'line',source:id,paint:{'line-color':line,'line-width':2,'line-dasharray':b.kind==='site'?[2,2]:[1]}});
    map.on('click',id+'-f',()=>open(b));
    map.on('mouseenter',id+'-f',()=>map.getCanvas().style.cursor='pointer');
    map.on('mouseleave',id+'-f',()=>map.getCanvas().style.cursor='');
    outlined[b.id]=true;
  }
  function sync(){
    const z=map.getZoom();
    B.forEach(b=>{
      if(!outlined[b.id]){
        if(b.footprint) addOutline(b,{type:'Polygon',coordinates:b.footprint});
        else if(z>=15.5){
          // Use the map's own building shape if it is loaded at this spot.
          const g=pickBuilding(b);
          if(g) addOutline(b,g);
        }
      }
      // Defer to the outline when there is one; otherwise keep the pin.
      pins[b.id].style.display=(outlined[b.id]&&z>=15.5)?'none':'';
    });
    // Hide outline layers when zoomed out so pins read clearly.
    B.forEach(b=>{if(outlined[b.id])['-f','-l'].forEach(s=>map.setLayoutProperty('o-'+b.id+s,'visibility',z>=15.5?'visible':'none'))});
  }
  map.on('idle',sync);map.on('zoomend',sync);
  map.on('error',e=>{ if(!map.loaded()) view(true) });
}catch(e){view(true)}
if(typeof maplibregl==='undefined') view(true);
