/* ---------- deck: 36 cards, 18 are fanned out each draw ---------- */
const RAW = [
  [
    "🌙",
    "The Moon",
    "A secret that only comes out at night",
    "A secret everyone already knows",
  ],
  [
    "☀️",
    "The Sun",
    "Your proudest, brightest moment",
    "A moment you wish you could dim",
  ],
  [
    "🗝️",
    "The Key",
    "Something you finally unlocked",
    "Something you locked away on purpose",
  ],
  [
    "🌊",
    "The Tide",
    "A change that arrived suddenly",
    "A change you kept holding back",
  ],
  [
    "🕯️",
    "The Candle",
    "Someone who guided you through the dark",
    "A time you had to be your own light",
  ],
  [
    "🚪",
    "The Door",
    "A choice you almost didn’t make",
    "A door you walked back through",
  ],
  [
    "🦉",
    "The Owl",
    "Advice from an unlikely source",
    "Advice you ignored, and what happened",
  ],
  [
    "🌹",
    "The Rose",
    "Something beautiful with a thorn",
    "A thorn that turned out to be a gift",
  ],
  [
    "⚖️",
    "The Scales",
    "A decision where both sides felt right",
    "A time you tipped the balance unfairly",
  ],
  [
    "🗺️",
    "The Map",
    "A trip that didn’t go as planned",
    "A place you found by getting lost",
  ],
  [
    "🃏",
    "The Fool",
    "A time you leapt before you looked",
    "A time you looked so long you never leapt",
  ],
  [
    "🪞",
    "The Mirror",
    "Meeting an earlier version of yourself",
    "Someone who saw you better than you saw yourself",
  ],
  [
    "🌱",
    "The Seed",
    "Something small that grew into something big",
    "Something you planted but never saw grow",
  ],
  [
    "⛈️",
    "The Storm",
    "A chaotic day that ended up funny",
    "A calm moment right before everything changed",
  ],
  [
    "🎭",
    "The Mask",
    "A role you played that wasn’t really you",
    "The moment the mask slipped",
  ],
  [
    "⭐",
    "The Star",
    "A wish that came true in a weird way",
    "A wish you’re glad didn’t come true",
  ],
  [
    "🕰️",
    "The Hourglass",
    "A deadline that taught you something",
    "Time you wasted and don’t regret",
  ],
  [
    "🐈‍⬛",
    "The Familiar",
    "A loyal companion: person, pet, or object",
    "An unlikely friend who showed up",
  ],
  // new cards
  [
    "🔥",
    "The Flame",
    "Something you’re fiercely passionate about",
    "Something that burned you out",
  ],
  [
    "🌈",
    "The Rainbow",
    "Good news right after a rough patch",
    "A promise that didn’t quite pay off",
  ],
  [
    "🪁",
    "The Kite",
    "A time you let go and soared",
    "Something you held on to too tightly",
  ],
  [
    "🏰",
    "The Tower",
    "A plan that collapsed spectacularly",
    "Something you propped up for too long",
  ],
  ["🎲", "The Dice", "A risk that paid off", "A gamble you’d take back"],
  [
    "🧭",
    "The Compass",
    "A moment you knew exactly where to go",
    "A time you followed the wrong direction",
  ],
  [
    "🦋",
    "The Butterfly",
    "A big glow-up or transformation",
    "A change you weren’t ready for",
  ],
  ["🍀", "The Clover", "Pure, dumb luck", "Luck you didn’t notice until later"],
  [
    "🎵",
    "The Song",
    "A song tied to a memory",
    "A song you can’t listen to anymore",
  ],
  [
    "🧵",
    "The Thread",
    "A tiny detail that connected everything",
    "A loose end you never tied up",
  ],
  [
    "🏔️",
    "The Summit",
    "Something hard you finally finished",
    "A peak that felt emptier than expected",
  ],
  [
    "🕊️",
    "The Dove",
    "An apology that mended something",
    "An apology you never got",
  ],
  [
    "🪄",
    "The Wand",
    "A little magic in an ordinary day",
    "A shortcut that cost you",
  ],
  [
    "🐉",
    "The Dragon",
    "A fear you faced head-on",
    "A fear that was bigger in your head",
  ],
  [
    "🍵",
    "The Teacup",
    "A quiet conversation that mattered",
    "Something left unsaid over a meal",
  ],
  [
    "🌋",
    "The Volcano",
    "Feelings that finally erupted",
    "Something you kept bottled up",
  ],
  [
    "🎁",
    "The Gift",
    "A surprise you never saw coming",
    "A gift that came with strings",
  ],
  [
    "🔮",
    "The Crystal Ball",
    "A prediction that came true",
    "A prediction that was totally wrong",
  ],
];
const FAN = 18;
const toRoman = (n) => {
  let r = "";
  [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ].forEach(([v, s]) => {
    while (n >= v) {
      r += s;
      n -= v;
    }
  });
  return r;
};
const D = RAW.map((x, i) => ({
  n: toRoman(i + 1),
  e: x[0],
  t: x[1],
  u: x[2],
  r: x[3],
}));
const POS = {
  1: ["Your card"],
  3: ["The beginning", "The turn", "The ending"],
};

