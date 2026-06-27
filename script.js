import { places, routes } from "./data.js";

const placeAudioFiles = {
  home: "my-home.mp3",
  supermarket: "supermarket.mp3",
  school: "maplewood-school.mp3",
  park: "central-park.mp3",
  hospital: "city-hospital.mp3",
  subway: "subway-station.mp3",
  cafe: "corner-cafe.mp3",
  library: "public-library.mp3",
  pharmacy: "pharmacy.mp3",
  bank: "national-bank.mp3",
  store: "fashion-store.mp3",
};

const routeAudioFiles = [
  "ruta1.mp3",
  "ruta2.mp3",
  "ruta3.mp3",
  "ruta4.mp3",
  "ruta5.mp3",
];

const mainAudioFile = "rutapark.mp3";

/* ════════════════════════════════════════
   AUDIO STORAGE  (id → HTMLAudioElement)
════════════════════════════════════════ */
const audioStore = {};

function audioSourceFor(fileName) {
  return fileName ? `./audio/${fileName}` : null;
}

/* ════════════════════════════════════════
   BUILD AUDIO PLAYER WIDGET
   Returns an element ready to insert.
   type: 'route' | 'place' | 'main'
════════════════════════════════════════ */
function makeAudioPlayer(id, title, script, audioSrc = null, type = "route") {
  const wrap = document.createElement("div");
  let defaultAudio = null;
  const defaultSourceLabel = audioSrc
    ? audioSrc.split("/").pop() || title
    : null;

  // Player row
  const player = document.createElement("div");
  player.className = "audio-player" + (type === "place" ? " place-audio" : "");

  const btn = document.createElement("button");
  btn.className = "play-btn";
  btn.innerHTML = "▶";
  btn.title = "Play / Pause";

  const info = document.createElement("div");
  info.className = "audio-info";

  const lbl = document.createElement("div");
  lbl.className = "audio-label";
  lbl.textContent =
    type === "place"
      ? "🔊 Place audio"
      : type === "main"
        ? "🎙️ Main recording"
        : "🔊 Route audio";

  const ttl = document.createElement("div");
  ttl.className = "audio-title";
  ttl.textContent = title;

  const status = document.createElement("div");
  status.className = "audio-status";
  status.textContent = "No audio loaded — upload your recording";

  const progWrap = document.createElement("div");
  progWrap.className = "progress-wrap";
  const progBar = document.createElement("div");
  progBar.className = "progress-bar";
  progWrap.appendChild(progBar);

  info.appendChild(lbl);
  info.appendChild(ttl);
  info.appendChild(status);
  info.appendChild(progWrap);

  progWrap.addEventListener("click", (e) => {
    const audio = audioStore[id];
    if (!audio || !audio.duration) return;
    const rect2 = progWrap.getBoundingClientRect();
    const pct = (e.clientX - rect2.left) / rect2.width;
    audio.currentTime = pct * audio.duration;
  });

  btn.addEventListener("click", () => {
    const audio = audioStore[id] || (audioSrc ? loadDefaultAudio(false) : null);
    if (!audio) return;
    if (audio.paused) {
      // Pause all others
      Object.entries(audioStore).forEach(([k, a]) => {
        if (k !== id && !a.paused) {
          a.pause();
        }
      });
      document.querySelectorAll(".play-btn").forEach((b) => {
        b.innerHTML = "▶";
        b.classList.remove("playing");
      });
      audio.play();
      btn.innerHTML = "⏸";
      btn.classList.add("playing");
    } else {
      audio.pause();
      btn.innerHTML = "▶";
      btn.classList.remove("playing");
    }
  });

  player.appendChild(btn);
  player.appendChild(info);
  wrap.appendChild(player);

  function loadDefaultAudio(shouldAutoPlay = false) {
    if (!audioSrc) return null;
    if (!defaultAudio) {
      defaultAudio = new Audio();
      defaultAudio.preload = "metadata";
      defaultAudio.src = audioSrc;
      attachAudio(defaultAudio, defaultSourceLabel, shouldAutoPlay);
    } else if (shouldAutoPlay) {
      defaultAudio.play();
    }
    return defaultAudio;
  }

  function attachAudio(audio, sourceLabel, shouldAutoPlay = false) {
    audioStore[id] = audio;
    audio.preload = "auto";

    status.textContent =
      sourceLabel.length > 22 ? sourceLabel.slice(0, 20) + "…" : sourceLabel;
    progBar.style.width = "0%";

    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        progBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
      }
      const cur = fmtTime(audio.currentTime);
      const dur = fmtTime(audio.duration);
      status.textContent = `${cur} / ${dur}`;
    });
    audio.addEventListener("ended", () => {
      btn.innerHTML = "▶";
      btn.classList.remove("playing");
      progBar.style.width = "0%";
    });
    audio.addEventListener("play", () => {
      btn.innerHTML = "⏸";
      btn.classList.add("playing");
    });
    audio.addEventListener("pause", () => {
      btn.innerHTML = "▶";
      btn.classList.remove("playing");
    });
    audio.addEventListener("error", () => {
      status.textContent = "Default audio could not load";
      delete audioStore[id];
      if (audio === defaultAudio) {
        defaultAudio = null;
      }
    });

    if (shouldAutoPlay) {
      audio.play();
    }
  }

  if (audioSrc) {
    status.textContent = defaultSourceLabel || "Audio ready";
  }

  // Script hint (collapsible)
  if (script) {
    const scriptToggle = document.createElement("div");
    scriptToggle.style.cssText =
      "font-size:.68rem;color:var(--muted);cursor:pointer;margin-top:5px;padding:2px 0;user-select:none;";
    scriptToggle.textContent = "📄 View script to record ▾";
    const scriptBox = document.createElement("div");
    scriptBox.style.cssText =
      'display:none;background:#f0f4f8;border-radius:6px;padding:8px 10px;font-size:.73rem;line-height:1.7;color:var(--ink);margin-top:4px;font-family:"DM Mono",monospace;border-left:3px solid var(--gold);white-space:pre-wrap;';
    scriptBox.textContent = script;
    scriptToggle.addEventListener("click", () => {
      const open = scriptBox.style.display !== "none";
      scriptBox.style.display = open ? "none" : "block";
      scriptToggle.textContent = open
        ? "📄 View script to record ▾"
        : "📄 Hide script ▴";
    });
    wrap.appendChild(scriptToggle);
    wrap.appendChild(scriptBox);
  }

  return wrap;
}

