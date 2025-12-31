/* ================================
   🔐 ÖZEL ŞİFRE EKRANI
================================ */
const PASSWORD = "120824";

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const error = document.getElementById("passwordError");
  const screen = document.getElementById("passwordScreen");
  const card = document.getElementById("card");

  if (input === PASSWORD) {
    screen.style.transition = "opacity 0.8s ease";
    screen.style.opacity = 0;

    setTimeout(() => {
      screen.style.display = "none";
      card.classList.remove("hidden");
    }, 800);
  } else {
    error.innerText = "❌ Şifre yanlış";
    error.style.display = "block";
  }
}

/* ================================
   🎁 PARÇALI KUTU (5x5)
================================ */
const pieces = document.querySelectorAll(".piece");
const size = 100;

pieces.forEach((piece, i) => {
  const row = Math.floor(i / 5);
  const col = i % 5;

  piece.style.width = size + "px";
  piece.style.height = size + "px";
  piece.style.position = "absolute";
  piece.style.top = row * size + "px";
  piece.style.left = col * size + "px";
  piece.style.backgroundPosition = `-${col * size}px -${row * size}px`;
  piece.style.opacity = 0;
});

/* ================================
   🎄 KART → KUTU + MÜZİK
================================ */
function showGiftBox() {
  const card = document.getElementById("card");
  const gift = document.getElementById("giftWrapper");
  const lights = document.querySelectorAll(".light");
  const music = document.getElementById("bgMusic");

  music.volume = 0;
  music.play().catch(()=>{});
  let vol=0;
  const fade=setInterval(()=>{
    if(vol<0.6){vol+=0.02;music.volume=vol;} else{clearInterval(fade);}
  },100);

  card.style.transition = "opacity 0.6s ease";
  card.style.opacity = 0;
  card.style.pointerEvents = "none";

  setTimeout(()=>{
    card.style.display = "none";
    gift.classList.remove("hidden");

    lights.forEach((light,i)=>{
      setTimeout(()=>light.classList.add("active"),i*300);
    });
  },600);
}

/* ================================
   🎁 KUTU → KALP ATIŞI + KAYBOL
================================ */
function explodeGift() {
  const wrapper = document.getElementById("giftWrapper");
  const giftImage = document.getElementById("giftImage");
  const glow = document.querySelector(".glow");

  wrapper.onclick = null;
  wrapper.style.cursor = "default";

  if(glow){
    glow.style.transition = "opacity 0.3s ease";
    glow.style.opacity = 0;
  }

  // KALP ATIŞI ANİMASYONU
  let beatCount = 0;
  const heartbeat = setInterval(() => {
    if (beatCount < 3) {
      // Büyü - küçül
      giftImage.style.transition = "transform 0.15s ease-in-out";
      giftImage.style.transform = "scale(1.15)";
      
      setTimeout(() => {
        giftImage.style.transform = "scale(1)";
      }, 150);
      
      beatCount++;
    } else {
      clearInterval(heartbeat);
      
      // Kalp atışları bittikten sonra kaybol
      setTimeout(() => {
        giftImage.style.transition = "all 1.2s ease-out";
        giftImage.style.transform = "scale(1.3)";
        giftImage.style.opacity = 0;
        
        setTimeout(() => {
          wrapper.style.display = "none";
        }, 1200);
      }, 200);
    }
  }, 300); // Her 300ms'de bir kalp atışı

  setTimeout(startSnow, 1500);
  setTimeout(showEnvelope, 2500);
}

/* ================================
   ✉️ ZARF / MEKTUP
================================ */
function showEnvelope() {
  document.getElementById("envelope").classList.remove("hidden");
}

function openEnvelope() {
  const env = document.getElementById("envelope");
  const photo = document.getElementById("photoContainer");

  // Zarfı yukarı kaldır ve döndür (açılma efekti)
  env.style.transition = "all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  env.style.transform = "translate(-50%, -150%) rotateX(25deg) scale(0.7)";
  env.style.opacity = 0;

  // Fotoğraf aşağıdan yukarı çıksın
  setTimeout(() => {
    env.style.display = "none";
    photo.classList.remove("hidden");
    photo.style.transform = "translate(-50%, 150%)";
    photo.style.opacity = 0;
    
    // Fotoğrafı merkeze getir
    setTimeout(() => {
      photo.style.transition = "all 1s ease-out";
      photo.style.transform = "translate(-50%, -50%)";
      photo.style.opacity = 1;
    }, 50);
    
    startTyping();
  }, 600);
}

/* ================================
   📷 FOTO → YAZI (Gelişmiş Typing)
================================ */
function startTyping() {
  const el = document.getElementById("letterText");
  if(el.textContent.length>0) return;

  const message=`Biriciğim, seni çok seviyorum. Hayatıma girdiğin gün anladım ki sensiz geçen zamanın aslında hiçbir anlamı yokmuş. Sen gelip hayatıma sanki sihirli bir değnek dokundun. Bana hissettirdiğin her güzel duygu, verdiğin güven, asla esirgemediğin destek, bana karşı duyduğun saygı ve büyük aşkın için teşekkür ederim. Ömür boyu, senden önceki eksikliği bilerek ama seninle kurduğum bu mükemmel hayata odaklanarak yaşamayı diliyorum. Aşkım, nice mutlu beraber senelere… ❤️`;

  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '|';
  el.appendChild(cursor);

  const interval = setInterval(() => {
    if (i < message.length) {
      // Cursor'u kaldır, harfi ekle, cursor'u geri koy
      cursor.remove();
      
      const char = message[i];
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'letter-appear';
      el.appendChild(span);
      el.appendChild(cursor);
      
      // Yumuşak scroll
      el.scrollTop = el.scrollHeight;
      
      i++;
      
      // Rastgele hız değişimi (daha gerçekçi)
      const randomDelay = Math.random() * 30 + 25; // 25-55ms arası
      if (char === ',' || char === '.' || char === '…') {
        // Noktalama işaretlerinde duraklama
        setTimeout(() => {}, 300);
      }
    } else {
      cursor.remove();
      clearInterval(interval);
      startHeartRain();
    }
  }, 80); // 40'tan 80'e çıkarıldı - daha yavaş
}

/* ================================
   ❄️ KAR YAĞIŞI
================================ */
let snowStarted=false;
function startSnow(){
  if(snowStarted) return;
  snowStarted=true;

  const interval=setInterval(()=>{
    const snow=document.createElement("div");
    snow.className="snowflake";
    snow.innerText="❄️";

    snow.style.position="fixed";
    snow.style.left=Math.random()*window.innerWidth+"px";
    snow.style.top="-20px";
    snow.style.fontSize=10+Math.random()*12+"px";
    snow.style.opacity=0.8;
    snow.style.animation=`fall ${6+Math.random()*4}s linear forwards`;

    document.body.appendChild(snow);
    setTimeout(()=>snow.remove(),10000);
  },300);

  setTimeout(()=>clearInterval(interval),20000);
}

/* ================================
   ❤️ KALP YAĞMURU
================================ */
let heartRainStarted=false;
function startHeartRain(){
  if(heartRainStarted) return;
  heartRainStarted=true;

  const interval=setInterval(()=>{
    const heart=document.createElement("div");
    heart.innerText="❤️";
    heart.style.position="fixed";
    heart.style.left=Math.random()*window.innerWidth+"px";
    heart.style.top="-20px";
    heart.style.fontSize=16+Math.random()*20+"px";
    heart.style.opacity=Math.random();
    heart.style.animation="heartFall 6s linear forwards";

    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),7000);
  },250);

  setTimeout(()=>clearInterval(interval),90000);
}
