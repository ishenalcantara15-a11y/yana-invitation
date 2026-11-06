// Yana Pauline's invitation website
// To collect RSVPs online, paste your deployed Google Apps Script Web App URL below.
const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbwkSxbXNJEwkM5FOSQl-rlesuG_K9UpifeKPCMg9mx7Bc9sC5o6IXHJLbdB-7WAAgMknA/exec"; // Example: https://script.google.com/macros/s/XXXXX/exec

const intro = document.getElementById("intro");
document.getElementById("openInvite").addEventListener("click", () => {
  intro.classList.add("hide");
  document.body.classList.remove("intro-open");
});

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
menuToggle.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Event time is Philippines time (UTC+8): December 20, 2026 at 11:00 AM.
const eventDate = new Date("2026-12-20T11:00:00+08:00").getTime();
function updateCountdown() {
  const distance = eventDate - Date.now();
  const message = document.getElementById("countdownMessage");
  if (distance <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "0");
    message.textContent = "It's celebration time! Happy birthday, Yana! ♡";
    return;
  }
  document.getElementById("days").textContent = Math.floor(distance / 86400000);
  document.getElementById("hours").textContent = Math.floor((distance % 86400000) / 3600000);
  document.getElementById("minutes").textContent = Math.floor((distance % 3600000) / 60000);
  document.getElementById("seconds").textContent = Math.floor((distance % 60000) / 1000);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// RSVP: sends to Google Apps Script if configured; otherwise saves a demo copy in this browser only.
const form = document.getElementById("rsvpForm");
const status = document.getElementById("formStatus");
const guestCount = document.getElementById("guestCount");
form.querySelectorAll('input[name="attendance"]').forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "No" && radio.checked) guestCount.value = 0;
    if (radio.value === "Yes" && radio.checked && Number(guestCount.value) === 0) guestCount.value = 1;
  });
});
form.addEventListener("submit", async event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  data.guestCount = Number(data.guestCount);
  if (data.attendance === "No") data.guestCount = 0;
  if (data.attendance === "Yes" && data.guestCount < 1) {
    status.textContent = "Please enter at least 1 person if you are attending.";
    return;
  }
  const button = document.getElementById("submitRsvp");
  button.disabled = true;
  button.textContent = "Sending...";
  status.textContent = "";
  try {
    if (RSVP_ENDPOINT.trim()) {
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type":"text/plain;charset=utf-8"},
        body: JSON.stringify(data)
      });
      status.textContent = "Thank you! Your RSVP has been sent. ♡";
      form.reset();
      guestCount.value = 1;
    } else {
      const saved = JSON.parse(localStorage.getItem("yanaRsvpsDemo") || "[]");
      saved.push({...data, submittedAt: new Date().toISOString()});
      localStorage.setItem("yanaRsvpsDemo", JSON.stringify(saved));
      status.textContent = "Demo saved on this device only. Connect Google Sheets to collect guests' RSVPs online.";
      form.reset();
      guestCount.value = 1;
    }
  } catch (error) {
    status.textContent = "Sorry, something went wrong. Please try again or contact the host.";
  } finally {
    button.disabled = false;
    button.textContent = "Send RSVP ♡";
  }
});

document.getElementById("backToTop").addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
// BACKGROUND MUSIC PLAYER
const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const openInviteButton = document.getElementById("openInvite");

// Play music
async function playBackgroundMusic() {
    try {
        await backgroundMusic.play();

        musicToggle.textContent = "🎵 Pause Music";
        musicToggle.classList.add("playing");
        musicToggle.setAttribute("aria-label", "Pause music");

    } catch (error) {
        console.log("Music could not play:", error);
    }
}
// GODPARENTS SEARCH

const godparentsList = [
    // PAIR 1
    { name: "Juan Dela Cruz", role: "Ninong" },
    { name: "Maria Clara", role: "Ninang" },

    // PAIR 2
    { name: "Pedro Santos", role: "Ninong" },
    { name: "Ana Reyes", role: "Ninang" },

    // PAIR 3
    { name: "Miguel Garcia", role: "Ninong" },
    { name: "Sofia Mendoza", role: "Ninang" },

    // PAIR 4
    { name: "Carlo Bautista", role: "Ninong" },
    { name: "Isabella Flores", role: "Ninang" },

    // PAIR 5
    { name: "Gabriel Ramos", role: "Ninong" },
    { name: "Camille Torres", role: "Ninang" },

    // PAIR 6
    { name: "Daniel Fernandez", role: "Ninong" },
    { name: "Angela Cruz", role: "Ninang" },

    // PAIR 7
    { name: "Nathan Villanueva", role: "Ninong" },
    { name: "Bianca Castillo", role: "Ninang" },

    // PAIR 8
    { name: "Joshua Ramirez", role: "Ninong" },
    { name: "Patricia Gomez", role: "Ninang" },

    // PAIR 9
    { name: "Adrian Morales", role: "Ninong" },
    { name: "Chloe Rivera", role: "Ninang" },

    // PAIR 10
    { name: "Lorenzo Aquino", role: "Ninong" },
    { name: "Samantha Diaz", role: "Ninang" },

    // PAIR 11
    { name: "Francis Mendoza", role: "Ninong" },
    { name: "Nicole Garcia", role: "Ninang" },

    // PAIR 12
    { name: "Mark Anthony Lopez", role: "Ninong" },
    { name: "Andrea Santos", role: "Ninang" },

    // PAIR 13
    { name: "Christian Flores", role: "Ninong" },
    { name: "Gabriella Reyes", role: "Ninang" },

    // PAIR 14
    { name: "Paolo Fernandez", role: "Ninong" },
    { name: "Francesca Ramos", role: "Ninang" },

    // PAIR 15
    { name: "Enzo Castillo", role: "Ninong" },
    { name: "Danica Bautista", role: "Ninang" },

    // PAIR 16
    { name: "Rafael Torres", role: "Ninong" },
    { name: "Mikaela Villanueva", role: "Ninang" },

    // PAIR 17
    { name: "Stephen Gomez", role: "Ninong" },
    { name: "Beatrice Aquino", role: "Ninang" },

    // PAIR 18
    { name: "Vincent Ramirez", role: "Ninong" },
    { name: "Clarisse Morales", role: "Ninang" },

    // PAIR 19
    { name: "Luis Rivera", role: "Ninong" },
    { name: "Trisha Diaz", role: "Ninang" },

    // PAIR 20
    { name: "Sebastian Cruz", role: "Ninong" },
    { name: "Danielle Lopez", role: "Ninang" }
];