function fmtTime(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60),
    sec = Math.floor(s % 60);
  return m + ":" + (sec < 10 ? "0" : "") + sec;
}

/* ════════════════════════════════════════
   BUILD PLACE LIST
════════════════════════════════════════ */
function buildPlaceList() {
  const el = document.getElementById("place-list");
  places.forEach((p) => {
    const div = document.createElement("div");
    div.className = "place-item";
    div.id = "li-" + p.id;
    div.innerHTML = `<span class="place-icon">${p.icon}</span>
      <div><div class="place-name">${p.name}</div><div class="place-addr">${p.addr}</div></div>`;
    div.addEventListener("click", () => showPopupById(p.id));
    el.appendChild(div);
  });
}

/* ════════════════════════════════════════
   BUILD DIRECTIONS
════════════════════════════════════════ */
function buildDirections() {
  const el = document.getElementById("directions-list");
  routes.forEach((r, index) => {
    const card = document.createElement("div");
    card.className = "route-card";

    const h4 = document.createElement("h4");
    h4.innerHTML = `${r.emoji} ${r.from} → ${r.to}`;
    card.appendChild(h4);

    r.steps.forEach((s) => {
      const step = document.createElement("div");
      step.className = "route-step";
      step.innerHTML = s;
      card.appendChild(step);
    });

    // Audio player for this route
    const playerEl = makeAudioPlayer(
      r.id,
      `${r.from} → ${r.to}`,
      r.audioScript,
      audioSourceFor(routeAudioFiles[index]),
      "route",
    );
    card.appendChild(playerEl);

    el.appendChild(card);
  });
}

