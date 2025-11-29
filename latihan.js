/* ==========================
   BACKSOUND CONTROL
========================== */

const bgm = document.getElementById("bgm");
const bgmToggle = document.getElementById("bgmToggle");
let bgmOn = false;

bgm.volume = 0.35;

bgmToggle.onclick = () => {
  bgmOn = !bgmOn;
  if(bgmOn){
    bgm.play().catch(()=>{});
    bgmToggle.textContent = "🔊 Backsound: ON";
  } else {
    bgm.pause();
    bgmToggle.textContent = "🔇 Backsound: OFF";
  }
};


/* ==========================
   NAVIGATION
========================== */

document.getElementById("backSim").onclick = () => {
  window.location.href = "menu.html";
};
document.getElementById("toSimResult").onclick = () => {
  window.location.href = "menu.html";
};


/* ==========================
   QUIZ DATA (15 soal)
========================== */

const quiz = [
  { soal:"Frekuensi 2× lipat → periode menjadi…", opsi:["Tetap","2×","1/2"], jawaban:2, pemb:"T = 1/f sehingga frekuensi naik → periode turun."},
  { soal:"Jika amplitudo naik → intensitas…", opsi:["Tetap","Naik","Turun"], jawaban:1, pemb:"I ∝ A² sehingga amplitudo naik → intensitas naik."},

  { soal:"Bunyi dapat merambat di ruang hampa.", opsi:["Benar","Salah"], jawaban:1, pemb:"Suara butuh medium."},
  { soal:"Cahaya termasuk gelombang…", opsi:["Mekanik","Transversal"], jawaban:1, pemb:"Cahaya = elektromagnetik & transversal."},

  { soal:"λ = 2 m, f = 200 Hz. Cepat rambat?", opsi:["200 m/s","400 m/s","100 m/s"], jawaban:1, pemb:"v = fλ = 200×2 = 400 m/s."},
  { soal:"f = 500 Hz → periode?", opsi:["0.5 s","0.02 s","0.002 s"], jawaban:2, pemb:"T = 1/500 = 0.002 s."},

  { soal:"Resonansi terjadi saat…", opsi:["Frekuensi sama","Amplitudo sama"], jawaban:0, pemb:"Frekuensi harus SAMA."},
  { soal:"Gelas pecah jika…", opsi:["Suara kecil","Frekuensi cocok"], jawaban:1, pemb:"Resonansi = frekuensi cocok."},

  { soal:"Grafik amplitudo puncak menunjukkan…", opsi:["Resonansi","Energi nol"], jawaban:0, pemb:"Puncak amplitude = resonansi."},

  { soal:"Garpu tala identik akan…", opsi:["Diam","Ikut bergetar"], jawaban:1, pemb:"Resonansi antar garpu tala."},
  { soal:"Mode lebih tinggi → panjang kolom udara…", opsi:["Lebih panjang","Lebih pendek"], jawaban:1, pemb:"Frekuensi naik → λ turun → L turun."}  
];


/* ==========================
   QUIZ ENGINE
========================== */

let nomor = 0;
let score = 0;

const numberEl = document.getElementById("number");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const explainEl = document.getElementById("explain");
const nextBtn = document.getElementById("nextBtn");

function renderSoal(){
  const q = quiz[nomor];

  numberEl.textContent = `Soal ${nomor+1} / ${quiz.length}`;
  questionEl.textContent = q.soal;

  choicesEl.innerHTML = "";
  explainEl.style.display = "none";
  nextBtn.style.display = "none";

  q.opsi.forEach((ops, i)=>{
    const btn = document.createElement("div");
    btn.className = "choice";
    btn.textContent = ops;

    btn.onclick = () => pilih(i, btn);

    choicesEl.appendChild(btn);
  });
}

renderSoal();

function pilih(i, ele){
  const benar = quiz[nomor].jawaban;

  if(i === benar){
    ele.classList.add("correct");
    score++;
    confetti({particleCount:70, spread:70});
  } else {
    ele.classList.add("wrong");
  }

  explainEl.style.display = "block";
  explainEl.textContent = quiz[nomor].pemb;

  Array.from(document.getElementsByClassName("choice")).forEach(c => c.onclick = null);

  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  nomor++;
  if(nomor >= quiz.length){
    selesai();
  } else {
    renderSoal();
  }
};


/* ==========================
   RESULT
========================== */

function selesai(){
  document.getElementById("quizCard").style.display = "none";
  document.getElementById("resultBox").style.display = "block";
  document.getElementById("scoreVal").textContent = `Skor Kamu: ${score}/${quiz.length}`;
}
