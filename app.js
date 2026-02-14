const states = [
  {
    video: "videos/video1.mp4",
    caption: "Kitty (formerly known as Tygress), I have a question.",
    yesText: "Yes, Zen",
    noText: "No, I'm a Tygress",
    yesScale: 1,
    noMode: "normal",
    step: 0,
  },
  {
    video: "videos/video2.mp4",
    caption: "Herh. what do you mean No!?",
    yesText: "Yes",
    noText: "mmm... No",
    yesScale: 1,
    noMode: "normal",
    step: 1,
  },
  {
    video: "videos/video3.mp4",
    caption: "3nne3 me ne wayɛ aka",
    yesText: "Sorryy, its a yes now",
    noText: "No, I'm a Tygress",
    yesScale: 1.05,
    noMode: "normal",
    step: 2,
  },
  {
    video: "videos/video4.mp4",
    caption: "You just activated my anime opening.",
    yesText: "Yes, Zen",
    noText: "No",
    yesScale: 1,
    noMode: "normal",
    step: 3,
  },
  {
    video: "videos/video5.mp4",
    caption: "Ahh! i'm going to have a siesure. So you mean i coded all this for CHARACTER DEVELOPMENT?!!",
    yesText: "Yes",
    noText: "Still No",
    yesScale: 1,
    noMode: "hoverDodge",
    step: 4,
  },
  {
    video: "videos/video6.mp4",
    caption: "No no. This can't be. The universe is bugged.",
    yesText: "Yes",
    noText: "No",
    yesScale: 1,
    noMode: "teleport",
    step: 5,
  },
  {
    video: "videos/video7.mp4",
    caption: "Okay jokes aside,i love you. So say yes",
    yesText: "Yes",
    noText: "No",
    yesScale: 1,
    noMode: "shy",
    step: 6,
  },
];

const card = document.getElementById("card");
const video = document.getElementById("mainVideo");
const caption = document.getElementById("caption");
const yesWrap = document.getElementById("yesWrap");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonRow = document.getElementById("buttonRow");
const progress = document.getElementById("progress");
const dots = Array.from(progress.querySelectorAll(".dot"));
const soundToggle = document.getElementById("soundToggle");
const confettiCanvas = document.getElementById("confetti-canvas");
const finale = document.getElementById("finale");
const finaleOptions = document.getElementById("finaleOptions");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

let currentStep = 0;
let currentNoMode = "normal";
let isTransitioning = false;
let isFinale = false;
let timers = [];
let noScale = 1;
let vanishTimer = null;
let noMoveCount = 0;
let noMaxMoves = 1;
let isDodging = false;
let yesBoost = 1;

const yesLabel = yesBtn.querySelector(".btn-label");
const noLabel = noBtn.querySelector(".btn-label");

const confettiInstance = typeof confetti === "function"
  ? confetti.create(confettiCanvas, { resize: true, useWorker: true })
  : null;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const schedule = (fn, delay) => {
  const id = window.setTimeout(fn, delay);
  timers.push(id);
};

const clearTimers = () => {
  timers.forEach((id) => window.clearTimeout(id));
  timers = [];
};

const setNoOffset = (x, y) => {
  noBtn.style.setProperty("--offset-x", `${x}px`);
  noBtn.style.setProperty("--offset-y", `${y}px`);
};

const resetNoOffset = () => setNoOffset(0, 0);

const setNoScale = (scale) => {
  noScale = scale;
  noBtn.style.setProperty("--no-scale", scale.toFixed(3));
};

const setYesScale = (scale) => {
  yesWrap.style.setProperty("--yes-scale", scale.toFixed(3));
};

const updateYesScale = (baseScale) => {
  setYesScale((baseScale || 1) * yesBoost);
};

const resetNoMoves = (step) => {
  noMoveCount = 0;
  noMaxMoves = Math.max(1, step + 1);
  isDodging = false;
};

const canNoMove = () => noMoveCount < noMaxMoves;

const registerNoMove = () => {
  noMoveCount = Math.min(noMoveCount + 1, noMaxMoves);
};