/* ════════════════════════════════════════
   BUILD MAIN AUDIO (description tab)
════════════════════════════════════════ */
function buildMainAudio() {
  const container = document.getElementById("main-audio-player");
  const playerEl = makeAudioPlayer(
    "main-neighborhood",
    "Route to Central Park — required recording",
    null,
    audioSourceFor(mainAudioFile),
    "main",
  );
  container.appendChild(playerEl);
}

/* ════════════════════════════════════════
   BUILD SVG MAP
════════════════════════════════════════ */
function buildMap() {
  const W = 640,
    H = 600;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "neighborhood-map");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("width", W);
  svg.setAttribute("height", H);

  rect(svg, 0, 0, W, H, "#C8DFA0");
  rect(svg, 0, 540, W, 60, "#74C0D4");
  svgText(svg, 320, 570, "〰️ River Road", "#fff", 11, "middle");

  rect(svg, 320, 220, 160, 120, "#5BAD6F", 8);
  circle(svg, 400, 270, 18, "#74C0D4");
  svgText(svg, 400, 272, "⛲", null, 16, "middle");
  ["340,230", "460,230", "340,310", "460,310", "400,230"].forEach((pos) => {
    const [x, y] = pos.split(",");
    svgText(svg, +x, +y, "🌲", null, 13, "middle");
  });
  svgText(svg, 400, 300, "Central Park", "#1a5e2e", 10, "middle");

  roadV(svg, 170, 0, H, "Maple Avenue", true);
  roadH(svg, 0, 220, W, "Oak Street", true);
  roadH(svg, 0, 450, W, "Pine Blvd", true);
  svgLine(svg, 170, 220, 320, 450, "#B0B8C1", 22);
  svgText(svg, 235, 342, "Elm Lane", "#fff", 9, "middle");

  crosswalk(svg, 155, 218, 4);
  crosswalk(svg, 155, 448, 4);

  trafficLight(svg, 155, 215);
  trafficLight(svg, 155, 445);
  trafficLight(svg, 322, 215);

  places.forEach((p) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "place-clickable");
    g.setAttribute("id", "map-" + p.id);
    g.addEventListener("click", (e) => {
      e.stopPropagation();
      showPopupById(p.id, e);
    });

    if (p.id === "park") return;

    const bx = p.cx - p.w / 2,
      by = p.cy - p.h / 2;
    const r2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    r2.setAttribute("x", bx);
    r2.setAttribute("y", by);
    r2.setAttribute("width", p.w);
    r2.setAttribute("height", p.h);
    r2.setAttribute("rx", 5);
    r2.setAttribute("fill", lighten(p.color));
    r2.setAttribute("stroke", p.color);
    r2.setAttribute("stroke-width", 2);
    g.appendChild(r2);

    const t1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t1.setAttribute("x", p.cx);
    t1.setAttribute("y", p.cy - 4);
    t1.setAttribute("text-anchor", "middle");
    t1.setAttribute("dominant-baseline", "middle");
    t1.setAttribute("font-size", "18");
    t1.textContent = p.icon;
    g.appendChild(t1);

    const t2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t2.setAttribute("x", p.cx);
    t2.setAttribute("y", p.cy + p.h / 2 + 11);
    t2.setAttribute("text-anchor", "middle");
    t2.setAttribute("font-size", "8.5");
    t2.setAttribute("fill", "#2D3748");
    t2.setAttribute("font-family", "DM Sans, sans-serif");
    t2.setAttribute("font-weight", "600");
    t2.textContent = p.name;
    g.appendChild(t2);

    svg.appendChild(g);
  });

  // Park clickable overlay
  const pg = document.createElementNS("http://www.w3.org/2000/svg", "g");
  pg.setAttribute("class", "place-clickable");
  pg.addEventListener("click", (e) => {
    e.stopPropagation();
    showPopupById("park", e);
  });
  const po = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  po.setAttribute("x", 320);
  po.setAttribute("y", 220);
  po.setAttribute("width", 160);
  po.setAttribute("height", 120);
  po.setAttribute("rx", 8);
  po.setAttribute("fill", "transparent");
  pg.appendChild(po);
  svg.appendChild(pg);

  compass(svg, W - 62, 62, 48);
  arrLabel(svg, 210, 320, "🏠 HOME");

  document.getElementById("map-area").appendChild(svg);
}

