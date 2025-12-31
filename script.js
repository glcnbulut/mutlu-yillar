// 🔐 ŞİFRELİ GİRİŞ
const PASSWORD = "120825"; // ← burayı değiştir

document.addEventListener("DOMContentLoaded", () => {
  const input = prompt("🎄 Tarihimizi gir ❤️");

  if (input !== PASSWORD) {
    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background:black;
        color:white;
        font-size:22px;
        text-align:center;
      ">
        ❌ Yanlış şifre<br>
        Bu sayfa sana ait değil 💔
      </div>
    `;
  }
});


/* ================================
   🎁 PARÇALI KUTU AYARLARI (5x5)
================================ */
const pieces = document.querySelectorAll(".piece");
const size = 100; // 500 / 5 = 100px

pieces.forEach((piece, i) => {
  const row = Math.floor(i / 5);
  const col = i % 5;

  piece.style.width = size + "px";
  piece.style.height = size + "px";
  piece.style.top = row * size + "px";
  piece.style.left = col * size + "px";
  piece.style.backgroundPosition = `-${col * size}px -${row * size}px`;
});


/* ================================
   🎄 KART → KUTU GEÇİŞİ
================================ */
function showGiftBox() {
  const card = document.getElementById("card");
  const gift = document.getElementById("giftWrapper");
  const lights = document.querySelectorAll(".light");
  const music = document.getElementById("bgMusic");

  // Müziği başlat
  music.play().catch(err => console.log("Müzik çalınamadı:", err));

  card.style.opacity = 0;
  card.style.pointerEvents = "none";

  setTimeout(() => {
    card.style.display = "none";
    gift.classList.remove("hidden");
    
    // IŞIK EFEKTLERİ BAŞLASIN
    lights.forEach((light, i) => {
      setTimeout(() => {
        light.classList.add("active");
      }, i * 300);
    });
  }, 500);
}


/* ================================
   🎁 KUTU → KAR TANELERİ + ZARF
================================ */
function explodeGift() {
  const gift = document.getElementById("giftWrapper");
  gift.onclick = null; // tekrar tıklanmasın

  pieces.forEach((piece, index) => {
    setTimeout(() => {
      const x = (Math.random() - 0.5) * 400;
      const y = Math.random() * 500 + 200;
      const r = Math.random() * 360;

      piece.style.transform = `
        translate(${x}px, ${y}px)
        rotate(${r}deg)
        scale(0.2)
      `;
      piece.style.opacity = 0;
      piece.style.filter = "brightness(2)";
    }, index * 80); // Her parça yavaşça dağılsın
  });

  // ❄️ kar başlasın
  setTimeout(startSnow, 1000);

  // ✉️ zarf dönerek gelsin
  setTimeout(showEnvelope, 3000);
}


/* ================================
   ✉️ ZARF GÖSTER
================================ */
function showEnvelope() {
  const env = document.getElementById("envelope");
  env.classList.remove("hidden");
}


/* ================================
   📷 ZARF → FOTOĞRAF
================================ */
function openEnvelope() {
  const env = document.getElementById("envelope");
  const photoContainer = document.getElementById("photoContainer");

  // Zarf kaybolsun (fade out)
  env.style.transition = "opacity 0.5s ease";
  env.style.opacity = "0";

  setTimeout(() => {
    env.style.display = "none";
    
    // Fotoğraf fade + zoom ile gelsin
    photoContainer.classList.remove("hidden");
  }, 500);
}


/* ================================
   ✍️ FOTOĞRAFA TIKLA VE YAZI BAŞLASIN
================================ */
function startTyping() {
  typeLetterText();
}


/* ================================
   ✍️ MEKTUP METNİNİ TEK TEK YAZDIR
================================ */
function typeLetterText() {
  const letterElement = document.getElementById("letterText");
  
  // Eğer zaten yazıldıysa tekrar yazma
  if (letterElement.textContent.length > 0) return;

  const message = `Biriciğim, seni çok seviyorum. Hayatıma girdiğin gün anladım ki sensiz geçen zamanın aslında hiçbir anlamı yokmuş. Sen gelip hayatıma sanki sihirli bir değnek dokundun. Bana hissettirdiğin her güzel duygu, verdiğin güven, asla esirgemediğin destek, bana karşı duyduğun saygı ve büyük aşkın için teşekkür ederim. Ömür boyu, senden önceki eksikliği bilerek ama seninle kurduğum bu mükemmel hayata odaklanarak yaşamayı diliyorum. Aşkım, nice mutlu beraber senelere… ❤️`;

  let index = 0;

  const typeInterval = setInterval(() => {
    if (index < message.length) {
      letterElement.textContent += message[index];
      index++;
    } else {
      clearInterval(typeInterval);
    }
  }, 40); // Her harf 40ms'de bir
}


/* ================================
   ❄️ KAR YAĞIŞI (TEK KEZ)
================================ */
let snowStarted = false;

function startSnow() {
  if (snowStarted) return;
  snowStarted = true;

  setInterval(() => {
    const snow = document.createElement("div");
    snow.className = "snowflake";
    snow.innerText = "❄️";

    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.animationDuration = 6 + Math.random() * 4 + "s";
    snow.style.fontSize = 10 + Math.random() * 10 + "px";

    document.body.appendChild(snow);

    setTimeout(() => snow.remove(), 10000);
  }, 300);
}