const $ = (s) => document.querySelector(s);
const cls = document.body.classList;
const msg = (t) => ($("#msg").textContent = t);
const small = () => matchMedia("(max-width:520px)").matches;
const calm = () => matchMedia("(prefers-reduced-motion:reduce)").matches;
const shuffled = (a) => {
  const d = [...a];
  for (let i = d.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
};
const onKey = (fn) => (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

/* ---------- story timer ---------- */
let tLen = 60,
  tLeft = 60,
  tEnd = 0,
  tId = 0,
  ac;
const fmt = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");

function drawTimer() {
  $("#tnum").textContent = fmt(Math.ceil(tLeft));
  $("#tbar").style.width = (tLeft / tLen) * 100 + "%";
  $("#timer").classList.toggle("low", tLeft > 0 && tLeft <= 10);
}
function stopTimer() {
  clearInterval(tId);
  tId = 0;
}
function setTimerLen(n) {
  stopTimer();
  tLen = tLeft = n;
  $("#timer").classList.remove("low", "up");
  document
    .querySelectorAll("#timer [data-t]")
    .forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.t === n)));
  $("#tgo").textContent = "Start timer";
  drawTimer();
}
function chime() {
  try {
    [660, 880].forEach((f, i) => {
      const o = ac.createOscillator(),
        g = ac.createGain(),
        t = ac.currentTime + i * 0.22;
      o.frequency.value = f;
      o.connect(g);
      g.connect(ac.destination);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.15, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.start(t);
      o.stop(t + 0.55);
    });
  } catch {}
  navigator.vibrate?.(200);
}
function tick() {
  tLeft = Math.max(0, (tEnd - Date.now()) / 1000);
  drawTimer();
  if (tLeft > 0) return;
  stopTimer();
  $("#timer").classList.add("up");
  $("#tgo").textContent = "Restart timer";
  msg("Time’s up! Pass the deck to a friend.");
  chime();
}
function toggleTimer() {
  if (tId) {
    stopTimer();
    $("#tgo").textContent = "Resume timer";
    return;
  }
  try {
    ac = ac || new AudioContext();
    ac.resume();
  } catch {}
  if (tLeft <= 0) setTimerLen(tLen);
  $("#timer").classList.remove("up");
  tEnd = Date.now() + tLeft * 1000;
  tId = setInterval(tick, 200);
  $("#tgo").textContent = "Pause timer";
  msg("Go! Tell your story.");
}
$("#tgo").onclick = toggleTimer;
document
  .querySelectorAll("#timer [data-t]")
  .forEach((b) => (b.onclick = () => setTimerLen(+b.dataset.t)));

/* ---------- oracle ---------- */
let mode = 3,
  phase = "idle",
  deck = [],
  picks = [],
  flipped = 0;

