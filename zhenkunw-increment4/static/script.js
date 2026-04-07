function addYear() {
  const yearSpan = document.getElementById("copyYear");
  if (yearSpan) {
    yearSpan.innerHTML = new Date().getFullYear();
  }
}

function activeNav() {
  const navLinks = document.querySelectorAll(".nav_bar a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href === "javascript:void(0);") {
      return;
    }

    const linkPage = href.split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

function toggleNav() {
  const nav = document.getElementById("topNav");
  if (nav) {
    nav.classList.toggle("responsive");
  }
}

function showPurchaseForm(date) {
  const formSection = document.getElementById("purchaseFormSection");
  const selectedDateInput = document.getElementById("selectedDate");

  if (formSection) {
    formSection.style.display = "block";
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (selectedDateInput) {
    selectedDateInput.value = date;
  }
}

function submitTicketForm() {
  alert("Redirecting to payment system.");
}

function loadMap() {
  const mapElement = document.getElementById("map");

  if (mapElement && typeof L !== "undefined") {
    const map = L.map("map").setView([40.7216, -73.9955], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([40.7216, -73.9955]).addTo(map)
      .bindPopup("The Bagel Museum<br>New York, NY")
      .openPopup();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  activeNav();
  loadMap();

  if (typeof $ !== "undefined") {
    $("#readMore").click(function () {
      $("#longIntro").slideDown();
      $("#readLess").show();
      $("#readMore").hide();
    });

    $("#readLess").click(function () {
      $("#longIntro").slideUp();
      $("#readLess").hide();
      $("#readMore").show();
    });
  }
});