const setNoMode = (mode) => {
  currentNoMode = mode;
  noBtn.classList.remove("shy");
  noBtn.classList.remove("is-vanishing");
  if (mode === "shy") {
    noBtn.classList.add("shy");
  }
  resetNoOffset();
};

const setVideoSource = (src) => {
  if (video.dataset.src === src) {
    return;
  }
  video.dataset.src = src;
  video.src = src;
  video.load();
  video.play().catch(() => {});
};

const updateProgress = () => {
  dots.forEach((dot, index) => {
    dot.classList.toggle("is-current", index === currentStep);
    dot.classList.toggle("is-done", index < currentStep);
  });
};

const updateContent = (state) => {
  caption.textContent = state.caption;
  yesLabel.textContent = state.yesText;
  noLabel.textContent = state.noText;
  updateYesScale(state.yesScale);
  resetNoMoves(state.step);
  setNoMode(state.noMode);
  setVideoSource(state.video);
};

const triggerWave = () => {
  progress.classList.remove("wave");
  void progress.offsetWidth;
  progress.classList.add("wave");
  window.setTimeout(() => progress.classList.remove("wave"), 600);
};

const triggerShake = () => {
  card.classList.remove("shake");
  void card.offsetWidth;
  card.classList.add("shake");
};

const applyState = (index, options = {}) => {
  if (isFinale) {
    return;
  }

  const state = states[index];

  if (options.instant) {
    currentStep = index;
    updateContent(state);
    updateProgress();
    caption.classList.remove("is-out");
    return;
  }

  if (isTransitioning) {
    return;
  }

  isTransitioning = true;
  clearTimers();

  schedule(() => caption.classList.add("is-out"), 80);

  schedule(() => {
    currentStep = index;
    updateContent(state);
    updateProgress();
  }, 200);

  schedule(() => caption.classList.remove("is-out"), 320);

  schedule(() => {
    triggerWave();
    if (state.step === 3) {
      triggerShake();
    }
    isTransitioning = false;
  }, 420);
};

const advanceState = () => {
  const next = Math.min(currentStep + 1, states.length - 1);
  applyState(next);
};

const updateSoundToggle = () => {
  soundToggle.classList.toggle("is-muted", video.muted);
  soundToggle.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
};

const handleRipple = (event) => {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

  const flash = document.createElement("span");
  flash.className = "tap-flash";

  button.appendChild(flash);
  button.appendChild(ripple);

  ripple.addEventListener("animationend", () => ripple.remove());
  flash.addEventListener("animationend", () => flash.remove());
};

const dodgePointer = (event) => {
  if (noBtn.classList.contains("is-vanishing")) {
    return;
  }
  const rect = noBtn.getBoundingClientRect();
  const rowRect = buttonRow.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = centerX - event.clientX;
  const dy = centerY - event.clientY;
  const distance = Math.hypot(dx, dy);
  const threshold = 120;

  if (distance > threshold) {
    resetNoOffset();
    isDodging = false;
    return;
  }

  if (!canNoMove()) {
    resetNoOffset();
    return;
  }

  if (!isDodging) {
    registerNoMove();
    isDodging = true;
  }

  const force = (threshold - distance) / threshold;
  const maxX = Math.max(0, (rowRect.width - rect.width) / 2 - 6);
  const maxY = Math.max(0, (rowRect.height - rect.height) / 2 - 6);
  const maxOffset = Math.min(52, Math.max(maxX, 0));

  const offsetX = clamp((dx / (distance || 1)) * force * maxOffset, -maxX, maxX);
  const offsetY = clamp((dy / (distance || 1)) * force * maxOffset, -maxY, maxY);

  setNoOffset(offsetX, offsetY);
};

const teleportNoButton = () => {
  const rect = noBtn.getBoundingClientRect();
  const rowRect = buttonRow.getBoundingClientRect();
  const maxX = Math.max(0, (rowRect.width - rect.width) / 2 - 6);
  const maxY = Math.max(0, (rowRect.height - rect.height) / 2 - 6);
  const offsetX = (Math.random() * 2 - 1) * maxX;
  const offsetY = (Math.random() * 2 - 1) * maxY;
  setNoOffset(offsetX, offsetY);
};

