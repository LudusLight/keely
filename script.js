// ============================================
// KEELY'S WHIMSICAL SITE — ALL THE FUN
// ============================================

(function() {
  "use strict";

  // ========== GLOBALS ==========
  let soundEnabled = false;
  let audioCtx = null;
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // ========== INIT ==========
  document.addEventListener("DOMContentLoaded", () => {
    initTimeGreeting();
    initDayMood();
    initVisitCounter();
    initSeasonalTheme();
    initTypewriter();
    initScrollProgress();
    initNavScroll();
    initParallax();
    initScrollObserver();
    initBouncingHeaders();
    initCrumbTrail();
    initClickBurst();
    initMouseCompanion();
    initCardTilt();
    initSoundToggle();
    initIntroOverlay();
    initCheeseStarfield();
    initOracle();
    initNameGen();
    initArcadeTabs();
    initMaze();
    initSnake();
    initWhack();
    initClicker();
    initCatsweeper();
    initWordSearch();
    initDressUp();
    initMatch3();
    initPeggle();
    initDoodleJump();
    initPicross();
    initGallery();
    initQuiz();
    initContactForm();
    initFarewellScene();
    initMouseHole();
    initEasterEggs();
    initSmoothScroll();
  });

  // ========== SMOOTH SCROLL ==========
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const t = $(link.getAttribute("href"));
        if (t) t.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // ========== SCROLL PROGRESS ==========
  function initScrollProgress() {
    const bar = $("#scroll-progress");
    window.addEventListener("scroll", () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = pct + "%";
    });
  }

  // ========== TIME GREETING ==========
  function initTimeGreeting() {
    const h = new Date().getHours();
    let greeting;
    if (h >= 5 && h < 12) greeting = "Good morning";
    else if (h >= 12 && h < 17) greeting = "Good afternoon";
    else if (h >= 17 && h < 21) greeting = "Good evening";
    else greeting = "Good night";
    const el = $("#time-greeting");
    if (el) el.textContent = greeting;
  }

  // ========== DAY OF WEEK MOOD ==========
  function initDayMood() {
    const moods = [
      { label: "Sunday Snooze 😴", fill: 60 },
      { label: "Mildly Melted 🫠", fill: 40 },
      { label: "Warming Up 🧈", fill: 55 },
      { label: "Mid-Week Munch 🍽️", fill: 70 },
      { label: "Almost There 🏃", fill: 80 },
      { label: "MAXIMUM CHEESE 🧀🧀🧀", fill: 100 },
      { label: "Brie-zy Vibes 😌", fill: 75 }
    ];
    const day = new Date().getDay();
    const mood = moods[day];
    const label = $("#mood-label");
    const fill = $("#mood-fill");
    if (label) label.textContent = mood.label;
    if (fill) fill.style.setProperty("--mood-width", mood.fill + "%");
  }

  // ========== VISIT COUNTER ==========
  function initVisitCounter() {
    let count = parseInt(localStorage.getItem("keely-visits") || "0");
    count++;
    localStorage.setItem("keely-visits", count);
    const el = $("#visit-message");
    if (!el) return;
    if (count === 1) el.textContent = "First time here? Grab some brie and stay a while! 🧀";
    else if (count <= 5) el.textContent = `Welcome back for visit #${count}! The cheese missed you. 🐭`;
    else if (count <= 20) el.textContent = `Visit #${count}! You're officially a loyal cheese friend. 💛`;
    else el.textContent = `Visit #${count}! You're an honorary mouse at this point. 🐭👑`;
  }

  // ========== SEASONAL THEME ==========
  function initSeasonalTheme() {
    const month = new Date().getMonth();
    const particles = $$("#cheese-particles .particle");
    let seasonEmojis;
    if (month >= 2 && month <= 4) seasonEmojis = ["🧀", "🌸", "🌷", "🧀", "🐭", "🌼", "🧀"];
    else if (month >= 5 && month <= 7) seasonEmojis = ["🧀", "☀️", "🌻", "🧀", "🐭", "🧀", "🌴"];
    else if (month >= 8 && month <= 10) seasonEmojis = ["🧀", "🍂", "🍁", "🧀", "🐭", "🎃", "🧀"];
    else seasonEmojis = ["🧀", "❄️", "⛄", "🧀", "🐭", "✨", "🧀"];
    particles.forEach((p, i) => { p.textContent = seasonEmojis[i] || "🧀"; });

    // Holiday check
    const date = new Date();
    const md = `${date.getMonth()}-${date.getDate()}`;
    if (md === "9-31") document.body.classList.add("holiday-halloween");
    else if (md === "1-14") document.body.classList.add("holiday-valentine");
    else if (md === "5-4") document.body.classList.add("holiday-cheese-day");
  }

  // ========== TYPEWRITER ==========
  function initTypewriter() {
    const el = $("#hero-subtitle");
    if (!el) return;
    const text = "Welcome to my little corner of the internet — where the cheese is always free and the vibes are immaculate.";
    let i = 0;
    el.innerHTML = '<span class="typewriter-cursor"></span>';
    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          el.innerHTML = text.slice(0, i + 1) + '<span class="typewriter-cursor"></span>';
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            const cursor = el.querySelector(".typewriter-cursor");
            if (cursor) cursor.remove();
          }, 3000);
        }
      }, 35);
    }, 1200);
  }

  // ========== BOUNCING HEADERS ==========
  function initBouncingHeaders() {
    $$(".bounce-header").forEach(h2 => {
      const text = h2.textContent;
      h2.textContent = "";
      h2.dataset.original = text;
      text.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        h2.appendChild(span);
      });
    });
  }

  // ========== SCROLL OBSERVER ==========
  function initScrollObserver() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        // Reveal cards
        if (el.classList.contains("about-card") || el.classList.contains("fav-card") ||
            el.classList.contains("fact-card") || el.classList.contains("diary-card")) {
          el.classList.add("visible");
          playPop();
        }

        // Bouncing headers
        if (el.classList.contains("section-header")) {
          const h2 = el.querySelector(".bounce-header");
          if (h2) {
            h2.querySelectorAll(".letter").forEach((span, i) => {
              span.style.animationDelay = (i * 0.03) + "s";
            });
          }
          const svg = el.querySelector(".squiggly-svg");
          if (svg) svg.classList.add("drawn");
        }

        // Scroll counters
        if (el.classList.contains("fact-number")) {
          const target = parseInt(el.textContent);
          if (!isNaN(target) && target > 0) {
            let current = 0;
            const interval = setInterval(() => {
              current++;
              el.textContent = String(current).padStart(2, "0");
              if (current >= target) clearInterval(interval);
            }, 80);
          }
        }

        observer.unobserve(el);
      });
    }, { threshold: 0.15 });

    $$(".about-card, .fav-card, .fact-card, .diary-card, .section-header, .fact-number").forEach(el => {
      observer.observe(el);
    });
  }

  // ========== NAV SCROLL ==========
  function initNavScroll() {
    const nav = $("nav");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.style.background = "rgba(253,246,227,0.95)";
        nav.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
      } else {
        nav.style.background = "rgba(253,246,227,0.85)";
        nav.style.boxShadow = "none";
      }
    });
  }

  // ========== PARALLAX ==========
  function initParallax() {
    const cheeseBg = $(".cheese-bg");
    if (!cheeseBg) return;
    document.addEventListener("mousemove", e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      cheeseBg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ========== CRUMB TRAIL ==========
  function initCrumbTrail() {
    const container = $("#crumb-container");
    if (!container) return;
    let lastTime = 0;
    let crumbCount = 0;
    document.addEventListener("mousemove", e => {
      const now = Date.now();
      if (now - lastTime < 50) return;
      lastTime = now;
      if (crumbCount > 25) return;
      crumbCount++;
      const crumb = document.createElement("span");
      crumb.className = "crumb";
      crumb.style.left = e.pageX + "px";
      crumb.style.top = e.pageY + "px";
      container.appendChild(crumb);
      crumb.addEventListener("animationend", () => { crumb.remove(); crumbCount--; });
    });
  }

  // ========== CLICK BURST ==========
  function initClickBurst() {
    document.addEventListener("click", e => {
      const emojis = ["🧀", "✨", "💛", "⭐", "🐭"];
      for (let i = 0; i < 6; i++) {
        const p = document.createElement("span");
        p.className = "burst-particle";
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = (Math.PI * 2 * i) / 6;
        const dist = 30 + Math.random() * 50;
        p.style.left = e.clientX + "px";
        p.style.top = e.clientY + "px";
        p.style.setProperty("--bx", Math.cos(angle) * dist + "px");
        p.style.setProperty("--by", Math.sin(angle) * dist + "px");
        document.body.appendChild(p);
        p.addEventListener("animationend", () => p.remove());
      }
    });
  }

  // ========== MOUSE COMPANION ==========
  function initMouseCompanion() {
    const companion = $("#mouse-companion");
    if (!companion) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    let lastDir = 1;

    document.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      if (!companion.classList.contains("active")) companion.classList.add("active");
    });

    function animate() {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      const dir = mx > cx ? 1 : -1;
      if (Math.abs(mx - cx) > 2) lastDir = dir;
      companion.style.left = (cx + 25) + "px";
      companion.style.top = (cy + 25) + "px";
      companion.style.transform = `scaleX(${lastDir})`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ========== CARD TILT ==========
  function initCardTilt() {
    $$(".tilt-card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ========== SOUND SYSTEM ==========
  function initSoundToggle() {
    const btn = $("#sound-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      btn.textContent = soundEnabled ? "🔊" : "🔇";
      if (soundEnabled && !audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    });
  }

  function playSqueak() {
    if (!soundEnabled || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = "sine";
    osc.frequency.value = 1800 + Math.random() * 400;
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    osc.start(); osc.stop(audioCtx.currentTime + 0.06);
  }

  function playPop() {
    if (!soundEnabled || !audioCtx) return;
    const bufferSize = audioCtx.sampleRate * 0.08;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const source = audioCtx.createBufferSource();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();
    source.buffer = buffer;
    filter.type = "bandpass"; filter.frequency.value = 800;
    gain.gain.value = 0.06;
    source.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
    source.start();
  }

  function playCelebration() {
    if (!soundEnabled || !audioCtx) return;
    [440, 554, 659].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.type = "sine"; osc.frequency.value = freq;
      const t = audioCtx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.start(t); osc.stop(t + 0.2);
    });
  }

  // ========== INTRO OVERLAY ==========
  function initIntroOverlay() {
    const overlay = $("#intro-overlay");
    if (!overlay) return;
    if (sessionStorage.getItem("keely-intro-seen")) {
      overlay.classList.add("hidden");
      return;
    }
    sessionStorage.setItem("keely-intro-seen", "true");
    setTimeout(() => overlay.classList.add("done"), 2500);
    setTimeout(() => overlay.classList.add("hidden"), 3200);
  }

  // ========== CHEESE STARFIELD ==========
  function initCheeseStarfield() {
    const container = $("#cheese-starfield");
    if (!container) return;
    for (let i = 0; i < 18; i++) {
      const star = document.createElement("div");
      star.className = "cheese-star";
      const size = 20 + Math.random() * 60;
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.setProperty("--dur", (4 + Math.random() * 6) + "s");
      star.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(star);
    }
  }

  // ========== CHEESE ORACLE ==========
  function initOracle() {
    const askBtn = $("#oracle-ask");
    const ballBody = $(".ball-body");
    const triangle = $("#oracle-triangle");
    const answerEl = $("#oracle-answer");
    const input = $("#oracle-question");
    if (!askBtn || !ballBody) return;

    const fortunes = [
      { short: "YES", text: "The Brie says... absolutely yes, but wear comfy shoes." },
      { short: "ASK AGAIN", text: "The Cheddar is skeptical. Try again after lunch." },
      { short: "GOUDA YES", text: "Gouda news: the answer is yes!" },
      { short: "NO", text: "The Swiss says no — too many holes in your plan." },
      { short: "MAYBE", text: "Mozzarella stretches toward... maybe." },
      { short: "YES", text: "The Parmesan has aged this carefully. Yes." },
      { short: "NOT YET", text: "Camembert whispers... not today, but soon." },
      { short: "OH YES", text: "Blue cheese says: embrace the chaos. Yes!" },
      { short: "UNCLEAR", text: "Feta feels crumbly about this. Ask again." },
      { short: "DEFINITELY", text: "Provolone provides... a strong yes!" },
      { short: "MAYBE", text: "The Gruyère is melting with uncertainty." },
      { short: "YES", text: "Ricotta says yes, but gently." },
      { short: "ABSOLUTELY", text: "Monterey Jack says: absolutely, amigo!" },
      { short: "YES!", text: "The Havarti is having a moment. YES!" },
      { short: "OH YEAH", text: "Pepper Jack spices it up: YES!" },
      { short: "NOPE", text: "Cottage cheese says no, but don't take it personally." },
      { short: "YES", text: "The Manchego meditates... yes, with patience." },
      { short: "SURE", text: "Cream cheese says: spread the love. Yes!" },
      { short: "LIKELY", text: "The Roquefort rumbles... lean toward yes." },
      { short: "NO", text: "String cheese pulls toward... no, not this time." }
    ];

    let shaking = false;
    askBtn.addEventListener("click", () => {
      if (shaking || !input.value.trim()) return;
      shaking = true;
      answerEl.classList.remove("show");
      triangle.classList.remove("visible");
      triangle.textContent = "";

      // Shake the ball
      ballBody.classList.add("shaking");
      playSqueak();

      setTimeout(() => {
        ballBody.classList.remove("shaking");
        // Pick one fortune — short and text always match
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        triangle.textContent = fortune.short;
        triangle.classList.add("visible");
        answerEl.textContent = fortune.text;
        answerEl.classList.add("show");
        playCelebration();
        shaking = false;
      }, 1500);
    });

    input.addEventListener("keydown", e => { if (e.key === "Enter") askBtn.click(); });
  }

  // ========== ARCADE TABS ==========
  // ========== MOUSE NAME GENERATOR ==========
  function initNameGen() {
    const btn = $("#namegen-btn");
    const copyBtn = $("#namegen-copy");
    const result = $("#namegen-result");
    const history = $("#namegen-history");
    if (!btn || !result) return;

    const prefixes = [
      "Sir", "Lady", "Captain", "Professor", "Dr.", "Duke", "Duchess",
      "Lord", "Princess", "Agent", "Chef", "DJ", "Count", "Baron", "General",
      "The Great", "Master", "Mx.", "Grand", "Tiny"
    ];
    const adjectives = [
      "Sneaky", "Squeaky", "Fluffy", "Mighty", "Tiny", "Swift", "Clever",
      "Brave", "Cozy", "Fuzzy", "Nimble", "Daring", "Cheesy", "Golden",
      "Velvet", "Moonlit", "Starry", "Whisker", "Shadow", "Giggly",
      "Bouncy", "Scurrying", "Mischief", "Wiggly", "Cheddar", "Cosmic",
      "Thunder", "Crystal", "Gentle", "Pixel", "Turbo", "Snuggly"
    ];
    const nouns = [
      "Mouse", "Whiskers", "Squeaker", "Nibbler", "Scurrier", "Paws",
      "Cheese", "Cheddar", "Gouda", "Brie", "Tail", "Snout", "Burrow",
      "Crumb", "Morsel", "Squeak", "Nibbles", "Fuzz", "Whisker", "Munch",
      "Scratcher", "Peeker", "Sniffler", "Chomper", "Dasher", "Nester"
    ];
    const suffixes = [
      "the Brave", "McSqueaks", "von Cheese", "III", "Jr.", "the Swift",
      "de la Crumb", "the Magnificent", "the Tiny", "Esquire",
      "the Fearless", "of Gouda", "the Wise", "McWhiskers",
      "", "", "", "", "", "" // empty for variety — not always a suffix
    ];

    let names = [];

    function generate() {
      const usePrefix = Math.random() < 0.4;
      const prefix = usePrefix ? prefixes[Math.floor(Math.random() * prefixes.length)] + " " : "";
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const name = prefix + adj + noun + (suffix ? " " + suffix : "");
      return name;
    }

    btn.addEventListener("click", () => {
      const name = generate();
      result.textContent = name;
      result.classList.remove("pop");
      void result.offsetWidth;
      result.classList.add("pop");
      playSqueak();

      // Add to history
      names.unshift(name);
      if (names.length > 8) names.pop();
      renderHistory();
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const text = result.textContent;
        if (text && text !== "Click below to get your mouse name!") {
          navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = "Copied! ✅";
            setTimeout(() => { copyBtn.textContent = "Copy 📋"; }, 1500);
          });
          playPop();
        }
      });
    }

    function renderHistory() {
      if (!history) return;
      history.innerHTML = "";
      names.forEach(n => {
        const span = document.createElement("span");
        span.textContent = n;
        span.addEventListener("click", () => {
          result.textContent = n;
          result.classList.remove("pop");
          void result.offsetWidth;
          result.classList.add("pop");
          playSqueak();
        });
        history.appendChild(span);
      });
    }
  }

  function initArcadeTabs() {
    $$(".arcade-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        $$(".arcade-tab").forEach(t => t.classList.remove("active"));
        $$(".game-panel").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        const panel = $("#game-" + tab.dataset.game);
        if (panel) panel.classList.add("active");
        playSqueak();
      });
    });
  }

  // ========== MAZE GAME ==========
  function initMaze() {
    const canvas = $("#maze-canvas");
    const newBtn = $("#maze-new");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const SIZE = 15;
    const CELL = 20;
    let grid, playerX, playerY, moves, trail;

    function generate() {
      grid = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => ({ top: true, right: true, bottom: true, left: true, visited: false }))
      );
      // Recursive backtracker for base maze
      const stack = [[0, 0]];
      grid[0][0].visited = true;
      const dirs = [[0, -1, "top", "bottom"], [1, 0, "right", "left"], [0, 1, "bottom", "top"], [-1, 0, "left", "right"]];
      while (stack.length) {
        const [cx, cy] = stack[stack.length - 1];
        const neighbors = dirs.map(([dx, dy, w1, w2]) => [cx + dx, cy + dy, w1, w2])
          .filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < SIZE && ny < SIZE && !grid[ny][nx].visited);
        if (neighbors.length === 0) { stack.pop(); continue; }
        const [nx, ny, w1, w2] = neighbors[Math.floor(Math.random() * neighbors.length)];
        grid[cy][cx][w1] = false;
        grid[ny][nx][w2] = false;
        grid[ny][nx].visited = true;
        stack.push([nx, ny]);
      }
      // Remove extra walls to create multiple paths and loops
      const extraRemovals = Math.floor(SIZE * SIZE * 0.12);
      for (let i = 0; i < extraRemovals; i++) {
        const x = Math.floor(Math.random() * SIZE);
        const y = Math.floor(Math.random() * SIZE);
        const d = dirs[Math.floor(Math.random() * 4)];
        const nx = x + d[0], ny = y + d[1];
        if (nx >= 0 && ny >= 0 && nx < SIZE && ny < SIZE) {
          grid[y][x][d[2]] = false;
          grid[ny][nx][d[3]] = false;
        }
      }
      playerX = 0; playerY = 0; moves = 0;
      trail = new Set();
      trail.add("0,0");
      draw();
    }

    function draw() {
      ctx.fillStyle = "#fdf6e3";
      ctx.fillRect(0, 0, 300, 300);

      // Draw trail
      trail.forEach(key => {
        const [tx, ty] = key.split(",").map(Number);
        ctx.fillStyle = "rgba(255,200,61,0.2)";
        ctx.fillRect(tx * CELL + 1, ty * CELL + 1, CELL - 2, CELL - 2);
      });

      // Draw walls
      ctx.strokeStyle = "#3d2c1e";
      ctx.lineWidth = 2;
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const cell = grid[y][x];
          const px = x * CELL, py = y * CELL;
          if (cell.top) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + CELL, py); ctx.stroke(); }
          if (cell.right) { ctx.beginPath(); ctx.moveTo(px + CELL, py); ctx.lineTo(px + CELL, py + CELL); ctx.stroke(); }
          if (cell.bottom) { ctx.beginPath(); ctx.moveTo(px, py + CELL); ctx.lineTo(px + CELL, py + CELL); ctx.stroke(); }
          if (cell.left) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + CELL); ctx.stroke(); }
        }
      }

      // Cheese (bottom-right)
      ctx.globalAlpha = 1;
      ctx.font = (CELL - 4) + "px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🧀", (SIZE - 1) * CELL + CELL / 2, (SIZE - 1) * CELL + CELL / 2);

      // Player
      ctx.fillText("🐭", playerX * CELL + CELL / 2, playerY * CELL + CELL / 2);

      // Move counter
      ctx.fillStyle = "rgba(61,44,30,0.5)";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Moves: " + moves, 296, 12);
      ctx.textAlign = "left";
    }

    document.addEventListener("keydown", e => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const mazePanel = $("#game-maze");
      if (!mazePanel || !mazePanel.classList.contains("active")) return;
      e.preventDefault();
      const cell = grid[playerY][playerX];
      let moved = false;
      if (e.key === "ArrowUp" && !cell.top) { playerY--; moved = true; }
      if (e.key === "ArrowDown" && !cell.bottom) { playerY++; moved = true; }
      if (e.key === "ArrowLeft" && !cell.left) { playerX--; moved = true; }
      if (e.key === "ArrowRight" && !cell.right) { playerX++; moved = true; }
      if (moved) {
        moves++;
        trail.add(playerX + "," + playerY);
      }
      draw();
      // Check cheese
      if (playerX === SIZE - 1 && playerY === SIZE - 1) {
        playCelebration();
        setTimeout(() => { alert("🧀 You found the cheese in " + moves + " moves! 🐭"); generate(); }, 100);
      }
    });

    // Touch controls for maze
    let mazeTouch = null;
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      mazeTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: false });
    canvas.addEventListener("touchend", e => {
      if (!mazeTouch) return;
      const dx = e.changedTouches[0].clientX - mazeTouch.x;
      const dy = e.changedTouches[0].clientY - mazeTouch.y;
      mazeTouch = null;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      let key;
      if (Math.abs(dx) > Math.abs(dy)) key = dx > 0 ? "ArrowRight" : "ArrowLeft";
      else key = dy > 0 ? "ArrowDown" : "ArrowUp";
      document.dispatchEvent(new KeyboardEvent("keydown", { key }));
    });

    newBtn.addEventListener("click", () => { generate(); playSqueak(); });
    generate();
  }

  // ========== SNAKE (MOUSE EATS CHEESE) ==========
  function initSnake() {
    const canvas = $("#snake-canvas");
    const startBtn = $("#snake-start");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = 15; // grid cell size in px
    const cols = canvas.width / size;  // 20
    const rows = canvas.height / size; // 20
    let snake, dir, nextDir, cheese, score, best, running, interval;

    best = parseInt(localStorage.getItem("keely-snake-best") || "0", 10);
    const bestEl = $("#snake-best");
    const scoreEl = $("#snake-score");
    if (bestEl) bestEl.textContent = best;

    function reset() {
      snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
      dir = { x: 1, y: 0 };
      nextDir = { x: 1, y: 0 };
      score = 0;
      if (scoreEl) scoreEl.textContent = "0";
      placeCheese();
      draw();
    }

    function placeCheese() {
      let pos;
      do {
        pos = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
      } while (snake.some(s => s.x === pos.x && s.y === pos.y));
      cheese = pos;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines subtly
      ctx.strokeStyle = "rgba(200,180,120,0.15)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath(); ctx.moveTo(x * size, 0); ctx.lineTo(x * size, canvas.height); ctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath(); ctx.moveTo(0, y * size); ctx.lineTo(canvas.width, y * size); ctx.stroke();
      }

      // Draw cheese
      ctx.font = (size - 2) + "px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🧀", cheese.x * size + size / 2, cheese.y * size + size / 2);

      // Draw mouse tail — tapered pink line through body segments
      if (snake.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 0; i < snake.length - 1; i++) {
          const s1 = snake[i];
          const s2 = snake[i + 1];
          const taper = Math.max(1, (size / 2) * (1 - i / snake.length));
          ctx.strokeStyle = `hsl(350, 50%, ${72 + (i / snake.length) * 10}%)`;
          ctx.lineWidth = taper;
          ctx.beginPath();
          ctx.moveTo(s1.x * size + size / 2, s1.y * size + size / 2);
          ctx.lineTo(s2.x * size + size / 2, s2.y * size + size / 2);
          ctx.stroke();
        }
        // Tail tip — tiny circle at the end
        const tip = snake[snake.length - 1];
        ctx.fillStyle = "hsl(350, 45%, 78%)";
        ctx.beginPath();
        ctx.arc(tip.x * size + size / 2, tip.y * size + size / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw head as mouse emoji
      const head = snake[0];
      ctx.font = (size - 1) + "px serif";
      ctx.fillText("🐭", head.x * size + size / 2, head.y * size + size / 2);
    }

    function tick() {
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      // Wall wrapping
      if (head.x < 0) head.x = cols - 1;
      if (head.x >= cols) head.x = 0;
      if (head.y < 0) head.y = rows - 1;
      if (head.y >= rows) head.y = 0;

      // Self collision
      if (snake.some(s => s.x === head.x && s.y === head.y)) {
        gameOver();
        return;
      }

      snake.unshift(head);

      // Eat cheese
      if (head.x === cheese.x && head.y === cheese.y) {
        score++;
        if (scoreEl) scoreEl.textContent = score;
        playSqueak();
        placeCheese();
        // Speed up slightly every 5 points
        if (score % 5 === 0 && interval > 60) {
          clearInterval(running);
          interval -= 15;
          running = setInterval(tick, interval);
        }
      } else {
        snake.pop();
      }

      draw();
    }

    function gameOver() {
      clearInterval(running);
      running = null;
      if (score > best) {
        best = score;
        localStorage.setItem("keely-snake-best", best);
        if (bestEl) bestEl.textContent = best;
      }
      playCelebration();
      // Draw game over
      ctx.fillStyle = "rgba(61,44,30,0.75)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFC72C";
      ctx.font = "bold 20px 'Baloo 2', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Game Over! 🐭", canvas.width / 2, canvas.height / 2 - 15);
      ctx.font = "16px 'Baloo 2', sans-serif";
      ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 15);
      startBtn.textContent = "Play Again! 🐭";
    }

    function startGame() {
      reset();
      interval = 150;
      if (running) clearInterval(running);
      running = setInterval(tick, interval);
      startBtn.textContent = "Restart 🐭";
    }

    document.addEventListener("keydown", e => {
      // Only respond when snake panel is visible
      const panel = $("#game-snake");
      if (!panel || !panel.classList.contains("active") || !running) return;
      const key = e.key;
      if ((key === "ArrowUp" || key === "w") && dir.y === 0) { nextDir = { x: 0, y: -1 }; e.preventDefault(); }
      else if ((key === "ArrowDown" || key === "s") && dir.y === 0) { nextDir = { x: 0, y: 1 }; e.preventDefault(); }
      else if ((key === "ArrowLeft" || key === "a") && dir.x === 0) { nextDir = { x: -1, y: 0 }; e.preventDefault(); }
      else if ((key === "ArrowRight" || key === "d") && dir.x === 0) { nextDir = { x: 1, y: 0 }; e.preventDefault(); }
    });

    startBtn.addEventListener("click", () => { startGame(); playSqueak(); });
    reset();
  }

  // ========== WHACK-A-CHEESE ==========
  function initWhack() {
    const gridEl = $("#whack-grid");
    const startBtn = $("#whack-start");
    const scoreEl = $("#whack-score");
    const timeEl = $("#whack-time");
    if (!gridEl || !startBtn) return;

    // Create holes
    for (let i = 0; i < 9; i++) {
      const hole = document.createElement("div");
      hole.className = "wh-hole";
      hole.innerHTML = '<span class="wh-cheese">🧀</span>';
      hole.addEventListener("click", () => {
        if (hole.classList.contains("pop") && gameActive) {
          score++;
          scoreEl.textContent = score;
          hole.classList.remove("pop");
          hole.classList.add("hit");
          setTimeout(() => hole.classList.remove("hit"), 300);
          playSqueak();
        }
      });
      gridEl.appendChild(hole);
    }

    let score = 0, timeLeft = 30, gameActive = false;
    let gameTimer, popTimer;

    function popRandom() {
      if (!gameActive) return;
      const holes = $$(".wh-hole");
      const available = [...holes].filter(h => !h.classList.contains("pop"));
      if (available.length === 0) return;
      const hole = available[Math.floor(Math.random() * available.length)];
      hole.classList.add("pop");
      const stayTime = 800 + Math.random() * 700;
      setTimeout(() => hole.classList.remove("pop"), stayTime);
      popTimer = setTimeout(popRandom, 600 + Math.random() * 600);
    }

    startBtn.addEventListener("click", () => {
      if (gameActive) return;
      score = 0; timeLeft = 30; gameActive = true;
      scoreEl.textContent = "0"; timeEl.textContent = "30";
      startBtn.textContent = "Playing...";
      gameTimer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(gameTimer);
          clearTimeout(popTimer);
          gameActive = false;
          $$(".wh-hole").forEach(h => h.classList.remove("pop"));
          startBtn.textContent = `Done! Score: ${score} 🧀 Play again?`;
          playCelebration();
        }
      }, 1000);
      popRandom();
    });
  }

  // ========== CHEESE CLICKER ==========
  function initClicker() {
    const cheese = $("#clicker-cheese");
    const countEl = $("#clicker-count");
    const badgesEl = $("#clicker-badges");
    if (!cheese) return;

    let count = parseInt(localStorage.getItem("keely-clicks") || "0");
    countEl.textContent = count;

    const milestones = [
      { n: 10, title: "Cheese Apprentice 🧀", unlocked: false },
      { n: 50, title: "Fromage Fan 🧀🧀", unlocked: false },
      { n: 100, title: "Cheese Master 🏆", unlocked: false },
      { n: 250, title: "Dairy Legend 🌟", unlocked: false },
      { n: 500, title: "The Big Cheese 👑", unlocked: false }
    ];

    function renderBadges() {
      badgesEl.innerHTML = "";
      milestones.forEach(m => {
        if (count >= m.n) {
          m.unlocked = true;
          const badge = document.createElement("span");
          badge.className = "badge";
          badge.textContent = m.title;
          badgesEl.appendChild(badge);
        }
      });
    }
    renderBadges();

    cheese.addEventListener("click", e => {
      e.stopPropagation();
      count++;
      localStorage.setItem("keely-clicks", count);
      countEl.textContent = count;
      cheese.classList.add("clicked");
      setTimeout(() => cheese.classList.remove("clicked"), 300);
      playSqueak();

      const prev = milestones.filter(m => !m.unlocked && count >= m.n);
      if (prev.length > 0) {
        renderBadges();
        playCelebration();
      }
    });
  }

  // ========== WORD SEARCH ==========
  function initWordSearch() {
    const gridEl = $("#ws-grid");
    const wordsEl = $("#ws-words");
    const newBtn = $("#ws-new");
    if (!gridEl) return;

    const SIZE = 10;
    const WORDS = [
      ["MOUSE","CHEESE","BRIE","GOUDA","CHEDDAR","SQUEAK","WHEEL","TAIL"],
      ["NIBBLE","WHISKER","WEDGE","FONDUE","GRUYERE","SWISS","PAWS","HOLE"],
      ["MOUSETRAP","MOZZARELLA","PARMESAN","CREAM","CRUMB","DAIRY","SNIFF","SCURRY"]
    ];

    let grid, wordList, foundWords, selecting, selectedCells, foundCellSet;

    function pickWords() {
      const pool = WORDS[Math.floor(Math.random() * WORDS.length)];
      // Pick 6 words that fit
      const shuffled = pool.slice().sort(() => Math.random() - 0.5);
      return shuffled.filter(w => w.length <= SIZE).slice(0, 6);
    }

    function create() {
      grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
      wordList = pickWords();
      foundWords = new Set();
      foundCellSet = new Set();
      selecting = false;
      selectedCells = [];

      // Place words
      wordList.forEach(word => placeWord(word));

      // Fill empty cells with random letters
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let r = 0; r < SIZE; r++)
        for (let c = 0; c < SIZE; c++)
          if (!grid[r][c]) grid[r][c] = letters[Math.floor(Math.random() * 26)];

      render();
    }

    function placeWord(word) {
      const dirs = [[0,1],[1,0],[1,1],[0,-1],[1,-1]];
      for (let attempt = 0; attempt < 100; attempt++) {
        const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)];
        const r = Math.floor(Math.random() * SIZE);
        const c = Math.floor(Math.random() * SIZE);
        let fits = true;
        for (let i = 0; i < word.length; i++) {
          const nr = r + dr * i, nc = c + dc * i;
          if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) { fits = false; break; }
          if (grid[nr][nc] && grid[nr][nc] !== word[i]) { fits = false; break; }
        }
        if (fits) {
          for (let i = 0; i < word.length; i++) grid[r + dr * i][c + dc * i] = word[i];
          return;
        }
      }
    }

    function render() {
      gridEl.style.gridTemplateColumns = `repeat(${SIZE}, 30px)`;
      gridEl.innerHTML = "";
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          const cell = document.createElement("div");
          cell.className = "ws-cell" + (foundCellSet.has(r + "," + c) ? " found-cell" : "");
          cell.textContent = grid[r][c];
          cell.dataset.r = r;
          cell.dataset.c = c;

          cell.addEventListener("mousedown", () => startSelect(r, c));
          cell.addEventListener("mouseenter", () => { if (selecting) addToSelect(r, c); });
          cell.addEventListener("mouseup", () => endSelect());
          cell.addEventListener("touchstart", e => { e.preventDefault(); startSelect(r, c); }, { passive: false });
          cell.addEventListener("touchmove", e => {
            e.preventDefault();
            const t = e.touches[0];
            const el = document.elementFromPoint(t.clientX, t.clientY);
            if (el && el.dataset.r !== undefined) addToSelect(+el.dataset.r, +el.dataset.c);
          }, { passive: false });
          cell.addEventListener("touchend", () => endSelect());

          gridEl.appendChild(cell);
        }
      }

      wordsEl.innerHTML = "";
      wordList.forEach(w => {
        const span = document.createElement("span");
        span.className = "ws-word" + (foundWords.has(w) ? " found" : "");
        span.textContent = w;
        wordsEl.appendChild(span);
      });
    }

    function startSelect(r, c) {
      selecting = true;
      selectedCells = [{ r, c }];
      highlightSelected();
    }

    function addToSelect(r, c) {
      if (!selecting) return;
      if (selectedCells.some(s => s.r === r && s.c === c)) return;
      // Only allow straight lines
      const first = selectedCells[0];
      const dr = Math.sign(r - first.r), dc = Math.sign(c - first.c);
      const dist = Math.max(Math.abs(r - first.r), Math.abs(c - first.c));
      if (r === first.r + dr * dist && c === first.c + dc * dist) {
        selectedCells = [];
        for (let i = 0; i <= dist; i++) selectedCells.push({ r: first.r + dr * i, c: first.c + dc * i });
        highlightSelected();
      }
    }

    function highlightSelected() {
      gridEl.querySelectorAll(".ws-cell").forEach(cell => {
        const cr = +cell.dataset.r, cc = +cell.dataset.c;
        cell.classList.toggle("selected", selectedCells.some(s => s.r === cr && s.c === cc));
      });
    }

    function endSelect() {
      if (!selecting) return;
      selecting = false;
      const word = selectedCells.map(s => grid[s.r][s.c]).join("");
      const wordRev = word.split("").reverse().join("");
      const match = wordList.find(w => w === word || w === wordRev);
      if (match && !foundWords.has(match)) {
        foundWords.add(match);
        selectedCells.forEach(s => foundCellSet.add(s.r + "," + s.c));
        playPop();
        render();
        if (foundWords.size === wordList.length) {
          if ($("#mines-status")) playCelebration();
        }
      }
      selectedCells = [];
      highlightSelected();
    }

    newBtn.addEventListener("click", () => { create(); playSqueak(); });
    document.addEventListener("mouseup", () => { if (selecting) endSelect(); });
    create();
  }

  // ========== DRESS UP ==========
  function initDressUp() {
    const canvas = $("#dressup-canvas");
    const hatsContainer = $("#du-hats");
    const accsContainer = $("#du-accs");
    const outfitsContainer = $("#du-outfits");
    const colorsContainer = $("#du-colors");
    const bgsContainer = $("#du-bgs");
    const resetBtn = $("#du-reset");
    const randomBtn = $("#du-random");
    if (!canvas || !hatsContainer) return;
    const ctx = canvas.getContext("2d");
    const CW = canvas.width, CH = canvas.height;

    const furColors = [
      { name: "Gray", body: "#9e9e9e", belly: "#d5d5d5", inner: "#f0c0c0" },
      { name: "Brown", body: "#8B6914", belly: "#d4a857", inner: "#f0c0c0" },
      { name: "White", body: "#e8e8e8", belly: "#ffffff", inner: "#ffcccc" },
      { name: "Black", body: "#3a3a3a", belly: "#6a6a6a", inner: "#d09090" },
      { name: "Golden", body: "#daa520", belly: "#f5d68a", inner: "#f0c0c0" },
      { name: "Pink", body: "#e8a0b0", belly: "#f5d0d8", inner: "#ffcccc" },
      { name: "Cream", body: "#f5deb3", belly: "#fff8e7", inner: "#ffcccc" },
      { name: "Blue", body: "#6ca0dc", belly: "#a8d0f0", inner: "#e0c0d0" }
    ];
    const hats = [
      { name: "None" },
      { name: "Top Hat", draw: drawTopHat },
      { name: "Crown", draw: drawCrown },
      { name: "Bow", draw: drawBow },
      { name: "Beret", draw: drawBeret },
      { name: "Wizard", draw: drawWizardHat },
      { name: "Flowers", draw: drawFlowerCrown },
      { name: "Pirate", draw: drawPirateHat },
      { name: "Chef", draw: drawChefHat },
      { name: "Tiara", draw: drawTiara },
      { name: "Cowboy", draw: drawCowboyHat },
      { name: "Beanie", draw: drawBeanie },
      { name: "Halo", draw: drawHalo },
      { name: "Viking", draw: drawVikingHelmet },
      { name: "Party", draw: drawPartyHat }
    ];
    const outfits = [
      { name: "None" },
      { name: "Scarf", draw: drawScarf },
      { name: "Cape", draw: drawCape },
      { name: "Dress", draw: drawDress },
      { name: "Bowtie", draw: drawBowtie },
      { name: "Armor", draw: drawArmor },
      { name: "Sweater", draw: drawSweater },
      { name: "Tutu", draw: drawTutu },
      { name: "Overalls", draw: drawOveralls },
      { name: "Tuxedo", draw: drawTuxedo },
      { name: "Hoodie", draw: drawHoodie },
      { name: "Princess", draw: drawPrincess },
      { name: "Jersey", draw: drawJersey },
      { name: "Apron", draw: drawApron },
      { name: "Kimono", draw: drawKimono }
    ];
    const accessories = [
      { name: "None" },
      { name: "Glasses", draw: drawGlasses },
      { name: "Cheese", draw: drawCheese },
      { name: "Sword", draw: drawSword },
      { name: "Wand", draw: drawWand },
      { name: "Guitar", draw: drawGuitar },
      { name: "Blush", draw: drawBlush },
      { name: "Monocle", draw: drawMonocle },
      { name: "Shield", draw: drawShield },
      { name: "Rose", draw: drawRose },
      { name: "Wings", draw: drawWings },
      { name: "Balloon", draw: drawBalloon },
      { name: "Mustache", draw: drawMustache },
      { name: "Book", draw: drawBook },
      { name: "Sparkles", draw: drawSparkles }
    ];
    const backgrounds = [
      { name: "Sky", drawBg: drawBgSky },
      { name: "Night", drawBg: drawBgNight },
      { name: "Sunset", drawBg: drawBgSunset },
      { name: "Garden", drawBg: drawBgGarden },
      { name: "Cheese", drawBg: drawBgCheese },
      { name: "Castle", drawBg: drawBgCastle },
      { name: "Beach", drawBg: drawBgBeach },
      { name: "Space", drawBg: drawBgSpace }
    ];

    let sel = { fur: 0, hat: 0, outfit: 0, acc: 0, bg: 0 };

    // Mouse body at center
    const MX = CW / 2, MY = CH / 2 + 15;

    // ----- Background drawings -----
    function drawBgSky(ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, CH);
      grad.addColorStop(0, "#87CEEB"); grad.addColorStop(0.7, "#b0e0f0"); grad.addColorStop(1, "#90EE90");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, CW, CH);
      // Clouds
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      [[30, 40], [160, 25], [100, 55]].forEach(([cx, cy]) => {
        ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(cx + 15, cy - 5, 12, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(cx + 25, cy + 2, 10, 0, Math.PI * 2); ctx.fill();
      });
      // Grass blades
      ctx.fillStyle = "#228B22"; ctx.fillRect(0, CH - 50, CW, 50);
      ctx.fillStyle = "#2d9e2d";
      for (let i = 0; i < CW; i += 8) {
        ctx.beginPath(); ctx.moveTo(i, CH - 50); ctx.lineTo(i + 4, CH - 58); ctx.lineTo(i + 8, CH - 50); ctx.fill();
      }
    }
    function drawBgNight(ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, CH);
      grad.addColorStop(0, "#0a0a2e"); grad.addColorStop(1, "#1a1a4e");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, CW, CH);
      // Stars
      ctx.fillStyle = "#fff";
      for (let i = 0; i < 40; i++) {
        const sx = (i * 67 + 11) % CW, sy = (i * 43 + 7) % (CH - 60);
        ctx.beginPath(); ctx.arc(sx, sy, Math.random() < 0.3 ? 2 : 1, 0, Math.PI * 2); ctx.fill();
      }
      // Moon
      ctx.fillStyle = "#fffacd"; ctx.beginPath(); ctx.arc(CW - 40, 35, 18, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#0a0a2e"; ctx.beginPath(); ctx.arc(CW - 32, 30, 15, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#2d2d5e"; ctx.fillRect(0, CH - 40, CW, 40);
    }
    function drawBgSunset(ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, CH);
      grad.addColorStop(0, "#ff6b35"); grad.addColorStop(0.3, "#ff8c42"); grad.addColorStop(0.6, "#ffc83d"); grad.addColorStop(1, "#544a3f");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, CW, CH);
      // Sun
      ctx.fillStyle = "#ffe066"; ctx.beginPath(); ctx.arc(CW / 2, CH * 0.45, 30, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#6b5744"; ctx.fillRect(0, CH - 45, CW, 45);
    }
    function drawBgGarden(ctx) {
      ctx.fillStyle = "#90EE90"; ctx.fillRect(0, 0, CW, CH);
      const grad = ctx.createLinearGradient(0, 0, 0, CH * 0.5);
      grad.addColorStop(0, "#87CEEB"); grad.addColorStop(1, "#a0f0a0");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, CW, CH * 0.5);
      // Flowers
      const flowerColors = ["#ff6b6b", "#ffd93d", "#ff69b4", "#9b59b6", "#e74c3c"];
      for (let i = 0; i < 12; i++) {
        const fx = (i * 47 + 15) % CW, fy = CH - 30 - (i % 3) * 15;
        ctx.fillStyle = "#27ae60"; ctx.fillRect(fx, fy, 2, 20);
        ctx.fillStyle = flowerColors[i % flowerColors.length];
        ctx.beginPath(); ctx.arc(fx + 1, fy, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffd700"; ctx.beginPath(); ctx.arc(fx + 1, fy, 2, 0, Math.PI * 2); ctx.fill();
      }
    }
    function drawBgCheese(ctx) {
      ctx.fillStyle = "#ffc83d"; ctx.fillRect(0, 0, CW, CH);
      ctx.fillStyle = "#e8a317";
      for (let i = 0; i < 15; i++) {
        const cx = (i * 73 + 20) % CW, cy = (i * 51 + 15) % CH;
        ctx.beginPath(); ctx.arc(cx, cy, 8 + (i % 3) * 5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = "#d4890a"; ctx.fillRect(0, CH - 40, CW, 40);
    }
    function drawBgCastle(ctx) {
      ctx.fillStyle = "#c0a080"; ctx.fillRect(0, 0, CW, CH);
      const grad = ctx.createLinearGradient(0, 0, 0, CH);
      grad.addColorStop(0, "#87CEEB"); grad.addColorStop(0.6, "#c0a080");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, CW, CH * 0.6);
      // Castle wall
      ctx.fillStyle = "#8B7355";
      ctx.fillRect(0, CH * 0.5, CW, CH * 0.5);
      // Stones
      ctx.strokeStyle = "#6b5744"; ctx.lineWidth = 1;
      for (let y = CH * 0.5; y < CH; y += 15) {
        const off = (Math.floor(y / 15) % 2) * 20;
        for (let x = off - 20; x < CW + 20; x += 40) {
          ctx.strokeRect(x, y, 40, 15);
        }
      }
      // Window
      ctx.fillStyle = "#3d2c1e";
      ctx.beginPath(); ctx.arc(CW * 0.75, CH * 0.55, 10, Math.PI, 0); ctx.fill();
      ctx.fillRect(CW * 0.75 - 10, CH * 0.55, 20, 15);
    }
    function drawBgBeach(ctx) {
      const sky = ctx.createLinearGradient(0, 0, 0, CH * 0.5);
      sky.addColorStop(0, "#87CEEB"); sky.addColorStop(1, "#b0e0f0");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, CW, CH * 0.5);
      // Ocean
      ctx.fillStyle = "#2196f3"; ctx.fillRect(0, CH * 0.4, CW, CH * 0.15);
      // Waves
      ctx.strokeStyle = "#64b5f6"; ctx.lineWidth = 2;
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        for (let x = 0; x < CW; x += 2) {
          ctx.lineTo(x, CH * 0.42 + w * 10 + Math.sin(x * 0.05 + w) * 4);
        }
        ctx.stroke();
      }
      // Sand
      ctx.fillStyle = "#f5deb3"; ctx.fillRect(0, CH * 0.55, CW, CH * 0.45);
      ctx.fillStyle = "#e8d5a0"; ctx.fillRect(0, CH * 0.55, CW, 5);
    }
    function drawBgSpace(ctx) {
      ctx.fillStyle = "#0a0020"; ctx.fillRect(0, 0, CW, CH);
      // Nebula
      const neb = ctx.createRadialGradient(CW * 0.3, CH * 0.3, 10, CW * 0.3, CH * 0.3, 100);
      neb.addColorStop(0, "rgba(100,50,150,0.3)"); neb.addColorStop(1, "transparent");
      ctx.fillStyle = neb; ctx.fillRect(0, 0, CW, CH);
      // Stars
      for (let i = 0; i < 60; i++) {
        const sx = (i * 89 + 7) % CW, sy = (i * 61 + 3) % CH;
        ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.7})`;
        ctx.beginPath(); ctx.arc(sx, sy, Math.random() < 0.2 ? 2 : 1, 0, Math.PI * 2); ctx.fill();
      }
      // Planet
      ctx.fillStyle = "#ff6b35"; ctx.beginPath(); ctx.arc(CW - 35, CH - 40, 20, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#ffc83d"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(CW - 35, CH - 40, 30, 8, -0.3, 0, Math.PI * 2); ctx.stroke();
    }

    function drawMouse() {
      const fur = furColors[sel.fur];
      const bg = backgrounds[sel.bg];

      // Background
      if (bg.drawBg) bg.drawBg(ctx);
      else { ctx.fillStyle = "#87CEEB"; ctx.fillRect(0, 0, CW, CH); }

      // Tail
      ctx.strokeStyle = fur.inner;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(MX, MY + 45);
      ctx.bezierCurveTo(MX + 40, MY + 60, MX + 50, MY + 30, MX + 60, MY + 50);
      ctx.stroke();

      // Back outfit (cape draws behind body)
      if (sel.outfit > 0 && outfits[sel.outfit].name === "Cape") {
        outfits[sel.outfit].draw(ctx, MX, MY, fur, true);
      }

      // Body
      ctx.fillStyle = fur.body;
      ctx.beginPath();
      ctx.ellipse(MX, MY + 25, 30, 35, 0, 0, Math.PI * 2);
      ctx.fill();

      // Belly
      ctx.fillStyle = fur.belly;
      ctx.beginPath();
      ctx.ellipse(MX, MY + 30, 18, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Outfit (front)
      if (sel.outfit > 0 && outfits[sel.outfit].name !== "Cape") {
        outfits[sel.outfit].draw(ctx, MX, MY, fur);
      }

      // Arms — smooth rounded shape
      ctx.fillStyle = fur.body;
      // Left arm
      ctx.beginPath();
      ctx.moveTo(MX - 28, MY + 8);
      ctx.quadraticCurveTo(MX - 38, MY + 22, MX - 30, MY + 38);
      ctx.quadraticCurveTo(MX - 22, MY + 40, MX - 22, MY + 28);
      ctx.quadraticCurveTo(MX - 24, MY + 14, MX - 28, MY + 8);
      ctx.fill();
      // Right arm
      ctx.beginPath();
      ctx.moveTo(MX + 28, MY + 8);
      ctx.quadraticCurveTo(MX + 38, MY + 22, MX + 30, MY + 38);
      ctx.quadraticCurveTo(MX + 22, MY + 40, MX + 22, MY + 28);
      ctx.quadraticCurveTo(MX + 24, MY + 14, MX + 28, MY + 8);
      ctx.fill();
      // Paws
      ctx.fillStyle = fur.inner;
      ctx.beginPath(); ctx.ellipse(MX - 29, MY + 37, 5, 4, 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(MX + 29, MY + 37, 5, 4, -0.2, 0, Math.PI * 2); ctx.fill();

      // Head
      ctx.fillStyle = fur.body;
      ctx.beginPath();
      ctx.arc(MX, MY - 15, 28, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.fillStyle = fur.body;
      ctx.beginPath(); ctx.ellipse(MX - 22, MY - 40, 15, 18, -0.3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(MX + 22, MY - 40, 15, 18, 0.3, 0, Math.PI * 2); ctx.fill();
      // Inner ears
      ctx.fillStyle = fur.inner;
      ctx.beginPath(); ctx.ellipse(MX - 22, MY - 40, 10, 12, -0.3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(MX + 22, MY - 40, 10, 12, 0.3, 0, Math.PI * 2); ctx.fill();

      // Eyes
      ctx.fillStyle = "#222";
      ctx.beginPath(); ctx.arc(MX - 10, MY - 18, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(MX + 10, MY - 18, 4, 0, Math.PI * 2); ctx.fill();
      // Eye shine
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(MX - 9, MY - 20, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(MX + 11, MY - 20, 1.5, 0, Math.PI * 2); ctx.fill();

      // Nose
      ctx.fillStyle = "#ff8faa";
      ctx.beginPath(); ctx.ellipse(MX, MY - 8, 4, 3, 0, 0, Math.PI * 2); ctx.fill();

      // Whiskers
      ctx.strokeStyle = fur.body === "#e8e8e8" ? "#ccc" : "#ddd";
      ctx.lineWidth = 1;
      [[-1, -2], [-1, 0], [-1, 2], [1, -2], [1, 0], [1, 2]].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(MX + dx * 6, MY - 6);
        ctx.lineTo(MX + dx * 28, MY - 6 + dy * 3);
        ctx.stroke();
      });

      // Mouth
      ctx.strokeStyle = "#b06070";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(MX, MY - 4, 4, 0.1, Math.PI - 0.1);
      ctx.stroke();

      // Feet
      ctx.fillStyle = fur.inner;
      ctx.beginPath(); ctx.ellipse(MX - 14, MY + 58, 10, 5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(MX + 14, MY + 58, 10, 5, 0, 0, Math.PI * 2); ctx.fill();

      // Hat
      if (sel.hat > 0) hats[sel.hat].draw(ctx, MX, MY, fur);

      // Accessory
      if (sel.acc > 0) accessories[sel.acc].draw(ctx, MX, MY, fur);
    }

    // ----- Hat drawings -----
    function drawTopHat(ctx, mx, my) {
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(mx - 20, my - 45, 40, 5);
      ctx.fillRect(mx - 14, my - 75, 28, 32);
      ctx.fillStyle = "#c8a000";
      ctx.fillRect(mx - 14, my - 50, 28, 4);
    }
    function drawCrown(ctx, mx, my) {
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.moveTo(mx - 18, my - 42);
      ctx.lineTo(mx - 18, my - 62);
      ctx.lineTo(mx - 10, my - 52);
      ctx.lineTo(mx, my - 65);
      ctx.lineTo(mx + 10, my - 52);
      ctx.lineTo(mx + 18, my - 62);
      ctx.lineTo(mx + 18, my - 42);
      ctx.closePath();
      ctx.fill();
      // Jewels
      ctx.fillStyle = "#e91e63";
      ctx.beginPath(); ctx.arc(mx, my - 50, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#2196f3";
      ctx.beginPath(); ctx.arc(mx - 10, my - 47, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 10, my - 47, 2, 0, Math.PI * 2); ctx.fill();
    }
    function drawBow(ctx, mx, my) {
      ctx.fillStyle = "#ff69b4";
      // Left loop
      ctx.beginPath(); ctx.ellipse(mx - 12, my - 48, 12, 7, -0.2, 0, Math.PI * 2); ctx.fill();
      // Right loop
      ctx.beginPath(); ctx.ellipse(mx + 12, my - 48, 12, 7, 0.2, 0, Math.PI * 2); ctx.fill();
      // Center knot
      ctx.fillStyle = "#e91e63";
      ctx.beginPath(); ctx.arc(mx, my - 48, 4, 0, Math.PI * 2); ctx.fill();
    }
    function drawBeret(ctx, mx, my) {
      ctx.fillStyle = "#e74c3c";
      ctx.beginPath();
      ctx.ellipse(mx + 3, my - 44, 24, 10, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 3, my - 54, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#c0392b"; ctx.fill();
    }
    function drawWizardHat(ctx, mx, my) {
      ctx.fillStyle = "#4a148c";
      ctx.beginPath();
      ctx.moveTo(mx - 22, my - 40);
      ctx.lineTo(mx, my - 85);
      ctx.lineTo(mx + 22, my - 40);
      ctx.closePath();
      ctx.fill();
      // Stars
      ctx.fillStyle = "#ffd700";
      ctx.font = "10px serif";
      ctx.textAlign = "center";
      ctx.fillText("★", mx - 5, my - 55);
      ctx.fillText("✦", mx + 8, my - 65);
      // Brim
      ctx.fillStyle = "#6a1b9a";
      ctx.beginPath();
      ctx.ellipse(mx, my - 40, 26, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    function drawFlowerCrown(ctx, mx, my) {
      const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff69b4"];
      for (let i = 0; i < 5; i++) {
        const angle = -Math.PI * 0.2 + i * Math.PI * 0.2;
        const fx = mx + Math.cos(angle) * 20;
        const fy = my - 42 + Math.sin(angle) * -6;
        ctx.fillStyle = colors[i];
        ctx.beginPath(); ctx.arc(fx, fy, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff700";
        ctx.beginPath(); ctx.arc(fx, fy, 2, 0, Math.PI * 2); ctx.fill();
      }
      // Vine
      ctx.strokeStyle = "#27ae60";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mx, my - 35, 22, Math.PI + 0.3, -0.3);
      ctx.stroke();
    }

    // ----- Outfit drawings -----
    function drawScarf(ctx, mx, my) {
      ctx.fillStyle = "#e74c3c";
      ctx.beginPath();
      ctx.ellipse(mx, my + 5, 22, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#c0392b";
      ctx.fillRect(mx + 8, my + 5, 8, 22);
      // Stripes
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(mx - 18, my + 3, 36, 2);
      ctx.fillRect(mx + 8, my + 14, 8, 2);
    }
    function drawCape(ctx, mx, my, fur, behind) {
      if (!behind) return;
      ctx.fillStyle = "#9b59b6";
      ctx.beginPath();
      ctx.moveTo(mx - 25, my);
      ctx.quadraticCurveTo(mx - 40, my + 50, mx - 20, my + 70);
      ctx.lineTo(mx + 20, my + 70);
      ctx.quadraticCurveTo(mx + 40, my + 50, mx + 25, my);
      ctx.closePath();
      ctx.fill();
      // Clasp
      ctx.fillStyle = "#ffd700";
      ctx.beginPath(); ctx.arc(mx, my + 3, 4, 0, Math.PI * 2); ctx.fill();
    }
    function drawDress(ctx, mx, my) {
      ctx.fillStyle = "#e91e63";
      ctx.beginPath();
      ctx.moveTo(mx - 18, my + 10);
      ctx.lineTo(mx - 30, my + 55);
      ctx.lineTo(mx + 30, my + 55);
      ctx.lineTo(mx + 18, my + 10);
      ctx.closePath();
      ctx.fill();
      // Waistband
      ctx.fillStyle = "#ad1457";
      ctx.fillRect(mx - 18, my + 10, 36, 4);
      // Lace
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = -28; i < 28; i += 6) {
        ctx.moveTo(mx + i, my + 55);
        ctx.lineTo(mx + i + 3, my + 52);
        ctx.lineTo(mx + i + 6, my + 55);
      }
      ctx.stroke();
    }
    function drawBowtie(ctx, mx, my) {
      ctx.fillStyle = "#e74c3c";
      // Left triangle
      ctx.beginPath();
      ctx.moveTo(mx, my + 5);
      ctx.lineTo(mx - 15, my - 1);
      ctx.lineTo(mx - 15, my + 11);
      ctx.closePath();
      ctx.fill();
      // Right triangle
      ctx.beginPath();
      ctx.moveTo(mx, my + 5);
      ctx.lineTo(mx + 15, my - 1);
      ctx.lineTo(mx + 15, my + 11);
      ctx.closePath();
      ctx.fill();
      // Center knot
      ctx.fillStyle = "#c0392b";
      ctx.beginPath(); ctx.arc(mx, my + 5, 4, 0, Math.PI * 2); ctx.fill();
    }
    function drawArmor(ctx, mx, my) {
      ctx.fillStyle = "#b0b0b0";
      ctx.beginPath();
      ctx.moveTo(mx - 22, my + 5);
      ctx.lineTo(mx - 25, my + 40);
      ctx.lineTo(mx + 25, my + 40);
      ctx.lineTo(mx + 22, my + 5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#808080";
      ctx.fillRect(mx - 8, my + 10, 16, 20);
      // Shield emblem
      ctx.fillStyle = "#ffd700";
      ctx.beginPath(); ctx.arc(mx, my + 20, 5, 0, Math.PI * 2); ctx.fill();
    }
    function drawSweater(ctx, mx, my) {
      ctx.fillStyle = "#2196f3";
      ctx.beginPath();
      ctx.ellipse(mx, my + 25, 28, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      // Pattern
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      for (let y = my + 10; y < my + 48; y += 8) {
        ctx.beginPath();
        for (let x = mx - 22; x < mx + 22; x += 6) {
          ctx.moveTo(x, y);
          ctx.lineTo(x + 3, y - 3);
          ctx.lineTo(x + 6, y);
        }
        ctx.stroke();
      }
    }

    // ----- Accessory drawings -----
    function drawGlasses(ctx, mx, my) {
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(mx - 10, my - 18, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(mx + 10, my - 18, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx - 3, my - 18); ctx.lineTo(mx + 3, my - 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx - 17, my - 18); ctx.lineTo(mx - 22, my - 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx + 17, my - 18); ctx.lineTo(mx + 22, my - 20); ctx.stroke();
    }
    function drawCheese(ctx, mx, my) {
      ctx.fillStyle = "#ffc83d";
      ctx.beginPath();
      ctx.moveTo(mx + 32, my + 15);
      ctx.lineTo(mx + 50, my + 30);
      ctx.lineTo(mx + 30, my + 35);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#e8a317";
      ctx.beginPath(); ctx.arc(mx + 38, my + 27, 2, 0, Math.PI * 2); ctx.fill();
    }
    function drawSword(ctx, mx, my) {
      ctx.fillStyle = "#c0c0c0";
      ctx.fillRect(mx + 30, my - 10, 4, 40);
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(mx + 26, my + 25, 12, 4);
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(mx + 29, my + 29, 6, 10);
    }
    function drawWand(ctx, mx, my) {
      ctx.fillStyle = "#4a148c";
      ctx.save();
      ctx.translate(mx + 35, my - 5);
      ctx.rotate(0.3);
      ctx.fillRect(-2, 0, 4, 35);
      ctx.restore();
      // Star
      ctx.fillStyle = "#ffd700";
      ctx.font = "16px serif";
      ctx.textAlign = "center";
      ctx.fillText("★", mx + 34, my - 3);
      // Sparkles
      ctx.fillStyle = "#fff";
      ctx.font = "8px serif";
      ctx.fillText("✦", mx + 42, my - 8);
      ctx.fillText("✧", mx + 28, my - 12);
    }
    function drawGuitar(ctx, mx, my) {
      ctx.fillStyle = "#8B4513";
      ctx.save();
      ctx.translate(mx - 35, my + 5);
      ctx.rotate(-0.2);
      // Neck
      ctx.fillRect(-2, -30, 4, 30);
      // Body
      ctx.fillStyle = "#cd853f";
      ctx.beginPath(); ctx.ellipse(0, 10, 12, 15, 0, 0, Math.PI * 2); ctx.fill();
      // Sound hole
      ctx.fillStyle = "#3e2723";
      ctx.beginPath(); ctx.arc(0, 10, 4, 0, Math.PI * 2); ctx.fill();
      // Strings
      ctx.strokeStyle = "#ddd";
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(-1, -28); ctx.lineTo(-1, 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(1, -28); ctx.lineTo(1, 22); ctx.stroke();
      ctx.restore();
    }
    function drawBlush(ctx, mx, my) {
      ctx.fillStyle = "rgba(255,130,150,0.4)";
      ctx.beginPath(); ctx.ellipse(mx - 16, my - 10, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(mx + 16, my - 10, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
    }
    function drawMonocle(ctx, mx, my) {
      ctx.strokeStyle = "#ffd700";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(mx + 10, my - 18, 7, 0, Math.PI * 2); ctx.stroke();
      // Chain
      ctx.strokeStyle = "#ffd700";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(mx + 17, my - 15); ctx.quadraticCurveTo(mx + 25, my, mx + 20, my + 10); ctx.stroke();
      // Lens glare
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.beginPath(); ctx.arc(mx + 8, my - 20, 3, 0, Math.PI * 2); ctx.fill();
    }
    function drawShield(ctx, mx, my) {
      ctx.fillStyle = "#c0392b";
      ctx.beginPath();
      ctx.moveTo(mx - 38, my + 10);
      ctx.lineTo(mx - 38, my + 30);
      ctx.quadraticCurveTo(mx - 30, my + 42, mx - 22, my + 30);
      ctx.lineTo(mx - 22, my + 10);
      ctx.closePath();
      ctx.fill();
      // Cross
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(mx - 32, my + 15, 2, 18);
      ctx.fillRect(mx - 36, my + 22, 12, 2);
    }
    function drawRose(ctx, mx, my) {
      // Stem
      ctx.strokeStyle = "#27ae60"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(mx + 32, my + 20); ctx.lineTo(mx + 32, my + 40); ctx.stroke();
      // Petals
      ctx.fillStyle = "#e74c3c";
      ctx.beginPath(); ctx.arc(mx + 32, my + 16, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 28, my + 19, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 36, my + 19, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#c0392b";
      ctx.beginPath(); ctx.arc(mx + 32, my + 18, 3, 0, Math.PI * 2); ctx.fill();
    }

    // New hats
    function drawPirateHat(ctx, mx, my) {
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.moveTo(mx - 24, my - 42);
      ctx.quadraticCurveTo(mx, my - 70, mx + 24, my - 42);
      ctx.closePath();
      ctx.fill();
      // Brim
      ctx.beginPath();
      ctx.ellipse(mx, my - 42, 26, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Skull
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(mx, my - 55, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(mx - 2, my - 56, 1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 2, my - 56, 1, 0, Math.PI * 2); ctx.fill();
    }
    function drawChefHat(ctx, mx, my) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(mx - 16, my - 55, 32, 18);
      ctx.beginPath(); ctx.arc(mx - 10, my - 58, 10, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx, my - 62, 12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 10, my - 58, 10, 0, Math.PI * 2); ctx.fill();
    }
    function drawTiara(ctx, mx, my) {
      ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mx - 18, my - 40);
      ctx.lineTo(mx - 12, my - 52);
      ctx.lineTo(mx - 6, my - 44);
      ctx.lineTo(mx, my - 56);
      ctx.lineTo(mx + 6, my - 44);
      ctx.lineTo(mx + 12, my - 52);
      ctx.lineTo(mx + 18, my - 40);
      ctx.stroke();
      // Gems
      ctx.fillStyle = "#e91e63";
      ctx.beginPath(); ctx.arc(mx, my - 54, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#00bcd4";
      ctx.beginPath(); ctx.arc(mx - 12, my - 50, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 12, my - 50, 2, 0, Math.PI * 2); ctx.fill();
    }

    // New outfits
    function drawTutu(ctx, mx, my) {
      ctx.fillStyle = "#ff69b4";
      ctx.beginPath();
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI + Math.PI * 0.05;
        const x = mx + Math.cos(angle) * 32;
        const y = my + 35 + Math.sin(angle) * 15;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      // Waistband
      ctx.fillStyle = "#e91e63";
      ctx.beginPath(); ctx.ellipse(mx, my + 30, 20, 4, 0, 0, Math.PI * 2); ctx.fill();
    }
    function drawOveralls(ctx, mx, my) {
      ctx.fillStyle = "#1565c0";
      ctx.fillRect(mx - 20, my + 15, 40, 38);
      // Straps
      ctx.fillRect(mx - 16, my + 5, 8, 15);
      ctx.fillRect(mx + 8, my + 5, 8, 15);
      // Pocket
      ctx.fillStyle = "#0d47a1";
      ctx.fillRect(mx - 8, my + 30, 16, 10);
      // Buttons
      ctx.fillStyle = "#ffd700";
      ctx.beginPath(); ctx.arc(mx - 12, my + 15, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 12, my + 15, 2, 0, Math.PI * 2); ctx.fill();
    }
    function drawTuxedo(ctx, mx, my) {
      // Jacket
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.moveTo(mx - 22, my + 5);
      ctx.lineTo(mx - 26, my + 50);
      ctx.lineTo(mx + 26, my + 50);
      ctx.lineTo(mx + 22, my + 5);
      ctx.closePath();
      ctx.fill();
      // White shirt
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(mx - 8, my + 5);
      ctx.lineTo(mx - 10, my + 50);
      ctx.lineTo(mx + 10, my + 50);
      ctx.lineTo(mx + 8, my + 5);
      ctx.closePath();
      ctx.fill();
      // Mini bowtie
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.moveTo(mx, my + 8); ctx.lineTo(mx - 6, my + 5); ctx.lineTo(mx - 6, my + 11); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(mx, my + 8); ctx.lineTo(mx + 6, my + 5); ctx.lineTo(mx + 6, my + 11); ctx.closePath(); ctx.fill();
      // Buttons
      ctx.fillStyle = "#ffd700";
      ctx.beginPath(); ctx.arc(mx, my + 20, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx, my + 30, 1.5, 0, Math.PI * 2); ctx.fill();
    }

    // More hats
    function drawCowboyHat(ctx, mx, my) {
      ctx.fillStyle = "#8B4513";
      ctx.beginPath(); ctx.ellipse(mx, my - 40, 28, 7, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(mx - 14, my - 60, 28, 22);
      ctx.beginPath();
      ctx.moveTo(mx - 14, my - 60);
      ctx.quadraticCurveTo(mx, my - 68, mx + 14, my - 60);
      ctx.fill();
      ctx.fillStyle = "#ffd700"; ctx.fillRect(mx - 14, my - 43, 28, 3);
    }
    function drawBeanie(ctx, mx, my) {
      ctx.fillStyle = "#e74c3c";
      ctx.beginPath(); ctx.arc(mx, my - 35, 22, Math.PI, 0); ctx.fill();
      ctx.fillRect(mx - 22, my - 38, 44, 6);
      // Fold
      ctx.fillStyle = "#c0392b"; ctx.fillRect(mx - 22, my - 38, 44, 6);
      // Pom pom
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(mx, my - 56, 6, 0, Math.PI * 2); ctx.fill();
    }
    function drawHalo(ctx, mx, my) {
      ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 3;
      ctx.shadowColor = "#ffd700"; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.ellipse(mx, my - 55, 18, 5, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.shadowBlur = 0; ctx.lineWidth = 1;
    }
    function drawVikingHelmet(ctx, mx, my) {
      ctx.fillStyle = "#808080";
      ctx.beginPath(); ctx.arc(mx, my - 30, 22, Math.PI, 0); ctx.fill();
      ctx.fillRect(mx - 22, my - 35, 44, 8);
      // Horns
      ctx.fillStyle = "#f5deb3";
      ctx.beginPath(); ctx.moveTo(mx - 22, my - 35); ctx.quadraticCurveTo(mx - 35, my - 60, mx - 28, my - 55); ctx.lineTo(mx - 18, my - 35); ctx.fill();
      ctx.beginPath(); ctx.moveTo(mx + 22, my - 35); ctx.quadraticCurveTo(mx + 35, my - 60, mx + 28, my - 55); ctx.lineTo(mx + 18, my - 35); ctx.fill();
      // Nose guard
      ctx.fillStyle = "#808080"; ctx.fillRect(mx - 2, my - 35, 4, 14);
    }
    function drawPartyHat(ctx, mx, my) {
      const grad = ctx.createLinearGradient(mx - 15, my - 40, mx + 15, my - 75);
      grad.addColorStop(0, "#ff69b4"); grad.addColorStop(0.5, "#ffd700"); grad.addColorStop(1, "#2196f3");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.moveTo(mx - 16, my - 40); ctx.lineTo(mx, my - 75); ctx.lineTo(mx + 16, my - 40); ctx.closePath(); ctx.fill();
      // Pom
      ctx.fillStyle = "#ff0"; ctx.beginPath(); ctx.arc(mx, my - 75, 4, 0, Math.PI * 2); ctx.fill();
      // Dots
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(mx - 5, my - 50, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 4, my - 58, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx - 2, my - 65, 1.5, 0, Math.PI * 2); ctx.fill();
    }

    // More outfits
    function drawHoodie(ctx, mx, my) {
      ctx.fillStyle = "#607d8b";
      ctx.beginPath(); ctx.ellipse(mx, my + 25, 30, 33, 0, 0, Math.PI * 2); ctx.fill();
      // Hood
      ctx.beginPath(); ctx.arc(mx, my - 5, 22, Math.PI + 0.5, -0.5); ctx.fill();
      // Pocket
      ctx.fillStyle = "#546e7a"; ctx.fillRect(mx - 14, my + 32, 28, 10); ctx.strokeStyle = "#455a64"; ctx.lineWidth = 1; ctx.strokeRect(mx - 14, my + 32, 28, 10);
      // Drawstrings
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(mx - 5, my + 5); ctx.lineTo(mx - 5, my + 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx + 5, my + 5); ctx.lineTo(mx + 5, my + 18); ctx.stroke();
    }
    function drawPrincess(ctx, mx, my) {
      // Gown
      ctx.fillStyle = "#9c27b0";
      ctx.beginPath(); ctx.moveTo(mx - 18, my + 10); ctx.lineTo(mx - 35, my + 58); ctx.lineTo(mx + 35, my + 58); ctx.lineTo(mx + 18, my + 10); ctx.closePath(); ctx.fill();
      // Shimmer
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.beginPath(); ctx.moveTo(mx - 8, my + 10); ctx.lineTo(mx - 15, my + 58); ctx.lineTo(mx + 5, my + 58); ctx.lineTo(mx + 2, my + 10); ctx.closePath(); ctx.fill();
      // Sparkles
      ctx.fillStyle = "#ffd700"; ctx.font = "8px serif"; ctx.textAlign = "center";
      ctx.fillText("✦", mx - 8, my + 30); ctx.fillText("✦", mx + 10, my + 40); ctx.fillText("✦", mx - 3, my + 50);
    }
    function drawJersey(ctx, mx, my) {
      ctx.fillStyle = "#f44336";
      ctx.beginPath(); ctx.ellipse(mx, my + 25, 28, 30, 0, 0, Math.PI * 2); ctx.fill();
      // Number
      ctx.fillStyle = "#fff"; ctx.font = "bold 20px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("7", mx, my + 25);
      // Stripes
      ctx.fillStyle = "#fff"; ctx.fillRect(mx - 24, my + 5, 48, 3); ctx.fillRect(mx - 24, my + 45, 48, 3);
    }
    function drawApron(ctx, mx, my) {
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.moveTo(mx - 18, my + 8); ctx.lineTo(mx - 22, my + 52); ctx.lineTo(mx + 22, my + 52); ctx.lineTo(mx + 18, my + 8); ctx.closePath(); ctx.fill();
      // Strings
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(mx - 18, my + 8); ctx.lineTo(mx - 28, my + 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx + 18, my + 8); ctx.lineTo(mx + 28, my + 2); ctx.stroke();
      // Pocket
      ctx.fillStyle = "#f5f5f5"; ctx.fillRect(mx - 8, my + 28, 16, 12);
      // Heart
      ctx.fillStyle = "#e74c3c"; ctx.font = "10px serif"; ctx.textAlign = "center"; ctx.fillText("♥", mx, my + 22);
    }
    function drawKimono(ctx, mx, my) {
      ctx.fillStyle = "#e91e63";
      ctx.beginPath(); ctx.moveTo(mx - 22, my + 5); ctx.lineTo(mx - 28, my + 55); ctx.lineTo(mx + 28, my + 55); ctx.lineTo(mx + 22, my + 5); ctx.closePath(); ctx.fill();
      // Overlap
      ctx.fillStyle = "#c2185b";
      ctx.beginPath(); ctx.moveTo(mx, my + 5); ctx.lineTo(mx - 15, my + 5); ctx.lineTo(mx - 20, my + 55); ctx.lineTo(mx - 5, my + 55); ctx.closePath(); ctx.fill();
      // Obi belt
      ctx.fillStyle = "#ffd700"; ctx.fillRect(mx - 22, my + 28, 44, 8);
      // Pattern
      ctx.fillStyle = "#fff"; ctx.font = "6px serif"; ctx.textAlign = "center";
      ctx.fillText("✿", mx + 10, my + 18); ctx.fillText("✿", mx + 5, my + 45);
    }

    // More accessories
    function drawWings(ctx, mx, my) {
      ctx.fillStyle = "rgba(200,220,255,0.5)";
      // Left wing
      ctx.beginPath(); ctx.moveTo(mx - 28, my + 15); ctx.quadraticCurveTo(mx - 60, my - 5, mx - 45, my + 25); ctx.quadraticCurveTo(mx - 55, my + 35, mx - 28, my + 30); ctx.fill();
      // Right wing
      ctx.beginPath(); ctx.moveTo(mx + 28, my + 15); ctx.quadraticCurveTo(mx + 60, my - 5, mx + 45, my + 25); ctx.quadraticCurveTo(mx + 55, my + 35, mx + 28, my + 30); ctx.fill();
      ctx.strokeStyle = "rgba(180,200,255,0.6)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(mx - 28, my + 15); ctx.quadraticCurveTo(mx - 60, my - 5, mx - 45, my + 25); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx + 28, my + 15); ctx.quadraticCurveTo(mx + 60, my - 5, mx + 45, my + 25); ctx.stroke();
    }
    function drawBalloon(ctx, mx, my) {
      // String
      ctx.strokeStyle = "#999"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(mx + 30, my + 35); ctx.quadraticCurveTo(mx + 35, my, mx + 30, my - 30); ctx.stroke();
      // Balloon
      ctx.fillStyle = "#e74c3c";
      ctx.beginPath(); ctx.ellipse(mx + 30, my - 42, 12, 15, 0, 0, Math.PI * 2); ctx.fill();
      // Shine
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.beginPath(); ctx.arc(mx + 27, my - 46, 4, 0, Math.PI * 2); ctx.fill();
      // Knot
      ctx.fillStyle = "#c0392b";
      ctx.beginPath(); ctx.moveTo(mx + 28, my - 28); ctx.lineTo(mx + 32, my - 28); ctx.lineTo(mx + 30, my - 25); ctx.fill();
    }
    function drawMustache(ctx, mx, my) {
      ctx.fillStyle = "#3e2723";
      // Left curl
      ctx.beginPath(); ctx.moveTo(mx, my - 4); ctx.quadraticCurveTo(mx - 8, my - 8, mx - 16, my - 4); ctx.quadraticCurveTo(mx - 18, my, mx - 12, my - 2); ctx.quadraticCurveTo(mx - 6, my - 4, mx, my - 2); ctx.fill();
      // Right curl
      ctx.beginPath(); ctx.moveTo(mx, my - 4); ctx.quadraticCurveTo(mx + 8, my - 8, mx + 16, my - 4); ctx.quadraticCurveTo(mx + 18, my, mx + 12, my - 2); ctx.quadraticCurveTo(mx + 6, my - 4, mx, my - 2); ctx.fill();
    }
    function drawBook(ctx, mx, my) {
      ctx.fillStyle = "#795548";
      ctx.fillRect(mx - 42, my + 15, 18, 24);
      // Pages
      ctx.fillStyle = "#fff";
      ctx.fillRect(mx - 40, my + 17, 14, 20);
      // Lines
      ctx.strokeStyle = "#ccc"; ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(mx - 39, my + 21 + i * 3); ctx.lineTo(mx - 28, my + 21 + i * 3); ctx.stroke(); }
    }
    function drawSparkles(ctx, mx, my) {
      ctx.fillStyle = "#ffd700";
      ctx.font = "10px serif"; ctx.textAlign = "center";
      const spots = [[-20, -30], [22, -25], [-15, 10], [25, 5], [0, -40], [-25, 40], [28, 35], [0, 50]];
      spots.forEach(([dx, dy]) => {
        ctx.fillText(Math.random() > 0.5 ? "✦" : "✧", mx + dx, my + dy);
      });
    }

    function renderButtons(container, items, key) {
      container.innerHTML = "";
      items.forEach((item, i) => {
        const btn = document.createElement("div");
        btn.className = "du-item" + (sel[key] === i ? " active" : "");
        btn.textContent = item.name;
        btn.style.fontSize = "0.55rem";
        btn.style.width = "46px";
        btn.style.height = "32px";
        btn.style.lineHeight = "1.1";
        btn.style.padding = "2px";
        if (key === "fur" && i < furColors.length) {
          btn.style.borderBottom = "3px solid " + furColors[i].body;
        }
        if (key === "bg") {
          const bgCols = ["#87CEEB", "#1a1a3e", "#ff6b35", "#90EE90", "#ffd700", "#8B7355", "#2196f3", "#0a0020"];
          if (i < bgCols.length) btn.style.borderBottom = "3px solid " + bgCols[i];
        }
        btn.addEventListener("click", () => {
          sel[key] = sel[key] === i && key !== "fur" && key !== "bg" ? 0 : i;
          playSqueak();
          renderAll();
          drawMouse();
        });
        container.appendChild(btn);
      });
    }

    function renderAll() {
      renderButtons(colorsContainer, furColors, "fur");
      renderButtons(hatsContainer, hats, "hat");
      renderButtons(outfitsContainer, outfits, "outfit");
      renderButtons(accsContainer, accessories, "acc");
      renderButtons(bgsContainer, backgrounds, "bg");
    }

    resetBtn.addEventListener("click", () => {
      sel = { fur: 0, hat: 0, outfit: 0, acc: 0, bg: 0 };
      playSqueak();
      renderAll();
      drawMouse();
    });

    if (randomBtn) {
      randomBtn.addEventListener("click", () => {
        sel = {
          fur: Math.floor(Math.random() * furColors.length),
          hat: Math.floor(Math.random() * hats.length),
          outfit: Math.floor(Math.random() * outfits.length),
          acc: Math.floor(Math.random() * accessories.length),
          bg: Math.floor(Math.random() * backgrounds.length)
        };
        playCelebration();
        renderAll();
        drawMouse();
      });
    }

    renderAll();
    drawMouse();
  }

  // ========== GALLERY LIGHTBOX ==========
  function initGallery() {
    const items = $$(".gallery-item");
    if (!items.length) return;

    // Create lightbox
    const lb = document.createElement("div");
    lb.className = "gallery-lightbox";
    lb.innerHTML = '<button class="lb-close">&times;</button><img src="" alt=""><div class="lb-caption"></div>';
    document.body.appendChild(lb);

    const lbImg = lb.querySelector("img");
    const lbCaption = lb.querySelector(".lb-caption");
    const lbClose = lb.querySelector(".lb-close");

    items.forEach(item => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        const caption = item.dataset.caption || "";
        lbImg.src = img.src.replace("w=400", "w=900").replace("h=300", "h=600").replace("h=500", "h=800");
        lbImg.alt = img.alt;
        lbCaption.textContent = caption;
        lb.classList.add("active");
        playPop();
      });
    });

    lbClose.addEventListener("click", () => lb.classList.remove("active"));
    lb.addEventListener("click", e => {
      if (e.target === lb) lb.classList.remove("active");
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && lb.classList.contains("active")) lb.classList.remove("active");
    });
  }

  // ========== CATSWEEPER (MINESWEEPER) ==========
  function initCatsweeper() {
    const grid = $("#mines-grid");
    const newBtn = $("#mines-new");
    if (!grid) return;

    const ROWS = 9, COLS = 9, CATS = 10;
    let board, revealed, flagged, gameOver, firstClick, flagCount;

    const catsEl = $("#mines-cats");
    const flagsEl = $("#mines-flags");
    const statusEl = $("#mines-status");

    function create() {
      board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
      revealed = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
      flagged = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
      gameOver = false;
      firstClick = true;
      flagCount = 0;
      if (catsEl) catsEl.textContent = CATS;
      if (flagsEl) flagsEl.textContent = "0";
      if (statusEl) statusEl.textContent = "Click to start!";
      render();
    }

    function placeCats(safeR, safeC) {
      let placed = 0;
      while (placed < CATS) {
        const r = Math.floor(Math.random() * ROWS);
        const c = Math.floor(Math.random() * COLS);
        if (board[r][c] === -1) continue;
        if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
        board[r][c] = -1;
        placed++;
      }
      // Compute numbers
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (board[r][c] === -1) continue;
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr, nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === -1) count++;
            }
          }
          board[r][c] = count;
        }
      }
    }

    function reveal(r, c) {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
      if (revealed[r][c] || flagged[r][c]) return;
      revealed[r][c] = true;
      if (board[r][c] === 0) {
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) reveal(r + dr, c + dc);
      }
    }

    function checkWin() {
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++)
          if (board[r][c] !== -1 && !revealed[r][c]) return false;
      return true;
    }

    function render() {
      grid.innerHTML = "";
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = document.createElement("div");
          cell.className = "mine-cell";

          if (revealed[r][c]) {
            cell.classList.add("revealed");
            if (board[r][c] === -1) {
              cell.classList.add("mine-cat");
              cell.textContent = "🐱";
            } else if (board[r][c] > 0) {
              const span = document.createElement("span");
              span.className = "n" + Math.min(board[r][c], 6);
              span.textContent = board[r][c];
              cell.appendChild(span);
            }
          } else if (flagged[r][c]) {
            cell.classList.add("flagged");
            cell.textContent = "🚩";
          }

          cell.addEventListener("click", () => handleClick(r, c));
          cell.addEventListener("contextmenu", e => { e.preventDefault(); handleFlag(r, c); });
          grid.appendChild(cell);
        }
      }
    }

    function handleClick(r, c) {
      if (gameOver || revealed[r][c] || flagged[r][c]) return;
      if (firstClick) {
        firstClick = false;
        placeCats(r, c);
        if (statusEl) statusEl.textContent = "Watch out for cats! 🐱";
      }
      if (board[r][c] === -1) {
        // Hit a cat!
        revealed[r][c] = true;
        gameOver = true;
        // Reveal all cats
        for (let rr = 0; rr < ROWS; rr++)
          for (let cc = 0; cc < COLS; cc++)
            if (board[rr][cc] === -1) revealed[rr][cc] = true;
        render();
        if (statusEl) statusEl.textContent = "🙀 A cat got you! Try again!";
        playSqueak();
        return;
      }
      reveal(r, c);
      render();
      playPop();
      if (checkWin()) {
        gameOver = true;
        if (statusEl) statusEl.textContent = "🧀 You found all the cheese! You win! 🎉";
        playCelebration();
      }
    }

    function handleFlag(r, c) {
      if (gameOver || revealed[r][c]) return;
      flagged[r][c] = !flagged[r][c];
      flagCount += flagged[r][c] ? 1 : -1;
      if (flagsEl) flagsEl.textContent = flagCount;
      render();
    }

    newBtn.addEventListener("click", () => { create(); playSqueak(); });
    create();
  }

  // ========== QUIZ ==========
  function initQuiz() {
    const container = $("#quiz-container");
    if (!container) return;

    const questions = [
      {
        q: "It's Friday night. You're most likely...",
        opts: ["Hosting a cozy dinner party", "Out exploring somewhere new", "Wrapped in a blanket with a book", "Working on a creative project"],
        map: [0, 1, 2, 3]
      },
      {
        q: "Pick a vibe:",
        opts: ["Elegant and sophisticated", "Bold and adventurous", "Warm and comforting", "Fun and unpredictable"],
        map: [0, 1, 2, 3]
      },
      {
        q: "Your ideal vacation:",
        opts: ["French countryside", "Mountain climbing adventure", "Beach cottage", "Road trip with no plan"],
        map: [0, 1, 2, 3]
      },
      {
        q: "Friends describe you as:",
        opts: ["Refined and classy", "Sharp and witty", "Kind and reliable", "Creative and quirky"],
        map: [0, 1, 2, 3]
      },
      {
        q: "Pick a comfort food:",
        opts: ["Fancy charcuterie board", "Loaded nachos", "Mac and cheese", "Pizza with weird toppings"],
        map: [0, 1, 2, 3]
      }
    ];

    const results = [
      { name: "Brie", emoji: "🧀", desc: "You're Brie! Sophisticated, creamy, and universally adored. You bring elegance to every room and people can't help but love you." },
      { name: "Sharp Cheddar", emoji: "🧀", desc: "You're Sharp Cheddar! Bold, confident, and you get better with age. You're not afraid to stand out and make your presence known." },
      { name: "Mozzarella", emoji: "🧀", desc: "You're Mozzarella! Warm, stretchy, and the glue that holds everyone together. You're the friend everyone needs in their life." },
      { name: "Gouda", emoji: "🧀", desc: "You're Gouda! Fun, unexpected, and always a pleasant surprise. Life with you is never boring — and that's a gouda thing." }
    ];

    let currentQ = 0;
    const scores = [0, 0, 0, 0];

    function renderQuestion() {
      const q = questions[currentQ];
      container.innerHTML = `
        <p class="quiz-step">Question ${currentQ + 1} of ${questions.length}</p>
        <p class="quiz-question">${q.q}</p>
        <div class="quiz-options">
          ${q.opts.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join("")}
        </div>
      `;
      $$(".quiz-option").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.idx);
          scores[q.map[idx]]++;
          playSqueak();
          currentQ++;
          if (currentQ < questions.length) renderQuestion();
          else showResult();
        });
      });
    }

    function showResult() {
      const maxScore = Math.max(...scores);
      const resultIdx = scores.indexOf(maxScore);
      const r = results[resultIdx];
      playCelebration();
      container.innerHTML = `
        <div class="quiz-result">
          <div class="quiz-result-emoji">${r.emoji}</div>
          <div class="quiz-result-name">You're ${r.name}!</div>
          <p class="quiz-result-desc">${r.desc}</p>
          <button class="quiz-retake">Retake Quiz 🔄</button>
        </div>
      `;
      $(".quiz-retake").addEventListener("click", () => {
        currentQ = 0;
        scores.fill(0);
        renderQuestion();
      });
    }

    renderQuestion();
  }


  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ========== CONTACT FORM ==========
  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const btn = form.querySelector(".btn-submit");
      btn.innerHTML = '<span>Squeak sent! 🎉</span><span class="btn-mouse">🐭💨</span>';
      btn.style.background = "linear-gradient(135deg, #7fcd91, #5ab86a)";
      playCelebration();
      setTimeout(() => {
        btn.innerHTML = '<span>Send Squeak!</span><span class="btn-mouse">🐭</span>';
        btn.style.background = "";
        form.reset();
      }, 3000);
    });

    // Add squeak sound to interactive elements
    $$(".btn-game, .nav-cta, .tag, .btn-squeak, .arcade-tab").forEach(el => {
      el.addEventListener("mouseenter", playSqueak);
    });
  }

  // ========== FAREWELL SCENE ==========
  function initFarewellScene() {
    const scene = $("#farewell-scene");
    const mouse = $("#farewell-mouse");
    const bubble = $("#farewell-bubble");
    if (!scene) return;

    let played = false;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !played) {
        played = true;
        mouse.classList.add("entered");
        bubble.classList.add("show");
        setTimeout(() => { mouse.classList.add("sleeping"); }, 3000);
      }
    }, { threshold: 0.3 });
    observer.observe(scene);
  }

  // ========== MOUSE HOLE ==========
  function initMouseHole() {
    const hole = $("#mouse-hole");
    if (!hole) return;
    hole.addEventListener("click", () => {
      playSqueak();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ========== EASTER EGGS ==========
  function initEasterEggs() {
    // Konami Code
    const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let konamiIdx = 0;
    document.addEventListener("keydown", e => {
      if (e.key === konami[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konami.length) {
          konamiIdx = 0;
          triggerCheeseRain();
        }
      } else {
        konamiIdx = 0;
      }
    });

    // Logo click secret
    const logoMouse = $("#logo-mouse");
    if (logoMouse) {
      let clicks = 0, clickTimer;
      logoMouse.addEventListener("click", e => {
        e.stopPropagation();
        clicks++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clicks = 0; }, 2000);
        if (clicks >= 7) {
          clicks = 0;
          triggerLogoEscape(logoMouse);
        }
      });
    }

    // Footer triple-click
    const copyright = $("#footer-copyright");
    const hidden = $("#footer-hidden");
    if (copyright && hidden) {
      copyright.addEventListener("click", e => {
        if (e.detail === 3) {
          hidden.classList.toggle("show");
          playSqueak();
        }
      });
    }
  }

  function triggerCheeseRain() {
    playCelebration();
    const overlay = document.createElement("div");
    overlay.className = "konami-overlay";
    const msg = document.createElement("div");
    msg.className = "konami-msg";
    msg.textContent = "🧀 YOU FOUND THE CHEESE STASH! 🧀";
    overlay.appendChild(msg);
    document.body.appendChild(overlay);

    for (let i = 0; i < 50; i++) {
      const cheese = document.createElement("span");
      cheese.className = "konami-cheese";
      cheese.textContent = "🧀";
      cheese.style.left = Math.random() * 100 + "vw";
      cheese.style.setProperty("--dur", (2 + Math.random() * 2) + "s");
      cheese.style.animationDelay = Math.random() * 2 + "s";
      document.body.appendChild(cheese);
      setTimeout(() => cheese.remove(), 5000);
    }

    setTimeout(() => overlay.remove(), 3000);
  }

  function triggerLogoEscape(el) {
    playSqueak();
    const rect = el.getBoundingClientRect();
    el.style.position = "fixed";
    el.style.left = rect.left + "px";
    el.style.top = rect.top + "px";
    el.style.zIndex = "9999";
    el.classList.add("escaping");
    setTimeout(() => {
      el.classList.remove("escaping");
      el.style.position = "";
      el.style.left = "";
      el.style.top = "";
      el.style.zIndex = "";
    }, 2000);
  }

  // ========== MATCH-3 (CHEESE MATCH) ==========
  function initMatch3() {
    const canvas = $("#match3-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const scoreEl = $("#match3-score");
    const movesEl = $("#match3-moves");
    const newBtn = $("#match3-new");

    const COLS = 8, ROWS = 8, TILE = 40;
    const PIECES = ["🧀", "🐭", "🧈", "🥛", "🧁", "🍕"];
    let board, score, moves, animating, selected;

    function init() {
      score = 0; moves = 30; animating = false; selected = null;
      scoreEl.textContent = score;
      movesEl.textContent = moves;
      board = [];
      for (let r = 0; r < ROWS; r++) {
        board[r] = [];
        for (let c = 0; c < COLS; c++) {
          board[r][c] = randomPiece(r, c);
        }
      }
      draw();
    }

    function randomPiece(r, c) {
      let p;
      do {
        p = PIECES[Math.floor(Math.random() * PIECES.length)];
      } while (
        (c >= 2 && board[r][c-1] === p && board[r][c-2] === p) ||
        (r >= 2 && board[r-1] && board[r-1][c] === p && board[r-2] && board[r-2][c] === p)
      );
      return p;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (selected && selected.r === r && selected.c === c) {
            ctx.fillStyle = "rgba(255,215,0,0.3)";
            ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
          }
          if (board[r][c]) {
            ctx.font = "26px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(board[r][c], c * TILE + TILE / 2, r * TILE + TILE / 2);
          }
        }
      }
      // Grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      for (let i = 0; i <= COLS; i++) {
        ctx.beginPath(); ctx.moveTo(i * TILE, 0); ctx.lineTo(i * TILE, ROWS * TILE); ctx.stroke();
      }
      for (let i = 0; i <= ROWS; i++) {
        ctx.beginPath(); ctx.moveTo(0, i * TILE); ctx.lineTo(COLS * TILE, i * TILE); ctx.stroke();
      }
    }

    function findMatches() {
      const matched = new Set();
      // Horizontal
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 2; c++) {
          if (board[r][c] && board[r][c] === board[r][c+1] && board[r][c] === board[r][c+2]) {
            let end = c + 2;
            while (end + 1 < COLS && board[r][end+1] === board[r][c]) end++;
            for (let i = c; i <= end; i++) matched.add(r + "," + i);
          }
        }
      }
      // Vertical
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 2; r++) {
          if (board[r][c] && board[r][c] === board[r+1][c] && board[r][c] === board[r+2][c]) {
            let end = r + 2;
            while (end + 1 < ROWS && board[end+1][c] === board[r][c]) end++;
            for (let i = r; i <= end; i++) matched.add(i + "," + c);
          }
        }
      }
      return matched;
    }

    function removeAndDrop(matched) {
      matched.forEach(key => {
        const [r, c] = key.split(",").map(Number);
        board[r][c] = null;
      });
      score += matched.size * 10;
      scoreEl.textContent = score;

      // Drop pieces down
      for (let c = 0; c < COLS; c++) {
        let empty = ROWS - 1;
        for (let r = ROWS - 1; r >= 0; r--) {
          if (board[r][c]) {
            if (r !== empty) { board[empty][c] = board[r][c]; board[r][c] = null; }
            empty--;
          }
        }
        for (let r = empty; r >= 0; r--) {
          board[r][c] = PIECES[Math.floor(Math.random() * PIECES.length)];
        }
      }
    }

    async function processMatches() {
      animating = true;
      let matched = findMatches();
      while (matched.size > 0) {
        playPop();
        removeAndDrop(matched);
        draw();
        await new Promise(r => setTimeout(r, 250));
        matched = findMatches();
      }
      animating = false;
      if (moves <= 0) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 22px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width/2, canvas.height/2 - 15);
        ctx.font = "16px sans-serif";
        ctx.fillText("Score: " + score, canvas.width/2, canvas.height/2 + 15);
      }
    }

    function swap(r1, c1, r2, c2) {
      const tmp = board[r1][c1];
      board[r1][c1] = board[r2][c2];
      board[r2][c2] = tmp;
    }

    canvas.addEventListener("click", e => {
      if (animating || moves <= 0) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const c = Math.floor((e.clientX - rect.left) * scaleX / TILE);
      const r = Math.floor((e.clientY - rect.top) * scaleY / TILE);
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;

      if (!selected) {
        selected = { r, c };
        playSqueak();
        draw();
      } else {
        const dr = Math.abs(selected.r - r), dc = Math.abs(selected.c - c);
        if ((dr === 1 && dc === 0) || (dr === 0 && dc === 1)) {
          swap(selected.r, selected.c, r, c);
          const matched = findMatches();
          if (matched.size > 0) {
            moves--;
            movesEl.textContent = moves;
            selected = null;
            draw();
            processMatches();
          } else {
            swap(selected.r, selected.c, r, c);
            selected = null;
            draw();
          }
        } else {
          selected = { r, c };
          playSqueak();
          draw();
        }
      }
    });

    newBtn.addEventListener("click", () => { init(); playSqueak(); });
    init();
    // Clear initial matches
    processMatches();
  }

  // ========== PEGGLE (MOUSE PEGGLE) ==========
  function initPeggle() {
    const canvas = $("#peggle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const scoreEl = $("#peggle-score");
    const ballsEl = $("#peggle-balls");
    const orangeEl = $("#peggle-orange");
    const feverFill = $("#peggle-fever");
    const feverLabel = $("#peggle-fever-label");
    const newBtn = $("#peggle-new");

    const W = canvas.width, H = canvas.height;
    let pegs, ball, aimAngle, score, ballsLeft, shooting, shotHits;
    let bucketX, bucketDir, bucketW, totalOrange, orangeLeft, feverMult;
    let litPegs, extremeFever, scorePopups, purplePegIdx, guidePower;

    function init() {
      score = 0; ballsLeft = 10; shooting = false; shotHits = 0;
      aimAngle = Math.PI / 2; bucketX = W / 2; bucketDir = 1; bucketW = 50;
      litPegs = []; extremeFever = false; scorePopups = []; guidePower = false;
      scoreEl.textContent = score;
      ballsEl.textContent = ballsLeft;
      ball = null;

      // Create pegs in honeycomb pattern — inset from walls so all are reachable
      pegs = [];
      for (let row = 0; row < 8; row++) {
        const cols = row % 2 === 0 ? 7 : 6;
        const rowW = (cols - 1) * 44;
        const offset = (W - rowW) / 2;
        for (let c = 0; c < cols; c++) {
          pegs.push({
            x: offset + c * 44,
            y: 80 + row * 38,
            r: 10,
            hit: false, lit: false,
            type: "blue"
          });
        }
      }

      // Assign peg types: 10 orange (must clear), 2 green (power), 1 purple (bonus)
      const indices = pegs.map((_, i) => i).sort(() => Math.random() - 0.5);
      const orangeCount = Math.min(10, pegs.length);
      for (let i = 0; i < orangeCount; i++) pegs[indices[i]].type = "orange";
      if (indices.length > orangeCount) pegs[indices[orangeCount]].type = "green";
      if (indices.length > orangeCount + 1) pegs[indices[orangeCount + 1]].type = "green";
      purplePegIdx = indices.length > orangeCount + 2 ? indices[orangeCount + 2] : -1;
      if (purplePegIdx >= 0) pegs[purplePegIdx].type = "purple";

      totalOrange = orangeCount;
      orangeLeft = orangeCount;
      orangeEl.textContent = orangeLeft;
      updateFever();
      draw();
    }

    function pegColor(p) {
      if (p.type === "orange") return p.lit ? "#ff6b35" : "#ff8c42";
      if (p.type === "green") return p.lit ? "#2ecc71" : "#27ae60";
      if (p.type === "purple") return p.lit ? "#9b59b6" : "#8e44ad";
      return p.lit ? "#5dade2" : "#3498db"; // blue
    }

    function pegPoints(p) {
      if (p.type === "orange") return 100;
      if (p.type === "purple") return 500;
      return 10; // blue & green
    }

    function updateFever() {
      const cleared = totalOrange - orangeLeft;
      const pct = totalOrange > 0 ? cleared / totalOrange : 0;
      if (pct >= 0.9) feverMult = 10;
      else if (pct >= 0.75) feverMult = 5;
      else if (pct >= 0.5) feverMult = 3;
      else if (pct >= 0.25) feverMult = 2;
      else feverMult = 1;
      if (feverFill) feverFill.style.width = (pct * 100) + "%";
      if (feverLabel) feverLabel.textContent = feverMult + "x";
    }

    // Move purple peg to a random unlit blue peg each turn
    function movePurple() {
      if (purplePegIdx >= 0 && !pegs[purplePegIdx].hit) {
        pegs[purplePegIdx].type = "blue";
      }
      const candidates = pegs.map((p, i) => ({ p, i })).filter(x => !x.p.hit && x.p.type === "blue");
      if (candidates.length > 0) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        purplePegIdx = pick.i;
        pegs[purplePegIdx].type = "purple";
      }
    }

    function drawPeg(p) {
      const col = pegColor(p);
      if (p.lit) {
        ctx.shadowColor = col;
        ctx.shadowBlur = 12;
      }
      if (p.type === "orange") {
        // Draw as mouse face
        ctx.fillStyle = "#9e9e9e";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        // Ears
        ctx.beginPath(); ctx.arc(p.x - 7, p.y - 8, 5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x + 7, p.y - 8, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#f0c0c0";
        ctx.beginPath(); ctx.arc(p.x - 7, p.y - 8, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x + 7, p.y - 8, 3, 0, Math.PI * 2); ctx.fill();
        // Eyes
        ctx.fillStyle = "#222";
        ctx.beginPath(); ctx.arc(p.x - 3, p.y - 1, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x + 3, p.y - 1, 1.5, 0, Math.PI * 2); ctx.fill();
        // Nose
        ctx.fillStyle = "#ff8faa";
        ctx.beginPath(); ctx.arc(p.x, p.y + 2, 1.5, 0, Math.PI * 2); ctx.fill();
        // Orange ring to show type
        ctx.strokeStyle = p.lit ? "#ff6b35" : "#ff8c42";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 1, 0, Math.PI * 2); ctx.stroke();
      } else if (p.type === "green") {
        // Draw as leaf/clover
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "12px serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("🍀", p.x, p.y);
      } else if (p.type === "purple") {
        // Draw as sparkly cheese
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "12px serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("✨", p.x, p.y);
      } else {
        // Blue = cheese wedge
        ctx.fillStyle = "#ffc83d";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - p.r);
        ctx.lineTo(p.x + p.r, p.y + p.r * 0.7);
        ctx.lineTo(p.x - p.r, p.y + p.r * 0.7);
        ctx.closePath();
        ctx.fill();
        // Cheese hole
        ctx.fillStyle = "#e8a317";
        ctx.beginPath(); ctx.arc(p.x - 1, p.y + 1, 2, 0, Math.PI * 2); ctx.fill();
        // Blue tint ring
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 1, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0f0f23";
      ctx.fillRect(0, 0, W, H);

      // Stars background
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      for (let i = 0; i < 30; i++) {
        const sx = (i * 97 + 13) % W, sy = (i * 53 + 7) % (H - 80) + 40;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Launcher — mouse hole
      ctx.fillStyle = "#3d2c1e";
      ctx.beginPath();
      ctx.ellipse(W / 2, 5, 22, 12, 0, 0, Math.PI);
      ctx.fill();
      ctx.strokeStyle = "#6b5744";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(W / 2, 5, 22, 12, 0, 0, Math.PI);
      ctx.stroke();
      ctx.lineWidth = 1;
      // Aim indicator
      ctx.save();
      ctx.translate(W / 2, 14);
      ctx.rotate(aimAngle - Math.PI / 2);
      ctx.fillStyle = "#9e9e9e";
      ctx.beginPath(); ctx.arc(0, 18, 6, 0, Math.PI * 2); ctx.fill();
      // Mouse ears on aim indicator
      ctx.beginPath(); ctx.arc(-4, 12, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, 12, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#f0c0c0";
      ctx.beginPath(); ctx.arc(-4, 12, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, 12, 2, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // Trajectory guide (when green power active)
      if (!shooting && guidePower) {
        const gvx = Math.cos(aimAngle) * 3, gvy_init = Math.sin(aimAngle) * 3;
        let gx = W / 2, gy = 28, gvy = gvy_init;
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "rgba(46,204,113,0.5)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        let bounced = false;
        for (let step = 0; step < 120 && !bounced; step++) {
          gvy += 0.08;
          gx += gvx;
          gy += gvy;
          if (gx < 8) gx = 8;
          if (gx > W - 8) gx = W - 8;
          ctx.lineTo(gx, gy);
          // Check first peg bounce
          for (const p of pegs) {
            if (p.hit) continue;
            const dx = gx - p.x, dy = gy - p.y;
            if (Math.sqrt(dx * dx + dy * dy) < 8 + p.r) { bounced = true; break; }
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
      }

      // Pegs
      pegs.forEach(p => {
        if (p.hit) {
          // Ghost of cleared peg
          ctx.globalAlpha = 0.1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = "#555";
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          drawPeg(p);
        }
      });

      // Ball
      if (ball) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffc83d";
        ctx.fill();
        ctx.shadowColor = "#ffd700";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Cheese holes on ball
        ctx.fillStyle = "rgba(200,150,0,0.5)";
        ctx.beginPath(); ctx.arc(ball.x - 2, ball.y - 1, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(ball.x + 3, ball.y + 2, 1.5, 0, Math.PI * 2); ctx.fill();
      }

      // Moving bucket — mouse hole basket
      ctx.fillStyle = "#3d2c1e";
      ctx.beginPath();
      ctx.ellipse(bucketX, H - 10, bucketW / 2, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#6b5744";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(bucketX, H - 10, bucketW / 2, 12, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;
      // Mouse peeking from hole
      ctx.fillStyle = "#9e9e9e";
      ctx.beginPath(); ctx.arc(bucketX, H - 16, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#f0c0c0";
      ctx.beginPath(); ctx.arc(bucketX, H - 14, 2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#222";
      ctx.beginPath(); ctx.arc(bucketX - 2, H - 17, 1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(bucketX + 2, H - 17, 1, 0, Math.PI * 2); ctx.fill();

      // Score popups
      scorePopups = scorePopups.filter(p => p.life > 0);
      scorePopups.forEach(p => {
        p.y -= 0.8;
        p.life--;
        ctx.globalAlpha = p.life / 60;
        ctx.fillStyle = p.color;
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("+" + p.pts, p.x, p.y);
        ctx.globalAlpha = 1;
      });

      // Extreme Fever overlay
      if (extremeFever) {
        ctx.fillStyle = "rgba(255,215,0,0.15)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("EXTREME FEVER!", W / 2, H / 2 - 30);
        ctx.font = "16px sans-serif";
        ctx.fillText("Score: " + score, W / 2, H / 2);
        const allCleared = pegs.every(p => p.hit);
        if (allCleared) {
          ctx.fillStyle = "#ff69b4";
          ctx.font = "bold 14px sans-serif";
          ctx.fillText("ULTRA EXTREME FEVER!", W / 2, H / 2 + 25);
        }
      }

      // Game over
      if (ballsLeft <= 0 && !shooting && !extremeFever) {
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 22px sans-serif";
        ctx.textAlign = "center";
        if (orangeLeft <= 0) {
          ctx.fillText("YOU WIN!", W / 2, H / 2 - 20);
        } else {
          ctx.fillText("Game Over!", W / 2, H / 2 - 20);
        }
        ctx.font = "16px sans-serif";
        ctx.fillText("Score: " + score, W / 2, H / 2 + 10);
        ctx.fillText("Orange pegs left: " + orangeLeft, W / 2, H / 2 + 35);
      }
    }

    function shoot() {
      if (shooting || ballsLeft <= 0 || extremeFever) return;
      if (ballsLeft <= 0 && orangeLeft > 0) return;
      shooting = true;
      shotHits = 0;
      ballsLeft--;
      ballsEl.textContent = ballsLeft;
      playPop();
      ball = {
        x: W / 2, y: 28,
        vx: Math.cos(aimAngle) * 3,
        vy: Math.sin(aimAngle) * 3,
        r: 6
      };
      requestAnimationFrame(update);
    }

    function endTurn() {
      // Remove lit pegs
      let orangeCleared = false;
      litPegs.forEach(idx => {
        const p = pegs[idx];
        if (p.type === "orange") { orangeLeft--; orangeCleared = true; }
        p.hit = true;
      });
      litPegs = [];

      if (orangeCleared) {
        orangeEl.textContent = orangeLeft;
        updateFever();
      }

      // Check win — all orange cleared
      if (orangeLeft <= 0) {
        extremeFever = true;
        playCelebration();
        // Bonus for remaining balls
        score += ballsLeft * 10000;
        scoreEl.textContent = score;
        draw();
        setTimeout(() => { extremeFever = false; draw(); }, 3000);
        return;
      }

      // Activate green power if hit
      if (pegs.some(p => p.lit && p.type === "green")) {
        guidePower = true; // Super Guide for next shot
      }

      // Move purple peg
      movePurple();
      ball = null;
      shooting = false;
      draw();
    }

    function update() {
      if (!ball) return;

      // Move bucket
      bucketX += bucketDir * 1.2;
      if (bucketX > W - bucketW / 2) bucketDir = -1;
      if (bucketX < bucketW / 2) bucketDir = 1;

      // Gravity
      ball.vy += 0.08;
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Wall bounce
      if (ball.x < ball.r) { ball.x = ball.r; ball.vx *= -0.85; }
      if (ball.x > W - ball.r) { ball.x = W - ball.r; ball.vx *= -0.85; }
      // Ceiling bounce
      if (ball.y < ball.r) { ball.y = ball.r; ball.vy *= -0.85; }

      // Peg collision
      pegs.forEach((p, idx) => {
        if (p.hit || p.lit) return;
        const dx = ball.x - p.x, dy = ball.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ball.r + p.r) {
          p.lit = true;
          litPegs.push(idx);
          shotHits++;

          // Score: base × shot multiplier × fever
          const base = pegPoints(p);
          const pts = base * shotHits * feverMult;
          score += pts;
          scoreEl.textContent = score;
          scorePopups.push({ x: p.x, y: p.y, pts, life: 60, color: pegColor(p) });
          playSqueak();

          // Free ball thresholds within shot
          const shotScore = litPegs.reduce((s, i) => s + pegPoints(pegs[i]), 0) * feverMult;
          if (shotScore >= 25000 && shotScore - pts < 25000) { ballsLeft++; ballsEl.textContent = ballsLeft; }

          // Bounce off peg
          const nx = dx / dist, ny = dy / dist;
          const dot = ball.vx * nx + ball.vy * ny;
          ball.vx -= 1.6 * dot * nx;
          ball.vy -= 1.6 * dot * ny;
          ball.x = p.x + (ball.r + p.r + 1) * nx;
          ball.y = p.y + (ball.r + p.r + 1) * ny;
        }
      });

      // Bucket catch
      if (ball.y > H - 28 && ball.y < H - 4 && Math.abs(ball.x - bucketX) < bucketW / 2) {
        ballsLeft++;
        ballsEl.textContent = ballsLeft;
        playCelebration();
        guidePower = false;
        endTurn();
        return;
      }

      // Ball out of bounds
      if (ball.y > H + 20) {
        guidePower = false;
        endTurn();
        return;
      }

      draw();
      requestAnimationFrame(update);
    }

    // Aiming
    canvas.addEventListener("mousemove", e => {
      if (shooting) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;
      aimAngle = Math.atan2(my - 18, mx - W / 2);
      if (aimAngle < 0.15) aimAngle = 0.15;
      if (aimAngle > Math.PI - 0.15) aimAngle = Math.PI - 0.15;
      draw();
    });

    canvas.addEventListener("click", () => shoot());

    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      const mx = (t.clientX - rect.left) * scaleX;
      const my = (t.clientY - rect.top) * scaleY;
      aimAngle = Math.atan2(my - 18, mx - W / 2);
      if (aimAngle < 0.15) aimAngle = 0.15;
      if (aimAngle > Math.PI - 0.15) aimAngle = Math.PI - 0.15;
      shoot();
    }, { passive: false });

    // Animate bucket even when not shooting
    function animateBucket() {
      if (!shooting) {
        bucketX += bucketDir * 1.2;
        if (bucketX > W - bucketW / 2) bucketDir = -1;
        if (bucketX < bucketW / 2) bucketDir = 1;
        draw();
      }
      requestAnimationFrame(animateBucket);
    }

    newBtn.addEventListener("click", () => { init(); playSqueak(); });
    init();
    animateBucket();
  }

  // ========== DOODLE JUMP (MOUSE JUMP) ==========
  function initDoodleJump() {
    const canvas = $("#doodle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const scoreEl = $("#doodle-score");
    const cheeseEl = $("#doodle-cheese");
    const bestEl = $("#doodle-best");
    const startBtn = $("#doodle-start");

    const W = canvas.width, H = canvas.height;
    let player, platforms, enemies, cheeses, particles, score, cheeseCount, bestScore, gameOver, started, cameraY;
    let keysDown = {};

    bestScore = parseInt(localStorage.getItem("doodleBest") || "0");
    if (bestEl) bestEl.textContent = bestScore;

    function init() {
      player = { x: W / 2 - 12, y: H - 60, w: 24, h: 28, vy: 0, vx: 0, dir: 1, invincible: 0 };
      platforms = [];
      enemies = [];
      cheeses = [];
      particles = [];
      score = 0; cheeseCount = 0; gameOver = false; started = false; cameraY = 0;
      scoreEl.textContent = 0;
      if (cheeseEl) cheeseEl.textContent = 0;

      for (let i = 0; i < 10; i++) {
        platforms.push(makePlatform(H - 50 - i * 50));
      }
      platforms[0].x = W / 2 - 28;
      platforms[0].y = H - 30;
      platforms[0].type = "normal";
      draw();
    }

    function makePlatform(y) {
      const x = Math.random() * (W - 60);
      const r = Math.random();
      let type = "normal";
      if (score > 800 && r < 0.06) type = "disappearing";
      else if (score > 500 && r < 0.12) type = "breaking";
      else if (score > 200 && r < 0.2) type = "moving";
      else if (r < 0.06) type = "spring";
      return { x, y, w: 56, h: 12, type, moveDir: (Math.random() < 0.5 ? 1 : -1), moveSpeed: 1 + Math.random() * 1.5, broken: false, touched: false, disappearTimer: 0 };
    }

    function makeEnemy(y) {
      const types = ["tabby", "black", "calico"];
      const t = types[Math.floor(Math.random() * types.length)];
      const fast = score > 1000;
      return {
        x: Math.random() * (W - 30), y, w: 28, h: 28,
        type: t,
        vx: (Math.random() < 0.5 ? 1 : -1) * (1.2 + Math.random() * (fast ? 2 : 1)),
        sinOffset: Math.random() * Math.PI * 2,
        baseY: y,
        alive: true
      };
    }

    function makeCheese(y) {
      return { x: Math.random() * (W - 16), y, w: 16, h: 16, collected: false };
    }

    function spawnParticles(x, y, color, count) {
      for (let i = 0; i < count; i++) {
        particles.push({ x, y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4 - 2, life: 30 + Math.random() * 20, color, r: 2 + Math.random() * 3 });
      }
    }

    // --- DRAWING ---
    function drawMouse(x, y) {
      const bounce = Math.sin(Date.now() / 100) * (player.vy < 0 ? 2 : 0);
      const sy = y + bounce;
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.beginPath(); ctx.ellipse(x + 12, sy + 28, 10, 3, 0, 0, Math.PI * 2); ctx.fill();
      // Body
      ctx.fillStyle = player.invincible > 0 ? (Math.floor(Date.now() / 80) % 2 ? "#ffd700" : "#9e9e9e") : "#9e9e9e";
      ctx.beginPath(); ctx.ellipse(x + 12, sy + 16, 11, 13, 0, 0, Math.PI * 2); ctx.fill();
      // Belly
      ctx.fillStyle = "#d4d0cc";
      ctx.beginPath(); ctx.ellipse(x + 12, sy + 19, 7, 8, 0, 0, Math.PI * 2); ctx.fill();
      // Ears
      ctx.fillStyle = "#9e9e9e";
      ctx.beginPath(); ctx.arc(x + 4, sy + 4, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 20, sy + 4, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#f0c0c0";
      ctx.beginPath(); ctx.arc(x + 4, sy + 4, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 20, sy + 4, 4, 0, Math.PI * 2); ctx.fill();
      // Eyes
      ctx.fillStyle = "#222";
      const eyeDir = player.vx > 0.5 ? 1 : player.vx < -0.5 ? -1 : 0;
      ctx.beginPath(); ctx.arc(x + 8 + eyeDir, sy + 11, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 16 + eyeDir, sy + 11, 2.5, 0, Math.PI * 2); ctx.fill();
      // Eye shine
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x + 7 + eyeDir, sy + 10, 1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 15 + eyeDir, sy + 10, 1, 0, Math.PI * 2); ctx.fill();
      // Nose
      ctx.fillStyle = "#ff8faa";
      ctx.beginPath(); ctx.arc(x + 12, sy + 15, 2, 0, Math.PI * 2); ctx.fill();
      // Whiskers
      ctx.strokeStyle = "rgba(0,0,0,0.2)"; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(x + 5, sy + 14); ctx.lineTo(x - 3, sy + 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + 5, sy + 16); ctx.lineTo(x - 3, sy + 17); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + 19, sy + 14); ctx.lineTo(x + 27, sy + 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + 19, sy + 16); ctx.lineTo(x + 27, sy + 17); ctx.stroke();
      // Feet
      ctx.fillStyle = "#f0c0c0";
      ctx.beginPath(); ctx.ellipse(x + 6, sy + 27, 4, 2.5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x + 18, sy + 27, 4, 2.5, 0, 0, Math.PI * 2); ctx.fill();
    }

    function drawPlatformShape(p, sy) {
      if (p.broken) return;
      const r = 5;
      if (p.type === "normal") {
        ctx.fillStyle = "#27ae60";
        ctx.beginPath(); ctx.roundRect(p.x, sy, p.w, p.h, r); ctx.fill();
        ctx.fillStyle = "#2ecc71";
        ctx.beginPath(); ctx.roundRect(p.x + 2, sy + 2, p.w - 4, p.h - 5, r - 1); ctx.fill();
        // Grass tufts
        ctx.fillStyle = "#1e8a4e";
        for (let i = 0; i < 3; i++) {
          const gx = p.x + 8 + i * 16;
          ctx.beginPath(); ctx.moveTo(gx, sy); ctx.lineTo(gx + 3, sy - 5); ctx.lineTo(gx + 6, sy); ctx.fill();
        }
      } else if (p.type === "moving") {
        ctx.fillStyle = "#2196f3";
        ctx.beginPath(); ctx.roundRect(p.x, sy, p.w, p.h, r); ctx.fill();
        ctx.fillStyle = "#64b5f6";
        ctx.beginPath(); ctx.roundRect(p.x + 2, sy + 2, p.w - 4, p.h - 5, r - 1); ctx.fill();
        // Arrows
        ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "8px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(p.moveDir > 0 ? "→" : "←", p.x + p.w / 2, sy + 9);
      } else if (p.type === "breaking") {
        ctx.fillStyle = "#8B4513";
        ctx.beginPath(); ctx.roundRect(p.x, sy, p.w, p.h, r); ctx.fill();
        ctx.strokeStyle = "#5d2e0e"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x + 10, sy + 1); ctx.lineTo(p.x + 18, sy + p.h - 1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(p.x + 30, sy + 1); ctx.lineTo(p.x + 38, sy + p.h - 1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(p.x + 45, sy + 3); ctx.lineTo(p.x + 42, sy + p.h); ctx.stroke();
      } else if (p.type === "spring") {
        ctx.fillStyle = "#27ae60";
        ctx.beginPath(); ctx.roundRect(p.x, sy, p.w, p.h, r); ctx.fill();
        ctx.fillStyle = "#2ecc71";
        ctx.beginPath(); ctx.roundRect(p.x + 2, sy + 2, p.w - 4, p.h - 5, r - 1); ctx.fill();
        // Spring coil on top
        ctx.fillStyle = "#e74c3c";
        ctx.beginPath(); ctx.roundRect(p.x + p.w / 2 - 6, sy - 10, 12, 10, 3); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5;
        for (let i = 0; i < 3; i++) {
          const cx = p.x + p.w / 2 - 4 + i * 4;
          ctx.beginPath(); ctx.moveTo(cx, sy - 8); ctx.lineTo(cx + 2, sy - 3); ctx.stroke();
        }
      } else if (p.type === "disappearing") {
        const alpha = p.touched ? Math.max(0, 1 - p.disappearTimer / 40) : 0.7;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#9c27b0";
        ctx.beginPath(); ctx.roundRect(p.x, sy, p.w, p.h, r); ctx.fill();
        ctx.fillStyle = "#ba68c8";
        ctx.beginPath(); ctx.roundRect(p.x + 2, sy + 2, p.w - 4, p.h - 5, r - 1); ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function drawCat(e) {
      const sy = e.y - cameraY;
      const bob = Math.sin(Date.now() / 300 + e.sinOffset) * 3;
      const colors = { tabby: ["#ff9800", "#e65100"], black: ["#424242", "#212121"], calico: ["#ff9800", "#fff"] };
      const c = colors[e.type] || colors.tabby;
      const facing = e.vx > 0 ? 1 : -1;
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.beginPath(); ctx.ellipse(e.x + 14, sy + 28, 12, 3, 0, 0, Math.PI * 2); ctx.fill();
      // Body
      ctx.fillStyle = c[0];
      ctx.beginPath(); ctx.ellipse(e.x + 14, sy + 16 + bob, 13, 12, 0, 0, Math.PI * 2); ctx.fill();
      // Calico patches
      if (e.type === "calico") {
        ctx.fillStyle = "#333";
        ctx.beginPath(); ctx.arc(e.x + 8, sy + 12 + bob, 5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(e.x + 20, sy + 18 + bob, 4, 0, Math.PI * 2); ctx.fill();
      }
      // Ears
      ctx.fillStyle = c[0];
      ctx.beginPath(); ctx.moveTo(e.x + 4, sy + 6 + bob); ctx.lineTo(e.x - 1, sy - 5 + bob); ctx.lineTo(e.x + 10, sy + 4 + bob); ctx.fill();
      ctx.beginPath(); ctx.moveTo(e.x + 24, sy + 6 + bob); ctx.lineTo(e.x + 29, sy - 5 + bob); ctx.lineTo(e.x + 18, sy + 4 + bob); ctx.fill();
      // Inner ears
      ctx.fillStyle = "#f0c0c0";
      ctx.beginPath(); ctx.moveTo(e.x + 5, sy + 5 + bob); ctx.lineTo(e.x + 1, sy - 2 + bob); ctx.lineTo(e.x + 9, sy + 4 + bob); ctx.fill();
      ctx.beginPath(); ctx.moveTo(e.x + 23, sy + 5 + bob); ctx.lineTo(e.x + 27, sy - 2 + bob); ctx.lineTo(e.x + 19, sy + 4 + bob); ctx.fill();
      // Eyes — menacing slits
      ctx.fillStyle = "#76ff03";
      ctx.beginPath(); ctx.arc(e.x + 8, sy + 12 + bob, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(e.x + 20, sy + 12 + bob, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#111";
      ctx.fillRect(e.x + 7, sy + 9.5 + bob, 2, 5);
      ctx.fillRect(e.x + 19, sy + 9.5 + bob, 2, 5);
      // Nose
      ctx.fillStyle = "#e91e63";
      ctx.beginPath(); ctx.moveTo(e.x + 14, sy + 16 + bob); ctx.lineTo(e.x + 12, sy + 14.5 + bob); ctx.lineTo(e.x + 16, sy + 14.5 + bob); ctx.fill();
      // Mouth
      ctx.strokeStyle = "#e91e63"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(e.x + 14, sy + 16 + bob); ctx.lineTo(e.x + 11, sy + 18 + bob); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(e.x + 14, sy + 16 + bob); ctx.lineTo(e.x + 17, sy + 18 + bob); ctx.stroke();
      // Tail
      ctx.strokeStyle = c[0]; ctx.lineWidth = 3; ctx.lineCap = "round";
      const tailX = facing > 0 ? e.x - 2 : e.x + 30;
      const wave = Math.sin(Date.now() / 200 + e.sinOffset) * 6;
      ctx.beginPath();
      ctx.moveTo(tailX, sy + 20 + bob);
      ctx.quadraticCurveTo(tailX + wave * facing, sy + 10 + bob, tailX + wave * 1.5 * facing, sy + 5 + bob);
      ctx.stroke();
      ctx.lineCap = "butt";
    }

    function drawCheese(c) {
      if (c.collected) return;
      const sy = c.y - cameraY;
      const glow = Math.sin(Date.now() / 200) * 0.15 + 0.85;
      ctx.globalAlpha = glow;
      // Cheese wedge
      ctx.fillStyle = "#ffc83d";
      ctx.beginPath(); ctx.moveTo(c.x, sy + 14); ctx.lineTo(c.x + 8, sy); ctx.lineTo(c.x + 16, sy + 14); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#e8a317";
      ctx.beginPath(); ctx.moveTo(c.x, sy + 14); ctx.lineTo(c.x + 16, sy + 14); ctx.lineTo(c.x + 16, sy + 16); ctx.lineTo(c.x, sy + 16); ctx.closePath(); ctx.fill();
      // Holes
      ctx.fillStyle = "#e8a317";
      ctx.beginPath(); ctx.arc(c.x + 6, sy + 9, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(c.x + 12, sy + 12, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    function draw() {
      // Background — notebook paper
      ctx.fillStyle = "#f5f0e8";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(180,200,220,0.25)";
      ctx.lineWidth = 1;
      const gridOffset = (cameraY * 0.3) % 20;
      for (let y = -20 + gridOffset; y < H + 20; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.strokeStyle = "rgba(255,100,100,0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(30, H); ctx.stroke();

      // Height markers
      ctx.fillStyle = "rgba(61,44,30,0.15)"; ctx.font = "10px sans-serif"; ctx.textAlign = "right";
      for (let h = 0; h < score + 200; h += 100) {
        const markerY = -h * 10 - cameraY;
        if (markerY > -10 && markerY < H) {
          ctx.fillText(h + "m", 26, markerY + 3);
        }
      }

      // Platforms
      platforms.forEach(p => {
        const sy = p.y - cameraY;
        if (sy > -20 && sy < H + 20) drawPlatformShape(p, sy);
      });

      // Cheeses
      cheeses.forEach(c => {
        const sy = c.y - cameraY;
        if (sy > -20 && sy < H + 20) drawCheese(c);
      });

      // Enemies
      enemies.forEach(e => {
        if (!e.alive) return;
        const sy = e.y - cameraY;
        if (sy > -30 && sy < H + 30) drawCat(e);
      });

      // Particles
      particles.forEach(p => {
        ctx.globalAlpha = p.life / 50;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Player
      if (!gameOver) {
        drawMouse(player.x, player.y - cameraY);
      }

      // HUD on canvas
      ctx.fillStyle = "rgba(61,44,30,0.7)";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Score: " + score, 36, 20);
      ctx.fillText("🧀 " + cheeseCount, 36, 38);

      // Game over overlay
      if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", W / 2, H / 2 - 40);
        ctx.font = "16px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("Score: " + score, W / 2, H / 2 - 10);
        ctx.fillText("🧀 Cheese: " + cheeseCount, W / 2, H / 2 + 15);
        if (score >= bestScore) {
          ctx.fillStyle = "#ff69b4";
          ctx.font = "bold 18px sans-serif";
          ctx.fillText("✨ New Best! ✨", W / 2, H / 2 + 45);
        }
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "13px sans-serif";
        ctx.fillText("Tap or press any key to retry", W / 2, H / 2 + 75);
      }
    }

    function update() {
      if (gameOver || !started) return;

      // Horizontal input
      if (keysDown["ArrowLeft"] || keysDown["a"]) player.vx = -3.2;
      else if (keysDown["ArrowRight"] || keysDown["d"]) player.vx = 3.2;
      else player.vx *= 0.85;
      player.x += player.vx;

      // Screen wrapping
      if (player.x + player.w < 0) player.x = W;
      if (player.x > W) player.x = -player.w;

      // Gravity
      player.vy += 0.22;
      player.y += player.vy;

      // Invincibility timer
      if (player.invincible > 0) player.invincible--;

      // Move moving platforms
      platforms.forEach(p => {
        if (p.type === "moving") {
          p.x += p.moveDir * p.moveSpeed;
          if (p.x < 0 || p.x + p.w > W) p.moveDir *= -1;
        }
        if (p.type === "disappearing" && p.touched) {
          p.disappearTimer++;
          if (p.disappearTimer > 40) p.broken = true;
        }
      });

      // Move enemies — patrol + sine bob
      enemies.forEach(e => {
        if (!e.alive) return;
        e.x += e.vx;
        if (e.x < -5 || e.x + e.w > W + 5) e.vx *= -1;
        e.y = e.baseY + Math.sin(Date.now() / 500 + e.sinOffset) * 15;
      });

      // Platform collision (only when falling)
      if (player.vy > 0) {
        platforms.forEach(p => {
          if (p.broken) return;
          const py = player.y + player.h;
          const prevPy = py - player.vy;
          if (player.x + player.w > p.x + 4 && player.x < p.x + p.w - 4 &&
              py >= p.y && prevPy <= p.y + 4) {
            if (p.type === "breaking") {
              p.broken = true;
              spawnParticles(p.x + p.w / 2, p.y - cameraY, "#8B4513", 6);
              playPop();
              return;
            }
            if (p.type === "disappearing" && !p.touched) {
              p.touched = true;
            }
            player.vy = p.type === "spring" ? -15 : -9.5;
            playSqueak();
          }
        });
      }

      // Cheese collection
      cheeses.forEach(c => {
        if (c.collected) return;
        const dx = (player.x + player.w / 2) - (c.x + c.w / 2);
        const dy = (player.y + player.h / 2) - (c.y + c.h / 2);
        if (Math.abs(dx) < 18 && Math.abs(dy) < 18) {
          c.collected = true;
          cheeseCount++;
          score += 25;
          if (cheeseEl) cheeseEl.textContent = cheeseCount;
          scoreEl.textContent = score;
          spawnParticles(c.x + 8, c.y - cameraY + 8, "#ffc83d", 8);
          playPop();
        }
      });

      // Enemy collision
      enemies.forEach(e => {
        if (!e.alive) return;
        if (player.invincible > 0) return;
        if (player.x + player.w > e.x + 3 && player.x < e.x + e.w - 3) {
          const psy = player.y;
          const esy = e.y;
          if (psy + player.h > esy + 4 && psy < esy + e.h) {
            if (player.vy > 0 && psy + player.h - esy < 14) {
              e.alive = false;
              player.vy = -9.5;
              player.invincible = 30;
              score += 100;
              scoreEl.textContent = score;
              spawnParticles(e.x + 14, e.y - cameraY + 14, "#ff9800", 10);
              playPop();
            } else {
              gameOver = true;
              spawnParticles(player.x + 12, player.y - cameraY + 14, "#ff0000", 12);
              playPop();
              if (score > bestScore) {
                bestScore = score;
                localStorage.setItem("doodleBest", bestScore);
                bestEl.textContent = bestScore;
              }
            }
          }
        }
      });

      // Camera follows player upward
      const targetCam = player.y - H * 0.4;
      if (targetCam < cameraY) {
        cameraY += (targetCam - cameraY) * 0.15;
      }

      // Update score based on height
      const height = Math.floor(-cameraY / 10);
      if (height > score) {
        score = height;
        scoreEl.textContent = score;
      }

      // Generate new platforms, enemies, and cheeses above
      const highestPlatY = Math.min(...platforms.map(p => p.y));
      if (highestPlatY > cameraY - 150) {
        const gap = 38 + Math.min(score / 8, 50);
        const newY = highestPlatY - gap;
        platforms.push(makePlatform(newY));
        // Enemies ramp up with score
        if (score > 150 && Math.random() < Math.min(0.12, 0.04 + score / 5000)) {
          enemies.push(makeEnemy(newY - 50));
        }
        // Cheese spawns
        if (Math.random() < 0.2) {
          cheeses.push(makeCheese(newY - 20 - Math.random() * 30));
        }
      }

      // Cleanup off-screen
      platforms = platforms.filter(p => p.y - cameraY < H + 100);
      enemies = enemies.filter(e => e.y - cameraY < H + 100);
      cheeses = cheeses.filter(c => c.y - cameraY < H + 100);

      // Update particles
      particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life--; });
      particles = particles.filter(p => p.life > 0);

      // Fall below screen = game over
      if (player.y - cameraY > H + 50) {
        gameOver = true;
        if (score > bestScore) {
          bestScore = score;
          localStorage.setItem("doodleBest", bestScore);
          bestEl.textContent = bestScore;
        }
      }

      draw();
      if (!gameOver) requestAnimationFrame(update);
      else draw();
    }

    function startGame() {
      init();
      started = true;
      player.vy = -9.5;
      requestAnimationFrame(update);
    }

    document.addEventListener("keydown", e => {
      keysDown[e.key] = true;
      if (gameOver && started) { startGame(); return; }
      if (!started && (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "a" || e.key === "d")) {
        startGame();
      }
    });
    document.addEventListener("keyup", e => { keysDown[e.key] = false; });

    // Touch controls — tilt style
    let touchStartX = null;
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      touchStartX = e.touches[0].clientX;
      if (gameOver && started) { startGame(); return; }
      if (!started) startGame();
    }, { passive: false });
    canvas.addEventListener("touchmove", e => {
      e.preventDefault();
      if (touchStartX === null) return;
      const dx = e.touches[0].clientX - touchStartX;
      if (dx < -10) { keysDown["ArrowLeft"] = true; keysDown["ArrowRight"] = false; }
      else if (dx > 10) { keysDown["ArrowRight"] = true; keysDown["ArrowLeft"] = false; }
      else { keysDown["ArrowLeft"] = false; keysDown["ArrowRight"] = false; }
    }, { passive: false });
    canvas.addEventListener("touchend", () => {
      touchStartX = null;
      keysDown["ArrowLeft"] = false;
      keysDown["ArrowRight"] = false;
    });

    startBtn.addEventListener("click", () => {
      if (gameOver && started) startGame();
      else if (!started) startGame();
    });
    init();
  }

  // ========== PICROSS (NONOGRAM) ==========
  function initPicross() {
    const canvas = $("#picross-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const select = $("#picross-puzzle-select");
    const statusEl = $("#picross-status");
    const fillBtn = $("#picross-fill");
    const markBtn = $("#picross-mark");
    const resetBtn = $("#picross-reset");

    const PUZZLES = [
      { name: "Mouse", size: 5, grid: [[0,1,0,0,0],[1,1,1,0,0],[0,1,1,1,0],[0,0,1,1,1],[0,0,0,0,1]] },
      { name: "Cheese", size: 5, grid: [[1,1,1,1,1],[1,0,1,1,0],[0,1,1,1,0],[0,0,1,1,0],[0,0,0,1,0]] },
      { name: "Cat", size: 5, grid: [[1,0,0,0,1],[1,1,1,1,1],[1,0,1,0,1],[1,1,0,1,1],[0,1,1,1,0]] },
      { name: "Heart", size: 5, grid: [[0,1,0,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,1,1,0],[0,0,1,0,0]] },
      { name: "Mouse Face", size: 10, grid: [
        [0,1,1,0,0,0,0,1,1,0],[1,1,1,1,0,0,1,1,1,1],[0,1,1,0,0,0,0,1,1,0],[0,0,0,1,1,1,1,0,0,0],
        [0,0,1,1,0,0,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[0,1,0,1,0,0,1,0,1,0],[1,0,0,0,1,1,0,0,0,1],
        [0,0,0,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0]
      ]},
      { name: "Cat Face", size: 10, grid: [
        [1,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,0,0,1,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,0,0,0,0,1,0,0,0,1],[1,0,1,0,0,0,0,1,0,1],
        [0,1,1,0,1,1,0,1,1,0],[0,0,1,1,1,1,1,1,0,0]
      ]},
      { name: "Cheese Wedge", size: 10, grid: [
        [1,1,1,1,1,1,1,1,1,0],[1,1,0,1,1,1,0,1,1,0],[1,1,1,1,1,1,1,1,0,0],[0,1,1,0,1,1,1,1,0,0],
        [0,1,1,1,1,0,1,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,1,0,1,1,0,0,0,0],[0,0,0,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,1,0,0,0,0]
      ]},
      { name: "Paw Print", size: 10, grid: [
        [0,0,1,0,0,0,0,1,0,0],[0,1,1,0,0,0,0,1,1,0],[0,0,1,0,0,0,0,1,0,0],[0,0,0,1,0,0,1,0,0,0],
        [0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0]
      ]}
    ];

    let currentPuzzle = 0;
    let playerGrid; // 0=unknown, 1=filled, 2=marked-X
    let mode = "fill"; // "fill" or "mark"
    let solved = false;
    let cellSize, offsetX, offsetY, clueSpaceX, clueSpaceY;

    // Populate puzzle selector
    PUZZLES.forEach((p, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = (p.size + "x" + p.size) + " " + p.name;
      select.appendChild(opt);
    });

    function getClues(grid) {
      const size = grid.length;
      const rowClues = [];
      const colClues = [];
      for (let r = 0; r < size; r++) {
        const groups = [];
        let count = 0;
        for (let c = 0; c < size; c++) {
          if (grid[r][c]) count++;
          else if (count > 0) { groups.push(count); count = 0; }
        }
        if (count > 0) groups.push(count);
        rowClues.push(groups.length ? groups : [0]);
      }
      for (let c = 0; c < size; c++) {
        const groups = [];
        let count = 0;
        for (let r = 0; r < size; r++) {
          if (grid[r][c]) count++;
          else if (count > 0) { groups.push(count); count = 0; }
        }
        if (count > 0) groups.push(count);
        colClues.push(groups.length ? groups : [0]);
      }
      return { rowClues, colClues };
    }

    function initPuzzle() {
      const p = PUZZLES[currentPuzzle];
      const size = p.size;
      playerGrid = Array.from({ length: size }, () => Array(size).fill(0));
      solved = false;
      statusEl.textContent = "";

      const { rowClues, colClues } = getClues(p.grid);
      const maxRowClue = Math.max(...rowClues.map(c => c.length));
      const maxColClue = Math.max(...colClues.map(c => c.length));

      clueSpaceX = maxRowClue * 16 + 8;
      clueSpaceY = maxColClue * 14 + 8;
      const available = Math.min(canvas.width - clueSpaceX - 4, canvas.height - clueSpaceY - 4);
      cellSize = Math.floor(available / size);
      offsetX = clueSpaceX;
      offsetY = clueSpaceY;

      draw();
    }

    function draw() {
      const p = PUZZLES[currentPuzzle];
      const size = p.size;
      const { rowClues, colClues } = getClues(p.grid);

      ctx.fillStyle = "#fdf6e3";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw column clues
      ctx.fillStyle = "#3d2c1e";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      for (let c = 0; c < size; c++) {
        const clue = colClues[c];
        const cx = offsetX + c * cellSize + cellSize / 2;
        for (let i = 0; i < clue.length; i++) {
          const cy = offsetY - (clue.length - i) * 14;
          // Grey out completed clues
          const colFilled = [];
          let cnt = 0;
          for (let r = 0; r < size; r++) {
            if (playerGrid[r][c] === 1) cnt++;
            else if (cnt > 0) { colFilled.push(cnt); cnt = 0; }
          }
          if (cnt > 0) colFilled.push(cnt);
          ctx.fillStyle = JSON.stringify(colFilled) === JSON.stringify(clue) ? "rgba(61,44,30,0.3)" : "#3d2c1e";
          ctx.fillText(clue[i], cx, cy + 14);
        }
      }

      // Draw row clues
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (let r = 0; r < size; r++) {
        const clue = rowClues[r];
        const cy = offsetY + r * cellSize + cellSize / 2;
        // Check if row is complete
        const rowFilled = [];
        let cnt = 0;
        for (let c = 0; c < size; c++) {
          if (playerGrid[r][c] === 1) cnt++;
          else if (cnt > 0) { rowFilled.push(cnt); cnt = 0; }
        }
        if (cnt > 0) rowFilled.push(cnt);
        const rowDone = JSON.stringify(rowFilled) === JSON.stringify(clue);
        for (let i = 0; i < clue.length; i++) {
          const cx = offsetX - (clue.length - i) * 16 - 4;
          ctx.fillStyle = rowDone ? "rgba(61,44,30,0.3)" : "#3d2c1e";
          ctx.fillText(clue[i], cx + 14, cy);
        }
      }

      // Draw grid cells
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const x = offsetX + c * cellSize;
          const y = offsetY + r * cellSize;

          // Cell background
          if (playerGrid[r][c] === 1) {
            ctx.fillStyle = solved ? "#ffc83d" : "#3d2c1e";
            ctx.fillRect(x, y, cellSize, cellSize);
          } else {
            ctx.fillStyle = (r + c) % 2 === 0 ? "#fdf6e3" : "#f5ecd5";
            ctx.fillRect(x, y, cellSize, cellSize);
          }

          // X mark
          if (playerGrid[r][c] === 2) {
            ctx.strokeStyle = "rgba(200,80,80,0.5)";
            ctx.lineWidth = 2;
            const m = cellSize * 0.25;
            ctx.beginPath(); ctx.moveTo(x + m, y + m); ctx.lineTo(x + cellSize - m, y + cellSize - m); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x + cellSize - m, y + m); ctx.lineTo(x + m, y + cellSize - m); ctx.stroke();
          }

          // Cell border
          ctx.strokeStyle = "rgba(61,44,30,0.2)";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, cellSize, cellSize);
        }
      }

      // Thicker lines every 5 cells
      ctx.strokeStyle = "rgba(61,44,30,0.5)";
      ctx.lineWidth = 2;
      for (let i = 0; i <= size; i += 5) {
        // Vertical
        ctx.beginPath(); ctx.moveTo(offsetX + i * cellSize, offsetY); ctx.lineTo(offsetX + i * cellSize, offsetY + size * cellSize); ctx.stroke();
        // Horizontal
        ctx.beginPath(); ctx.moveTo(offsetX, offsetY + i * cellSize); ctx.lineTo(offsetX + size * cellSize, offsetY + i * cellSize); ctx.stroke();
      }
      // Outer border
      ctx.strokeStyle = "rgba(61,44,30,0.6)";
      ctx.lineWidth = 2;
      ctx.strokeRect(offsetX, offsetY, size * cellSize, size * cellSize);

      // Solved message
      if (solved) {
        ctx.fillStyle = "rgba(255,200,61,0.9)";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Solved! 🎉", canvas.width / 2, canvas.height - 20);
      }
    }

    function checkSolved() {
      const p = PUZZLES[currentPuzzle];
      const size = p.size;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (p.grid[r][c] === 1 && playerGrid[r][c] !== 1) return false;
          if (p.grid[r][c] === 0 && playerGrid[r][c] === 1) return false;
        }
      }
      return true;
    }

    function handleClick(e) {
      if (solved) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;

      const size = PUZZLES[currentPuzzle].size;
      const c = Math.floor((mx - offsetX) / cellSize);
      const r = Math.floor((my - offsetY) / cellSize);
      if (r < 0 || r >= size || c < 0 || c >= size) return;

      if (mode === "fill") {
        playerGrid[r][c] = playerGrid[r][c] === 1 ? 0 : 1;
      } else {
        playerGrid[r][c] = playerGrid[r][c] === 2 ? 0 : 2;
      }

      if (checkSolved()) {
        solved = true;
        statusEl.textContent = "🎉 Solved!";
        playCelebration();
      }
      draw();
    }

    // Prevent right-click context menu on canvas
    canvas.addEventListener("contextmenu", e => { e.preventDefault(); });

    // Right-click to mark
    canvas.addEventListener("mousedown", e => {
      if (e.button === 2) {
        e.preventDefault();
        if (solved) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mx = (e.clientX - rect.left) * scaleX;
        const my = (e.clientY - rect.top) * scaleY;
        const size = PUZZLES[currentPuzzle].size;
        const c = Math.floor((mx - offsetX) / cellSize);
        const r = Math.floor((my - offsetY) / cellSize);
        if (r < 0 || r >= size || c < 0 || c >= size) return;
        playerGrid[r][c] = playerGrid[r][c] === 2 ? 0 : 2;
        draw();
      }
    });

    canvas.addEventListener("click", handleClick);

    // Touch support
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      const touch = e.touches[0];
      handleClick({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: false });

    // Mode toggle
    fillBtn.addEventListener("click", () => {
      mode = "fill";
      fillBtn.classList.add("active");
      markBtn.classList.remove("active");
    });
    markBtn.addEventListener("click", () => {
      mode = "mark";
      markBtn.classList.add("active");
      fillBtn.classList.remove("active");
    });

    // Puzzle select
    select.addEventListener("change", () => {
      currentPuzzle = parseInt(select.value);
      initPuzzle();
    });

    // Reset
    resetBtn.addEventListener("click", () => { initPuzzle(); playPop(); });

    initPuzzle();
  }

})();