const cardHTML = (d, r) => `
  <div class="card" tabindex="0" role="button" aria-label="Face-down card. Tap to reveal.">
    <div class="in">
      <div class="face back">✦</div>
      <div class="face front">
        <small>${d.n}</small>
        <b class="${r ? "rv" : ""}">${d.e}</b>
        <strong>${d.t}</strong>
        <em>${r ? "Reversed ↺" : "Upright"}</em>
      </div>
    </div>
  </div>`;

function setMode(n) {
  mode = n;
  document
    .querySelectorAll("[data-m]")
    .forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.m === n)));
  reset();
}

function reset() {
  phase = "idle";
  picks = [];
  flipped = 0;
  cls.remove("tense", "pick", "rev");
  $("#slots").className = "m" + mode;
  $("#slots").innerHTML = POS[mode]
    .map(
      (l) =>
        `<div class="slot"><div class="card ph"></div><span>${l}</span></div>`,
    )
    .join("");
  $("#read").hidden = true;
  $("#timer").hidden = true;
  $("#list").innerHTML = "";
  setTimerLen(tLen);
  const f = $("#fan");
  f.innerHTML = "";
  f.classList.remove("shuf");
  for (let i = 0; i < FAN; i++) {
    const c = document.createElement("div");
    c.className = "fc";
    c.style.setProperty("--i", i);
    c.style.setProperty("--r", ((i % 3) - 1) * 1.2 + "deg");
    c.style.setProperty("--x", i * 0.35 + "px");
    c.style.setProperty("--y", i * -0.8 + "px");
    f.appendChild(c);
  }
  $("#go").textContent = "Shuffle the deck";
  $("#go").disabled = false;
  msg("Hold a story in your mind, then shuffle.");
}

function shuffle() {
  deck = shuffled(D).slice(0, FAN); // a fresh set of 18 from the 36-card deck
  phase = "shuf";
  $("#go").disabled = true;
  if (window.innerWidth < 860)
    $("#oracle .stage").scrollIntoView({ block: "center" });
  cls.add("tense");
  msg("The deck stirs…");
  $("#fan").classList.add("shuf");
  setTimeout(() => {
    $("#fan").classList.remove("shuf");
    cls.remove("tense");
    fanOut();
  }, 2700);
}

function fanOut() {
  cls.add("pick");
  const sm = small();
  const f = $("#fan"),
    W = f.clientWidth,
    n = FAN,
    fw = sm ? 56 : 84;
  const span = Math.min(W - fw - 24, 880);
  [...f.children].forEach((c, i) => {
    const t = i / (n - 1) - 0.5;
    c.style.setProperty("--x", t * span + "px");
    c.style.setProperty("--y", t * t * (sm ? 50 : 80) - 20 + "px");
    c.style.setProperty("--r", t * (sm ? 40 : 32) + "deg");
    c.classList.add("live");
    c.tabIndex = 0;
    c.setAttribute("role", "button");
    c.setAttribute("aria-label", "Face-down card " + (i + 1));
    c.onclick = () => pick(i);
    c.onkeydown = onKey(() => pick(i));
  });
  phase = "pick";
  $("#go").textContent = "Start over";
  $("#go").disabled = false;
  msg(`Choose ${mode} card${mode > 1 ? "s" : ""} that call to you.`);
}

