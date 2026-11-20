document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. ТЁМНЫЙ И СВЕТЛЫЙ РЕЖИМ
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('cozy-theme') || 'light';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('cozy-theme', next);
  });

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.textContent = '☀️';
      themeLabel.textContent = 'Нежный день';
    } else {
      themeIcon.textContent = '🌙';
      themeLabel.textContent = 'Ночной уют';
    }
  }

  // ==========================================
  // 2. АНИМИРОВАННЫЙ ФОН (СЕРДЕЧКИ ДНЁМ / ОГОНЬКИ НОЧЬЮ)
  // ==========================================
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.size = Math.random() * 10 + 6;
      this.speedY = Math.random() * 0.7 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.45 + 0.15;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -30) this.reset();
    }
    draw() {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      ctx.save();
      ctx.globalAlpha = this.opacity;
      if (isDark) {
        // Тёплые светлячки ночью
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = '#ffb88c';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ff85a1';
        ctx.fill();
      } else {
        // Нежные сердечки днём
        ctx.font = `${this.size + 4}px serif`;
        ctx.fillText('💗', this.x, this.y);
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < 28; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ==========================================
  // 3. ЧАШЕЧКА ЧАЯ
  // ==========================================
  const teacupTrigger = document.getElementById('teacup-trigger');
  const teaStatus = document.getElementById('tea-status');
  const teaMessages = [
    'Чай с малиной и мёдом уже заваривается... ☕',
    'Добавили щепотку тепла и двойную порцию нежности 🍯',
    'Чай с ромашкой и лимоном готов согреть тебя! 🍋',
    'Тёплый какао с маршмеллоу спешит на помощь 🍫'
  ];
  let teaIndex = 0;

  teacupTrigger.addEventListener('click', () => {
    teaIndex = (teaIndex + 1) % teaMessages.length;
    teaStatus.textContent = teaMessages[teaIndex];
  });

  // ==========================================
  // 4. АПТЕЧКА НЕЖНОСТИ: ОБНИМАШКИ И ВИТАМИНКИ
  // ==========================================
  let hugs = 0;
  const hugBtn = document.getElementById('hug-btn');
  const hugCount = document.getElementById('hug-count');

  hugBtn.addEventListener('click', () => {
    hugs++;
    hugCount.textContent = hugs;
    hugBtn.textContent = 'Крепко-крепко обнял! 🤗';
    setTimeout(() => {
      hugBtn.textContent = 'Получить ещё обнимашку';
    }, 1100);
  });

  const vitamins = [
    'Ты невероятно сильная и светлая, любая простуда перед тобой бессильна! ✨',
    'Помни: сейчас твоя главная задача — отдыхать и ни о чём не переживать 🧸',
    'Даже с красным носиком ты остаёшься самой очаровательной девушкой на свете 💕',
    'Каждый глоток тёплого чая приближает тебя к полному выздоровлению ☕',
    'Я мысленно рядом, укрываю тебя самым мягким пледом 🧣'
  ];
  const vitaminBtn = document.getElementById('vitamin-btn');
  const vitaminNote = document.getElementById('vitamin-note');

  vitaminBtn.addEventListener('click', () => {
    const randomVitamin = vitamins[Math.floor(Math.random() * vitamins.length)];
    vitaminNote.textContent = randomVitamin;
  });

  // ==========================================
  // 5. ДЫХАТЕЛЬНАЯ ПРАКТИКА
  // ==========================================
  const breathBtn = document.getElementById('breath-btn');
  const breathCircle = document.getElementById('breath-circle');
  const breathText = document.getElementById('breath-text');
  let breathingActive = false;
  let breathInterval = null;

  breathBtn.addEventListener('click', () => {
    if (breathingActive) {
      breathingActive = false;
      clearInterval(breathInterval);
      breathCircle.classList.remove('inhale');
      breathText.textContent = 'Нажми старт';
      breathBtn.textContent = 'Начать дыхание';
      return;
    }

    breathingActive = true;
    breathBtn.textContent = 'Остановить';
    runBreathCycle();
    breathInterval = setInterval(runBreathCycle, 8000);
  });

  function runBreathCycle() {
    breathText.textContent = 'Медленный вдох...';
    breathCircle.classList.add('inhale');
    setTimeout(() => {
      if (!breathingActive) return;
      breathText.textContent = 'Плавный выдох...';
      breathCircle.classList.remove('inhale');
    }, 4000);
  }

  // ==========================================
  // 6. БАНОЧКА С ПОЖЕЛАНИЯМИ
  // ==========================================
  const wishes = [
    '«Пусть эта простуда уйдёт так же быстро, как тает шоколадка в тёплых ладонях!»',
    '«Желаю тебе самого сладкого, глубокого и целебного сна под уютным одеялом.»',
    '«Скоро ты снова будешь улыбаться на все сто, а я сделаю всё, чтобы это случилось быстрее!»',
    '«Не грусти из-за болезни — просто мир решил подарить тебе пару дней законного отдыха.»',
    '«Ты моё любимое солнышко, скорее набирайся сил и возвращайся в строй!»'
  ];
  const wishJar = document.getElementById('wish-jar');
  const nextWishBtn = document.getElementById('next-wish-btn');
  const wishText = document.getElementById('wish-text');
  let wishIdx = 0;

  function showNextWish() {
    wishIdx = (wishIdx + 1) % wishes.length;
    wishText.textContent = wishes[wishIdx];
  }

  wishJar.addEventListener('click', showNextWish);
  nextWishBtn.addEventListener('click', showNextWish);

  // ==========================================
  // 7. КУПОНЫ ЗАБОТЫ
  // ==========================================
  document.querySelectorAll('.coupon').forEach((card) => {
    const btn = card.querySelector('.coupon-btn');
    btn.addEventListener('click', () => {
      card.classList.toggle('redeemed');
      if (card.classList.contains('redeemed')) {
        btn.textContent = 'Активировано! Сделай скриншот 📸';
      } else {
        btn.textContent = 'Активировать купон';
      }
    });
  });

  // ==========================================
  // 8. БЫСТРЫЙ ОТВЕТ В ЧАТ
  // ==========================================
  const copyToast = document.getElementById('copy-toast');
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', async () => {
      const msg = chip.getAttribute('data-msg');
      try {
        await navigator.clipboard.writeText(msg);
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 2600);
      } catch (err) {
        alert('Скопируй сообщение: ' + msg);
      }
    });
  });

  // ==========================================
  // 9. ГЕНЕРАТОР УЮТНОГО ШУМА ДОЖДЯ (WEB AUDIO API)
  // ==========================================
  const soundToggle = document.getElementById('sound-toggle');
  const soundLabel = document.getElementById('sound-label');
  let audioCtx = null;
  let rainNode = null;
  let isPlayingRain = false;

  soundToggle.addEventListener('click', () => {
    if (!isPlayingRain) {
      startRainSound();
      isPlayingRain = true;
      soundToggle.classList.add('active');
      soundLabel.textContent = 'Выключить дождь';
    } else {
      stopRainSound();
      isPlayingRain = false;
      soundToggle.classList.remove('active');
      soundLabel.textContent = 'Шум дождя';
    }
  });

  function startRainSound() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Мягкий розовый/коричневый шум (имитация дождя)
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 0.15;
    }

    rainNode = audioCtx.createBufferSource();
    rainNode.buffer = noiseBuffer;
    rainNode.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 650;

    rainNode.connect(filter);
    filter.connect(audioCtx.destination);
    rainNode.start();
  }

  function stopRainSound() {
    if (rainNode) {
      rainNode.stop();
      rainNode.disconnect();
    }
    if (audioCtx) {
      audioCtx.close();
    }
  }
});
