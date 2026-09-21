/* Live prices for the ticker. DexScreener is free, keyless and CORS-open, and
   it is the same source the bot uses. Everything here is defensive: the page
   already renders a usable row, so a failure leaves the em dashes alone. */
(function(){
  var MINTS=[
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', /* BONK     */
    'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', /* WIF      */
    '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr', /* POPCAT   */
    'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5',  /* MEW      */
    'ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82',  /* BOME     */
    '63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9', /* GIGA     */
    '2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump', /* PNUT     */
    '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump'  /* FARTCOIN */
  ];
  var track=document.getElementById('ticker');
  if(!track||!window.fetch)return;

  function token(p){
    var sym=String(p.baseToken.symbol||'').trim().replace(/^\$/,'').toUpperCase().slice(0,12);
    var ch=p.priceChange&&typeof p.priceChange.h24==='number'?p.priceChange.h24:null;
    var img=p.info&&p.info.imageUrl;

    var el=document.createElement('span'); el.className='tok';
    var av=document.createElement('span'); av.className='av';
    av.style.background='#2A1B3D'; av.textContent=sym.charAt(0);
    if(img){
      var i=document.createElement('img');
      i.alt=''; i.referrerPolicy='no-referrer';
      /* Appended straight away, and no loading="lazy": a detached lazy image
         never starts loading, which is why these were all letters. */
      i.onerror=function(){ i.remove(); };
      i.src=img;
      av.appendChild(i);
    }
    var nm=document.createElement('span'); nm.className='nm'; nm.textContent=sym;
    var pc=document.createElement('span'); pc.className='pc';
    if(ch===null){ pc.textContent='\u2014'; }
    else { pc.textContent=(ch>=0?'+':'')+ch.toFixed(1)+'%'; pc.className='pc '+(ch>=0?'up':'down'); }
    el.appendChild(av); el.appendChild(nm); el.appendChild(pc);
    return el;
  }

  fetch('https://api.dexscreener.com/latest/dex/tokens/'+MINTS.join(','))
    .then(function(r){ return r.ok?r.json():Promise.reject(r.status); })
    .then(function(d){
      var pairs=(d&&d.pairs)||[], best={};
      pairs.forEach(function(p){
        if(!p||p.chainId!=='solana'||!p.baseToken)return;
        var a=p.baseToken.address, liq=(p.liquidity&&p.liquidity.usd)||0;
        /* One token has many pools; the deepest is the honest price. Pools
           that report no 24h change lose to ones that do, whatever their
           depth -- otherwise the deepest pool can leave a bare dash. */
        var has=!!(p.priceChange&&typeof p.priceChange.h24==='number');
        var cur=best[a];
        if(!cur||(has&&!cur.has)||(has===cur.has&&liq>cur.liq))best[a]={liq:liq,p:p,has:has};
      });
      var rows=MINTS.map(function(m){return best[m];}).filter(Boolean).map(function(x){return x.p;});
      if(rows.length<3)return;

      track.textContent='';
      /* Twice through, so translateX(-50%) lands exactly on the repeat. */
      for(var pass=0;pass<2;pass++){
        rows.forEach(function(p){
          var t=token(p);
          if(pass)t.setAttribute('aria-hidden','true');
          track.appendChild(t);
        });
      }
    })
    .catch(function(){ /* em dashes stay */ });
})();
