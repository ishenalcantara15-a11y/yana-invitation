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
    { name: "Juan Dela Cruz", role: "Ninong" },
    { name: "Pedro Santos", role: "Ninong" },
    { name: "Miguel Reyes", role: "Ninong" },
    { name: "Maria Clara", role: "Ninang" },
    { name: "Ana Santos", role: "Ninang" },
    { name: "Sofia Garcia", role: "Ninang" }
];

const godparentSearch = document.getElementById("godparentSearch");
const godparentResults = document.getElementById("godparentResults");

if (godparentSearch && godparentResults) {

    godparentSearch.addEventListener("input", function () {

        const searchName = this.value.trim().toLowerCase();

        if (searchName === "") {
            godparentResults.innerHTML =
                "<p>Type your name to check the godparents list. ♡</p>";
            return;
        }

        const matches = godparentsList.filter(function (person) {
            return person.name.toLowerCase().includes(searchName);
        });

        if (matches.length > 0) {

            godparentResults.innerHTML = matches.map(function (person) {
                return `
                    <div class="godparent-result">
                        <h3>${person.name}</h3>
                        <span>${person.role} ♡</span>
                        <p>You're one of Yana's special godparents!</p>
                    </div>
                `;
            }).join("");

        } else {

            godparentResults.innerHTML = `
                <p>Sorry, we couldn't find your name. ♡</p>
                <small>Please check your spelling or contact the family.</small>
            `;

        }

    });
}
