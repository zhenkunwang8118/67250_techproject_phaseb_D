// External libraries used:
// - jQuery 4.0.0: https://code.jquery.com/jquery-4.0.0.min.js (index.html only)
// - Leaflet 1.9.4: https://unpkg.com/leaflet@1.9.4 (explore.html only)
// - OpenStreetMap tiles: https://www.openstreetmap.org (explore.html only)

/* ── Copyright year ──────────────────────── */
function addYear() {
  const el = document.getElementById("copyYear");
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Active nav link ─────────────────────── */
function activeNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav_bar a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href === "javascript:void(0);") return;
    if (href.split("/").pop() === currentPage) link.classList.add("active");
  });
}

/* ── Hamburger toggle ────────────────────── */
function toggleNav() {
  const nav = document.getElementById("topNav");
  if (nav) nav.classList.toggle("responsive");
}

/* ── Time-based greeting (index.html only) ── */
function greeting(hour) {
  const el = document.getElementById("greeting");
  if (!el) return; // only runs when element exists
  if (hour < 5 || hour >= 20) {
    el.textContent = "Good night — welcome to The Bagel Museum";
  } else if (hour < 12) {
    el.textContent = "Good morning — welcome to The Bagel Museum";
  } else if (hour < 18) {
    el.textContent = "Good afternoon — welcome to The Bagel Museum";
  } else {
    el.textContent = "Good evening — welcome to The Bagel Museum";
  }
}