const vanishNoButton = () => {
  if (isFinale) {
    return;
  }
  if (!canNoMove()) {
    return;
  }
  registerNoMove();
  if (vanishTimer) {
    window.clearTimeout(vanishTimer);
  }
  noBtn.classList.add("is-vanishing");
  vanishTimer = window.setTimeout(() => {
    teleportNoButton();
    noBtn.classList.remove("is-vanishing");
  }, 140);
};

const triggerFinale = () => {
  if (isFinale) {
    return;
  }
  isFinale = true;
  clearTimers();
  finale.classList.remove("is-complete");

  card.classList.add("bloom");

  window.setTimeout(() => {
    card.classList.add("is-finale");
  }, 320);

  if (!prefersReducedMotion && confettiInstance) {
    window.setTimeout(() => {
      confettiInstance({
        particleCount: 120,
        spread: 80,
        startVelocity: 45,
        origin: { y: 0.6 },
      });
      confettiInstance({
        particleCount: 80,
        spread: 110,
        startVelocity: 38,
        origin: { y: 0.5 },
      });
    }, 220);
  }

  window.setTimeout(() => {
    card.classList.remove("bloom");
  }, 900);
};

const completeFinale = () => {
  if (!isFinale) {
    return;
  }
  finale.classList.add("is-complete");
};

const attachButtonEffects = () => {
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("pointerdown", handleRipple);
  });
};

const initGlowDrift = () => {
  if (isTouch) {
    return;
  }

  let glowRaf = null;
  let latestEvent = null;

  const updateGlow = () => {
    if (!latestEvent) {
      glowRaf = null;
      return;
    }
    const rect = card.getBoundingClientRect();
    const relX = (latestEvent.clientX - rect.left) / rect.width - 0.5;
    const relY = (latestEvent.clientY - rect.top) / rect.height - 0.5;
    const max = 10;
    card.style.setProperty("--glow-x", `${relX * max}px`);
    card.style.setProperty("--glow-y", `${relY * max}px`);
    glowRaf = null;
  };

  card.addEventListener("pointermove", (event) => {
    latestEvent = event;
    if (!glowRaf) {
      glowRaf = window.requestAnimationFrame(updateGlow);
    }
  });

  card.addEventListener("pointerleave", () => {
    latestEvent = null;
    card.style.setProperty("--glow-x", "0px");
    card.style.setProperty("--glow-y", "0px");
  });
};

soundToggle.addEventListener("click", () => {
  video.muted = !video.muted;
  updateSoundToggle();
  if (!video.muted) {
    video.play().catch(() => {});
  }
});

yesBtn.addEventListener("click", () => {
  if (isTransitioning || isFinale) {
    return;
  }
  triggerFinale();
});

noBtn.addEventListener("click", () => {
  if (isTransitioning || isFinale) {
    return;
  }
  setNoScale(Math.max(0.35, noScale * 0.78));
  yesBoost = Math.min(1.7, yesBoost * 1.12);
  updateYesScale(states[currentStep].yesScale);
  vanishNoButton();
  advanceState();
});

buttonRow.addEventListener("pointermove", (event) => {
  if (isTouch || isFinale || isTransitioning) {
    return;
  }
  if (currentNoMode === "hoverDodge") {
    dodgePointer(event);
  }
});

buttonRow.addEventListener("pointerleave", () => {
  if (currentNoMode === "hoverDodge") {
    resetNoOffset();
    isDodging = false;
  }
});

noBtn.addEventListener("pointerenter", () => {
  if (isTouch || isFinale || isTransitioning) {
    return;
  }
  vanishNoButton();
});

if (finaleOptions) {
  finaleOptions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", completeFinale);
  });
}

attachButtonEffects();
initGlowDrift();
updateSoundToggle();
setNoScale(1);
setYesScale(1);
applyState(0, { instant: true });
