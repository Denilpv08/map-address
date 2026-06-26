import { places, routes } from "./data.js";

/* ════════════════════════════
   BUILD PLACE LIST (panel)
════════════════════════════ */
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

/* ════════════════════════════
   BUILD DIRECTIONS (panel)
════════════════════════════ */
function buildDirections() {
  const el = document.getElementById("directions-list");
  routes.forEach((r) => {
    const card = document.createElement("div");
    card.className = "route-card";
    card.innerHTML =
      `<h4>${r.emoji} ${r.from} → ${r.to}</h4>` +
      r.steps.map((s) => `<div class="route-step">${s}</div>`).join("");
    el.appendChild(card);
  });
}

/* ════════════════════════════
   BUILD SVG MAP
════════════════════════════ */
function buildMap() {
  const W = 640,
    H = 600;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "neighborhood-map");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("width", W);
  svg.setAttribute("height", H);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  // Background (grass/ground)
  rect(svg, 0, 0, W, H, "#C8DFA0");

  // River / water strip at bottom
  rect(svg, 0, 540, W, 60, "#74C0D4");
  text(svg, 320, 570, "〰️ River Road", "#fff", 11, "middle");

  // Park (big green block)
  rect(svg, 320, 220, 160, 120, "#5BAD6F", 8);
  // Park inner details
  circle(svg, 400, 270, 18, "#74C0D4"); // fountain
  text(svg, 400, 272, "⛲", null, 16, "middle");
  // Trees
  ["340,230", "460,230", "340,310", "460,310", "400,230"].forEach((pos) => {
    const [x, y] = pos.split(",");
    text(svg, +x, +y, "🌲", null, 13, "middle");
  });
  text(svg, 400, 300, "Central Park", "#1a5e2e", 10, "middle");

  // Roads (thick gray)
  // Maple Ave vertical
  roadV(svg, 170, 0, H, "Maple Avenue", true);
  // Oak Street horizontal
  roadH(svg, 0, 220, W, "Oak Street", true);
  // Pine Boulevard horizontal
  roadH(svg, 0, 450, W, "Pine Blvd", true);
  // Elm Lane diagonal
  line(svg, 170, 220, 320, 450, "#B0B8C1", 22);
  text(svg, 235, 342, "Elm Lane", "#fff", 9, "middle");

  // Sidewalks / crosswalks
  crosswalk(svg, 155, 218, 32, 4); // Oak & Maple intersection
  crosswalk(svg, 155, 448, 32, 4);

  // Traffic lights at main intersections
  trafficLight(svg, 155, 215);
  trafficLight(svg, 155, 445);
  trafficLight(svg, 322, 215);

  // Draw all places as clickable
  places.forEach((p) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "place-clickable");
    g.setAttribute("id", "map-" + p.id);
    g.addEventListener("click", (e) => {
      e.stopPropagation();
      showPopupById(p.id, e);
    });

    if (p.id === "park") {
      // park already drawn, just make whole park clickable — skip visual duplicate
      return;
    }

    // Building rect
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

    // Icon
    const t1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t1.setAttribute("x", p.cx);
    t1.setAttribute("y", p.cy - 4);
    t1.setAttribute("text-anchor", "middle");
    t1.setAttribute("dominant-baseline", "middle");
    t1.setAttribute("font-size", "18");
    t1.textContent = p.icon;
    g.appendChild(t1);

    // Label
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

  // Make park clickable overlay
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

  // Compass rose
  compass(svg, W - 62, 62, 48);

  // Home label arrow
  arrLabel(svg, 210, 320, "🏠 HOME");

  document.getElementById("map-area").appendChild(svg);
}

