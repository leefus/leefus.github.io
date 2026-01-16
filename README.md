[index.html](https://github.com/user-attachments/files/24682275/index.html)
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mossy Oak GO — Functional Demo</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- =========================
       STYLES (unchanged except tiny fixes)
       ========================= -->
  <style>
    :root {
      --mo-black:#0a0a0a; --mo-charcoal:#141414; --mo-dark:#181818;
      --mo-medium:#232323; --mo-elevated:#2f2f2f;
      --mo-green:#4a5d23; --mo-green-bright:#6b8c2a; --mo-red:#e50914;
      --text-white:#fff; --text-gray-100:#e5e5e5; --text-gray-300:#b3b3b3; --text-gray-500:#808080;
      --nav-height:68px; --nav-height-mobile:60px; --content-gutter:4%; --card-radius:4px;
    }
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Barlow',sans-serif;background:var(--mo-charcoal);color:#fff;overflow-x:hidden;padding-bottom:80px}
    body.modal-open{overflow:hidden}
    .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem 1.4rem;border:none;border-radius:4px;font-weight:600;cursor:pointer}
    .btn-play{background:#fff;color:#000}
    .btn-glass{background:rgba(109,109,110,.7);color:#fff}
    .btn-circle{width:40px;height:40px;border-radius:50%;border:2px solid #777;background:#000;color:#fff}

    /* NAV */
    .nav{position:fixed;top:0;left:0;right:0;height:var(--nav-height);display:flex;align-items:center;justify-content:space-between;padding:0 var(--content-gutter);z-index:1000;background:linear-gradient(180deg,rgba(0,0,0,.7),transparent)}
    .nav.scrolled{background:var(--mo-charcoal)}
    .nav-brand{text-decoration:none;color:#fff;display:flex;gap:10px;align-items:center}
    .nav-logo-text{font-family:'Bebas Neue';font-size:1.6rem;line-height:1}
    .nav-links{list-style:none;display:flex;gap:20px}
    .nav-links a{color:#ccc;text-decoration:none}
    .nav-links a.active{color:#fff;font-weight:700}

    /* HERO */
    .hero{position:relative;height:85vh;min-height:600px}
    .hero img{width:100%;height:100%;object-fit:cover}
    .hero-vignette{position:absolute;inset:0;background:linear-gradient(0deg,var(--mo-charcoal),transparent 60%)}
    .hero-content{position:absolute;bottom:20%;left:var(--content-gutter);max-width:600px}
    .hero-title{font-family:'Bebas Neue';font-size:4rem;line-height:.9}

    /* ROWS */
    .content-area{margin-top:-100px}
    .row{margin-bottom:3vw;padding-left:var(--content-gutter)}
    .row-title{margin-bottom:.5rem}
    .slider{display:flex;gap:10px;overflow-x:auto;padding:30px 0}
    .card{flex:0 0 auto;width:240px;aspect-ratio:16/9;position:relative;background:#333;border-radius:4px;cursor:pointer}
    .card img{width:100%;height:100%;object-fit:cover;border-radius:4px}
    .card-info{position:absolute;bottom:0;left:0;right:0;padding:10px;background:linear-gradient(0deg,#000,transparent);opacity:0;transition:.2s}
    .card:hover .card-info{opacity:1}
    .icon-btn{width:26px;height:26px;border-radius:50%;border:none;cursor:pointer}
    .icon-btn.secondary{background:#333;color:#fff}

    /* MODAL */
    .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:2000}
    .modal-backdrop.active{display:flex}
    .modal-container{background:var(--mo-dark);width:90%;max-width:800px;max-height:90vh;overflow-y:auto;border-radius:8px;position:relative}
    .modal-close{position:absolute;top:10px;right:10px}

    /* PLAYER */
    .video-player{position:fixed;inset:0;background:#000;display:none;z-index:3000}
    .video-player.active{display:flex;align-items:center;justify-content:center}
  </style>
</head>
<body>

<nav class="nav" id="navbar">
  <a class="nav-brand" href="#">
    🌳 <div class="nav-logo-text">MOSSY OAK<br><span style="font-size:.7em;color:#6b8c2a">GO</span></div>
  </a>
  <ul class="nav-links">
    <li><a class="active" href="#">Home</a></li>
    <li><a href="#">Shows</a></li>
    <li><a href="#">Movies</a></li>
  </ul>
</nav>

<header class="hero">
  <img src="https://vhx.imgix.net/mossyoaktestaccount/assets/fe49b95e-9080-4f9e-bb67-e293f61d3693.png?auto=format&fit=crop&w=1920&h=1080" />
  <div class="hero-vignette"></div>
  <div class="hero-content">
    <h1 class="hero-title">ONX TURKEY<br>ACADEMY</h1>
    <div style="margin-top:1rem;display:flex;gap:1rem">
      <button class="btn btn-play" onclick="openPlayer()">▶ Play</button>
      <button class="btn btn-glass" onclick="openModal({title:'OnX Turkey Academy',desc:'Master turkey hunting from roost to harvest.',img:this.closest('.hero').querySelector('img').src})">More Info</button>
    </div>
  </div>
</header>

<div class="content-area">
  <div class="row">
    <h2 class="row-title">New Releases</h2>
    <div class="slider">
      <div class="card" data-title="Crappie Tips" data-desc="Find slab crappie in deep winter water." data-img="https://vhx.imgix.net/mossyoaktestaccount/assets/91501eb4-55c9-41c4-b139-64c1b83da3c3.jpg" onclick="handleCardClick(event,this)">
        <img src="https://vhx.imgix.net/mossyoaktestaccount/assets/91501eb4-55c9-41c4-b139-64c1b83da3c3.jpg" />
        <div class="card-info">
          <button class="icon-btn secondary add-list-btn">＋</button>
          <div>Crappie Tips</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MODAL -->
<div class="modal-backdrop" id="info-modal">
  <div class="modal-container">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <img id="modal-img" style="width:100%" />
    <div style="padding:1.5rem">
      <h2 id="modal-title"></h2>
      <p id="modal-desc"></p>
      <button class="btn btn-play" onclick="openPlayer()">▶ Play</button>
    </div>
  </div>
</div>

<!-- PLAYER (Vimeo OTT / VHX HLS) -->
<div class="video-player" id="video-player">
  <button onclick="closePlayer()" style="position:absolute;top:20px;left:20px;z-index:10">← Back</button>
  <video id="vhx-player" controls autoplay playsinline style="width:100%;height:100%;background:black"></video>
</div>

<script>
  /* NAV SCROLL */
  /* NAV SCROLL */
  const nav=document.getElementById('navbar');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>50));

  /* MODAL */
  const modal=document.getElementById('info-modal');
  function openModal(data){
    document.getElementById('modal-title').innerText=data.title||'';
    document.getElementById('modal-desc').innerText=data.desc||'';
    document.getElementById('modal-img').src=data.img||'';
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }
  function closeModal(){modal.classList.remove('active');document.body.classList.remove('modal-open')}

  function handleCardClick(e,card){
    if(e.target.classList.contains('add-list-btn')){
      e.stopPropagation();
      e.target.textContent='✓';
      return;
    }
    openModal({
      title:card.dataset.title,
      desc:card.dataset.desc,
      img:card.dataset.img||card.querySelector('img').src
    });
  }

  /* PLAYER */
  const player=document.getElementById('video-player');
  function openPlayer(){closeModal();player.classList.add('active')}
  function closePlayer(){player.classList.remove('active')}
</script>
<script>
  const player = document.getElementById('video-player');
  const videoEl = document.getElementById('vhx-player');
  let hls;

  function openPlayer(streamUrl) {
    closeModal();
    player.classList.add('active');

    // Cleanup old stream
    if (hls) {
      hls.destroy();
      hls = null;
    }
    videoEl.pause();
    videoEl.removeAttribute('src');

    // HLS logic
    if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari / iOS
      videoEl.src = streamUrl;
    } else if (Hls.isSupported()) {
      // Chrome / Firefox / Edge
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoEl);
    } else {
      alert('Your browser does not support HLS playback.');
    }
  }

  function closePlayer() {
    player.classList.remove('active');
    videoEl.pause();
    if (hls) {
      hls.destroy();
      hls = null;
    }
  }
</script>

</body>
</html>
