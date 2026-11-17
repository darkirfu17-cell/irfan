/* ============ SETTINGS: edit these ============ */
const WHATSAPP_NUMBER = "919999999999";            // country code + number, no + or spaces
const INSTAGRAM_URL   = "https://instagram.com/tripwithasif";
/* =============================================== */

const U = (id, w = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

/* Each image: local file in /images first, then web URL, then purple gradient. */
const IMG = {
  hero:      { local: "images/hero.jpg",        url: U("1514282401047-d79a71a590e8", 1800) },
  about:     { local: "images/about.jpg",       url: U("1488646953014-85cb44e25828", 1000) },
  munnar:    { local: "images/munnar.jpg",      url: U("1602216056096-3b40cc0c9944") },
  wayanad:   { local: "images/wayanad.jpg",     url: U("1593693397690-362cb9666fc2") },
  maldives:  { local: "images/maldives.jpg",    url: U("1514282401047-d79a71a590e8") },
  dubai:     { local: "images/dubai.jpg",       url: U("1512453979798-5ea266f8880c") },
  bali:      { local: "images/bali.jpg",        url: U("1537996194471-e657df975ab4") },
  switzerland:{local: "images/switzerland.jpg", url: U("1530122037265-a5f1f91d3b99") },
  japan:     { local: "images/japan.jpg",       url: U("1493976040374-85c8e12f0c0e") },
  kashmir:   { local: "images/kashmir.jpg",     url: U("1566837945700-30057527ade0") },
  backwaters:{ local: "images/backwaters.jpg",  url: U("1593693411515-c20261bcad6e") },
  beach:     { local: "images/kerala-beach.jpg",url: U("1590050752117-238cb0fb12b1") },
  kathakali: { local: "images/kathakali.jpg",   url: U("1599661046289-e31897846e41") },
  spice:     { local: "images/spice.jpg",       url: U("1596040033229-a9821ebd058d") },
};

/* Try sources in order; resolve with the first that loads, or null. */
function load(key) {
  const d = IMG[key]; if (!d) return Promise.resolve(null);
  const tryUrl = u => new Promise(r => { const i = new Image(); i.onload = () => r(u); i.onerror = () => r(null); i.src = u; });
  return tryUrl(d.local).then(ok => ok || tryUrl(d.url));
}
function paint(el, key) {
  el.classList.add("img");
  load(key).then(src => { if (src) el.style.backgroundImage = `url("${src}")`; });
}
function paintAll(root = document) { root.querySelectorAll("[data-img]").forEach(el => paint(el, el.dataset.img)); }

/* ============ DATA ============ */
const DEST = [
  { id: "munnar", name: "Munnar", sub: "Kerala, India", days: "3–4 days", best: "Sep–Mar",
    desc: "Rolling tea estates, misty ridges and cool mountain air. Munnar is Kerala’s favourite hill escape.",
    pts: ["Tea museum and plantation walk", "Eravikulam National Park", "Top Station sunrise", "Mattupetty Dam boating"] },
  { id: "wayanad", name: "Wayanad", sub: "Kerala, India", days: "2–3 days", best: "Oct–May",
    desc: "Forests, waterfalls and ancient caves in the Western Ghats, and just a short drive from home for us.",
    pts: ["Edakkal Caves trek", "Soochipara Falls", "Banasura Sagar Dam", "Spice and coffee estate stay"] },
  { id: "maldives", name: "Maldives", sub: "Indian Ocean", days: "4–5 days", best: "Nov–Apr",
    desc: "Overwater villas, glass-clear lagoons and reefs full of colour. Slow days, long sunsets.",
    pts: ["Overwater or beach villa stay", "Snorkelling with reef fish", "Sandbank picnic", "Sunset dolphin cruise"] },
  { id: "dubai", name: "Dubai", sub: "United Arab Emirates", days: "4–5 days", best: "Nov–Mar",
    desc: "Record-breaking skylines, desert dunes and world-class shopping in one easy city break.",
    pts: ["Burj Khalifa At The Top", "Desert safari with dinner", "Dubai Marina cruise", "Old Dubai souks and creek"] },
  { id: "bali", name: "Bali", sub: "Indonesia", days: "5–6 days", best: "Apr–Oct",
    desc: "Rice terraces, sea temples and beach clubs. Bali blends culture, wellness and adventure.",
    pts: ["Ubud rice terraces and monkey forest", "Uluwatu temple at sunset", "Nusa Penida day trip", "Balinese spa and cooking class"] },
  { id: "switzerland", name: "Switzerland", sub: "Europe", days: "6–8 days", best: "May–Sep",
    desc: "Snow peaks, turquoise lakes and scenic trains through storybook villages.",
    pts: ["Jungfraujoch, Top of Europe", "Interlaken and Lake Brienz", "Lucerne and Mount Titlis", "Glacier Express rail journey"] },
  { id: "japan", name: "Japan", sub: "East Asia", days: "7–9 days", best: "Mar–May, Oct–Nov",
    desc: "Temples, neon cities and bullet trains. Japan is tradition and tomorrow side by side.",
    pts: ["Tokyo and Shibuya", "Kyoto temples and geisha district", "Mount Fuji views", "Cherry blossom or autumn colour"] },
  { id: "kashmir", name: "Kashmir", sub: "North India", days: "5–6 days", best: "Apr–Oct",
    desc: "Houseboats on Dal Lake, saffron fields and snow meadows. Heaven on earth, as they say.",
    pts: ["Dal Lake shikara and houseboat", "Gulmarg gondola", "Pahalgam valley", "Mughal Gardens in Srinagar"] },
];

const PKG = [
  { dest: "maldives", tag: "Bestseller", title: "Maldives Escape", nights: "5N / 6D", price: "₹89,999", inc: ["Return flights from Kochi", "Beach villa with breakfast", "Speedboat transfers"] },
  { dest: "bali", tag: "Honeymoon", title: "Bali Bliss", nights: "6N / 7D", price: "₹64,999", inc: ["Private villa with pool", "Ubud + Uluwatu tours", "Airport transfers"] },
  { dest: "switzerland", tag: "Premium", title: "Swiss Alps Journey", nights: "7N / 8D", price: "₹1,79,999", inc: ["Swiss Travel Pass", "Jungfraujoch ticket", "4-star hotels"] },
  { dest: "kashmir", tag: "Family", title: "Kashmir Paradise", nights: "5N / 6D", price: "₹39,999", inc: ["Houseboat night", "Gulmarg gondola", "SUV with driver"] },
  { dest: "munnar", tag: "Weekend", title: "Munnar Mist", nights: "2N / 3D", price: "₹9,999", inc: ["Hill-view resort", "Guided sightseeing", "Breakfast and dinner"] },
  { dest: "japan", tag: "Seasonal", title: "Japan Classic", nights: "8N / 9D", price: "₹1,69,999", inc: ["Tokyo, Kyoto, Osaka", "JR rail pass", "English-speaking guide"] },
];

const KERALA = [
  { img: "backwaters", t: "Alleppey backwaters", p: "Drift through palm-lined canals on a private houseboat." },
  { img: "munnar", t: "Munnar tea country", p: "Sunrise walks above the clouds." },
  { img: "wayanad", t: "Wayanad wilderness", p: "Caves, waterfalls and spice trails." },
  { img: "beach", t: "Varkala and Kovalam", p: "Cliff cafés and calm Arabian Sea sunsets." },
  { img: "kathakali", t: "Kathakali and culture", p: "Live temple arts, Onam feasts and Theyyam." },
  { img: "spice", t: "Thekkady spice gardens", p: "Cardamom, pepper and elephants in Periyar." },
];

const EXP = [
  { t: "Private villas and stays", p: "Hand-picked hotels, treehouses and houseboats.", s: '<path d="M3 11l9-7 9 7v9H3z"/><path d="M9 20v-6h6v6"/>' },
  { t: "Adventure and treks", p: "Trails, rafting, paragliding and safaris with certified guides.", s: '<path d="M3 20l6-12 4 7 3-4 5 9z"/>' },
  { t: "Food and culture", p: "Cooking classes, street food walks and festivals.", s: '<path d="M6 3v8a3 3 0 0 0 6 0V3M9 3v18M17 3c-2 2-2 6 0 8v10"/>' },
  { t: "Honeymoon journeys", p: "Candlelit dinners, spa days and surprise upgrades.", s: '<path d="M12 21s-8-5.5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 5.500-8 11-8 11z"/>' },
  { t: "Family and group tours", p: "Easy pacing and comfortable vehicles for all ages.", s: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.500"/><path d="M2 20c0-4 3-6 6-6s6 2 6 6M15 15c3 0 6 1.500 6 5"/>' },
];

const GALLERY = ["maldives","switzerland","bali","munnar","kashmir","japan","backwaters","dubai","wayanad","beach","kathakali","spice"];

/* ============ HELPERS ============ */
const $ = s => document.querySelector(s);
const waLink = msg => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const destName = id => (DEST.find(d => d.id === id) || {}).name || id;

/* ============ RENDER ============ */
$("#destGrid").innerHTML = DEST.map(d => `
  <button class="dest reveal" data-open="${d.id}" aria-label="View ${d.name}">
    <div class="img" data-img="${d.id}" style="position:absolute;inset:0"></div>
    <div class="t"><h3>${d.name}</h3><span>${d.sub} · ${d.days}</span></div>
  </button>`).join("");

$("#pkgGrid").innerHTML = PKG.map(p => `
  <article class="pkg reveal">
    <div class="img" data-img="${p.dest}"><span class="tag">${p.tag}</span></div>
    <div class="pkg-b">
      <h3>${p.title}</h3>
      <p>${p.nights} · ${destName(p.dest)}</p>
      <ul>${p.inc.map(i => `<li>${i}</li>`).join("")}</ul>
      <div class="price"><div><small>from</small><br><b>${p.price}</b></div>
        <a class="btn" href="#contact" data-pick="${p.dest}">Book now</a></div>
    </div>
  </article>`).join("");

$("#keralaGrid").innerHTML = KERALA.map(k => `
  <div class="k reveal"><div class="img" data-img="${k.img}"></div>
    <div class="t"><h3>${k.t}</h3><p>${k.p}</p></div></div>`).join("");

$("#expGrid").innerHTML = EXP.map(e => `
  <div class="exp reveal"><svg viewBox="0 0 24 24" aria-hidden="true">${e.s}</svg><h3>${e.t}</h3><p>${e.p}</p></div>`).join("");

$("#galleryGrid").innerHTML = GALLERY.map((k, i) => `
  <button class="g reveal" data-lb="${i}" aria-label="Open photo ${i + 1}">
    <img alt="${k} travel photo" loading="lazy" data-key="${k}" src="${IMG[k].local}"></button>`).join("");

$("#destSelect").innerHTML = '<option value="">Choose destination</option>' +
  DEST.map(d => `<option value="${d.id}">${d.name}</option>`).join("") + '<option value="other">Somewhere else</option>';

/* Gallery <img> fallback chain: local → web → inline gradient */
const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#4c1d95"/><stop offset="1" stop-color="#08060d"/></linearGradient></defs><rect width="600" height="420" fill="url(#g)"/><text x="300" y="215" fill="#a78bfa" font-family="Georgia" font-size="26" text-anchor="middle">Trip With Asif</text></svg>');
document.querySelectorAll(".g img").forEach(img => {
  img.addEventListener("error", function onErr() {
    const d = IMG[img.dataset.key];
    if (img.src.indexOf("images/") > -1 && !img.dataset.tried) { img.dataset.tried = 1; img.src = d.url; }
    else { img.removeEventListener("error", onErr); img.src = FALLBACK; }
  });
});
paintAll();

/* ============ NAV ============ */
const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
addEventListener("scroll", () => nav.classList.toggle("solid", scrollY > 40), { passive: true });
const toggleMenu = open => { menu.classList.toggle("open", open); burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : ""; };
burger.onclick = () => toggleMenu(!menu.classList.contains("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));

const links = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));

/* ============ REVEAL ============ */
const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal, .head").forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = (i % 4) * 90 + "ms"; rv.observe(el); });

/* ============ MODALS ============ */
const modal = $("#modal"), lightbox = $("#lightbox");
let lastFocus = null;
const openM = m => { lastFocus = document.activeElement; m.classList.add("open"); m.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; m.querySelector(".close").focus(); };
const closeM = m => { m.classList.remove("open"); m.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };

function openDest(id) {
  const d = DEST.find(x => x.id === id); if (!d) return;
  $("#mTitle").textContent = d.name;
  $("#mMeta").textContent = `${d.sub} · ${d.days} · Best time: ${d.best}`;
  $("#mDesc").textContent = d.desc;
  $("#mList").innerHTML = d.pts.map(p => `<li>${p}</li>`).join("");
  $("#mWa").href = waLink(`Hi Asif, I'd like to know more about a trip to ${d.name}.`);
  $("#mEnquire").dataset.pick = d.id;
  const im = $("#mImg"); im.style.backgroundImage = ""; paint(im, d.id);
  openM(modal);
}
document.addEventListener("click", e => {
  const o = e.target.closest("[data-open]"); if (o) return openDest(o.dataset.open);
  const p = e.target.closest("[data-pick]"); if (p) $("#destSelect").value = p.dataset.pick;
  if (e.target.closest("[data-close]")) { [modal, lightbox].forEach(m => m.classList.contains("open") && closeM(m)); }
  if (e.target === modal || e.target === lightbox) closeM(e.target);
  const g = e.target.closest("[data-lb]"); if (g) showLB(+g.dataset.lb, true);
});

/* Lightbox */
let lb = 0;
function showLB(i, open) {
  lb = (i + GALLERY.length) % GALLERY.length;
  const el = $("#lbImg"); el.style.backgroundImage = "";
  load(GALLERY[lb]).then(src => { if (src) el.style.backgroundImage = `url("${src}")`; });
  if (open) openM(lightbox);
}
$("#lbPrev").onclick = () => showLB(lb - 1);
$("#lbNext").onclick = () => showLB(lb + 1);
addEventListener("keydown", e => {
  if (e.key === "Escape") [modal, lightbox].forEach(m => m.classList.contains("open") && closeM(m));
  if (lightbox.classList.contains("open")) { if (e.key === "ArrowLeft") showLB(lb - 1); if (e.key === "ArrowRight") showLB(lb + 1); }
});

/* ============ FORM → WHATSAPP ============ */
$("#enquiry").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, v = n => f.elements[n].value.trim(), note = $("#formNote");
  let ok = true;
  ["name", "phone", "dest"].forEach(n => { const bad = !v(n); f.elements[n].classList.toggle("bad", bad); if (bad) ok = false; });
  if (!ok) { note.style.color = "#f87171"; note.textContent = "Please fill in your name, phone number and destination."; return; }
  const dest = v("dest") === "other" ? "somewhere else" : destName(v("dest"));
  const msg = `New travel enquiry\nName: ${v("name")}\nPhone: ${v("phone")}\nEmail: ${v("email") || "-"}\nDestination: ${dest}\nDate: ${v("date") || "Flexible"}\nTravellers: ${v("pax")}\nMessage: ${v("msg") || "-"}`;
  note.style.color = ""; note.textContent = "Thank you! Opening WhatsApp to send your enquiry.";
  window.open(waLink(msg), "_blank", "noopener");
  f.reset();
});

/* ============ LINKS ============ */
$("#waLink").href = $("#waFloat").href = waLink("Hi Asif, I'd like to plan a trip.");
$("#igLink").href = INSTAGRAM_URL;
$("#yr").textContent = new Date().getFullYear();