/* ════════════════════════════
   SVG HELPERS
════════════════════════════ */
function rect(parent, x, y, w, h, fill, rx = 0) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  el.setAttribute("x", x);
  el.setAttribute("y", y);
  el.setAttribute("width", w);
  el.setAttribute("height", h);
  el.setAttribute("fill", fill);
  if (rx) el.setAttribute("rx", rx);
  parent.appendChild(el);
  return el;
}
function circle(parent, cx, cy, r, fill) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  el.setAttribute("cx", cx);
  el.setAttribute("cy", cy);
  el.setAttribute("r", r);
  el.setAttribute("fill", fill);
  parent.appendChild(el);
  return el;
}
function text(parent, x, y, txt, fill, size = 12, anchor = "start") {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "text");
  el.setAttribute("x", x);
  el.setAttribute("y", y);
  el.setAttribute("text-anchor", anchor);
  el.setAttribute("font-size", size);
  el.setAttribute("font-family", "DM Sans,sans-serif");
  if (fill) el.setAttribute("fill", fill);
  el.textContent = txt;
  parent.appendChild(el);
  return el;
}
function line(parent, x1, y1, x2, y2, stroke, sw = 2) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
  el.setAttribute("x1", x1);
  el.setAttribute("y1", y1);
  el.setAttribute("x2", x2);
  el.setAttribute("y2", y2);
  el.setAttribute("stroke", stroke);
  el.setAttribute("stroke-width", sw);
  parent.appendChild(el);
  return el;
}
function roadV(parent, x, y0, y1, label, dashed) {
  rect(parent, x - 18, y0, 36, y1, "#B0B8C1");
  if (dashed) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
    el.setAttribute("x1", x);
    el.setAttribute("y1", y0);
    el.setAttribute("x2", x);
    el.setAttribute("y2", y1);
    el.setAttribute("stroke", "#F5F0E8");
    el.setAttribute("stroke-width", 2);
    el.setAttribute("stroke-dasharray", "14 8");
    parent.appendChild(el);
  }
  const t = text(parent, x + 24, y0 + 90, label, "#6B7280", 8.5, "start");
  t.setAttribute("transform", `rotate(90,${x + 24},${y0 + 90})`);
}
function roadH(parent, x0, y, x1, label, dashed) {
  rect(parent, x0, y - 18, x1, 36, "#B0B8C1");
  if (dashed) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
    el.setAttribute("x1", x0);
    el.setAttribute("y1", y);
    el.setAttribute("x2", x1);
    el.setAttribute("y2", y);
    el.setAttribute("stroke", "#F5F0E8");
    el.setAttribute("stroke-width", 2);
    el.setAttribute("stroke-dasharray", "14 8");
    parent.appendChild(el);
  }
  text(parent, x0 + 12, y + 28, label, "#6B7280", 8.5, "start");
}
function crosswalk(parent, x, y, w, stripes) {
  for (let i = 0; i < stripes; i++) {
    const sw = 6,
      gap = 3;
    rect(parent, x + i * (sw + gap), y, sw, 18, "rgba(255,255,255,.6)");
  }
}
function trafficLight(parent, x, y) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  rect(g, x - 5, y - 14, 10, 22, "#2D3748", 2);
  circle(g, x, y - 8, 3, "#E85D4A");
  circle(g, x, y, 3, "#F4A32A");
  circle(g, x, y + 8, 3, "#5BAD6F");
  parent.appendChild(g);
}
function compass(parent, cx, cy, size) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  circle(g, cx, cy, size / 2, "rgba(255,255,255,.88)");
  // N arrow
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
  // S arrow
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
  // Labels
  [
    ["N", cx, cy - size * 0.42 - 6, "#E85D4A"],
    ["S", cx, cy + size * 0.42 + 10, "#6B7280"],
    ["W", cx - size * 0.42 - 2, cy + 4, "#6B7280"],
    ["E", cx + size * 0.42 + 2, cy + 4, "#6B7280"],
  ].forEach(([l, x, y, c]) => {
    const t = text(g, x, y, l, c, 9, "middle");
    t.setAttribute("font-weight", "700");
  });
  circle(g, cx, cy, 4, "#2D3748");
  parent.appendChild(g);
}
function arrLabel(parent, cx, cy, label) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("x", cx - 36);
  bg.setAttribute("y", cy - 26);
  bg.setAttribute("width", 72);
  bg.setAttribute("height", 18);
  bg.setAttribute("rx", 4);
  bg.setAttribute("fill", "#F4A32A");
  g.appendChild(bg);
  const t = text(g, cx, cy - 13, label, "#fff", 8, "middle");
  t.setAttribute("font-weight", "700");
  parent.appendChild(g);
}
function lighten(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + 80);
  const gv = Math.min(255, ((n >> 8) & 0xff) + 80);
  const b = Math.min(255, (n & 0xff) + 80);
  return `rgb(${r},${gv},${b})`;
}

/* ════════════════════════════
   POPUP
════════════════════════════ */
function showPopupById(id, event) {
  const p = places.find((x) => x.id === id);
  if (!p) return;
  document
    .querySelectorAll(".place-item")
    .forEach((el) => el.classList.remove("selected"));
  const li = document.getElementById("li-" + id);
  if (li) li.classList.add("selected");

  const popup = document.getElementById("popup");
  document.getElementById("pop-title").textContent = p.icon + " " + p.name;
  document.getElementById("pop-addr").textContent = "📍 " + p.addr;
  document.getElementById("pop-desc").textContent = p.desc;
  popup.style.display = "block";
  popup.style.pointerEvents = "all";

  if (event) {
    const x = Math.min(event.clientX + 12, window.innerWidth - 260);
    const y = Math.min(event.clientY - 20, window.innerHeight - 180);
    popup.style.left = x + "px";
    popup.style.top = y + "px";
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
document.addEventListener("click", (e) => {
  const popup = document.getElementById("popup");
  if (popup.style.display === "block" && !popup.contains(e.target))
    closePopup();
});

/* ════════════════════════════
   TABS
════════════════════════════ */
function switchTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((b, i) => {
    const tabs = ["map", "directions", "description"];
    b.classList.toggle("active", tabs[i] === tab);
  });
  document
    .querySelectorAll(".tab-page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("panel-" + tab).classList.add("active");
  document.getElementById("audio-hint-box").style.display =
    tab === "description" ? "block" : "none";
}

window.switchTab = switchTab;
window.closePopup = closePopup;

/* ════════════════════════════
   INIT
════════════════════════════ */
buildPlaceList();
buildDirections();
buildMap();