/* ── Show purchase form ──────────────────── */
function showPurchaseForm(date, type) {
  const section   = document.getElementById("purchaseFormSection");
  const dateInput = document.getElementById("selectedDate");
  const typeSelect = document.getElementById("tickettype");

  if (section) {
    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  // Pre-fill the date picker
  if (dateInput && date) {
    // Convert "April 6, 2026" → "2026-04-06" for <input type="date">
    const parsed = new Date(date);
    if (!isNaN(parsed)) {
      const y = parsed.getFullYear();
      const m = String(parsed.getMonth() + 1).padStart(2, "0");
      const d = String(parsed.getDate()).padStart(2, "0");
      dateInput.value = `${y}-${m}-${d}`;
    }
  }
  // Pre-select ticket type in dropdown
  if (typeSelect && type) {
    if (type.toLowerCase().includes("student")) typeSelect.value = "student";
    else if (type.toLowerCase().includes("weekend")) typeSelect.value = "weekend";
    else typeSelect.value = "general";
    updatePrice(); // refresh price display
  }
}

/* ── Price calculation ───────────────────── */
const PRICES = { general: 18, student: 12, weekend: 22 };

function updatePrice() {
  const typeSelect = document.getElementById("tickettype");
  const qtyInput   = document.getElementById("quantity");
  const priceEl    = document.getElementById("totalPrice");
  if (!typeSelect || !qtyInput || !priceEl) return;

  const type  = typeSelect.value;
  const qty   = parseInt(qtyInput.value) || 1;
  const price = PRICES[type] || 18;
  const total = price * qty;
  priceEl.textContent = `Total: $${total}`;
}

/* ── Zip code validation helper ──────────── */
function validateZip(zip) {
  return zip === "" || /^\d{5}$/.test(zip);
}

/* ── Submit ticket form ──────────────────── */
// Required by Increment 4: submit button shows alert "Redirecting to payment system."
// Then also shows on-page confirmation per Phase B checkout requirements.
function submitTicketForm() {
  const name  = document.getElementById("fullname")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const qty   = document.getElementById("quantity")?.value;
  const date  = document.getElementById("selectedDate")?.value;
  const type  = document.getElementById("tickettype")?.value;
  const zip   = document.getElementById("zipcode")?.value.trim() || "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate required fields
  if (!name) { alert("Please enter your full name."); return; }
  if (!email || !emailRegex.test(email)) { alert("Please enter a valid email address."); return; }
  if (!qty || qty < 1) { alert("Please select at least 1 ticket."); return; }
  if (!date) { alert("Please select a visit date."); return; }
  if (!validateZip(zip)) { alert("Zip code must be exactly 5 digits."); return; }

  // Required Increment 4 alert
  alert("Redirecting to payment system.");

  // Populate and show confirmation panel
  const price = PRICES[type] || 18;
  const total = price * parseInt(qty);
  const typeLabels = { general: "General Admission ($18)", student: "Student Entry ($12)", weekend: "Weekend Flavor Pass ($22)" };

  document.getElementById("conf-name").textContent  = name;
  document.getElementById("conf-email").textContent = email;
  document.getElementById("conf-qty").textContent   = qty;
  document.getElementById("conf-date").textContent  = date;
  document.getElementById("conf-type").textContent  = typeLabels[type] || type;
  document.getElementById("conf-total").textContent = `$${total}`;

  document.getElementById("purchaseFormSection").style.display = "none";
  const conf = document.getElementById("confirmationPanel");
  if (conf) {
    conf.classList.add("visible");
    conf.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ── Reset / buy another ─────────────────── */
function resetForm() {
  ["fullname", "email", "quantity", "selectedDate", "zipcode"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const typeEl = document.getElementById("tickettype");
  if (typeEl) typeEl.value = "general";
  const priceEl = document.getElementById("totalPrice");
  if (priceEl) priceEl.textContent = "Total: $18";

  const conf = document.getElementById("confirmationPanel");
  if (conf) conf.classList.remove("visible");
  const section = document.getElementById("purchaseFormSection");
  if (section) section.style.display = "none";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ── Image gallery / slideshow ───────────── */
function initGallery() {
  const slides = document.querySelectorAll(".gallery-slide");
  if (!slides.length) return;
  let current = 0;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
  }

  window.galleryNext = function () {
    current = (current + 1) % slides.length;
    showSlide(current);
  };
  window.galleryPrev = function () {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  };

  showSlide(0);
  // Auto-advance every 4 seconds
  setInterval(galleryNext, 4000);
}

/* ── Google Maps ─────────────────────────── */
// Google Maps JavaScript API — https://developers.google.com/maps/documentation/javascript
function loadMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof google === "undefined") return;

  const location = { lat: 40.7216, lng: -73.9955 };

  const map = new google.maps.Map(mapEl, {
    center: location,
    zoom: 15,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "The Bagel Museum",
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "<strong>The Bagel Museum</strong><br>New York, NY",
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  infoWindow.open(map, marker);
}

/* ── Read More / Read Less (jQuery) ─────── */
// jQuery 4.0.0 — https://code.jquery.com/jquery-4.0.0.min.js
function initReadMore() {
  if (typeof $ === "undefined") return;

  $("#readMore").on("click", function () {
    $("#longIntro").slideDown();
    $("#readLess").show();
    $(this).hide();
  });

  $("#readLess").on("click", function () {
    $("#longIntro").slideUp();
    $("#readMore").show();
    $(this).hide();
  });
}

/* ── DOMContentLoaded ────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  activeNav();
  loadMap();
  initReadMore();
  initGallery();

  // Time-based greeting (index.html only)
  const now = new Date();
  const hour = now.getHours();
  greeting(hour);

  // Live price update on buytickets page
  const typeSelect = document.getElementById("tickettype");
  const qtyInput   = document.getElementById("quantity");
  if (typeSelect) typeSelect.addEventListener("change", updatePrice);
  if (qtyInput)   qtyInput.addEventListener("input", updatePrice);
});

/* ── Donation amount selector ────────────── */
function setAmount(value) {
  const input = document.getElementById("donation-amount");
  if (input) input.value = value;

  // highlight selected button
  document.querySelectorAll(".amount-btn").forEach(btn => {
    btn.classList.toggle("selected", btn.textContent === "$" + value);
  });
}

/* ── Submit donation form ────────────────── */
function submitDonation() {
  const name   = document.getElementById("donor-name")?.value.trim();
  const email  = document.getElementById("donor-email")?.value.trim();
  const amount = document.getElementById("donation-amount")?.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name)  { alert("Please enter your full name."); return; }
  if (!email || !emailRegex.test(email)) { alert("Please enter a valid email address."); return; }
  if (!amount || amount < 1) { alert("Please enter a donation amount."); return; }

  alert("Redirecting to payment system.");

  document.getElementById("don-name").textContent   = name;
  document.getElementById("don-email").textContent  = email;
  document.getElementById("don-amount").textContent = "$" + parseFloat(amount).toFixed(2);

  document.getElementById("donationSection").style.display = "none";
  const conf = document.getElementById("donationConfirmation");
  if (conf) {
    conf.classList.add("visible");
    conf.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ── Reset donation form ─────────────────── */
function resetDonation() {
  ["donor-name", "donor-email", "donation-amount", "donor-message"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.querySelectorAll(".amount-btn").forEach(btn => btn.classList.remove("selected"));

  const conf = document.getElementById("donationConfirmation");
  if (conf) conf.classList.remove("visible");
  const section = document.getElementById("donationSection");
  if (section) section.style.display = "block";
}