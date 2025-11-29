/* kartu_konsep.js – versi lengkap, 30 kartu konsep, flip + audio TTS */

const cardsData = [
  {title:"Gelombang Mekanik", text:"Getaran yang merambat melalui medium dan membawa energi tanpa memindahkan materi."},
  {title:"Gelombang Elektromagnetik", text:"Tidak membutuhkan medium; contoh: cahaya, radio, dan sinar-X."},
  {title:"Amplitudo", text:"Jauh maksimum dari titik keseimbangan; menentukan besar energi gelombang."},
  {title:"Frekuensi", text:"Jumlah getaran per detik; makin besar frekuensi makin tinggi nadanya."},
  {title:"Periode", text:"Waktu satu getaran; T = 1/f."},
  {title:"Panjang Gelombang", text:"Jarak antara dua puncak berturut-turut; berbanding terbalik dengan frekuensi."},
  {title:"Cepat Rambat", text:"v = f × λ; ditentukan oleh medium, bukan sumber bunyi."},
  {title:"Resonansi", text:"Terjadi saat frekuensi gaya luar sama dengan frekuensi alami suatu benda."},
  {title:"Frekuensi Alami", text:"Frekuensi khas suatu benda saat bergetar bebas."},
  {title:"Gelombang Longitudinal", text:"Partikel bergerak sejajar arah rambat."},
  {title:"Gelombang Transversal", text:"Partikel bergerak tegak lurus arah rambat."},
  {title:"Interferensi", text:"Perpaduan dua gelombang yang memperkuat atau melemahkan satu sama lain."},
  {title:"Superposisi", text:"Resultan gelombang adalah jumlah aljabar gelombang penyusunnya."},
  {title:"Gelombang Stasioner", text:"Terbentuk dari gelombang datang dan pantul; memiliki simpul dan perut."},
  {title:"Intensitas Suara", text:"Energi per luas per waktu; berbanding lurus dengan amplitudo kuadrat."},
  {title:"Tingkat Bunyi (dB)", text:"Ukuran keras-lembut suara dalam skala logaritmik."},
  {title:"Amplitudo RMS", text:"Ukuran energi efektif sinyal; makin besar RMS makin kuat bunyinya."},
  {title:"Redaman", text:"Penurunan amplitudo karena gesekan atau hambatan."},
  {title:"Impedansi Akustik", text:"Hambatan medium terhadap rambatan suara."},
  {title:"Efek Doppler", text:"Perubahan frekuensi karena gerak relatif sumber dan pendengar."},
  {title:"FFT", text:"Menguraikan sinyal menjadi komponen frekuensi."},
  {title:"Harmonik", text:"Kelipatan frekuensi dasar pada sistem bergetar."},
  {title:"Spektrum Suara", text:"Distribusi energi berdasarkan frekuensi."},
  {title:"Fase Gelombang", text:"Menentukan posisi relatif dua gelombang dalam satu siklus."},
  {title:"Kepadatan Medium", text:"Mempengaruhi cepat rambat gelombang."},
  {title:"Udara Panas", text:"Meningkatkan kecepatan bunyi karena molekul bergerak lebih cepat."},
  {title:"Resonansi Gelas", text:"Gelas pecah jika terkena frekuensi yang cocok dengan frekuensi alaminya."},
  {title:"Nada Dasar", text:"Frekuensi utama suara; menentukan tinggi nada."},
  {title:"Kebisingan", text:"Suara acak tanpa pola harmonik yang jelas."}
];

// ============== BIKIN KARTU ==============
const grid = document.getElementById("cardGrid");
const search = document.getElementById("search");
const topicFilter = document.getElementById("topicFilter");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

let currentPage = 1;
const pageSize = 8;

let filteredCards = [...cardsData];

// ============== TTS (Dengarkan) ==============
function speakText(text){
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  synth.cancel();
  synth.speak(utter);
}

// ============== RENDER KARTU ==============
function renderCards(){
  grid.innerHTML = "";
  
  const start = (currentPage - 1) * pageSize;
  const pageItems = filteredCards.slice(start, start + pageSize);

  pageItems.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";

    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <h2>${card.title}</h2>
        </div>

        <div class="card-back">
          <p>${card.text}</p>
          <button class="listen">▶ Dengarkan</button>
        </div>
      </div>
    `;

    cardEl.addEventListener("click", (e) => {
      if(e.target.classList.contains("listen")) return;
      cardEl.classList.toggle("flipped");
    });

    cardEl.querySelector(".listen").addEventListener("click", () => {
      speakText(`${card.title}. ${card.text}`);
    });

    grid.appendChild(cardEl);
  });

  const totalPages = Math.ceil(filteredCards.length / pageSize);
  pageInfo.textContent = `${currentPage} / ${totalPages}`;

  prevPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === totalPages;
}

renderCards();

// ============== FILTER SEARCH ==============
function applyFilter(){
  const q = search.value.toLowerCase();
  filteredCards = cardsData.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.text.toLowerCase().includes(q)
  );
  currentPage = 1;
  renderCards();
}

search.addEventListener("input", applyFilter);

// ============== SHUFFLE ==============
shuffleBtn.addEventListener("click", () => {
  for(let i = filteredCards.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
  }
  currentPage = 1;
  renderCards();
});

// ============== RESET ==============
resetBtn.addEventListener("click", () => {
  search.value = "";
  filteredCards = [...cardsData];
  currentPage = 1;
  renderCards();
});

// ============== PAGING ==============
prevPage.addEventListener("click", () => {
  currentPage--;
  renderCards();
});
nextPage.addEventListener("click", () => {
  currentPage++;
  renderCards();
});