function pick(i) {
  const c = $("#fan").children[i];
  if (phase !== "pick" || c.classList.contains("gone")) return;
  const from = c.getBoundingClientRect(),
    fromW = c.offsetWidth;
  const rot = c.style.getPropertyValue("--r");
  c.classList.add("gone");
  const d = deck[i],
    rev = Math.random() < 0.25,
    k = picks.length;
  picks.push({ d, rev });
  const s = $("#slots").children[k];
  s.querySelector(".ph").outerHTML = cardHTML(d, rev);
  const el = s.querySelector(".card");
  el.onclick = () => flip(el, k);
  el.onkeydown = onKey(() => flip(el, k));
  if (!calm()) {
    const to = el.getBoundingClientRect();
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    el.animate(
      [
        {
          transform: `translate(${dx}px,${dy}px) scale(${fromW / to.width}) rotate(${rot})`,
        },
        { transform: "none" },
      ],
      { duration: 750, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  }
  $("#list").insertAdjacentHTML(
    "beforeend",
    `<li hidden><b>${POS[mode][k]}: ${d.e} ${d.t}${rev ? " (reversed)" : ""}</b>${rev ? d.r : d.u}</li>`,
  );
  if (picks.length === mode) {
    phase = "reveal";
    cls.remove("pick");
    cls.add("rev");
    msg("Tap each card to turn it over.");
  }
}

function flip(el, k) {
  if (phase !== "reveal" || el.classList.contains("open")) return;
  const p = picks[k];
  el.classList.add("open");
  el.setAttribute("aria-label", p.d.t + (p.rev ? ", reversed" : ""));
  $("#list").children[k].hidden = false;
  $("#read").hidden = false;
  if (++flipped === mode) {
    phase = "done";
    $("#timer").hidden = false; // timer appears once every card is turned
    $("#go").textContent = "Draw again";
    msg("The cards have spoken. Start the timer when you’re ready.");
  }
  $("#read").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

$("#go").onclick = () => (phase === "idle" ? shuffle() : reset());
document
  .querySelectorAll("[data-m]")
  .forEach((b) => (b.onclick = () => setMode(+b.dataset.m)));

/* ---------- memory match ---------- */
let first = null,
  lock = false,
  moves = 0,
  found = 0,
  pairs = 6;
const COLS = { 6: 4, 8: 4, 10: 5, 12: 6 };
const stats = (t) =>
  ($("#stats").textContent = t || `Moves ${moves}, pairs ${found} of ${pairs}`);

let gameRun = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const gStage = () => $("#game .stage");
const mcs = () => [...document.querySelectorAll(".mc")];

function geo() {
  const s = gStage().getBoundingClientRect();
  return mcs().map((el) => {
    const r = el.getBoundingClientRect();
    return {
      el,
      dx: s.left + s.width / 2 - (r.left + r.width / 2),
      dy: s.top + s.height / 2 - (r.top + r.height / 2),
    };
  });
}
const stack = (c, i) =>
  `translate(${c.dx + i * 0.35}px,${c.dy - i * 0.8}px) rotate(${((i % 3) - 1) * 1.2}deg)`;

function riffle(g) {
  return g.map((c, i) => {
    const s = i % 2 ? 1 : -1,
      at = (x, y, r, k = 1) =>
        `translate(${c.dx + x}px,${c.dy + y}px) rotate(${r}deg) scale(${k})`;
    return c.el.animate(
      [
        { transform: stack(c, i) },
        { transform: at(s * -110, -34, s * -12, 1.06) },
        { transform: at(s * 110, 20, s * 12, 1.08) },
        { transform: at(s * -60, 30, s * -6, 1.06) },
        { transform: stack(c, i) },
      ],
      { duration: 1500, delay: i * 35, easing: "ease-in-out", fill: "both" },
    );
  });
}

async function startGame() {
  const run = ++gameRun;
  const set = shuffled(D).slice(0, pairs);
  first = null;
  lock = true;
  moves = 0;
  found = 0;
  gStage().classList.remove("hot");
  $("#grid").style.setProperty("--cols", COLS[pairs]);
  $("#grid").innerHTML = shuffled([...set, ...set])
    .map(
      (d) => `
    <button class="mc" data-t="${d.t}" aria-label="Face-down card">
      <div class="in">
        <div class="face back">✦</div>
        <div class="face front"><b>${d.e}</b><strong>${d.t}</strong></div>
      </div>
    </button>`,
    )
    .join("");
  mcs().forEach((b) => (b.onclick = () => turn(b)));
  if (!calm()) {
    $("#again").disabled = true;
    stats("Shuffling the deck…");
    if (window.innerWidth < 860) gStage().scrollIntoView({ block: "center" });
    gStage().classList.add("hot");
    const g = geo(),
      r = riffle(g);
    await sleep(1900);
    if (run !== gameRun) return;
    r.forEach((a) => a.cancel());
    stats("Dealing…");
    g.forEach((c, i) =>
      c.el.animate([{ transform: stack(c, i) }, { transform: "none" }], {
        duration: 650,
        delay: i * 70,
        easing: "cubic-bezier(.2,.8,.2,1)",
        fill: "backwards",
      }),
    );
    await sleep(1450);
    if (run !== gameRun) return;
    gStage().classList.remove("hot");
    $("#again").disabled = false;
  }
  lock = false;
  stats();
}

async function celebrate(run) {
  lock = true;
  $("#again").disabled = true;
  stats(`All ${pairs} pairs found in ${moves} moves. The cards approve. ✨`);
  if (calm()) {
    $("#again").disabled = false;
    return;
  }
  await sleep(700);
  if (run !== gameRun) return;
  const g = geo(),
    n = g.length;
  g.forEach((c, i) =>
    c.el.animate(
      [
        { transform: "none" },
        { transform: "translateY(-22px) scale(1.06)" },
        { transform: "none" },
      ],
      { duration: 520, delay: i * 60, easing: "ease-in-out" },
    ),
  );
  await sleep(1300 + n * 20);
  if (run !== gameRun) return;
  gStage().classList.add("hot");
  g.forEach((c) => c.el.classList.remove("open", "done"));
  const gathered = g.map((c, i) =>
    c.el.animate([{ transform: "none" }, { transform: stack(c, i) }], {
      duration: 700,
      delay: i * 35,
      easing: "cubic-bezier(.5,0,.2,1)",
      fill: "forwards",
    }),
  );
  await sleep(1250 + n * 20);
  if (run !== gameRun) return;
  gathered.forEach((a) => a.cancel());
  const r = riffle(g);
  await sleep(1900 + n * 20);
  if (run !== gameRun) return;
  r.forEach((a) => a.cancel());
  const s = gStage().getBoundingClientRect(),
    cw = g[0].el.offsetWidth;
  const span = Math.min(s.width - cw - 40, 760);
  g.forEach((c, i) => {
    const t = i / (n - 1) - 0.5;
    c.el.animate(
      [
        { transform: stack(c, i) },
        {
          transform: `translate(${c.dx + t * span}px,${c.dy + t * t * 70 - 10}px) rotate(${t * 34}deg)`,
        },
      ],
      {
        duration: 900,
        delay: i * 40,
        easing: "cubic-bezier(.2,.8,.2,1)",
        fill: "forwards",
      },
    );
  });
  await sleep(1400 + n * 40);
  if (run !== gameRun) return;
  gStage().classList.remove("hot");
  $("#again").disabled = false;
}

function turn(b) {
  if (lock || b.classList.contains("open")) return;
  b.classList.add("open");
  b.setAttribute("aria-label", b.dataset.t);
  if (!first) {
    first = b;
    return;
  }
  moves++;
  if (first.dataset.t === b.dataset.t) {
    first.classList.add("done");
    b.classList.add("done");
    first = null;
    found++;
    if (found === pairs) celebrate(gameRun);
    else stats();
  } else {
    lock = true;
    const a = first;
    first = null;
    stats();
    setTimeout(() => {
      a.classList.add("nope");
      b.classList.add("nope");
    }, 450);
    setTimeout(() => {
      a.classList.remove("open", "nope");
      b.classList.remove("open", "nope");
      a.setAttribute("aria-label", "Face-down card");
      b.setAttribute("aria-label", "Face-down card");
      lock = false;
    }, 900);
  }
}
$("#again").onclick = startGame;

// pair-count picker (6 / 8 / 10 / 12)
document.querySelectorAll("[data-p]").forEach(
  (b) =>
    (b.onclick = () => {
      pairs = +b.dataset.p;
      document
        .querySelectorAll("[data-p]")
        .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      startGame();
    }),
);

/* ---------- oracle code (mastermind) ---------- */
const CODE_LEN = 4,
  TRIES = 8,
  SYMS = 6;
let syms = [],
  secret = [],
  cur = [],
  tryN = 0,
  cOver = false;

function score(g, s) {
  let exact = 0;
  const gl = [],
    sl = [];
  g.forEach((v, i) => {
    if (v === s[i]) exact++;
    else {
      gl.push(v);
      sl.push(s[i]);
    }
  });
  let near = 0;
  gl.forEach((v) => {
    const k = sl.indexOf(v);
    if (k > -1) {
      near++;
      sl.splice(k, 1);
    }
  });
  return [exact, near];
}

function drawRow() {
  const row = $("#board").children[tryN];
  if (row) {
    [...row.querySelectorAll(".cell")].forEach((c, j) => {
      const v = cur[j];
      c.textContent = v === undefined ? "" : syms[v].e;
      c.classList.toggle("fill", v !== undefined);
    });
  }
  $("#check").disabled = cOver || cur.length < CODE_LEN;
  $("#undo").disabled = cOver || !cur.length;
}

function startCode() {
  syms = shuffled(D).slice(0, SYMS);
  secret = Array.from({ length: CODE_LEN }, () => (Math.random() * SYMS) | 0);
  cur = [];
  tryN = 0;
  cOver = false;
  $("#secret").innerHTML = '<span class="cell hid">✦</span>'.repeat(CODE_LEN);
  $("#board").innerHTML = Array.from(
    { length: TRIES },
    () =>
      `<div class="row"><div class="pegs-in">${'<span class="cell"></span>'.repeat(CODE_LEN)}</div><div class="fb">${"<i></i>".repeat(CODE_LEN)}</div></div>`,
  ).join("");
  $("#board").children[0].classList.add("on");
  $("#pal").innerHTML = syms
    .map((d, i) => `<button data-s="${i}" aria-label="${d.t}">${d.e}</button>`)
    .join("");
  $("#pal")
    .querySelectorAll("button")
    .forEach(
      (b) =>
        (b.onclick = () => {
          if (cOver || cur.length >= CODE_LEN) return;
          cur.push(+b.dataset.s);
          drawRow();
        }),
    );
  $("#cstat").textContent = `Try 1 of ${TRIES}. Pick ${CODE_LEN} cards.`;
  drawRow();
}

function checkCode() {
  if (cOver || cur.length < CODE_LEN) return;
  const [x, n] = score(cur, secret);
  const row = $("#board").children[tryN];
  [...row.querySelectorAll(".fb i")].forEach((p, i) => {
    if (i < x) p.className = "x";
    else if (i < x + n) p.className = "n";
  });
  row.classList.remove("on");
  tryN++;
  cur = [];
  const win = x === CODE_LEN;
  if (win || tryN >= TRIES) {
    cOver = true;
    [...$("#secret").children].forEach((c, i) => {
      c.className = "cell fill";
      c.textContent = syms[secret[i]].e;
    });
    $("#cstat").textContent = win
      ? `Cracked in ${tryN} ${tryN > 1 ? "tries" : "try"}. The oracle is impressed. ✨`
      : "Out of tries. The oracle keeps its secret (revealed above).";
    $("#check").disabled = true;
    $("#undo").disabled = true;
    return;
  }
  $("#board").children[tryN].classList.add("on");
  $("#cstat").textContent =
    `Try ${tryN + 1} of ${TRIES}. Last guess: ${x} right spot, ${n} wrong spot.`;
  drawRow();
}

$("#check").onclick = checkCode;
$("#undo").onclick = () => {
  cur.pop();
  drawRow();
};
$("#cnew").onclick = startCode;

/* ---------- switching between modes ---------- */
function showView(v) {
  cls.remove("tense", "pick", "rev");
  stopTimer();
  gameRun++; // cancels any running memory-match animation
  ["oracle", "game", "code"].forEach((id) => ($("#" + id).hidden = id !== v));
  document
    .querySelectorAll("[data-view]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.view === v)),
    );
  v === "game" ? startGame() : v === "code" ? startCode() : reset();
}
document
  .querySelectorAll("[data-view]")
  .forEach((b) => (b.onclick = () => showView(b.dataset.view)));

reset();