/* ════════════════════════════════════════
   SVG HELPERS
════════════════════════════════════════ */
function rect(p, x, y, w, h, fill, rx = 0) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  el.setAttribute("x", x);
  el.setAttribute("y", y);
  el.setAttribute("width", w);
  el.setAttribute("height", h);
  el.setAttribute("fill", fill);
  if (rx) el.setAttribute("rx", rx);
  p.appendChild(el);
  return el;
}
function circle(p, cx, cy, r, fill) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  el.setAttribute("cx", cx);
  el.setAttribute("cy", cy);
  el.setAttribute("r", r);
  el.setAttribute("fill", fill);
  p.appendChild(el);
  return el;
}
function svgText(p, x, y, txt, fill, size = 12, anchor = "start") {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "text");
  el.setAttribute("x", x);
  el.setAttribute("y", y);
  el.setAttribute("text-anchor", anchor);
  el.setAttribute("font-size", size);
  el.setAttribute("font-family", "DM Sans,sans-serif");
  if (fill) el.setAttribute("fill", fill);
  el.textContent = txt;
  p.appendChild(el);
  return el;
}
function svgLine(p, x1, y1, x2, y2, stroke, sw = 2) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
  el.setAttribute("x1", x1);
  el.setAttribute("y1", y1);
  el.setAttribute("x2", x2);
  el.setAttribute("y2", y2);
  el.setAttribute("stroke", stroke);
  el.setAttribute("stroke-width", sw);
  p.appendChild(el);
  return el;
}
function roadV(p, x, y0, y1, label, dashed) {
  rect(p, x - 18, y0, 36, y1, "#B0B8C1");
  if (dashed) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
    el.setAttribute("x1", x);
    el.setAttribute("y1", y0);
    el.setAttribute("x2", x);
    el.setAttribute("y2", y1);
    el.setAttribute("stroke", "#F5F0E8");
    el.setAttribute("stroke-width", 2);
    el.setAttribute("stroke-dasharray", "14 8");
    p.appendChild(el);
  }
  const t = svgText(p, x + 24, y0 + 90, label, "#6B7280", 8.5, "start");
  t.setAttribute("transform", `rotate(90,${x + 24},${y0 + 90})`);
}
function roadH(p, x0, y, x1, label, dashed) {
  rect(p, x0, y - 18, x1, 36, "#B0B8C1");
  if (dashed) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
    el.setAttribute("x1", x0);
    el.setAttribute("y1", y);
    el.setAttribute("x2", x1);
    el.setAttribute("y2", y);
    el.setAttribute("stroke", "#F5F0E8");
    el.setAttribute("stroke-width", 2);
    el.setAttribute("stroke-dasharray", "14 8");
    p.appendChild(el);
  }
  svgText(p, x0 + 12, y + 28, label, "#6B7280", 8.5, "start");
}
function crosswalk(p, x, y, stripes) {
  for (let i = 0; i < stripes; i++) {
    rect(p, x + i * 9, y, 6, 18, "rgba(255,255,255,.6)");
  }
}
function trafficLight(p, x, y) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  rect(g, x - 5, y - 14, 10, 22, "#2D3748", 2);
  circle(g, x, y - 8, 3, "#E85D4A");
  circle(g, x, y, 3, "#F4A32A");
  circle(g, x, y + 8, 3, "#5BAD6F");
  p.appendChild(g);
}
function compass(p, cx, cy, size) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  circle(g, cx, cy, size / 2, "rgba(255,255,255,.88)");
  const arrowN = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon",
  );
  arrowN.setAttribute(
    "points",
    `${cx},${cy - size * 0.42} ${cx - 8},${cy + 2} ${cx + 8},${cy + 2}`,
  );
  arrowN.setAttribute("fill", "#E85D4A");
  g.appendChild(arrowN);
  const arrowS = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon",
  );
  arrowS.setAttribute(
    "points",
    `${cx},${cy + size * 0.42} ${cx - 8},${cy - 2} ${cx + 8},${cy - 2}`,
  );
  arrowS.setAttribute("fill", "#B0B8C1");
  g.appendChild(arrowS);
  [
    ["N", cx, cy - size * 0.42 - 6, "#E85D4A"],
    ["S", cx, cy + size * 0.42 + 10, "#6B7280"],
    ["W", cx - size * 0.42 - 2, cy + 4, "#6B7280"],
    ["E", cx + size * 0.42 + 2, cy + 4, "#6B7280"],
  ].forEach(([l, x, y, c]) => {
    const t = svgText(g, x, y, l, c, 9, "middle");
    t.setAttribute("font-weight", "700");
  });
  circle(g, cx, cy, 4, "#2D3748");
  p.appendChild(g);
}
function arrLabel(p, cx, cy, label) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("x", cx - 36);
  bg.setAttribute("y", cy - 26);
  bg.setAttribute("width", 72);
  bg.setAttribute("height", 18);
  bg.setAttribute("rx", 4);
  bg.setAttribute("fill", "#F4A32A");
  g.appendChild(bg);
  const t = svgText(g, cx, cy - 13, label, "#fff", 8, "middle");
  t.setAttribute("font-weight", "700");
  p.appendChild(g);
}
function lighten(hex) {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${Math.min(255, ((n >> 16) & 0xff) + 80)},${Math.min(255, ((n >> 8) & 0xff) + 80)},${Math.min(255, (n & 0xff) + 80)})`;
}

/* ════════════════════════════════════════
   POPUP  (with place audio player)
════════════════════════════════════════ */
function showPopupById(id, event) {
  const p = places.find((x) => x.id === id);
  if (!p) return;
  document
    .querySelectorAll(".place-item")
    .forEach((el) => el.classList.remove("selected"));
  const li = document.getElementById("li-" + id);
  if (li) li.classList.add("selected");

  document.getElementById("pop-title").textContent = p.icon + " " + p.name;
  document.getElementById("pop-addr").textContent = "📍 " + p.addr;
  document.getElementById("pop-desc").textContent = p.desc;

  // Rebuild audio player in popup (one per place)
  const audioContainer = document.getElementById("pop-audio");
  audioContainer.innerHTML = "";
  const playerEl = makeAudioPlayer(
    "place-" + p.id,
    p.name,
    p.audioScript,
    audioSourceFor(placeAudioFiles[p.id]),
    "place",
  );
  audioContainer.appendChild(playerEl);

  const popup = document.getElementById("popup");
  popup.style.display = "block";
  if (event) {
    const x = Math.min(event.clientX + 14, window.innerWidth - 275);
    const y = Math.min(event.clientY - 20, window.innerHeight - 280);
    popup.style.left = x + "px";
    popup.style.top = y + "px";
    popup.style.transform = "none";
  } else {
    popup.style.left = "50%";
    popup.style.top = "30%";
    popup.style.transform = "translate(-50%,-50%)";
  }
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
  document
    .querySelectorAll(".place-item")
    .forEach((el) => el.classList.remove("selected"));
}

window.closePopup = closePopup;
document.addEventListener("click", (e) => {
  const popup = document.getElementById("popup");
  if (popup.style.display === "block" && !popup.contains(e.target))
    closePopup();
});

/* ════════════════════════════════════════
   TABS
════════════════════════════════════════ */
function switchTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((b, i) => {
    b.classList.toggle(
      "active",
      ["map", "directions", "description"][i] === tab,
    );
  });
  document
    .querySelectorAll(".tab-page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("panel-" + tab).classList.add("active");
  document.getElementById("neighborhood-audio-area").style.display =
    tab === "description" ? "block" : "none";
  document.getElementById("map-area").style.display =
    tab === "description" ? "none" : "flex";
}

window.switchTab = switchTab;

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
buildPlaceList();
buildDirections();
buildMainAudio();
buildMap();
